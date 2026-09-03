import type { MetadataRoute } from "next";

const siteUrl = "https://badgely-alpha.vercel.app";

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
