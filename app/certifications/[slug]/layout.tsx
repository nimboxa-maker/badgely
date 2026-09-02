import type { Metadata } from "next";
import { cache } from "react";
import { createClient } from "@/lib/supabase/server";

interface CertificationLayoutProps {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");

const getCertification = cache(async (slug: string) => {
  const supabase = await createClient();
  const { data } = await supabase
    .from("certifications")
    .select(
      "name, slug, category, level, short_summary, seo_title, seo_description, official_certification_url, providers(name)",
    )
    .eq("slug", slug)
    .maybeSingle();

  return data;
});

export async function generateMetadata({
  params,
}: Omit<CertificationLayoutProps, "children">): Promise<Metadata> {
  const { slug } = await params;
  const certification = await getCertification(slug);

  if (!certification) {
    return {};
  }

  const title = certification.seo_title ?? `${certification.name} | Badgely`;
  const description = certification.seo_description ?? certification.short_summary;
  const canonicalUrl = `${siteUrl}/certifications/${certification.slug}`;

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

export default async function CertificationLayout({
  children,
  params,
}: CertificationLayoutProps) {
  const { slug } = await params;
  const certification = await getCertification(slug);

  if (!certification) {
    return children;
  }

  const provider = Array.isArray(certification.providers)
    ? certification.providers[0]?.name
    : certification.providers?.name;
  const pageUrl = `${siteUrl}/certifications/${certification.slug}`;

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
            name: "IT Certifications",
            item: `${siteUrl}/certifications`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: certification.name,
            item: pageUrl,
          },
        ],
      },
      {
        "@type": "EducationalOccupationalCredential",
        name: certification.name,
        description: certification.seo_description ?? certification.short_summary,
        credentialCategory: "Professional certification",
        educationalLevel: certification.level,
        url: pageUrl,
        sameAs: certification.official_certification_url ?? undefined,
        recognizedBy: provider
          ? {
              "@type": "Organization",
              name: provider,
            }
          : undefined,
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
