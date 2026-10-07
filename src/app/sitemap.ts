import type { MetadataRoute } from "next";

import { siteUrl } from "@/lib/seo";

// Single-page site: sections are fragments of "/", so only the canonical home URL is listed.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: new URL("/", siteUrl).toString(),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
