/**
 * Single source of truth for confirmed business facts.
 * Only add information the client has confirmed — never invent details.
 */
export const site = {
  name: "Khan Printers",
  tagline: "Premium Printing Solutions in Karachi",
  description:
    "Business cards, stickers, brochures, wedding cards, banners, registers and branded packaging — professionally printed in Karachi. Get a quote on WhatsApp.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",

  phone: {
    display: "0371 1210703",
    tel: "+923711210703",
  },
  /** International format without "+" for wa.me links. */
  whatsapp: "923711210703",
  email: "khanprinters45@gmail.com",
  instagram: {
    handle: "@khanprinterservices",
    url: "https://www.instagram.com/khanprinterservices",
  },
  location: {
    city: "Karachi",
    country: "Pakistan",
    countryCode: "PK",
    /** Full street address pending from client. */
    street: null as string | null,
  },
  /** Days not yet confirmed — do not add to structured data until they are. */
  hours: "9 AM – 9 PM",
  fulfilment: "Pickup or delivery",
} as const;

/** Section links. Absolute ("/#…") so they work from every page. */
export const navLinks = [
  { href: "/#work", label: "Our Work" },
  { href: "/#why", label: "Why Us" },
  { href: "/#faq", label: "FAQ" },
  { href: "/#contact", label: "Contact" },
] as const;
