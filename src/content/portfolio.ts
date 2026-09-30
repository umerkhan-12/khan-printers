import { media, type Media } from "./media";

export type PortfolioItem = Media & {
  id: string;
  category: string;
  /** Grid footprint on desktop. */
  layout: "feature" | "tall" | "third" | "wide" | "half";
};

/**
 * Gallery order is deliberate: strongest image first, then alternate
 * categories and orientations to keep the grid rhythmic.
 */
export const portfolio: PortfolioItem[] = [
  { id: "wedding-suite", category: "Invitations", layout: "feature", ...media.weddingSuite },
  { id: "wrapping-paper", category: "Branded Paper", layout: "tall", ...media.wrappingPaper },
  { id: "stickers", category: "Stickers & Labels", layout: "third", ...media.stickersLabels },
  { id: "rollup-banners", category: "Banners", layout: "wide", ...media.rollupBanners },
  { id: "shopping-bags", category: "Shopping Bags", layout: "half", ...media.shoppingBags },
  { id: "brochure", category: "Brochures", layout: "half", ...media.brochureTrifold },
  { id: "panaflex-restaurant", category: "Pana Flex", layout: "half", ...media.panaflexRestaurant },
  { id: "panaflex-fashion", category: "Pana Flex", layout: "half", ...media.panaflexFashion },
];

export const portfolioHasSamples = portfolio.some((item) => item.sample);
