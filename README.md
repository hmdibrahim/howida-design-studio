# Howida design studio — website

A fast, bilingual (English / Arabic) marketing website for **Howida design studio**, an interior design studio based in Abu Dhabi, UAE. Built with Astro (static-first, islands-when-needed), TypeScript (strict), and Tailwind CSS v4.

---

## 1. Project structure

```
howida-design-studio/
├── public/                      # Copied as-is: favicons, robots.txt, og-image.jpg
├── src/
│   ├── assets/brand/            # Logo + derived icons (processed by astro:assets)
│   ├── components/
│   │   ├── views/                # Page bodies, shared between /en and /ar routes
│   │   │   ├── HomeView.astro
│   │   │   ├── AboutView.astro
│   │   │   ├── ServicesIndexView.astro
│   │   │   ├── ServiceDetailView.astro
│   │   │   └── ContactView.astro
│   │   ├── Header.astro          # Nav + mobile menu + language switcher
│   │   ├── Footer.astro
│   │   ├── Seo.astro              # <head> meta, canonical, hreflang, OG, JSON-LD
│   │   ├── ContactForm.astro      # Form UI + progressive-enhancement script
│   │   ├── Icon.astro             # Hand-authored inline SVG icon set (no icon lib)
│   │   ├── ServiceCard.astro, Button.astro, SectionHeading.astro, CtaBand.astro
│   ├── content/
│   │   └── services/{en,ar}/*.md  # 8 services × 2 locales (content collection)
│   ├── content.config.ts          # Zod schema for the services collection
│   ├── i18n/
│   │   ├── ui.ts                   # All UI strings, typed, en + ar
│   │   └── utils.ts                 # getLangFromUrl, useTranslations, dirFor…
│   ├── layouts/BaseLayout.astro    # <html>, fonts, Header/Footer, skip link
│   ├── lib/
│   │   ├── email.ts                 # Resend HTTP call (server-only secret)
│   │   └── schema.ts                # JSON-LD builders (Organization/Service/Breadcrumb)
│   ├── pages/
│   │   ├── index.astro, about.astro, services/index.astro, services/[slug].astro,
│   │   │   contact.astro, 404.astro                # English (default, unprefixed)
│   │   ├── ar/…                                     # Arabic, mirrored 1:1, prefixed /ar
│   │   └── api/contact.ts                            # Server endpoint for the form
│   └── styles/global.css            # Tailwind v4 theme tokens + base layer
├── astro.config.mjs
├── .env.example
└── package.json
```

Every route file under `src/pages` is a thin wrapper: it sets `lang`, builds the page `<title>`/description, and renders the matching `*View.astro` component. All real markup and copy lives once in the view components and in `src/i18n/ui.ts` — nothing is duplicated between the English and Arabic route trees.

---

## 2. Installation

Requires **Node ≥ 22.12** (see `engines` in `package.json`) and npm.

```bash
npm install
```

## 3. Local development

```bash
npm run dev
```

Opens at `http://localhost:4321`. English pages are at `/`, `/about`, `/services`, `/services/<slug>`, `/contact`. Arabic pages are the same paths under `/ar/…`.

## 4. Environment variables

Copy `.env.example` to `.env` and fill in what you have:

```bash
cp .env.example .env
```

| Variable | Required | Purpose |
|---|---|---|
| `PUBLIC_SITE_URL` | Recommended | Canonical domain used for `astro.config.mjs` `site`, sitemap, canonical/hreflang tags, and OG image URLs. Falls back to a placeholder domain if unset — **set this before deploying**. |
| `RESEND_API_KEY` | Production | Server-only secret. Without it, the contact API logs the submission to the server console instead of emailing it (so the form is fully testable in development without real credentials). |
| `CONTACT_TO_EMAIL` | Optional | Mailbox that receives enquiries. Defaults to `howida.yo.ho@gmail.com`. |
| `CONTACT_FROM_EMAIL` | Optional | Verified "from" address for your email provider. |

