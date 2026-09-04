import type { Metadata } from "next";
import Link from "next/link";
import { cache } from "react";
import { createClient } from "@/lib/supabase/server";

interface CertificationLayoutProps {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://badgely-alpha.vercel.app"
).replace(/\/$/, "");

const categoryRoutes: Record<string, string> = {
  Cloud: "cloud",
  Cybersecurity: "cybersecurity",
  Data: "data",
  DevOps: "devops",
  "GRC and Audit": "grc-and-audit",
  Infrastructure: "infrastructure",
  "IT Support": "it-support",
  Linux: "linux",
  Networking: "networking",
  "Project Management": "project-management",
};

const guidesByCertificationSlug: Record<string, Array<{ href: string; label: string }>> = {
  "comptia-security-plus": [
    {
      href: "/guides/is-security-plus-worth-it",
      label: "Is Security+ worth it in 2026?",
    },
    {
      href: "/guides/security-plus-vs-sscp",
      label: "Security+ vs SSCP: which should you choose?",
    },
  ],
  "isc2-sscp": [
    {
      href: "/guides/security-plus-vs-sscp",
      label: "Security+ vs SSCP: which should you choose?",
    },
  ],
  "cisco-ccna": [
    {
      href: "/guides/ccna-vs-network-plus",
      label: "CCNA vs Network+: which should you choose?",
    },
  ],
  "comptia-network-plus": [
    {
      href: "/guides/ccna-vs-network-plus",
      label: "CCNA vs Network+: which should you choose?",
    },
  ],
  "isc2-cissp": [
    {
      href: "/guides/cissp-vs-cism",
      label: "CISSP vs CISM: which should you choose?",
    },
  ],
  "isaca-cism": [
    {
      href: "/guides/cissp-vs-cism",
      label: "CISSP vs CISM: which should you choose?",
    },
  ],
};

const getCertification = cache(async (slug: string) => {
  const supabase = await createClient();
  const { data } = await supabase
    .from("certifications")
    .select(
      "id, name, slug, category, level, short_summary, seo_title, seo_description, official_certification_url, providers(name)",
    )
    .eq("slug", slug)
    .maybeSingle();

  return data;
});

const getRelatedCareerPaths = cache(async (certificationId: string) => {
  const supabase = await createClient();
  const { data: memberships } = await supabase
    .from("career_path_steps")
    .select("career_path_id")
    .eq("certification_id", certificationId);

  const pathIds = [
    ...new Set((memberships ?? []).map((membership) => membership.career_path_id)),
  ];

  if (!pathIds.length) {
    return [];
  }

  const { data } = await supabase
    .from("career_paths")
    .select("name, slug")
    .in("id", pathIds)
    .order("name")
    .limit(3);

  return data ?? [];
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
  const relatedCareerPaths = await getRelatedCareerPaths(certification.id);
  const categoryRoute = categoryRoutes[certification.category];
  const categoryHref = categoryRoute
    ? `/certifications/${categoryRoute}`
    : `/certifications?category=${encodeURIComponent(certification.category)}`;
  const categoryGuides =
    certification.category === "Cybersecurity"
      ? [
          {
            href: "/guides/best-cybersecurity-certifications",
            label: "Best cybersecurity certifications in 2026",
          },
        ]
      : [];
  const guides = [
    ...(guidesByCertificationSlug[certification.slug] ?? []),
    ...categoryGuides,
  ];

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
            name: certification.category,
            item: `${siteUrl}${categoryHref}`,
          },
          {
            "@type": "ListItem",
            position: 4,
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

      <div className="mx-auto w-full max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <section
          aria-labelledby="explore-more-heading"
          className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
        >
          <h2
            id="explore-more-heading"
            className="text-2xl font-bold tracking-tight text-slate-950"
          >
            Keep exploring on Badgely
          </h2>
          <p className="mt-2 max-w-3xl leading-7 text-slate-600">
            Connect this certification to its broader technology area, career roadmaps, training,
            and study resources.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {guides.map((guide) => (
              <Link
                key={guide.href}
                href={guide.href}
                className="rounded-2xl border border-blue-200 bg-blue-50 p-4 transition hover:border-blue-400 hover:bg-blue-100"
              >
                <p className="text-sm font-semibold text-blue-700">Badgely Guide</p>
                <p className="mt-1 font-bold text-slate-950">{guide.label}</p>
              </Link>
            ))}

            <Link
              href={categoryHref}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-blue-300 hover:bg-blue-50"
            >
              <p className="text-sm font-semibold text-blue-700">Certification category</p>
              <p className="mt-1 font-bold text-slate-950">
                Browse {certification.category}
              </p>
            </Link>

            {relatedCareerPaths.length ? (
              relatedCareerPaths.slice(0, 1).map((path) => (
                <Link
                  key={path.slug}
                  href={`/career-paths/${path.slug}`}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-blue-300 hover:bg-blue-50"
                >
                  <p className="text-sm font-semibold text-blue-700">Related career roadmap</p>
                  <p className="mt-1 font-bold text-slate-950">{path.name}</p>
                </Link>
              ))
            ) : (
              <Link
                href="/career-paths"
                className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-blue-300 hover:bg-blue-50"
              >
                <p className="text-sm font-semibold text-blue-700">Career roadmaps</p>
                <p className="mt-1 font-bold text-slate-950">Explore IT career paths</p>
              </Link>
            )}

            <Link
              href="/courses"
              className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-blue-300 hover:bg-blue-50"
            >
              <p className="text-sm font-semibold text-blue-700">Training</p>
              <p className="mt-1 font-bold text-slate-950">Compare courses & providers</p>
            </Link>

            <Link
              href="/study-store"
              className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-blue-300 hover:bg-blue-50"
            >
              <p className="text-sm font-semibold text-blue-700">Study resources</p>
              <p className="mt-1 font-bold text-slate-950">Find books & study material</p>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
