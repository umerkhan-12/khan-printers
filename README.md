# Khan Printers — Website

Premium printing studio website for Khan Printers, Karachi. It's a single landing page built to turn ad and social traffic into WhatsApp enquiries and quote requests.

**Stack:** Next.js 16 (App Router) · TypeScript · Tailwind CSS v4. No other runtime dependencies.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start   # production build
npm run lint
```

## Where things live

| What | File |
|---|---|
| Business facts (phone, email, hours, address) | `src/content/site.ts` |
| Services list and copy | `src/content/services.ts` |
| Images and alt text | `src/content/media.ts` |
| Gallery order and layout | `src/content/portfolio.ts` |
| WhatsApp message wording | `src/lib/whatsapp.ts` |
| Design tokens (colours, type, spacing) | `src/app/globals.css` |
| Quote email (API) | `src/app/api/quote/route.ts` |

Only confirmed business facts go in `site.ts`. Never add reviews, statistics or claims that the client hasn't confirmed.

## Replacing sample images with real photos

The images shown now are **illustrative samples**, not Khan Printers' own work. Each one shows a visible "Sample image" label.

1. Put the original photo in `assets-source/` (kept as the untouched original).
2. Export a web copy (max ~2000px on the long side, JPG) to `src/assets/images/`.
3. In `src/content/media.ts`, point the import at the new file, write accurate `alt` text, and set `sample: false`.
4. When no gallery image is a sample, the "Our Work" heading switches automatically to "Real projects. Real printing."

Next.js generates AVIF/WebP and responsive sizes automatically.

## Ad landing links

Add `?service=<slug>` to preselect a service in the quote form, e.g.

```
https://<domain>/?service=stickers-labels#quote
```

Slugs: `business-cards`, `stickers-labels`, `wedding-invitations`, `brochures-flyers`, `books-registers`, `branded-bags`, `banners`, `custom-printing`.

## Quote requests by email (optional)

The quote form always opens WhatsApp with the customer's details filled in. To also get an **email copy** in `khanprinters45@gmail.com` (and to allow design-file uploads up to 4 MB):

1. Create a free account at [resend.com](https://resend.com) **using khanprinters45@gmail.com**.
2. Create an API key.
3. In Vercel → Project → Settings → Environment Variables, add `RESEND_API_KEY`. See `.env.example` for all options.
4. Redeploy. The file-upload field appears once the key is set.

Until a domain is verified in Resend, emails are sent from Resend's test address and can only be delivered to the account's own email. That is why step 1 uses the business Gmail. After buying the domain, verify it in Resend and set `QUOTE_EMAIL_FROM` (for example `Khan Printers Website <quotes@yourdomain.pk>`).

## Deploy

Import the repo in Vercel. Set `NEXT_PUBLIC_SITE_URL` to the final domain, which is used for canonical URLs, Open Graph tags, the sitemap and structured data.

## Pending from client

- Official logo (SVG preferred). A text wordmark is used until then (`src/components/layout/Wordmark.tsx`).
- Original project photos for every service. Business cards, books/registers and custom printing currently have no image.
- Full street address, then add `site.location.street`.
- Which days the 9 AM – 9 PM hours apply to, before they're added to structured data.
- Domain name.