None of these are ever sent to the browser — `RESEND_API_KEY` is read with `process.env` only inside `src/lib/email.ts`, which runs exclusively on the server (`src/pages/api/contact.ts` has `export const prerender = false`).

## 5. Build

```bash
npm run build
```

Output goes to `dist/`. Almost every page is prerendered to static HTML (`dist/client`); `/contact`, `/ar/contact`, and `/api/contact` are rendered on demand (`dist/server`) because the contact page needs to read the `?status=` query string server-side for the no-JavaScript success/error banner, and the API route needs a real request to validate and send mail.

```bash
npm run preview   # serve the production build locally
```

## 6. Deployment

The project uses `@astrojs/node` in **standalone** mode, which produces a self-contained Node server (`dist/server/entry.mjs`) alongside the static assets. This runs on any platform that can run a long-lived Node process (a VM, a container, Railway, Render, Fly.io, etc.):

```bash
node ./dist/server/entry.mjs
# HOST / PORT env vars are respected; defaults to 0.0.0.0:4321
```

Since only two routes need a server, it's easy to switch to a serverless/edge adapter and deploy to a global CDN (Vercel, Netlify, or Cloudflare Pages), which is what the "SSG-first, minimal server surface" design was built for. To do so:

1. Swap `@astrojs/node` for the platform's adapter, e.g. `@astrojs/vercel` or `@astrojs/cloudflare`.
2. Update the `adapter` line in `astro.config.mjs`.
3. Set the same environment variables (§4) in that platform's dashboard.
4. Note: the in-memory rate limiter in `src/pages/api/contact.ts` is per-process. That's correct for a single Node server, but on serverless platforms with multiple concurrent instances, replace the `Map`-based limiter with a shared store (the platform's KV/Redis) if you need rate limiting to hold across instances.

Before going live:

