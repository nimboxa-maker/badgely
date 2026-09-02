import type { Metadata } from "next";
import { cache } from "react";
import { createClient } from "@/lib/supabase/server";

interface CareerPathLayoutProps {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");

const getCareerPath = cache(async (slug: string) => {
  const supabase = await createClient();
  const { data: careerPath } = await supabase
    .from("career_paths")
    .select(
      "id, name, slug, short_summary, target_role, audience_level, seo_title, seo_description",
    )
    .eq("slug", slug)
    .maybeSingle();

  if (!careerPath) {
    return null;
  }

  const { data: steps } = await supabase
    .from("career_path_steps")
    .select("title, display_order, certifications(name, slug)")
    .eq("career_path_id", careerPath.id)
    .order("display_order", { ascending: true });

  return {
    careerPath,
    steps: steps ?? [],
  };
});

export async function generateMetadata({
  params,
}: Omit<CareerPathLayoutProps, "children">): Promise<Metadata> {
  const { slug } = await params;
  const record = await getCareerPath(slug);

  if (!record) {
    return {};
  }

  const { careerPath } = record;
  const title = careerPath.seo_title ?? `${careerPath.name} Career Path | Badgely`;
  const description = careerPath.seo_description ?? careerPath.short_summary;
  const canonicalUrl = `${siteUrl}/career-paths/${careerPath.slug}`;

  return {
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "website",
      siteName: "Badgely",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

export default async function CareerPathLayout({
  children,
  params,
}: CareerPathLayoutProps) {
  const { slug } = await params;
  const record = await getCareerPath(slug);

  if (!record) {
    return children;
  }

  const { careerPath, steps } = record;
  const pageUrl = `${siteUrl}/career-paths/${careerPath.slug}`;

  const itemList = steps.map((step, index) => {
    const certification = Array.isArray(step.certifications)
      ? step.certifications[0]
      : step.certifications;

    return {
      "@type": "ListItem",
      position: index + 1,
      name: step.title,
      item: certification
        ? {
            "@type": "EducationalOccupationalCredential",
            name: certification.name,
            url: `${siteUrl}/certifications/${certification.slug}`,
          }
        : {
            "@type": "Thing",
            name: step.title,
          },
    };
  });

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Badgely",
            item: siteUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "IT Career Paths",
            item: `${siteUrl}/career-paths`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: careerPath.name,
            item: pageUrl,
          },
        ],
      },
      {
        "@type": "CollectionPage",
        name: careerPath.seo_title ?? careerPath.name,
        description: careerPath.seo_description ?? careerPath.short_summary,
        url: pageUrl,
        about: careerPath.target_role
          ? {
              "@type": "Occupation",
              name: careerPath.target_role,
            }
          : undefined,
      },
      {
        "@type": "ItemList",
        name: `${careerPath.name} roadmap steps`,
        numberOfItems: itemList.length,
        itemListOrder: "https://schema.org/ItemListOrderAscending",
        itemListElement: itemList,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {children}
    </>
  );
}
