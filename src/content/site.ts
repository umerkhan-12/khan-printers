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
    /** Client's Google Maps share link (opens the exact business listing). */
    mapUrl: "https://share.google/8DY42naEGRtLBWf99",
    /** Google Maps embed URL supplied by the client ("Share → Embed a map" → src). */
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3620.2465936073736!2d67.01122769999999!3d24.8554261!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33e0f835cd10f%3A0x556214787e929de5!2sMowloo%20Juma%20Hospital!5e0!3m2!1sen!2s!4v1790792095879!5m2!1sen!2s" as
        | string
        | null,
  },
  /** Client-confirmed: Monday–Saturday 9 AM – 9 PM, Sunday closed. */
  hours: "Mon – Sat, 9 AM – 9 PM",
  closed: "Sunday closed",
  fulfilment: "Pickup or delivery",
} as const;

/** Section links. Absolute ("/#…") so they work from every page. */
export const navLinks = [
  { href: "/#work", label: "Our Work" },
  { href: "/#why", label: "Why Us" },
  { href: "/#faq", label: "FAQ" },
  { href: "/#contact", label: "Contact" },
] as const;