- Set `PUBLIC_SITE_URL` to the real domain, both as an env var and by updating the hardcoded `Sitemap:` line in `public/robots.txt` (static files aren't processed, so this one line needs a manual edit).
- Set `RESEND_API_KEY` (or swap `src/lib/email.ts` for your preferred email provider).

## 7. Performance optimizations

- **Static by default.** Every page except `/contact` and the API route is prerendered at build time — there's no server round-trip, no database, no client-side data fetching for content.
- **Minimal JavaScript.** No UI framework (React/Vue/etc.) is shipped. The only client scripts are two small vanilla snippets: the mobile-menu toggle (`Header.astro`) and the contact-form progressive enhancement (`ContactForm.astro`). Both are plain `<script>` tags Astro bundles and defers automatically — there is no hydration cost anywhere on the site.
- **Fonts:** a single self-hosted variable font (`@fontsource-variable/cairo`) covers both Latin and Arabic, split into per-script `unicode-range` subsets so a visitor only downloads the glyphs their page actually uses. `font-display: swap` is set, and the correct subset is `<link rel="preload">`ed per-locale in `BaseLayout.astro` to avoid layout shift from late-loading headings.
- **Images:** every raster image goes through `astro:assets` (`<Image>`), which generates right-sized, `width`/`height`-explicit WebP output at build time. The header logo mark is `loading="eager" fetchpriority="high"` (it's small and part of the LCP-adjacent header); all other images are lazy by default. There is intentionally **no large hero photograph** — the homepage hero is text plus a small optimized brand mark and CSS/SVG decoration, so the LCP element is text, which paints near-instantly.
- **No layout shift:** all images carry explicit dimensions; fonts are preloaded; there are no client-injected banners or cookie widgets.
- **No third-party scripts.** No analytics, trackers, or ad scripts are included. Add analytics later via a single `defer`red script if needed — don't add render-blocking tags to `<head>`.
- **Caching:** static output is plain files, so any static host / CDN can cache them indefinitely with content-hashed filenames (Astro/Vite fingerprints all built assets under `_astro/`).

## 8. SEO implementation

- Unique, human-written `<title>` and meta description per page, per locale (`src/components/Seo.astro`, populated from each route file).
- `rel="canonical"` on every page, plus `hreflang="en"` / `hreflang="ar"` / `hreflang="x-default"` alternates so search engines understand the English and Arabic pages are translations of each other.
- Open Graph + Twitter Card metadata, including a generated 1200×630 `og-image.jpg`.
- JSON-LD structured data (`src/lib/schema.ts`):
  - `HomeAndConstructionBusiness` (Organization-equivalent for a design/fit-out studio) on the homepage.
  - `Service` on every service detail page.
  - `BreadcrumbList` on every service detail page.
- `sitemap-index.xml` generated by `@astrojs/sitemap` at build time, with per-URL `hreflang` alternates; referenced from `public/robots.txt`.
- Clean, human-readable URLs (`/services/interior-design`, `/ar/services/interior-design` — the same slug across locales, no query strings, no IDs).
- One `<h1>` per page, sequential `<h2>`/`<h3>` structure (verified in the browser — see §11).
- Internal linking between Home → Services → individual service detail pages → Contact, and a full footer sitemap.

## 9. Accessibility checklist (WCAG 2.2 AA)

- [x] Semantic landmarks: `<header>`, `<nav aria-label>`, `<main>`, `<aside>`, `<footer>`.
- [x] Skip-to-content link, visible on focus, moving real keyboard focus to `<main tabindex="-1">` (not just scrolling).
- [x] Single `<h1>` per page with a logical, non-skipping heading order.
- [x] All non-decorative images have descriptive `alt`; purely decorative images use `alt=""`.
- [x] Icons are `aria-hidden` by default (`Icon.astro`); interactive controls carry their own accessible name via visible text or labels.
- [x] Visible focus states everywhere (`:focus-visible` outline defined globally in `global.css`), not suppressed anywhere.
- [x] Full keyboard operability: header nav, mobile menu (button with `aria-expanded`/`aria-controls`), language switcher, and the contact form all work without a mouse.
- [x] Forms: every input has a real, associated `<label>`; errors are field-adjacent and announced via `aria-live` status regions; the honeypot field is hidden with a non-`display:none` clip technique so it doesn't create horizontal overflow, and is `aria-hidden` + removed from the tab order.
- [x] Color contrast checked against WCAG AA math (see the palette note in `global.css`): body text ≥ 7.4:1, accent text ≥ 5:1, button text ≥ 4.8:1 on their respective backgrounds. The raw brand gold (`#B08D57`) is used only for borders/icons/backgrounds, never as text on its own, because it falls short of 3:1.
- [x] `prefers-reduced-motion: reduce` is respected globally (animations/transitions collapse to near-zero duration).
- [x] Full RTL support: `<html dir="rtl">` on Arabic pages, `rtl:`-variant Tailwind utilities instead of hardcoded left/right where direction matters, mirrored directional icons (`rtl:rotate-180`).
- [x] No horizontal scrolling at 320px–375px widths (verified — see §11).

## 10. Testing instructions

```bash
npm run typecheck   # astro check — TypeScript + template diagnostics, 0 errors
npm run build        # production build must complete without errors
```

Manual QA checklist, per locale (`en` and `ar`):

1. `npm run dev`, visit `/`, `/about`, `/services`, one service detail page, `/contact`, and a nonexistent path (404).
2. Resize to 320–375px, 768px, 1024px, and ultrawide — confirm no horizontal scroll, no overlapping text, tap targets ≥ 44px.
3. Tab through the whole page with a keyboard only; confirm the skip link, mobile menu, and form are all reachable and usable.
4. Submit the contact form:
   - With JavaScript enabled: inline success/error banner, no page reload, and honeypot/timing-based bot submissions get a fake "success" without an email being sent (check the server console in dev, since `RESEND_API_KEY` is unset locally).
   - With JavaScript disabled: the form still posts natively and redirects back with a server-rendered success/error banner.
5. Toggle the language switcher from every page and confirm it lands on the translated equivalent of the same page (not the homepage).
6. Run a Lighthouse audit (Chrome DevTools → Lighthouse) against the production build (`npm run build && npm run preview`) — not `astro dev`, which includes dev-only overhead.

## 11. What was verified in this build

This environment's browser preview pane couldn't composite screenshots for a visual pass, so verification here was done via the DOM/network/console instead:

- Production build (`npm run build`) and `astro check` both complete with **0 errors**.
- Homepage and Arabic homepage render full content server-side with no console errors and no failed network requests.
- `document.documentElement.scrollWidth` equals `window.innerWidth` at a 375px viewport on both the homepage and the contact page, in both locales — **no horizontal scroll**.
- `<html dir="rtl" lang="ar">` is correctly applied on every Arabic route.
- Heading order was dumped and inspected on the Arabic homepage: one `<h1>`, followed by properly nested `<h2>`/`<h3>`.
- The skip link moves real keyboard focus to `<main>` (confirmed via `document.activeElement`) — this was fixed during this build (see below).
- The mobile menu button correctly toggles `aria-expanded` and the panel's visibility.
- The contact form was exercised directly against `/api/contact`:
  - Valid submission → `200 { ok: true }`, submission logged server-side (no `RESEND_API_KEY` in dev).
  - Invalid email / too-short message → `400` with field-level error codes.
  - Honeypot filled in → `200 { ok: true }` **without** logging/sending (fake success, so bots don't learn to avoid the trap).
  - Submitted faster than the minimum fill time → same fake-success, no email.
  - The no-JavaScript path (form-encoded POST, no fetch) returns a `303` redirect to `/contact?status=success`, and that URL correctly server-renders the success banner without any client JavaScript running.
- All images carry `alt` attributes (empty/decorative where appropriate, descriptive on the About page's brand image).

Two real bugs were caught and fixed during this verification pass, not just hypothesized:

1. **Skip link didn't move keyboard focus.** `<main id="main-content">` had no `tabindex`, so activating the skip link scrolled the page but left focus on the link itself — the next Tab press would have gone back to the top of the page instead of into the content. Fixed by adding `tabindex="-1"` to `<main>`.
2. **Honeypot bug.** The honeypot field's Zod schema (`z.string().max(0)`) rejected any bot submission at the *validation* stage with a `400`, before the code ever reached the intended "pretend it succeeded" logic — so bots would have gotten a clear 400 signal telling them exactly which field to leave empty next time. Fixed by relaxing the schema so filled-in honeypot values pass validation and are caught by the explicit check instead.

Not verified in this session (recommend before shipping): a real Lighthouse run and a real visual/screenshot pass across breakpoints — do this once you can preview the site in a normal browser, since the numbers in this document are targets from the brief, not measurements.

## 12. Production-readiness checklist

- [ ] Replace the `PUBLIC_SITE_URL` placeholder with the real domain (env var **and** the `Sitemap:` line in `public/robots.txt`).
- [ ] Set `RESEND_API_KEY` / `CONTACT_TO_EMAIL` / `CONTACT_FROM_EMAIL` (or swap in a different provider in `src/lib/email.ts`).
- [ ] Verify the sending domain with your email provider so mail doesn't land in spam.
- [ ] Run `npm run build` and `npm run typecheck` in CI on every push.
- [ ] Run a real Lighthouse pass against the deployed preview (target: 95+ across all four categories, as specified in the brief) and fix anything it flags.
- [ ] Swap the Node adapter for your target platform's adapter if deploying to a serverless/edge CDN host, and re-test the contact form there.
- [ ] If deploying to multiple concurrent server instances, replace the in-memory rate limiter with a shared store.
- [ ] Add real interior-design project photography once available — the site currently uses a typography + brand-mark led design deliberately, with no stock photos presented as real projects (see §7).
- [ ] Confirm the phone/email/address in `src/i18n/ui.ts`, `src/components/Footer.astro`, `src/components/views/ContactView.astro`, and `src/lib/schema.ts` are correct (currently sourced from the brand assets provided: `0544 381 939`, `howida.yo.ho@gmail.com`, Abu Dhabi, UAE).
