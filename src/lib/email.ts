interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
  lang: 'en' | 'ar';
}

/**
 * Sends the enquiry via the Resend HTTP API (no SDK — a single fetch call keeps
 * the server bundle small). Falls back to a console log in local development
 * when RESEND_API_KEY is not configured, so the form flow stays testable
 * without real credentials.
 */
export async function sendContactEmail(data: ContactPayload): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const toAddress = process.env.CONTACT_TO_EMAIL ?? 'howida.yo.ho@gmail.com';
  const fromAddress = process.env.CONTACT_FROM_EMAIL ?? 'Howida design studio <onboarding@resend.dev>';

  if (!apiKey) {
    if (import.meta.env.DEV) {
      console.info('[contact] RESEND_API_KEY not set — logging submission instead of sending email.', data);
      return true;
    }
    console.error('[contact] RESEND_API_KEY is not configured; cannot send enquiry email.');
    return false;
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromAddress,
        to: [toAddress],
        reply_to: data.email,
        subject: `New website enquiry from ${data.name}`,
        text: [
          `Name: ${data.name}`,
          `Email: ${data.email}`,
          `Phone: ${data.phone || '—'}`,
          `Service: ${data.service || '—'}`,
          `Language: ${data.lang}`,
          '',
          'Message:',
          data.message,
        ].join('\n'),
      }),
    });

    return response.ok;
  } catch (error) {
    console.error('[contact] Failed to send enquiry email.', error);
    return false;
  }
}
