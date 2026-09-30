import { media, type Media } from "./media";

export type Service = {
  slug: string;
  title: string;
  /** Very short label for menus and the marquee. */
  short: string;
  description: string;
  /** Who typically orders this — describes customers, not capabilities. */
  perfectFor: string[];
  image?: Media;
};

/** Confirmed services only (client list, Sep 2026). Order = display order. */
export const services: Service[] = [
  {
    slug: "stickers-labels",
    title: "Stickers & Labels",
    short: "Stickers & Labels",
    description: "Product labels, logo stickers, sheets and rolls for packaging, jars, bottles and more.",
    perfectFor: ["Food & home brands", "Online stores", "Cafés & bakeries", "Product packaging"],
    image: media.stickersLabels,
  },
  {
    slug: "business-cards",
    title: "Business / Visiting Cards",
    short: "Business Cards",
    description: "Visiting cards that feel as professional as your business — in the finish and quantity you need.",
    perfectFor: ["Business owners", "Sales teams", "Freelancers", "Shops & showrooms"],
  },
  {
    slug: "wedding-invitations",
    title: "Wedding & Invitation Cards",
    short: "Invitations",
    description: "Wedding cards and event invitations, printed with care for the occasions that matter most.",
    perfectFor: ["Weddings", "Nikah & walima", "Birthdays", "Corporate events"],
    image: media.weddingSuite,
  },
  {
    slug: "brochures-flyers",
    title: "Brochures & Flyers",
    short: "Brochures & Flyers",
    description: "Folded brochures and flyers that present your business clearly and look sharp in hand.",
    perfectFor: ["Launches & promotions", "Schools & clinics", "Real estate", "Restaurants"],
    image: media.brochureTrifold,
  },
  {
    slug: "books-registers",
    title: "Books & Registers",
    short: "Books & Registers",
    description: "Custom registers, books and record pads printed and bound for everyday business use.",
    perfectFor: ["Offices", "Schools", "Shops & warehouses", "Clinics"],
  },
  {
    slug: "branded-bags",
    title: "Branded Paper & Shopping Bags",
    short: "Branded Bags",
    description: "Shopping bags and wrapping paper printed with your logo — packaging that carries your brand.",
    perfectFor: ["Boutiques", "Bakeries & cafés", "Gift shops", "Online brands"],
    image: media.shoppingBags,
  },
  {
    slug: "banners",
    title: "Banners & Pana Flex",
    short: "Banners & Pana Flex",
    description: "Roll-up banners, shop boards and large pana flex prints that are seen from a distance.",
    perfectFor: ["Shop fronts", "Events & exhibitions", "Promotions", "Real estate"],
    image: media.rollupBanners,
  },
];

export function getService(slug: string | null | undefined) {
  return services.find((s) => s.slug === slug);
}

export const serviceHref = (slug: string) => `/services/${slug}`;
