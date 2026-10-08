import type { MetadataRoute } from "next";

import { siteUrl } from "@/lib/seo";

// Single-page site: About, Work, Experience, Services and Contact are #fragments of "/",
// not routes (search engines ignore fragments), so the canonical home URL is the only entry.
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
