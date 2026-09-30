import type { StaticImageData } from "next/image";

import stickersLabels from "@/assets/images/stickers-labels.jpg";
import brochureTrifold from "@/assets/images/brochure-trifold.jpg";
import weddingSuite from "@/assets/images/wedding-invitation-suite.jpg";
import wrappingPaper from "@/assets/images/branded-wrapping-paper.jpg";
import shoppingBags from "@/assets/images/branded-shopping-bags.jpg";
import rollupBanners from "@/assets/images/rollup-banners.jpg";
import panaflexFashion from "@/assets/images/panaflex-fashion.jpg";
import panaflexRestaurant from "@/assets/images/panaflex-restaurant.jpg";

export type Media = {
  src: StaticImageData;
  alt: string;
  /**
   * true = illustrative sample, NOT a photo of real Khan Printers work.
   * Rendered with a visible "Sample image" label. Set to false only for
   * original photos supplied by the client.
   */
  sample: boolean;
};

export const media = {
  stickersLabels: {
    src: stickersLabels,
    alt: "Printed sticker sheets, roll labels, product jar labels and kraft hang tags on a wooden table",
    sample: true,
  },
  brochureTrifold: {
    src: brochureTrifold,
    alt: "Tri-fold travel brochure shown folded and opened flat",
    sample: true,
  },
  weddingSuite: {
    src: weddingSuite,
    alt: "Wedding invitation suite with maroon folder, gold tassel, floral invitation card, reception card and RSVP card",
    sample: true,
  },
  wrappingPaper: {
    src: wrappingPaper,
    alt: "Logo-printed wrapping paper in white, pink, green and black with a wrapped gift box",
    sample: true,
  },
  shoppingBags: {
    src: shoppingBags,
    alt: "Four branded paper shopping bags in kraft, black, white and green with rope handles",
    sample: true,
  },
  rollupBanners: {
    src: rollupBanners,
    alt: "Four printed roll-up banner stands for different businesses",
    sample: true,
  },
  panaflexFashion: {
    src: panaflexFashion,
    alt: "Large outdoor pana flex billboard for a fashion store",
    sample: true,
  },
  panaflexRestaurant: {
    src: panaflexRestaurant,
    alt: "Large outdoor pana flex billboard for a restaurant",
    sample: true,
  },
} satisfies Record<string, Media>;
