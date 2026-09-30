# Khan Printers — Design & Implementation Plan (v1)

Status: **v1 implemented (homepage). Awaiting client's original photos, logo, address and domain.** See README for how to swap in real photos.

---

## 1. Current project assessment

- Repository is **empty**: no commits, no framework, no assets, no logo, no photos.
- Nothing to preserve or migrate — we start clean.
- Decision: **Next.js (App Router) + TypeScript + Tailwind CSS**, deployed on Vercel.
  - `next/image` gives AVIF/WebP, responsive `srcset`, lazy loading and hero `priority` for free.
  - `next/font` self-hosts Google fonts with no layout shift.
  - Static generation — the whole site is pre-rendered HTML, ideal for ad traffic.
- Dependencies beyond Next/React/Tailwind: **none planned**. Motion via CSS + one small `IntersectionObserver` hook; lightbox built on native `<dialog>`; quote form submits to WhatsApp (no backend in v1).

---

## 2. Information architecture

```
/                       Home (the landing page — carries 90% of conversion)
  #top      Hero
  #services Services
  #work     Our Work (gallery + lightbox)
  #why      Why Khan Printers
  #process  How It Works
  #quote    Quote form (→ WhatsApp)
  #contact  Contact + Footer

Later (only when real content + ad campaigns justify them):
/services/[slug]        business-cards, stickers-labels, wedding-invitations,
                        brochures-flyers, books-registers, branded-bags,
                        banners, custom-printing
/work                   only if the portfolio grows past ~30 images
```

Why one strong page first: ad visitors bounce on extra clicks. Every service is modelled in **one typed data file** (`src/content/services.ts`), so the future `/services/[slug]` landing pages are generated from the same data — no duplication.

Section order rationale (fastest path to trust → contact):
1. **Hero** — what / where / action, with a real product photo.
2. **Service strip** — the 8 services as a one-line scan (answers "do they print *my* thing?").
3. **Our Work** — moved *above* the detailed services: real photos are the trust proof.
4. **Services** — editorial, image-driven detail.
5. **Why Khan Printers** — only confirmed claims.
6. **How It Works** — 5 steps, removes "what happens next?" anxiety.
7. **Quote** — short form → WhatsApp.
8. **Contact / Footer**.

---

## 3. User journey

```
Instagram / Facebook / WhatsApp ad  (mobile, 3–5 s attention)
  → Hero: "Premium printing · Karachi" + product photo + [WhatsApp] [Get a Quote]
      ├─ ready now ──────────────→ WhatsApp (pre-filled message)        ← primary
      └─ needs proof
           → Service strip (is my item listed?) → tap → scroll to service
           → Our Work (real photos, lightbox)
           → sticky bottom bar always visible: [WhatsApp] [Get a Quote]
           → Quote form (4 fields) → opens WhatsApp with a structured message
```

Conversion targets: WhatsApp reachable in **0 scrolls, 1 tap** on every screen; quote form ≤ 30 seconds.

Deep-linking for ads: `/?service=stickers` pre-selects the service in the quote form and in the WhatsApp message, so each ad can land on the same page with a tailored CTA — no separate page needed in v1.

---

## 4. Homepage wireframe — desktop (1440px)

