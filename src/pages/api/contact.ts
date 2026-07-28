import type { APIRoute } from 'astro';
import { z } from 'zod';
import { getRelativeLocaleUrl } from 'astro:i18n';
import { sendContactEmail } from '../../lib/email';

export const prerender = false;

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const MIN_FILL_TIME_MS = 1500;

// In-memory sliding-window limiter. Suitable for a single Node process;
// swap for a shared store (e.g. Redis/KV) behind a serverless adapter.
const submissionLog = new Map<string, number[]>();

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (submissionLog.get(key) ?? []).filter((timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS);
  recent.push(now);
  submissionLog.set(key, recent);
  return recent.length > RATE_LIMIT_MAX_REQUESTS;
}

const contactSchema = z.object({
  name: z.string().trim().min(2, 'required').max(120, 'too_long'),
  email: z.string().trim().min(1, 'required').email('invalid_email').max(180, 'too_long'),
  phone: z
    .string()
    .trim()
    .max(30, 'too_long')
    .refine((value) => value === '' || /^[+\d][\d\s()-]{5,29}$/.test(value), 'invalid_phone')
    .optional()
    .or(z.literal('')),
  service: z.string().trim().max(120).optional().or(z.literal('')),
  message: z.string().trim().min(10, 'too_short').max(2000, 'too_long'),
  lang: z.enum(['en', 'ar']).default('en'),
  // Honeypot: intentionally unrestricted so a filled-in value still passes
  // schema validation and reaches the explicit bot check below, which
  // returns a fake success instead of a validation error.
  company: z.string().max(500).optional().or(z.literal('')),
  startedAt: z.coerce.number().optional(),
});

type FieldErrors = Partial<Record<'name' | 'email' | 'phone' | 'message', string>>;

function toFieldErrors(issues: z.ZodIssue[]): FieldErrors {
  const errors: FieldErrors = {};
  for (const issue of issues) {
    const field = issue.path[0];
    if (field === 'name' || field === 'email' || field === 'phone' || field === 'message') {
      errors[field] = issue.message;
    }
  }
  return errors;
}

async function parseBody(request: Request): Promise<Record<string, unknown>> {
  const contentType = request.headers.get('content-type') ?? '';
  if (contentType.includes('application/json')) {
    return request.json();
  }
  const formData = await request.formData();
  return Object.fromEntries(formData.entries());
}

export const POST: APIRoute = async ({ request, clientAddress, redirect }) => {
  const contentType = request.headers.get('content-type') ?? '';
  const isJsonRequest = contentType.includes('application/json');

  let raw: Record<string, unknown>;
  try {
    raw = await parseBody(request);
  } catch {
    return jsonOrRedirect(isJsonRequest, redirect, 'en', false, { message: 'invalid_request' });
  }

  const lang = raw.lang === 'ar' ? 'ar' : 'en';

  let ip = 'unknown';
  try {
    ip = clientAddress ?? 'unknown';
  } catch {
    ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  }

  const parsed = contactSchema.safeParse(raw);

  if (!parsed.success) {
    return jsonOrRedirect(isJsonRequest, redirect, lang, false, {
      message: 'validation_error',
      fields: toFieldErrors(parsed.error.issues),
    });
  }

  const data = parsed.data;

  // Honeypot: a bot filled a field real visitors never see. Pretend success
  // so scripted submitters don't learn to avoid the trap.
  if (data.company) {
    return jsonOrRedirect(isJsonRequest, redirect, lang, true, {});
  }

  // Forms filled faster than a human can reasonably type are almost always automated.
  if (data.startedAt && Date.now() - data.startedAt < MIN_FILL_TIME_MS) {
    return jsonOrRedirect(isJsonRequest, redirect, lang, true, {});
  }

  if (isRateLimited(ip)) {
    return jsonOrRedirect(isJsonRequest, redirect, lang, false, { message: 'rate_limited' }, 429);
  }

  const sent = await sendContactEmail({
    name: data.name,
    email: data.email,
    phone: data.phone,
    service: data.service,
    message: data.message,
    lang: data.lang,
  });

  if (!sent) {
    return jsonOrRedirect(isJsonRequest, redirect, lang, false, { message: 'send_failed' }, 502);
  }

  return jsonOrRedirect(isJsonRequest, redirect, lang, true, {});
};

function jsonOrRedirect(
  isJson: boolean,
  redirect: (path: string, status?: 301 | 302 | 303 | 307 | 308) => Response,
  lang: 'en' | 'ar',
  ok: boolean,
  extra: Record<string, unknown>,
  status = ok ? 200 : 400,
): Response {
  if (isJson) {
    return new Response(JSON.stringify({ ok, ...extra }), {
      status,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  const contactPath = getRelativeLocaleUrl(lang, 'contact');
  const query = ok ? 'status=success' : 'status=error';
  return redirect(`${contactPath}?${query}`, 303);
}
