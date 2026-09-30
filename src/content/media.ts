import type { StaticImageData } from "next/image";

import stickersLabels from "@/assets/images/stickers-labels.jpg";
import brochureTrifold from "@/assets/images/brochure-trifold.jpg";
import weddingCards from "@/assets/images/wedding-cards-suite.jpg";
import cardsGoldDiagonal from "@/assets/images/business-cards-gold-diagonal.jpg";
import cardsGoldGeometric from "@/assets/images/business-cards-gold-geometric.jpg";
import cardsNavy from "@/assets/images/business-cards-navy.jpg";
import wrappingPaper from "@/assets/images/branded-wrapping-paper.jpg";
import shoppingBags from "@/assets/images/branded-shopping-bags.jpg";
import rollupBanners from "@/assets/images/rollup-banners.jpg";
import registersAttendance from "@/assets/images/books-registers-attendance.jpg";
import officeRegisters from "@/assets/images/books-office-registers.jpg";
import exerciseBooks from "@/assets/images/books-exercise-books.jpg";
import diariesPlanners from "@/assets/images/books-diaries-planners.jpg";
import customPrintedBooks from "@/assets/images/books-custom-printed-books.jpg";
import referenceBooks from "@/assets/images/books-reference-books.jpg";
import storyActivityBooks from "@/assets/images/books-story-activity-books.jpg";
import blankBooksNotepads from "@/assets/images/books-blank-books-notepads.jpg";

export type Media = {
  src: StaticImageData;
  alt: string;
  /**
   * true = illustrative sample the client has NOT approved as their work.
   * Rendered with a visible "Sample image" label. All current images were
   * supplied and approved by the client for use on the site (Sep 2026).
   */
  sample: boolean;
};

export const media = {
  weddingCards: {
    src: weddingCards,
    alt: "Wedding invitation cards in deep green, ivory and maroon with gold foil monograms, embossing and a matching RSVP card",
    sample: false,
  },
  cardsGoldGeometric: {
    src: cardsGoldGeometric,
    alt: "Khan Printers visiting card in black with gold geometric lines — front and back",
    sample: false,
  },
  cardsGoldDiagonal: {
    src: cardsGoldDiagonal,
    alt: "Black and gold visiting card with diagonal stripes — front and back",
    sample: false,
  },
  cardsNavy: {
    src: cardsNavy,
    alt: "Navy and blue visiting card with contact details — front and back",
    sample: false,
  },
  stickersLabels: {
    src: stickersLabels,
    alt: "Printed sticker sheets, roll labels, product jar labels and kraft hang tags on a wooden table",
    sample: false,
  },
  brochureTrifold: {
    src: brochureTrifold,
    alt: "Tri-fold brochure shown folded and opened flat",
    sample: false,
  },
  wrappingPaper: {
    src: wrappingPaper,
    alt: "Logo-printed wrapping paper in white, pink, green and black with a wrapped gift box",
    sample: false,
  },
  shoppingBags: {
    src: shoppingBags,
    alt: "Four branded paper shopping bags in kraft, black, white and green with rope handles",
    sample: false,
  },
  rollupBanners: {
    src: rollupBanners,
    alt: "Four printed roll-up banner stands",
    sample: false,
  },
  registersAttendance: {
    src: registersAttendance,
    alt: "Attendance registers in navy, maroon and green hard covers with an open ruled register",
    sample: false,
  },
  officeRegisters: {
    src: officeRegisters,
    alt: "Office registers with hard covers in green, red and black",
    sample: false,
  },
  exerciseBooks: {
    src: exerciseBooks,
    alt: "Stack of exercise books with colourful covers and a name label",
    sample: false,
  },
  diariesPlanners: {
    src: diariesPlanners,
    alt: "Daily planners and diaries in black, brown and navy covers",
    sample: false,
  },
  customPrintedBooks: {
    src: customPrintedBooks,
    alt: "Stack of custom printed books with a branded cover design",
    sample: false,
  },
  referenceBooks: {
    src: referenceBooks,
    alt: "Stack of hardbound reference books for mathematics, science, social studies and English",
    sample: false,
  },
  storyActivityBooks: {
    src: storyActivityBooks,
    alt: "Illustrated children's story and activity books",
    sample: false,
  },
  blankBooksNotepads: {
    src: blankBooksNotepads,
    alt: "Blank books and notepads with kraft and coloured covers",
    sample: false,
  },
} satisfies Record<string, Media>;
