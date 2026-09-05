import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Layers3,
  Route,
  ShieldCheck,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  HeroOption,
  HeroPanel,
  MarketingHero,
} from "@/components/layout/marketing-hero";
import { createClient } from "@/lib/supabase/server";
import {
  certificationCategories,
  type CertificationCategory,
} from "@/lib/certification-categories";

type CategoryCertification = {
  id: string;
  name: string;
  slug: string;
  short_summary: string;
  level: string;
  vendor_type: string;
  target_job_roles: string[];
  featured: boolean;
  last_verified_date: string | null;
  providers: { name: string } | { name: string }[] | null;
};

const productionSiteUrl = "https://badgely-alpha.vercel.app";

const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? productionSiteUrl
).replace(/\/$/, "");

function providerName(provider: CategoryCertification["providers"]) {
  if (Array.isArray(provider)) {
    return provider[0]?.name ?? "Certification provider";
  }

  return provider?.name ?? "Certification provider";
}

export async function CertificationCategoryPage({
  category,
}: {
  category: CertificationCategory;
}) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("certifications")
    .select(
      "id, name, slug, short_summary, level, vendor_type, target_job_roles, featured, last_verified_date, providers(name)",
    )
    .eq("status", "Active")
    .eq("category", category.name)
    .order("featured", { ascending: false })
    .order("name", { ascending: true });

  if (error) {
    throw new Error(
      `Unable to load ${category.name} certifications.`,
    );
  }

  const certifications = (data ?? []) as CategoryCertification[];

  const levels = [
    ...new Set(certifications.map((item) => item.level)),
  ];

  const targetRoles = [
    ...new Set(
      certifications.flatMap(
        (item) => item.target_job_roles ?? [],
      ),
    ),
  ];

  const providers = [
    ...new Set(
      certifications.map((item) =>
        providerName(item.providers),
      ),
    ),
  ];

  const pageUrl = `${siteUrl}/certifications/${category.slug}`;

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
            name: "IT Certifications",
            item: `${siteUrl}/certifications`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: `${category.name} Certifications`,
            item: pageUrl,
          },
        ],
      },
      {
        "@type": "CollectionPage",
        name: category.title,
        description: category.description,
        url: pageUrl,
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: certifications.length,
          itemListElement: certifications.map(
            (certification, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: certification.name,
              url: `${siteUrl}/certifications/${certification.slug}`,
            }),
          ),
        },
      },
    ],
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <MarketingHero
        aside={
          <HeroPanel>
            <h2 className="text-xl font-bold text-white">
              Category snapshot
            </h2>

            <p className="mt-1 text-sm text-slate-300">
              A quick view of the credentials currently in ThirdBadge.
            </p>

            <div className="mt-5 space-y-3">
              <HeroOption className="flex items-center gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white">
                  <BadgeCheck
                    className="size-5"
                    aria-hidden="true"
                  />
                </span>

                <div>
                  <p className="font-bold text-white">
                    {certifications.length} certifications
                  </p>

                  <p className="mt-1 text-sm text-slate-300">
                    Active records in this category.
                  </p>
                </div>
              </HeroOption>

              <HeroOption className="flex items-center gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-violet-600 text-white">
                  <Layers3
                    className="size-5"
                    aria-hidden="true"
                  />
                </span>

                <div>
                  <p className="font-bold text-white">
                    {levels.length} levels represented
                  </p>

                  <p className="mt-1 text-sm text-slate-300">
                    {levels.join(" · ")}
                  </p>
                </div>
              </HeroOption>

              <HeroOption className="flex items-center gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-600 text-white">
                  <Route
                    className="size-5"
                    aria-hidden="true"
                  />
                </span>

                <div>
                  <p className="font-bold text-white">
                    {targetRoles.length} target roles
                  </p>

                  <p className="mt-1 text-sm text-slate-300">
                    Career roles connected to these credentials.
                  </p>
                </div>
              </HeroOption>
            </div>
          </HeroPanel>
        }
      >
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-300">
          {category.eyebrow}
        </p>

        <h1 className="mt-5 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Explore {category.name}
          <span className="block bg-gradient-to-r from-blue-200 via-blue-400 to-blue-600 bg-clip-text text-transparent">
            certifications.
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
          {category.intro}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/certifications"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 font-semibold text-white hover:bg-blue-500"
          >
            Browse all certifications
            <ArrowRight
              className="size-4"
              aria-hidden="true"
            />
          </Link>

          <Link
            href="/career-paths"
            className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/20 px-5 py-2.5 font-semibold text-white hover:bg-white/10"
          >
            Explore career paths
          </Link>
        </div>
      </MarketingHero>

      <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-700">
              {category.name} catalog
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
              Compare {category.name.toLowerCase()} credentials
            </h2>

            <p className="mt-3 max-w-3xl leading-7 text-slate-600">
              Review the level, provider, career fit, and verified
              details for each certification before choosing your next
              step.
            </p>
          </div>

          <Badge>{providers.length} providers</Badge>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {certifications.map((certification) => (
            <Card
              key={certification.id}
              className="flex h-full flex-col"
            >
              <div className="flex flex-wrap items-center gap-2">
                <Badge>
                  {providerName(certification.providers)}
                </Badge>

                <Badge>{certification.level}</Badge>
                <Badge>{certification.vendor_type}</Badge>
              </div>

              <h3 className="mt-5 text-xl font-bold text-slate-950">
                {certification.name}
              </h3>

              <p className="mt-3 flex-1 leading-7 text-slate-600">
                {certification.short_summary}
              </p>

              {certification.target_job_roles?.length ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {certification.target_job_roles
                    .slice(0, 3)
                    .map((role) => (
                      <span
                        key={role}
                        className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700"
                      >
                        {role}
                      </span>
                    ))}
                </div>
              ) : null}

              <div className="mt-6 flex items-center justify-between gap-4 border-t border-slate-200 pt-4">
                <span className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500">
                  <ShieldCheck
                    className="size-4 text-blue-600"
                    aria-hidden="true"
                  />
                  Verified{" "}
                  {certification.last_verified_date ??
                    "date pending"}
                </span>

                <Link
                  href={`/certifications/${certification.slug}`}
                  className="inline-flex items-center gap-1 font-semibold text-blue-700 hover:text-blue-600"
                >
                  View details
                  <ArrowRight
                    className="size-4"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-slate-950">
            Explore other certification categories
          </h2>

          <div className="mt-5 flex flex-wrap gap-3">
            {certificationCategories
              .filter((item) => item.slug !== category.slug)
              .map((item) => (
                <Link
                  key={item.slug}
                  href={`/certifications/${item.slug}`}
                  className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
                >
                  {item.name}
                </Link>
              ))}
          </div>
        </div>
      </section>
    </main>
  );
}