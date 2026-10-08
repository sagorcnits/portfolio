import type { MetadataRoute } from "next";

import { siteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // None of these exist today; listed so future internal routes stay unindexed.
      disallow: ["/api/", "/admin/", "/dashboard/"],
    },
    sitemap: new URL("/sitemap.xml", siteUrl).toString(),
  };
}
