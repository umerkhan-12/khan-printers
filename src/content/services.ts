import { media, type Media } from "./media";

export type Service = {
  slug: string;
  title: string;
  /** Very short label for chips / the service strip. */
  short: string;
  description: string;
  image?: Media;
};

/** Confirmed services only. Order = display order. */
export const services: Service[] = [
  {
    slug: "business-cards",
    title: "Business / Visiting Cards",
    short: "Business Cards",
    description: "Visiting cards that feel as professional as your business — in the finish and quantity you need.",
  },
  {
    slug: "stickers-labels",
    title: "Stickers & Labels",
    short: "Stickers & Labels",
    description: "Product labels, logo stickers, sheets and rolls for packaging, jars, bottles and more.",
    image: media.stickersLabels,
  },
  {
    slug: "wedding-invitations",
    title: "Wedding & Invitation Cards",
    short: "Invitations",
    description: "Wedding cards and event invitations, printed with care for the occasions that matter most.",
    image: media.weddingSuite,
  },
  {
    slug: "brochures-flyers",
    title: "Brochures & Flyers",
    short: "Brochures & Flyers",
    description: "Folded brochures and flyers that present your business clearly and look sharp in hand.",
    image: media.brochureTrifold,
  },
  {
    slug: "books-registers",
    title: "Books & Registers",
    short: "Books & Registers",
    description: "Custom registers, books and record pads printed and bound for everyday business use.",
  },
  {
    slug: "branded-bags",
    title: "Branded Paper & Shopping Bags",
    short: "Branded Bags",
    description: "Shopping bags and wrapping paper printed with your logo — packaging that carries your brand.",
    image: media.shoppingBags,
  },
  {
    slug: "banners",
    title: "Banners & Pana Flex",
    short: "Banners & Pana Flex",
    description: "Roll-up banners, shop boards and large pana flex prints that are seen from a distance.",
    image: media.rollupBanners,
  },
  {
    slug: "custom-printing",
    title: "Custom Printing",
    short: "Custom Printing",
    description: "Have something else in mind? Tell us what you need and we’ll tell you how we can print it.",
  },
];

/** The service shown as the large editorial feature. */
export const featuredServiceSlug = "stickers-labels";

export function getService(slug: string | null | undefined) {
  return services.find((s) => s.slug === slug);
}
