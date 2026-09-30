import type { MetadataRoute } from "next";

import { serviceHref, services } from "@/content/services";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, changeFrequency: "monthly", priority: 1 },
    ...services.map((s) => ({
      url: `${site.url}${serviceHref(s.slug)}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
