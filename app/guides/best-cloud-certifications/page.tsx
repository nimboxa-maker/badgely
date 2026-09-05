import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Cloud,
  Compass,
  Layers3,
  Route,
  ServerCog,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  HeroPanel,
  MarketingHero,
} from "@/components/layout/marketing-hero";

const siteUrl = "https://badgely-alpha.vercel.app";
const pageUrl = `${siteUrl}/guides/best-cloud-certifications`;

const title =
  "Best Cloud Certifications in 2026 by Career Goal | ThirdBadge";

const description =
  "Explore cloud certifications for beginners, cloud engineers, architects, operations, and hybrid-cloud networking across AWS, Azure, Google Cloud, and CompTIA.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title,
    description,
    url: pageUrl,
    type: "article",
    siteName: "ThirdBadge",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

const cloudCertifications = [
  {
    name: "Microsoft Azure Fundamentals",
    slug: "microsoft-azure-fundamentals",
    level: "Foundational",
    provider: "Microsoft",
    study: "25–50 hours",
    bestFor:
      "Beginners who want a practical introduction to cloud concepts through the Azure ecosystem.",
  },
  {
    name: "Google Cloud Digital Leader",
    slug: "google-cloud-digital-leader",
    level: "Foundational",
    provider: "Google Cloud",
    study: "30–60 hours",
    bestFor:
      "Learners who want to understand cloud technology, business value, and Google Cloud capabilities without starting in a deeply technical role.",
  },
  {
    name: "AWS Certified Solutions Architect – Associate",
    slug: "aws-certified-solutions-architect-associate",
    level: "Associate",
    provider: "Amazon Web Services",
    study: "80–140 hours",
    bestFor:
      "Learners targeting AWS cloud engineering, solutions architecture, or infrastructure roles.",
  },
  {
    name: "Google Cloud Associate Cloud Engineer",
    slug: "google-cloud-associate-cloud-engineer",
    level: "Associate",
    provider: "Google Cloud",
    study: "70–120 hours",
    bestFor:
      "Hands-on Google Cloud learners focused on deployment, administration, operations, IAM, and day-to-day cloud environments.",
  },
  {
    name: "CompTIA Cloud+",
    slug: "comptia-cloud-plus",
    level: "Intermediate",
    provider: "CompTIA",
    study: "80–140 hours",
    bestFor:
      "IT professionals who want a vendor-neutral cloud operations credential spanning deployment, security, troubleshooting, and infrastructure.",
  },
  {
    name: "Google Cloud Professional Cloud Architect",
    slug: "google-cloud-professional-cloud-architect",
    level: "Advanced",
    provider: "Google Cloud",
    study: "120–200 hours",
    bestFor:
      "Experienced professionals designing secure, scalable, reliable Google Cloud solutions.",
  },
  {
    name: "Microsoft Certified: Azure Solutions Architect Expert",
    slug: "microsoft-certified-azure-solutions-architect-expert",
    level: "Advanced",
    provider: "Microsoft",
    study: "100–180 hours",
    bestFor:
      "Experienced Azure professionals designing cloud and hybrid solutions across compute, networking, storage, security, and governance.",
  },
  {
    name: "CompTIA CloudNetX",
    slug: "comptia-cloudnetx",
    level: "Advanced",
    provider: "CompTIA",
    study: "140–220 hours",
    bestFor:
      "Senior networking professionals working with complex network architecture across cloud and hybrid environments.",
  },
] as const;

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
          name: "Guides",
          item: `${siteUrl}/guides`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Best Cloud Certifications in 2026",
          item: pageUrl,
        },
      ],
    },
    {
      "@type": "Article",
      headline: "Best Cloud Certifications in 2026 by Career Goal",
      description,
      datePublished: "2026-09-03",
      dateModified: "2026-09-03",
      mainEntityOfPage: pageUrl,
      author: {
        "@type": "Organization",
        name: "ThirdBadge",
        url: siteUrl,
      },
      publisher: {
        "@type": "Organization",
        name: "ThirdBadge",
        url: siteUrl,
      },
      about: {
        "@type": "Thing",
        name: "Cloud computing certifications",
      },
    },
    {
      "@type": "ItemList",
      name: "Cloud certifications by career goal",
      itemListElement: cloudCertifications.map(
        (certification, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "EducationalOccupationalCredential",
            name: certification.name,
            educationalLevel: certification.level,
            url: `${siteUrl}/certifications/${certification.slug}`,
            recognizedBy: {
              "@type": "Organization",
              name: certification.provider,
            },
          },
        }),
      ),
    },
  ],
};

