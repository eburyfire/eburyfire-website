# Ebury Fire Systems — marketing site

Next.js 16 + React 19 + Tailwind 4 marketing site for [eburyfire.co.uk](https://eburyfire.co.uk).

Customer portal lives separately at `portal.eburyfire.co.uk` (repo `eburyfire-portal`). The only integration point is the "Customer login" button linking to `portal.eburyfire.co.uk/sign-in`.

## Local development

```bash
pnpm install
pnpm dev
```

Site runs at <http://localhost:3000>.

## Environment

See `.env.example`. The only required variable in production is `RESEND_API_KEY` for the contact form. Without it the `/api/quote` endpoint still returns success-ish but only logs the enquiry to stdout — useful for local development.

Set the production key with:

```bash
vercel env add RESEND_API_KEY production
```

## Routes

- `/` — homepage
- `/services` — full service list with anchored sections (linked from homepage tiles)
- `/pricing` — published maintenance pricing
- `/about` — mission and capability
- `/resources` — MDX-backed article index
- `/resources/[slug]` — individual articles
- `/contact` — quote form (POSTs to `/api/quote`)
- `/signup?ref=CODE` — referral landing for the partner programme
- `/privacy`, `/data-retention`, `/accessibility` — legal pages (drafts pending legal review)

## Content

Resource articles live in `src/content/resources/` as MDX with a `meta` export. The index is generated from `src/content/resources/manifest.ts`. To add a new article:

1. Create a new `.mdx` file in `src/content/resources/`.
2. Export a `meta` object (slug, title, category, excerpt, publishedAt, readingMinutes).
3. Import it into `manifest.ts` and add to the `resourceMetas` array.

`fetchResources()` in `src/lib/resources.ts` is the single read path — swap its body to a portal API call when the CMS lands.

## Deploy

Auto-deploys from `main` via Vercel.
