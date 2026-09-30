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
| Products (services), copy and "perfect for" tags | `src/content/services.ts` |
| Product pages (`/services/<slug>`) | `src/app/services/[slug]/page.tsx` |
| FAQ questions and answers | `src/content/faq.ts` |
| Images and alt text | `src/content/media.ts` |
| Gallery order and layout | `src/content/portfolio.ts` |
| WhatsApp message wording | `src/lib/whatsapp.ts` |
| Design tokens (colours, type, spacing) | `src/app/globals.css` — names match the Figma variables |
| Quote email (API) | `src/app/api/quote/route.ts` |

Only confirmed business facts go in `site.ts`. Never add reviews, statistics or claims that the client hasn't confirmed.

## Design source (Figma)

https://www.figma.com/design/mxA6mEW6h2mBvIjZPsZQDj — exploration boards (colour, type, concepts, each scored), wireframes (1440 / 390), design-system foundations (62 variables, 22 text styles) and components (Button, Input, Product tile, Portfolio card, Navigation, CTA).

Colour tokens are semantic (`background`, `surface`, `surface-inverse`, `primary`, `accent`, `accent-text`, `text`, `text-strong`, `text-muted`, `border`, `focus`, `success`, `error`…). Use them — never raw hex values — in components. Navy and gold are taken from the Khan Printers logo.

## Replacing sample images with real photos

All current images were supplied and approved by the client. An image marked `sample: true` in `media.ts` shows a visible "Sample image" label — use that for any image the client has not approved.

1. Put the original photo in `assets-source/` (kept as the untouched original).
2. Export a web copy (max ~2000px on the long side, JPG) to `src/assets/images/`.
3. In `src/content/media.ts`, point the import at the new file, write accurate `alt` text, and set `sample: false`.
4. When no gallery image is a sample, the "Our Work" heading switches automatically to "Real projects. Real printing."

Next.js generates AVIF/WebP and responsive sizes automatically.

## Ad landing links

Each product has its own page, which is the best landing page for a product ad. Its quote form has the product already selected:

```
https://<domain>/services/stickers-labels
```

On the home page, `?service=<slug>` preselects a product in the quote form instead, e.g. `https://<domain>/?service=stickers-labels#quote`.

Slugs: `stickers-labels`, `business-cards`, `wedding-invitations`, `brochures-flyers`, `books-registers`, `branded-bags`, `banners`.

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

- A vector (SVG) version of the logo would render sharper at small sizes. The current badge is cut from `assets-source/logo.jpeg`.
- Photos for Books & Registers (currently a designed "photo coming soon" tile) and more real project photos over time.
- Full street address, then add `site.location.street`.
- Google Maps **embed** URL for the live map: on Google Maps open the business → Share → *Embed a map* → copy the `src="…"` value into `site.location.mapEmbedUrl`. Until then the Location section links to the client's map (`site.location.mapUrl`).
- Which days the 9 AM – 9 PM hours apply to, before they're added to structured data.
- Domain name.
