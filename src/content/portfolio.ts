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
  { id: "wedding-cards", service: "wedding-invitations", category: "Wedding Cards", layout: "feature", ...media.weddingCards },
  { id: "cards-gold-geometric", service: "business-cards", category: "Visiting Cards", layout: "tall", ...media.cardsGoldGeometric },
  { id: "stickers", service: "stickers-labels", category: "Stickers & Labels", layout: "third", ...media.stickersLabels },
  { id: "rollup-banners", service: "banners", category: "Banners", layout: "wide", ...media.rollupBanners },
  { id: "cards-gold-diagonal", service: "business-cards", category: "Visiting Cards", layout: "half", ...media.cardsGoldDiagonal },
  { id: "shopping-bags", service: "branded-bags", category: "Shopping Bags", layout: "half", ...media.shoppingBags },
  { id: "wrapping-paper", service: "branded-bags", category: "Branded Paper", layout: "half", ...media.wrappingPaper },
  { id: "cards-navy", service: "business-cards", category: "Visiting Cards", layout: "half", ...media.cardsNavy },
];

export const portfolioHasSamples = portfolio.some((item) => item.sample);
