import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  ExternalLink,
  Gauge,
  Route,
  Scale,
  ShieldCheck,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  HeroPanel,
  MarketingHero,
} from "@/components/layout/marketing-hero";

const siteUrl = "https://badgely-alpha.vercel.app";
const pageUrl = `${siteUrl}/guides/cissp-vs-cism`;

const title =
  "CISSP vs CISM: Which Should You Choose in 2026? | ThirdBadge";

const description =
  "Compare ISC2 CISSP and ISACA CISM in 2026. See differences in security breadth, management focus, experience requirements, exam format, study time, and career fit.";

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

const comparison = [
  ["ThirdBadge level", "Advanced", "Advanced"],
  ["Provider", "ISC2", "ISACA"],
  ["Vendor focus", "Vendor-neutral", "Vendor-neutral"],
  [
    "Primary emphasis",
    "Broad security leadership, architecture, engineering, operations, and risk",
    "Security management, governance, risk, program leadership, and incident management",
  ],
  [
    "Experience for full certification",
    "5 years across at least 2 CISSP domains; up to 1 year may be waived",
    "5 years of professional information security management experience across at least 3 of 4 CISM domains",
  ],
  ["Current exam length", "Up to 3 hours", "4 hours"],
  [
    "Current question count",
    "100–150 items",
    "150 multiple-choice questions",
  ],
  [
    "ThirdBadge study estimate",
    "120–200 hours",
    "100–160 hours",
  ],
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
          name: "CISSP vs CISM",
          item: pageUrl,
        },
      ],
    },
    {
      "@type": "Article",
      headline: "CISSP vs CISM: Which Should You Choose in 2026?",
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
      about: [
        {
          "@type": "EducationalOccupationalCredential",
          name: "ISC2 CISSP",
          credentialCategory: "Professional certification",
          url: `${siteUrl}/certifications/isc2-cissp`,
        },
        {
          "@type": "EducationalOccupationalCredential",
          name: "ISACA CISM",
          credentialCategory: "Professional certification",
          url: `${siteUrl}/certifications/isaca-cism`,
        },
      ],
    },
  ],
};