```
┌──────────────────────────────────────────────────────────────────────────┐
│ KHAN PRINTERS        Our Work  Services  Why Us  Contact   [WhatsApp ▸] │ sticky, ivory, hairline on scroll
├──────────────────────────────────────────────────────────────────────────┤
│                                    │                                     │
│  PREMIUM PRINTING · KARACHI        │                                     │
│                                    │        HERO PHOTO                   │
│  Premium printing,                 │        (strongest real product      │
│  made for your brand.              │         shot — e.g. business        │
│                                    │         cards / stationery)         │
│  Business cards, stickers,         │         ~7/12 width, full height    │
│  brochures, banners & more —       │                                     │
│  printed in Karachi.               │                                     │
│                                    │                                     │
│  [ Get a Quote ]  View our work →  │                                     │
│  WhatsApp 0371 1210703             │                                     │
├──────────────────────────────────────────────────────────────────────────┤
│ Stickers · Business Cards · Invitations · Brochures · Registers · Bags … │ service strip, hairline dividers
├──────────────────────────────────────────────────────────────────────────┤
│  01 — OUR WORK                                                            │
│  Real projects. Real printing.            [All][Cards][Stickers][…]      │ filters only if ≥3 categories have ≥3 images
│  ┌───────────────────┐ ┌────────┐ ┌────────┐                             │
│  │                   │ │        │ │        │   editorial asymmetric grid │
│  │   large 2×2       │ ├────────┤ │  tall  │   click → lightbox          │
│  │                   │ │        │ │        │                             │
│  └───────────────────┘ └────────┘ └────────┘                             │
│  ┌────────┐ ┌───────────────────┐ ┌────────┐                             │
│  └────────┘ └───────────────────┘ └────────┘                             │
├──────────────────────────────────────────────────────────────────────────┤
│  02 — SERVICES                        (black section, ivory text)        │
│  ┌──────────────────────────────┐  BUSINESS CARDS                        │ feature: big photo + copy
│  │  photo                       │  Short description.  Ask for a quote → │
│  └──────────────────────────────┘                                        │
│  01 Stickers & Labels ……… [thumb]  → │ numbered editorial list, not cards │
│  02 Wedding & Invitation ………[thumb] → │ thumbnail reveals on hover (desk) │
│  03 Brochures & Flyers ………  [thumb] → │                                   │
│  … Books & Registers / Branded Bags / Banners / Custom Printing           │
├──────────────────────────────────────────────────────────────────────────┤
│  03 — WHY KHAN PRINTERS                                                   │
│  Big serif statement (left)      Quality printing ─ short line           │ 2-col, hairline rows,
│                                  Design support   ─ short line           │ no icons-in-circles
│                                  Custom orders    ─ short line  (…)      │
├──────────────────────────────────────────────────────────────────────────┤
│  04 — HOW IT WORKS                                                        │
│  01 Send ─── 02 Quote ─── 03 Approve ─── 04 Print ─── 05 Collect         │ horizontal line, gold numerals
├──────────────────────────────────────────────────────────────────────────┤
│  05 — GET A QUOTE                                                         │
│  Tell us what you need.           │ Name                                 │
│  We reply on WhatsApp.            │ WhatsApp number                      │
│  [Chat on WhatsApp directly]      │ What to print [select ▾]             │
│  Phone / Email / Instagram        │ Quantity   │ Message (optional)      │
│                                   │ [ Send on WhatsApp ▸ ]               │
├──────────────────────────────────────────────────────────────────────────┤
│  KHAN PRINTERS — Premium Printing Solutions in Karachi   (black)         │
│  Services · Our Work · Contact │ WhatsApp · Phone · Email · Instagram    │
│  Karachi, Pakistan                                 © 2026                │
└──────────────────────────────────────────────────────────────────────────┘
```

## 5. Mobile wireframe (390px)

```
┌──────────────────────────┐
│ KHAN PRINTERS      ☰     │ 56px sticky header
├──────────────────────────┤
│ PREMIUM PRINTING·KARACHI │
│ Premium printing,        │ serif ~44px
│ made for your brand.     │
│ Cards, stickers,         │
│ brochures, banners …     │
│ ┌──────────────────────┐ │
│ │ HERO PHOTO 4:5       │ │ visible above the fold at 390×844
│ └──────────────────────┘ │
├──────────────────────────┤
│ ← Stickers  Cards  Bags →│ horizontal scroll chips (tap → section)
├──────────────────────────┤
│ OUR WORK                 │
│ ┌──────────┐┌──────────┐ │ 2-col grid, first item full width
│ └──────────┘└──────────┘ │ tap → full-screen lightbox, swipe
├──────────────────────────┤
│ SERVICES (black)         │
│ [feature photo]          │
│ 01 Stickers & Labels   → │ stacked rows, 56px+ tap height
│ …                        │
├──────────────────────────┤
│ WHY / HOW (stacked)      │
│ QUOTE FORM (single col)  │
│ FOOTER                   │
├──────────────────────────┤
│ [ ◉ WhatsApp ][Get Quote]│ fixed bottom bar, safe-area aware;
└──────────────────────────┘ hides while the quote form is on screen

Menu (☰): full-screen ivory sheet, large serif links,
WhatsApp + phone + Instagram at the bottom, focus-trapped, Esc/close.
```

The hero CTAs are **not repeated** inside the mobile hero — the fixed bottom bar carries them, giving the photo more room above the fold.

---

## 6. Design direction — "The Print Studio"

The site should feel like a **specimen book from a fine print studio**: warm paper, black ink, a single foil-gold accent. Luxury comes from restraint.