export default function BestCloudCertificationsGuide() {
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
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-300">
              Quick answer
            </p>

            <h2 className="mt-3 text-2xl font-bold text-white">
              The best cloud certification depends on the cloud role
              you want.
            </h2>

            <p className="mt-3 leading-7 text-slate-300">
              Beginners may need cloud fundamentals first. Engineers
              need hands-on operations skills. Architects need deeper
              design experience. ThirdBadge organizes the options by
              goal instead of pretending one credential fits everyone.
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/[0.055] p-4">
                <p className="text-sm text-slate-300">
                  Cloud certifications reviewed
                </p>
                <p className="mt-1 font-bold text-white">
                  8 active credentials
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.055] p-4">
                <p className="text-sm text-slate-300">
                  Platforms represented
                </p>
                <p className="mt-1 font-bold text-white">
                  AWS · Azure · Google Cloud · Vendor-neutral
                </p>
              </div>
            </div>
          </HeroPanel>
        }
      >
        <div className="flex flex-wrap gap-2">
          <Badge className="bg-blue-500/15 text-blue-100 ring-1 ring-inset ring-blue-400/30">
            ThirdBadge Guide
          </Badge>

          <Badge className="bg-white/10 text-slate-100">
            Cloud
          </Badge>

          <Badge className="bg-white/10 text-slate-100">
            2026 roundup
          </Badge>
        </div>

        <h1 className="mt-5 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Best cloud certifications
          <span className="block bg-gradient-to-r from-blue-200 via-blue-400 to-blue-600 bg-clip-text text-transparent">
            in 2026 by career goal.
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
          Compare cloud credentials for beginners, administrators,
          engineers, architects, and experienced hybrid-cloud
          networking professionals.
        </p>

        <p className="mt-5 text-sm text-slate-400">
          Based on ThirdBadge certification data verified September 1,
          2026.
        </p>
      </MarketingHero>

      <article className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-10">
            <section aria-labelledby="methodology">
              <div className="flex items-center gap-3">
                <Compass
                  className="size-6 text-blue-700"
                  aria-hidden="true"
                />

                <h2
                  id="methodology"
                  className="text-3xl font-bold tracking-tight text-slate-950"
                >
                  What does “best” mean here?
                </h2>
              </div>

              <Card className="mt-4 p-6">
                <p className="leading-8 text-slate-700">
                  ThirdBadge does not rank these certifications by
                  prestige, salary, or popularity. “Best” means the
                  credential may be a strong fit for a particular
                  starting point or career goal based on its level,
                  scope, vendor focus, recommended experience, and
                  target roles. Your employer, current platform, and
                  hands-on experience should influence the final
                  choice.
                </p>
              </Card>
            </section>

            <section aria-labelledby="beginner">
              <div className="flex items-center gap-3">
                <Cloud
                  className="size-6 text-blue-700"
                  aria-hidden="true"
                />

                <h2
                  id="beginner"
                  className="text-3xl font-bold tracking-tight text-slate-950"
                >
                  Best starting points for cloud beginners
                </h2>
              </div>

              <div className="mt-5 grid gap-5 md:grid-cols-2">
                {cloudCertifications
                  .slice(0, 2)
                  .map((certification) => (
                    <CertificationCard
                      key={certification.slug}
                      certification={certification}
                    />
                  ))}
              </div>
            </section>

            <section aria-labelledby="engineer">
              <div className="flex items-center gap-3">
                <ServerCog
                  className="size-6 text-blue-700"
                  aria-hidden="true"
                />

                <h2
                  id="engineer"
                  className="text-3xl font-bold tracking-tight text-slate-950"
                >
                  Best fits for cloud engineering and operations
                </h2>
              </div>

              <div className="mt-5 grid gap-5 md:grid-cols-2">
                {cloudCertifications
                  .slice(2, 5)
                  .map((certification) => (
                    <CertificationCard
                      key={certification.slug}
                      certification={certification}
                    />
                  ))}
              </div>
            </section>

            <section aria-labelledby="architect">
              <div className="flex items-center gap-3">
                <Layers3
                  className="size-6 text-blue-700"
                  aria-hidden="true"
                />

                <h2
                  id="architect"
                  className="text-3xl font-bold tracking-tight text-slate-950"
                >
                  Best fits for experienced cloud architects
                </h2>
              </div>

              <div className="mt-5 grid gap-5 md:grid-cols-2">
                {cloudCertifications
                  .slice(5, 7)
                  .map((certification) => (
                    <CertificationCard
                      key={certification.slug}
                      certification={certification}
                    />
                  ))}
              </div>
            </section>

            <section aria-labelledby="hybrid-networking">
              <div className="flex items-center gap-3">
                <Route
                  className="size-6 text-blue-700"
                  aria-hidden="true"
                />

                <h2
                  id="hybrid-networking"
                  className="text-3xl font-bold tracking-tight text-slate-950"
                >
                  Best fit for advanced hybrid-cloud networking
                </h2>
              </div>

              <div className="mt-5">
                <CertificationCard
                  certification={cloudCertifications[7]}
                />
              </div>
            </section>

            <section aria-labelledby="choose-platform">
              <h2
                id="choose-platform"
                className="text-3xl font-bold tracking-tight text-slate-950"
              >
                Should you choose AWS, Azure, Google Cloud, or
                vendor-neutral?
              </h2>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {[
                  [
                    "AWS",
                    "Choose an AWS credential when your target roles, projects, or employer environments are primarily built on AWS.",
                  ],
                  [
                    "Azure",
                    "Choose Azure when Microsoft cloud, hybrid infrastructure, identity, or enterprise Microsoft environments are central to your work.",
                  ],
                  [
                    "Google Cloud",
                    "Choose Google Cloud when your target environment uses Google Cloud and you want operations or architecture skills inside that platform.",
                  ],
                  [
                    "Vendor-neutral",
                    "Choose a vendor-neutral credential when you want cloud concepts and operations that transfer across platforms or your environment is strongly multi-cloud.",
                  ],
                ].map(([heading, text]) => (
                  <Card key={heading} className="p-5">
                    <CheckCircle2
                      className="size-5 text-blue-700"
                      aria-hidden="true"
                    />

                    <h3 className="mt-3 font-bold text-slate-950">
                      {heading}
                    </h3>

                    <p className="mt-2 leading-7 text-slate-600">
                      {text}
                    </p>
                  </Card>
                ))}
              </div>
            </section>

            <section
              aria-labelledby="path"
              className="rounded-3xl bg-slate-950 p-7 text-white sm:p-9"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-300">
                Build a path
              </p>

              <h2
                id="path"
                className="mt-2 text-3xl font-bold tracking-tight"
              >
                Connect the certification to a cloud career roadmap
              </h2>

              <p className="mt-3 max-w-2xl leading-7 text-slate-300">
                Certification choice makes more sense when it is tied
                to the job you want. Use ThirdBadge&apos;s Cloud
                Engineer roadmap to see how certifications can fit
                alongside broader skills and experience.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/career-paths/cloud-engineer"
                  className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 font-semibold text-white hover:bg-blue-500"
                >
                  View Cloud Engineer roadmap
                  <ArrowRight
                    className="size-4"
                    aria-hidden="true"
                  />
                </Link>

                <Link
                  href="/certifications/cloud"
                  className="inline-flex min-h-11 items-center rounded-xl border border-white/20 px-5 py-2.5 font-semibold text-white hover:bg-white/10"
                >
                  Browse all Cloud certifications
                </Link>
              </div>
            </section>
          </div>

          <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
            <Card className="p-5">
              <h2 className="font-bold text-slate-950">
                Cloud guide at a glance
              </h2>

              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-slate-500">
                    Credentials reviewed
                  </dt>
                  <dd className="font-semibold text-slate-900">8</dd>
                </div>

                <div className="flex justify-between gap-4">
                  <dt className="text-slate-500">
                    Foundational
                  </dt>
                  <dd className="font-semibold text-slate-900">2</dd>
                </div>

                <div className="flex justify-between gap-4">
                  <dt className="text-slate-500">Associate</dt>
                  <dd className="font-semibold text-slate-900">2</dd>
                </div>

                <div className="flex justify-between gap-4">
                  <dt className="text-slate-500">
                    Intermediate
                  </dt>
                  <dd className="font-semibold text-slate-900">1</dd>
                </div>

                <div className="flex justify-between gap-4">
                  <dt className="text-slate-500">Advanced</dt>
                  <dd className="font-semibold text-slate-900">3</dd>
                </div>
              </dl>
            </Card>

            <Card className="p-5">
              <h2 className="font-bold text-slate-950">
                Remember
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Certification requirements, exam versions, and provider
                policies can change. Check the official provider before
                registering for an exam.
              </p>
            </Card>

            <Link
              href="/guides"
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-600"
            >
              ← Back to ThirdBadge Guides
            </Link>
          </aside>
        </div>
      </article>
    </main>
  );
}

function CertificationCard({
  certification,
}: {
  certification: (typeof cloudCertifications)[number];
}) {
  return (
    <Card className="h-full p-6">
      <div className="flex flex-wrap gap-2">
        <Badge>{certification.level}</Badge>
        <Badge>{certification.provider}</Badge>
      </div>

      <h3 className="mt-4 text-xl font-bold text-slate-950">
        {certification.name}
      </h3>

      <p className="mt-3 leading-7 text-slate-600">
        {certification.bestFor}
      </p>

      <p className="mt-4 text-sm font-semibold text-slate-500">
        ThirdBadge study estimate: {certification.study}
      </p>

      <Link
        href={`/certifications/${certification.slug}`}
        className="mt-5 inline-flex items-center gap-2 font-semibold text-blue-700 hover:text-blue-600"
      >
        View certification
        <ArrowRight className="size-4" aria-hidden="true" />
      </Link>
    </Card>
  );
}