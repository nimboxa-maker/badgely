import type { MetadataRoute } from "next";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/supabase/database";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");

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
      url: `${siteUrl}/compare`,
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabasePublishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabasePublishableKey) {
    return staticRoutes;
  }

  const supabase = createClient<Database>(supabaseUrl, supabasePublishableKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });

  const [certificationsResult, careerPathsResult] = await Promise.all([
    supabase.from("certifications").select("slug, updated_at").eq("status", "Active").order("slug"),
    supabase.from("career_paths").select("slug, updated_at").order("slug"),
  ]);

  if (certificationsResult.error || careerPathsResult.error) {
    return staticRoutes;
  }

  const certificationRoutes: MetadataRoute.Sitemap = (certificationsResult.data ?? []).map(
    (certification) => ({
      url: `${siteUrl}/certifications/${certification.slug}`,
      lastModified: certification.updated_at,
      changeFrequency: "weekly",
      priority: 0.8,
    }),
  );

  const careerPathRoutes: MetadataRoute.Sitemap = (careerPathsResult.data ?? []).map((path) => ({
    url: `${siteUrl}/career-paths/${path.slug}`,
    lastModified: path.updated_at,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...certificationRoutes, ...careerPathRoutes];
}