export default function CisspVsCismGuide() {
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
              Choose CISSP for broader security breadth. Choose CISM
              for a stronger management and governance focus.
            </h2>

            <p className="mt-3 leading-7 text-slate-300">
              Both are advanced credentials for experienced
              professionals. The better fit depends less on prestige
              and more on whether your work is centered on broad
              security leadership and architecture or on managing an
              information security program.
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/[0.055] p-4">
                <p className="text-sm text-slate-300">CISSP</p>
                <p className="mt-1 font-bold text-white">
                  Broad security leadership
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.055] p-4">
                <p className="text-sm text-slate-300">CISM</p>
                <p className="mt-1 font-bold text-white">
                  Security management
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
            Advanced cybersecurity
          </Badge>

          <Badge className="bg-white/10 text-slate-100">
            Comparison
          </Badge>
        </div>

        <h1 className="mt-5 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          CISSP vs CISM
          <span className="block bg-gradient-to-r from-blue-200 via-blue-400 to-blue-600 bg-clip-text text-transparent">
            which should you choose?
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
          A practical comparison for experienced security professionals
          deciding between broad security leadership and a credential
          centered more directly on governance, risk, and
          security-program management.
        </p>

        <p className="mt-5 text-sm text-slate-400">
          Reviewed against ThirdBadge certification data verified
          September 1, 2026.
        </p>
      </MarketingHero>

      <article className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-10">
            <section aria-labelledby="bottom-line">
              <h2
                id="bottom-line"
                className="text-3xl font-bold tracking-tight text-slate-950"
              >
                The bottom line
              </h2>

              <Card className="mt-4 p-6">
                <p className="leading-8 text-slate-700">
                  CISSP and CISM overlap in leadership, risk, and
                  governance, but they are not the same credential.
                  CISSP spans a wider technical and managerial security
                  body of knowledge, including architecture,
                  engineering, networks, identity, assessment,
                  operations, software security, and risk. CISM is more
                  tightly centered on governing and managing an
                  enterprise information security program. Choose based
                  on the work you want to lead, not on which acronym
                  sounds more senior.
                </p>
              </Card>
            </section>

            <section aria-labelledby="comparison">
              <div className="flex items-center gap-3">
                <Scale
                  className="size-6 text-blue-700"
                  aria-hidden="true"
                />

                <h2
                  id="comparison"
                  className="text-3xl font-bold tracking-tight text-slate-950"
                >
                  CISSP vs CISM at a glance
                </h2>
              </div>

              <Card className="mt-4 overflow-hidden p-0">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[760px] border-collapse text-left">
                    <thead className="bg-slate-950 text-white">
                      <tr>
                        <th className="px-5 py-4 text-sm font-semibold">
                          Factor
                        </th>
                        <th className="px-5 py-4 text-sm font-semibold">
                          ISC2 CISSP
                        </th>
                        <th className="px-5 py-4 text-sm font-semibold">
                          ISACA CISM
                        </th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-200">
                      {comparison.map(([factor, cissp, cism]) => (
                        <tr key={factor} className="align-top">
                          <th className="bg-slate-50 px-5 py-4 text-sm font-semibold text-slate-600">
                            {factor}
                          </th>
                          <td className="px-5 py-4 text-slate-800">
                            {cissp}
                          </td>
                          <td className="px-5 py-4 text-slate-800">
                            {cism}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </section>

            <section aria-labelledby="cissp-fit">
              <h2
                id="cissp-fit"
                className="text-3xl font-bold tracking-tight text-slate-950"
              >
                Choose CISSP when...
              </h2>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {[
                  "You want a broad credential spanning security leadership, architecture, engineering, operations, risk, identity, networks, and software security.",
                  "Your role crosses technical and managerial boundaries rather than focusing mainly on program management.",
                  "You are targeting senior security, architecture, engineering, consulting, or security-leadership responsibilities.",
                  "You meet or are working toward ISC2's experience requirements across multiple CISSP domains.",
                ].map((item) => (
                  <Card key={item} className="p-5">
                    <CheckCircle2
                      className="size-5 text-emerald-600"
                      aria-hidden="true"
                    />
                    <p className="mt-3 leading-7 text-slate-700">
                      {item}
                    </p>
                  </Card>
                ))}
              </div>
            </section>

            <section aria-labelledby="cism-fit">
              <h2
                id="cism-fit"
                className="text-3xl font-bold tracking-tight text-slate-950"
              >
                Choose CISM when...
              </h2>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {[
                  "Your work is increasingly about security governance, risk decisions, program development, leadership, and incident management.",
                  "You manage people, priorities, budgets, controls, stakeholders, or enterprise security programs.",
                  "You want a credential that maps directly to information security management responsibilities.",
                  "You have or are building the professional security-management experience required for full CISM certification.",
                ].map((item) => (
                  <Card key={item} className="p-5">
                    <CheckCircle2
                      className="size-5 text-blue-700"
                      aria-hidden="true"
                    />
                    <p className="mt-3 leading-7 text-slate-700">
                      {item}
                    </p>
                  </Card>
                ))}
              </div>
            </section>

            <section aria-labelledby="experience">
              <div className="flex items-center gap-3">
                <BriefcaseBusiness
                  className="size-6 text-blue-700"
                  aria-hidden="true"
                />

                <h2
                  id="experience"
                  className="text-3xl font-bold tracking-tight text-slate-950"
                >
                  The experience requirements matter
                </h2>
              </div>

              <div className="mt-4 grid gap-5 md:grid-cols-2">
                <Card className="p-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.14em] text-blue-700">
                    CISSP
                  </p>

                  <h3 className="mt-2 text-2xl font-bold text-slate-950">
                    Five years across at least two domains
                  </h3>

                  <p className="mt-3 leading-7 text-slate-600">
                    ISC2 requires five years of cumulative work
                    experience in at least two of the eight CISSP
                    domains. An eligible degree or approved credential
                    may satisfy up to one year. Candidates who pass
                    before meeting the requirement can use the Associate
                    of ISC2 pathway while gaining the required
                    experience.
                  </p>
                </Card>

                <Card className="p-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.14em] text-blue-700">
                    CISM
                  </p>

                  <h3 className="mt-2 text-2xl font-bold text-slate-950">
                    Five years of security-management experience
                  </h3>

                  <p className="mt-3 leading-7 text-slate-600">
                    ISACA requires five years of professional
                    information security management experience across
                    at least three of the four CISM domains for
                    certification. The exam itself is open to candidates
                    who have not yet met the experience requirement, and
                    candidates have five years after passing to apply.
                  </p>
                </Card>
              </div>
            </section>

            <section aria-labelledby="exam-snapshot">
              <div className="flex items-center gap-3">
                <Gauge
                  className="size-6 text-blue-700"
                  aria-hidden="true"
                />

                <h2
                  id="exam-snapshot"
                  className="text-3xl font-bold tracking-tight text-slate-950"
                >
                  Current exam snapshot
                </h2>
              </div>

              <div className="mt-4 grid gap-5 md:grid-cols-2">
                <Card className="p-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.14em] text-blue-700">
                    ISC2 CISSP
                  </p>

                  <h3 className="mt-2 text-2xl font-bold text-slate-950">
                    CISSP CAT exam
                  </h3>

                  <dl className="mt-5 space-y-3 text-sm">
                    <div className="flex justify-between gap-4">
                      <dt className="text-slate-500">Duration</dt>
                      <dd className="font-semibold text-slate-900">
                        Up to 3 hours
                      </dd>
                    </div>

                    <div className="flex justify-between gap-4">
                      <dt className="text-slate-500">Items</dt>
                      <dd className="font-semibold text-slate-900">
                        100–150
                      </dd>
                    </div>

                    <div className="flex justify-between gap-4">
                      <dt className="text-slate-500">
                        Passing score
                      </dt>
                      <dd className="font-semibold text-slate-900">
                        700 / 1000
                      </dd>
                    </div>

                    <div className="flex justify-between gap-4">
                      <dt className="text-slate-500">
                        ThirdBadge study estimate
                      </dt>
                      <dd className="font-semibold text-slate-900">
                        120–200 hours
                      </dd>
                    </div>
                  </dl>

                  <a
                    href="https://www.isc2.org/certifications/cissp"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-600"
                  >
                    Official ISC2 source
                    <ExternalLink
                      className="size-4"
                      aria-hidden="true"
                    />
                  </a>
                </Card>

                <Card className="p-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.14em] text-blue-700">
                    ISACA CISM
                  </p>

                  <h3 className="mt-2 text-2xl font-bold text-slate-950">
                    CISM exam
                  </h3>

                  <dl className="mt-5 space-y-3 text-sm">
                    <div className="flex justify-between gap-4">
                      <dt className="text-slate-500">Duration</dt>
                      <dd className="font-semibold text-slate-900">
                        4 hours
                      </dd>
                    </div>

                    <div className="flex justify-between gap-4">
                      <dt className="text-slate-500">Questions</dt>
                      <dd className="font-semibold text-slate-900">
                        150 multiple choice
                      </dd>
                    </div>

                    <div className="flex justify-between gap-4">
                      <dt className="text-slate-500">
                        Passing score
                      </dt>
                      <dd className="font-semibold text-slate-900">
                        450 on ISACA&apos;s 200–800 scale
                      </dd>
                    </div>

                    <div className="flex justify-between gap-4">
                      <dt className="text-slate-500">
                        ThirdBadge study estimate
                      </dt>
                      <dd className="font-semibold text-slate-900">
                        100–160 hours
                      </dd>
                    </div>
                  </dl>

                  <a
                    href="https://www.isaca.org/credentialing/cism"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-600"
                  >
                    Official ISACA source
                    <ExternalLink
                      className="size-4"
                      aria-hidden="true"
                    />
                  </a>
                </Card>
              </div>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Exam pricing, policies, delivery options, and outlines
                can change. Verify current details with ISC2 or ISACA
                before registering.
              </p>
            </section>

            <section aria-labelledby="cism-update">
              <Card className="border-blue-200 bg-blue-50 p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-blue-700">
                  2026 CISM timing note
                </p>

                <h2
                  id="cism-update"
                  className="mt-2 text-2xl font-bold tracking-tight text-slate-950"
                >
                  ISACA&apos;s updated CISM exam outline takes effect
                  November 3, 2026.
                </h2>

                <p className="mt-3 leading-7 text-slate-700">
                  The current CISM outline remains in effect through
                  November 2, 2026. Candidates testing on or after
                  November 3 should prepare against ISACA&apos;s updated
                  exam content outline and current study materials.
                </p>

                <a
                  href="https://www.isaca.org/credentialing/cism/cism-exam-content-outline"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-2 font-semibold text-blue-700 hover:text-blue-600"
                >
                  Review the official CISM outline
                  <ExternalLink
                    className="size-4"
                    aria-hidden="true"
                  />
                </a>
              </Card>
            </section>

            <section aria-labelledby="both">
              <h2
                id="both"
                className="text-3xl font-bold tracking-tight text-slate-950"
              >
                Does earning both make sense?
              </h2>

              <Card className="mt-4 p-6">
                <p className="leading-8 text-slate-700">
                  It can, but there is no reason to collect both
                  automatically. CISSP and CISM can complement each
                  other when your role combines broad security
                  knowledge with responsibility for governance and
                  security-program leadership. If one credential
                  already maps closely to your current responsibilities
                  and next role, it may be more useful to deepen your
                  experience than to immediately pursue another exam.
                </p>
              </Card>
            </section>

            <section aria-labelledby="career-fit">
              <div className="flex items-center gap-3">
                <Route
                  className="size-6 text-blue-700"
                  aria-hidden="true"
                />

                <h2
                  id="career-fit"
                  className="text-3xl font-bold tracking-tight text-slate-950"
                >
                  Connect the certification to your career direction
                </h2>
              </div>

              <p className="mt-3 leading-7 text-slate-600">
                ThirdBadge&apos;s current GRC and IT Audit roadmap
                includes CISM as an advanced step. CISSP is broader and
                may fit several senior security directions even when it
                is not a named step in a specific ThirdBadge roadmap.
              </p>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <Link
                  href="/career-paths/grc-and-it-audit"
                  className="group"
                >
                  <Card className="h-full p-5 transition group-hover:border-blue-300 group-hover:shadow-sm">
                    <ShieldCheck
                      className="size-5 text-blue-700"
                      aria-hidden="true"
                    />

                    <h3 className="mt-3 font-bold text-slate-950">
                      GRC and IT Audit roadmap
                    </h3>

                    <p className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-blue-700">
                      View roadmap
                      <ArrowRight
                        className="size-4"
                        aria-hidden="true"
                      />
                    </p>
                  </Card>
                </Link>

                <Link
                  href="/certifications/cybersecurity"
                  className="group"
                >
                  <Card className="h-full p-5 transition group-hover:border-blue-300 group-hover:shadow-sm">
                    <ShieldCheck
                      className="size-5 text-blue-700"
                      aria-hidden="true"
                    />

                    <h3 className="mt-3 font-bold text-slate-950">
                      Advanced cybersecurity options
                    </h3>

                    <p className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-blue-700">
                      Browse cybersecurity certifications
                      <ArrowRight
                        className="size-4"
                        aria-hidden="true"
                      />
                    </p>
                  </Card>
                </Link>
              </div>
            </section>

            <section
              aria-labelledby="next-step"
              className="rounded-3xl bg-slate-950 p-7 text-white sm:p-9"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-300">
                Your next step
              </p>

              <h2
                id="next-step"
                className="mt-2 text-3xl font-bold tracking-tight"
              >
                Compare the full ThirdBadge certification records
              </h2>

              <p className="mt-3 max-w-2xl leading-7 text-slate-300">
                Review current exam details, official sources, renewal
                information, recommended experience, and related
                resources before deciding which credential fits your
                next role.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/certifications/isc2-cissp"
                  className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 font-semibold text-white hover:bg-blue-500"
                >
                  Explore CISSP
                  <ArrowRight
                    className="size-4"
                    aria-hidden="true"
                  />
                </Link>

                <Link
                  href="/certifications/isaca-cism"
                  className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/20 px-5 py-2.5 font-semibold text-white hover:bg-white/10"
                >
                  Explore CISM
                  <ArrowRight
                    className="size-4"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </section>
          </div>

          <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
            <Card className="p-5">
              <h2 className="font-bold text-slate-950">
                Quick decision
              </h2>

              <div className="mt-4 space-y-4 text-sm leading-6 text-slate-600">
                <div>
                  <p className="font-semibold text-slate-950">
                    CISSP
                  </p>
                  <p>
                    Best fit when you want broad security leadership and
                    technical-management breadth.
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-slate-950">
                    CISM
                  </p>
                  <p>
                    Best fit when security governance and program
                    management are central to your work.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-5">
              <h2 className="font-bold text-slate-950">
                Related ThirdBadge pages
              </h2>

              <div className="mt-4 space-y-3 text-sm">
                <Link
                  href="/certifications/isc2-cissp"
                  className="block font-semibold text-blue-700 hover:text-blue-600"
                >
                  ISC2 CISSP
                </Link>

                <Link
                  href="/certifications/isaca-cism"
                  className="block font-semibold text-blue-700 hover:text-blue-600"
                >
                  ISACA CISM
                </Link>

                <Link
                  href="/certifications/grc-and-audit"
                  className="block font-semibold text-blue-700 hover:text-blue-600"
                >
                  GRC and Audit certifications
                </Link>

                <Link
                  href="/guides"
                  className="block font-semibold text-blue-700 hover:text-blue-600"
                >
                  All ThirdBadge Guides
                </Link>
              </div>
            </Card>
          </aside>
        </div>
      </article>
    </main>
  );
}