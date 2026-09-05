import type { Metadata } from "next";
import Link from "next/link";
import { cache } from "react";
import { createClient } from "@/lib/supabase/server";

interface CareerPathLayoutProps {
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
    .select("title, display_order, certifications(name, slug, category)")
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
  const title =
    careerPath.seo_title ?? `${careerPath.name} Career Path | ThirdBadge`;
  const description =
    careerPath.seo_description ?? careerPath.short_summary;
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
      siteName: "ThirdBadge",
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

  const certificationCategories = [
    ...new Set(
      steps.flatMap((step) => {
        const certification = Array.isArray(step.certifications)
          ? step.certifications[0]
          : step.certifications;

        return certification?.category ? [certification.category] : [];
      }),
    ),
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
            name: "ThirdBadge",
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
        description:
          careerPath.seo_description ?? careerPath.short_summary,
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
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      {children}

      <div className="mx-auto w-full max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <section
          aria-labelledby="career-explore-heading"
          className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
        >
          <h2
            id="career-explore-heading"
            className="text-2xl font-bold tracking-tight text-slate-950"
          >
            Continue building this career path
          </h2>

          <p className="mt-2 max-w-3xl leading-7 text-slate-600">
            Explore the certification areas used in this roadmap, then
            compare training and study resources for your next step.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {certificationCategories.slice(0, 2).map((category) => {
              const categoryRoute = categoryRoutes[category];

              const href = categoryRoute
                ? `/certifications/${categoryRoute}`
                : `/certifications?category=${encodeURIComponent(category)}`;

              return (
                <Link
                  key={category}
                  href={href}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-blue-300 hover:bg-blue-50"
                >
                  <p className="text-sm font-semibold text-blue-700">
                    Certification area
                  </p>
                  <p className="mt-1 font-bold text-slate-950">
                    Browse {category}
                  </p>
                </Link>
              );
            })}

            <Link
              href="/courses"
              className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-blue-300 hover:bg-blue-50"
            >
              <p className="text-sm font-semibold text-blue-700">
                Training
              </p>
              <p className="mt-1 font-bold text-slate-950">
                Compare courses & providers
              </p>
            </Link>

            <Link
              href="/study-store"
              className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-blue-300 hover:bg-blue-50"
            >
              <p className="text-sm font-semibold text-blue-700">
                Study resources
              </p>
              <p className="mt-1 font-bold text-slate-950">
                Find books & study material
              </p>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}