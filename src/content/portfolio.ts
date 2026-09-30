import { media, type Media } from "./media";

export type PortfolioItem = Media & {
  id: string;
  category: string;
  /** Service this work belongs to (used on service pages). */
  service: string;
  /** Grid footprint on desktop. */
  layout: "feature" | "tall" | "third" | "wide" | "half" | "full";
};

/**
 * Gallery order is deliberate: strongest image first, then alternate
 * categories and orientations to keep the grid rhythmic.
 */
export const portfolio: PortfolioItem[] = [
  { id: "wedding-suite", service: "wedding-invitations", category: "Invitations", layout: "feature", ...media.weddingSuite },
  { id: "wrapping-paper", service: "branded-bags", category: "Branded Paper", layout: "tall", ...media.wrappingPaper },
  { id: "stickers", service: "stickers-labels", category: "Stickers & Labels", layout: "third", ...media.stickersLabels },
  { id: "rollup-banners", service: "banners", category: "Banners", layout: "wide", ...media.rollupBanners },
  { id: "shopping-bags", service: "branded-bags", category: "Shopping Bags", layout: "half", ...media.shoppingBags },
  { id: "brochure", service: "brochures-flyers", category: "Brochures", layout: "half", ...media.brochureTrifold },
  { id: "panaflex-restaurant", service: "banners", category: "Pana Flex", layout: "half", ...media.panaflexRestaurant },
  { id: "panaflex-fashion", service: "banners", category: "Pana Flex", layout: "half", ...media.panaflexFashion },
];

export const portfolioHasSamples = portfolio.some((item) => item.sample);