- **Paper & ink**: ivory backgrounds as "stock", black as "ink"; one full-black section (Services) for rhythm.
- **Printer's details** used sparingly as brand signature: section numbers (`01 —`), hairline rules like crop marks, small-caps labels. No fake textures, no gradients, no glow.
- **Photography is the hero**: large, generous crops, minimal overlays, square-ish corners (2px) like trimmed paper.
- **Editorial layouts**: asymmetric grids, left-aligned text, numbered lists instead of repetitive icon-card grids.
- **Gold = foil stamp**: used for numerals, rules, focus rings and a few hover states — never large fills.

## 7. Typography

| Option | Verdict |
|---|---|
| Playfair Display + Manrope | Heavily overused on template sites; Playfair's high contrast gets heavy in bold. Rejected. |
| Cormorant Garamond + Inter | Beautiful large, but thin and hard to read at mobile sizes; Inter feels SaaS. Rejected. |
| **Instrument Serif + DM Sans** | **Recommended.** Instrument Serif is condensed, editorial and contemporary — reads like a print-studio masthead and fits long headlines on 320px screens. DM Sans is clean, warm, very readable at 14–16px. |

Scale (fluid, `clamp()`), mobile → desktop:

| Token | Size | Font |
|---|---|---|
| display | 44 → 96px, line-height 0.95 | Instrument Serif |
| h2 | 36 → 64px | Instrument Serif |
| h3 | 24 → 32px | Instrument Serif |
| body-lg | 18 → 20px | DM Sans 400 |
| body | 16px, line-height 1.6 | DM Sans 400 |
| label | 12 → 13px, uppercase, tracking 0.14em | DM Sans 500 |
| button | 15px, 500 | DM Sans |

## 8. Colour system (contrast-checked)

