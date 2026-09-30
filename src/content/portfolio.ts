import { media, type Media } from "./media";

export type PortfolioItem = Media & {
  id: string;
  category: string;
  /** Service this work belongs to (used on service pages). */
  service: string;
  /** false = shown only on its product page, not in the home gallery. */
  showOnHome?: boolean;
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
  { id: "shopping-bags", service: "branded-bags", category: "Shopping Bags", layout: "half", ...media.shoppingBags },
  { id: "wrapping-paper", service: "branded-bags", category: "Branded Paper", layout: "half", ...media.wrappingPaper },
  // Product-page only: more visiting cards (one is enough on the home page)…
  { id: "cards-gold-diagonal", service: "business-cards", category: "Visiting Cards", layout: "half", showOnHome: false, ...media.cardsGoldDiagonal },
  { id: "cards-navy", service: "business-cards", category: "Visiting Cards", layout: "half", showOnHome: false, ...media.cardsNavy },
  // …and books & registers (smaller source images)
  ...([
    ["registers", "Registers", media.registersAttendance],
    ["office-registers", "Office Registers", media.officeRegisters],
    ["exercise-books", "Exercise Books", media.exerciseBooks],
    ["diaries", "Diaries & Planners", media.diariesPlanners],
    ["custom-books", "Custom Printed Books", media.customPrintedBooks],
    ["reference-books", "Reference Books", media.referenceBooks],
    ["story-books", "Story & Activity Books", media.storyActivityBooks],
    ["blank-books", "Blank Books & Notepads", media.blankBooksNotepads],
  ] as const).map(([id, category, m]) => ({
    id,
    service: "books-registers",
    category,
    layout: "third" as const,
    showOnHome: false,
    ...m,
  })),
];

export const homePortfolio = portfolio.filter((item) => item.showOnHome !== false);

export const portfolioHasSamples = homePortfolio.some((item) => item.sample);
