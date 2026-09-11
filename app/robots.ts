import type { MetadataRoute } from "next";

const siteUrl = "https://AimToCert.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/sign-in"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}