| Token | Hex | Use | Contrast |
|---|---|---|---|
| `paper` | `#F7F5F0` | main background | — |
| `paper-deep` | `#EFEBE2` | alternate section, image placeholders | — |
| `ink` | `#111111` | primary buttons, dark section bg | — |
| `ink-soft` | `#1C1C1C` | cards/rows on dark | — |
| `text` | `#242424` | body text on paper | 14.3:1 ✅ |
| `muted` | **`#6B675F`** | secondary text on paper | 5.2:1 ✅ (brief's `#77736B` = 4.3:1, fails AA — darkened) |
| `gold` | `#C8A96B` | accents **on ink only**, rules, focus ring | 8.4:1 on ink ✅ / 2.1:1 on paper ❌ (decorative only there) |
| `gold-deep` | **`#7A5E2E`** | gold text/numerals on paper | 5.6:1 ✅ (brief's `#9E7C42` = 3.6:1, large text only) |
| `line` | `#111111` @ 12% | hairline rules | — |
| `whatsapp` | `#1F7A4D` (muted green) | WhatsApp button only — recognisable but not neon | — |

Other tokens:
- **Spacing**: 4, 8, 12, 16, 24, 32, 48, 64, 80, 96, 128. Section padding 80px mobile / 128px desktop.
- **Radius**: `0` sections, `2px` images, `999px` buttons (pill = the one soft shape on the page), `4px` inputs.
- **Shadows**: essentially none — one soft shadow for the sticky header and lightbox only.
- **Container**: 1320px max, gutters 16 / 24 / 48px.
- **Breakpoints**: 480, 768, 1024, 1280, 1536.
- **Motion**: 200ms (UI), 600ms `cubic-bezier(.2,.7,.2,1)` (reveals); reveals = 16px rise + fade, once; images scale 1.03 on hover; all disabled under `prefers-reduced-motion`.
- **Focus**: 2px gold-deep outline, 3px offset, always visible on keyboard focus.

## 9. Component architecture

```
src/
  app/
    layout.tsx          fonts, metadata, LocalBusiness JSON-LD
    page.tsx            composes sections only
    opengraph-image     OG image from a real photo
    sitemap.ts, robots.ts
  content/              single source of truth (typed)
    site.ts             name, phone, email, instagram, city, WhatsApp builder
    services.ts         8 services: slug, title, blurb, images
    portfolio.ts        photo list: src, alt, category, orientation, featured
  lib/whatsapp.ts       buildWhatsAppUrl(service?, details?) → wa.me/923711210703?text=…
  components/
    ui/        Container, Button (primary|secondary|ghost|whatsapp), SectionHeading,
               Badge, Divider, Reveal (IntersectionObserver), ImageWithFallback
    layout/    Navbar, MobileMenu, MobileCtaBar, Footer
    sections/  Hero, ServiceStrip, PortfolioGallery (+ PortfolioItem, Lightbox),
               Services (+ ServiceFeature, ServiceRow), WhyUs, ProcessSteps,
               QuoteSection (+ QuoteForm), ContactDetails
```

Only Navbar/MobileMenu, MobileCtaBar, PortfolioGallery/Lightbox, QuoteForm and Reveal are client components; everything else is server-rendered HTML.

**WhatsApp message** (kept short):
```
Hi Khan Printers, I'd like a quote.
Service: Business Cards
Quantity: 500
Name: …
Details: …
```
From the plain WhatsApp button: `Hi Khan Printers, I would like to get a quote for printing. My requirement is: `

## 10. Figma workflow

Figma MCP is connected in this environment. Plan, once you approve this direction:
1. Create file **"Khan Printers — Website v1"** with pages: `Tokens`, `Components`, `Desktop 1440`, `Mobile 390`.
2. Tokens as Figma variables (colour, spacing, radius) + text styles — same names as the code tokens.
3. Components: Button variants, Nav, Mobile menu, Mobile CTA bar, Service row/feature, Gallery tile, Lightbox, Input/Select, Process step, Footer.
4. Hi-fi desktop + mobile homepage using **your real photos** (uploaded to Figma) — no stock or AI imagery; grey labelled placeholders where a photo is missing.
5. You review the screenshots → one iteration → code implements Figma 1:1.

## 11. Asset & information requirements (what I need from you)

**Required before implementation**
1. **Logo** — SVG or AI/PDF preferred; otherwise the highest-resolution PNG. Also tell me if there is an official brand colour already on your cards/signage.
2. **Original photos** — ideally 20–40, at full resolution (straight from the phone, not WhatsApp-compressed; WhatsApp strips quality). Per service, 2–5 shots each:
   - Business / visiting cards · Stickers & labels · Wedding & invitation cards · Brochures & flyers · Books & registers · Branded paper / shopping bags · Banners / pana flex · Any custom work
   - Most valuable for the hero: a clean, well-lit, **landscape or 4:5** close-up of premium work (e.g. a fanned stack of business cards, a foil invitation) on a plain surface.
   - A few shots of the shop / machines / process, if you have them (strong trust signal).
3. **Permission check** — confirm you have the right to show each client's printed design publicly (some clients may not want their brand shown).

**Please confirm (I will not invent these)**
4. Is `03711210703` on **WhatsApp Business**, and should calls also go to it?
5. Instagram URL: `instagram.com/khanprinterservices` — correct?
6. Exact area/address in Karachi, and whether you want it shown (enables a map + stronger local SEO). Until then: "Karachi, Pakistan".
7. Business hours (optional — useful for Google and the contact section).
8. Do you deliver across Karachi / Pakistan, or pickup only? (Affects step 05 wording: "Collect" vs "Delivered".)
9. Which "Why Us" claims are true for you: premium quality · in-house design support · affordable prices · fast turnaround · custom sizes/orders · low minimum quantities?
10. Domain name (e.g. `khanprinters.pk`) — for canonical URLs, OG tags and schema.
11. Quote form: WhatsApp-only is the v1 default. Do you also want an email copy of each lead? (That is the point where n8n or a form service becomes worthwhile — not before.)

## 12. Implementation plan

| Phase | Output | Gate |
|---|---|---|
| 1–4 Discovery, UX, wireframes, design system | this document | **you approve direction** ← we are here |
| 5 Figma | tokens, components, desktop + mobile hi-fi | you approve screens |
| 6 Scaffold | Next.js + TS + Tailwind, tokens, fonts, content files, WhatsApp util | builds clean |
| 6 Build | layout → hero → strip → gallery/lightbox → services → why → process → quote → footer | — |
| 7 Responsive | review at 320/375/390/430/768/1024/1280/1440/1920 | no overflow, screenshots |
| 8 Interaction | hover/focus/active, reveals, menu, lightbox keyboard + swipe, form validation | — |
| 9 Performance | AVIF/WebP, sizes, priority hero, font subsetting, CLS 0 | Lighthouse ≥ 95 mobile |
| 10 Accessibility | keyboard pass, contrast, labels, `aria` on menu/dialog, reduced motion | axe: 0 violations |
| 11 SEO | title/meta/OG, LocalBusiness JSON-LD (only confirmed fields), sitemap, alt text | — |
| 12 Visual + conversion QA | critique pass against brief §40–42, second refinement pass | your sign-off → deploy |

Image handling: originals stay untouched in `/assets-original` (not committed if large; kept outside `public/`), optimised derivatives are generated into `public/images/…` with a documented crop per image.
