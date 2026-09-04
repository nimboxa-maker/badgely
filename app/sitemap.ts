import type { MetadataRoute } from "next";
import { createClient } from "@supabase/supabase-js";
import { certificationCategories } from "@/lib/certification-categories";
import type { Database } from "@/lib/supabase/database";

const siteUrl = "https://badgely-alpha.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/certifications`,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/career-paths`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/proctoring-services`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/study-store`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/courses`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/guides`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/guides/is-security-plus-worth-it`,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${siteUrl}/guides/ccna-vs-network-plus`,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${siteUrl}/guides/security-plus-vs-sscp`,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${siteUrl}/guides/cissp-vs-cism`,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${siteUrl}/guides/best-cybersecurity-certifications`,
      changeFrequency: "monthly",
      priority: 0.85,
    },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = certificationCategories.map((category) => ({
    url: `${siteUrl}/certifications/${category.slug}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const fallbackRoutes = [...staticRoutes, ...categoryRoutes];
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabasePublishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabasePublishableKey) {
    return fallbackRoutes;
  }

  try {
    const supabase = createClient<Database>(supabaseUrl, supabasePublishableKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });

    const [certificationsResult, careerPathsResult] = await Promise.all([
      supabase
        .from("certifications")
        .select("slug, updated_at")
        .eq("status", "Active")
        .order("slug"),
      supabase.from("career_paths").select("slug, updated_at").order("slug"),
    ]);

    if (certificationsResult.error || careerPathsResult.error) {
      return fallbackRoutes;
    }

    const certificationRoutes: MetadataRoute.Sitemap = (certificationsResult.data ?? []).map(
      (certification) => ({
        url: `${siteUrl}/certifications/${certification.slug}`,
        ...(certification.updated_at ? { lastModified: certification.updated_at } : {}),
        changeFrequency: "weekly",
        priority: 0.8,
      }),
    );

    const careerPathRoutes: MetadataRoute.Sitemap = (careerPathsResult.data ?? []).map((path) => ({
      url: `${siteUrl}/career-paths/${path.slug}`,
      ...(path.updated_at ? { lastModified: path.updated_at } : {}),
      changeFrequency: "weekly",
      priority: 0.7,
    }));

    return [
      ...staticRoutes,
      ...categoryRoutes,
      ...certificationRoutes,
      ...careerPathRoutes,
    ];
  } catch {
    return fallbackRoutes;
  }
}
