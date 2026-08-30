import type { MetadataRoute } from "next";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin/",
        "/auth/",
        "/dashboard",
        "/forgot-password",
        "/sign-in",
        "/sign-up",
        "/study-plans/",
        "/update-password",
      ],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
