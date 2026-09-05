import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Gauge,
  Network,
  Route,
  Scale,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  HeroPanel,
  MarketingHero,
} from "@/components/layout/marketing-hero";

const siteUrl = "https://badgely-alpha.vercel.app";
const pageUrl = `${siteUrl}/guides/ccna-vs-network-plus`;

const title =
  "CCNA vs Network+: Which Should You Choose in 2026? | ThirdBadge";

const description =
  "Compare Cisco CCNA and CompTIA Network+ in 2026. See the key differences in depth, vendor focus, exam format, study time, and which networking certification fits your goal.";

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
  ["ThirdBadge level", "Foundational", "Associate"],
  ["Vendor focus", "Vendor-neutral", "Cisco-specific"],
  ["Current exam", "N10-009", "200-301 CCNA v1.1"],
  ["Exam duration", "90 minutes", "120 minutes"],
  [
    "Question count",
    "Up to 90",
    "Cisco does not publish a fixed count",
  ],
  [
    "ThirdBadge study estimate",
    "70–120 hours",
    "80–140 hours",
  ],
  [
    "Best fit",
    "Broad networking foundation",
    "Deeper networking and Cisco-oriented roles",
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
          name: "CCNA vs Network+",
          item: pageUrl,
        },
      ],
    },
    {
      "@type": "Article",
      headline: "CCNA vs Network+: Which Should You Choose in 2026?",
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
          name: "Cisco CCNA",
          credentialCategory: "Professional certification",
          url: `${siteUrl}/certifications/cisco-ccna`,
        },
        {
          "@type": "EducationalOccupationalCredential",
          name: "CompTIA Network+",
          credentialCategory: "Professional certification",
          url: `${siteUrl}/certifications/comptia-network-plus`,
        },
      ],
    },
  ],
};

export default function CcnaVsNetworkPlusGuide() {
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
              Choose Network+ for breadth. Choose CCNA for greater
              networking depth.
            </h2>

            <p className="mt-3 leading-7 text-slate-300">
              Network+ is the more vendor-neutral starting point. CCNA
              goes deeper into networking and is especially useful when
              Cisco technologies or network-engineering work are part
              of your target role.
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/[0.055] p-4">
                <p className="text-sm text-slate-300">Network+</p>
                <p className="mt-1 font-bold text-white">N10-009</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.055] p-4">
                <p className="text-sm text-slate-300">CCNA</p>
                <p className="mt-1 font-bold text-white">
                  200-301 v1.1
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
            Networking
          </Badge>

          <Badge className="bg-white/10 text-slate-100">
            Comparison
          </Badge>
        </div>

        <h1 className="mt-5 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          CCNA vs Network+
          <span className="block bg-gradient-to-r from-blue-200 via-blue-400 to-blue-600 bg-clip-text text-transparent">
            which should you choose?
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
          Both can build valuable networking knowledge, but they are
          not interchangeable. This guide helps you choose based on
          your starting point, career goal, and the kind of networking
          depth you want.
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
                  If you are building your first serious networking
                  foundation and want concepts that apply across many
                  vendors, Network+ is usually the cleaner starting
                  point. If you already know the basics and want deeper
                  routing, switching, IP connectivity, network access,
                  security, and automation knowledge—especially in
                  Cisco environments—CCNA is usually the stronger fit.
                  Neither choice is automatically better for every
                  learner.
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
                  CCNA vs Network+ at a glance
                </h2>
              </div>

              <Card className="mt-4 overflow-hidden p-0">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[680px] border-collapse text-left">
                    <thead className="bg-slate-950 text-white">
                      <tr>
                        <th className="px-5 py-4 text-sm font-semibold">
                          Factor
                        </th>
                        <th className="px-5 py-4 text-sm font-semibold">
                          CompTIA Network+
                        </th>
                        <th className="px-5 py-4 text-sm font-semibold">
                          Cisco CCNA
                        </th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-200">
                      {comparison.map(
                        ([factor, networkPlus, ccna]) => (
                          <tr key={factor} className="align-top">
                            <th className="bg-slate-50 px-5 py-4 text-sm font-semibold text-slate-600">
                              {factor}
                            </th>
                            <td className="px-5 py-4 text-slate-800">
                              {networkPlus}
                            </td>
                            <td className="px-5 py-4 text-slate-800">
                              {ccna}
                            </td>
                          </tr>
                        ),
                      )}
                    </tbody>
                  </table>
                </div>
              </Card>
            </section>

            <section aria-labelledby="network-plus-fit">
              <h2
                id="network-plus-fit"
                className="text-3xl font-bold tracking-tight text-slate-950"
              >
                Choose Network+ when...
              </h2>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {[
                  "You want a vendor-neutral introduction to modern wired and wireless networking.",
                  "You are moving from IT support into networking and want to strengthen the fundamentals first.",
                  "You want broad exposure to TCP/IP, addressing, routing, switching, wireless, security, services, and troubleshooting.",
                  "You are not yet committed to a Cisco-focused networking path.",
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

            <section aria-labelledby="ccna-fit">
              <h2
                id="ccna-fit"
                className="text-3xl font-bold tracking-tight text-slate-950"
              >
                Choose CCNA when...
              </h2>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {[
                  "Your goal is network administration or network engineering and you want more technical depth.",
                  "You want hands-on practice with routing, switching, IP connectivity, network access, and device configuration concepts.",
                  "Cisco technologies are common in the environments or roles you are targeting.",
                  "You already understand basic networking and want a more demanding next step.",
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

            <section aria-labelledby="depth">
              <div className="flex items-center gap-3">
                <Gauge
                  className="size-6 text-blue-700"
                  aria-hidden="true"
                />

                <h2
                  id="depth"
                  className="text-3xl font-bold tracking-tight text-slate-950"
                >
                  The biggest difference is depth and focus
                </h2>
              </div>

              <Card className="mt-4 p-6">
                <p className="leading-8 text-slate-700">
                  Network+ teaches networking from a broad,
                  vendor-neutral perspective. CCNA also covers core
                  networking, but its scope goes deeper into areas such
                  as IP connectivity, network access, routing and
                  switching, Cisco-oriented configuration concepts,
                  security fundamentals, and automation. That is why
                  ThirdBadge classifies Network+ as foundational and
                  CCNA as associate level.
                </p>
              </Card>
            </section>

            <section aria-labelledby="exam-snapshot">
              <h2
                id="exam-snapshot"
                className="text-3xl font-bold tracking-tight text-slate-950"
              >
                Current exam snapshot
              </h2>

              <div className="mt-4 grid gap-5 md:grid-cols-2">
                <Card className="p-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.14em] text-blue-700">
                    CompTIA Network+
                  </p>

                  <h3 className="mt-2 text-2xl font-bold text-slate-950">
                    N10-009
                  </h3>

                  <dl className="mt-5 space-y-3 text-sm">
                    <div className="flex justify-between gap-4">
                      <dt className="text-slate-500">Duration</dt>
                      <dd className="font-semibold text-slate-900">
                        90 minutes
                      </dd>
                    </div>

                    <div className="flex justify-between gap-4">
                      <dt className="text-slate-500">Questions</dt>
                      <dd className="font-semibold text-slate-900">
                        Up to 90
                      </dd>
                    </div>

                    <div className="flex justify-between gap-4">
                      <dt className="text-slate-500">Delivery</dt>
                      <dd className="text-right font-semibold text-slate-900">
                        Pearson VUE / online proctored
                      </dd>
                    </div>
                  </dl>

                  <a
                    href="https://www.comptia.org/certifications/network"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-600"
                  >
                    Official CompTIA source
                    <ExternalLink
                      className="size-4"
                      aria-hidden="true"
                    />
                  </a>
                </Card>

                <Card className="p-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.14em] text-blue-700">
                    Cisco CCNA
                  </p>

                  <h3 className="mt-2 text-2xl font-bold text-slate-950">
                    200-301 CCNA v1.1
                  </h3>

                  <dl className="mt-5 space-y-3 text-sm">
                    <div className="flex justify-between gap-4">
                      <dt className="text-slate-500">Duration</dt>
                      <dd className="font-semibold text-slate-900">
                        120 minutes
                      </dd>
                    </div>

                    <div className="flex justify-between gap-4">
                      <dt className="text-slate-500">
                        Prerequisites
                      </dt>
                      <dd className="font-semibold text-slate-900">
                        None listed
                      </dd>
                    </div>

                    <div className="flex justify-between gap-4">
                      <dt className="text-slate-500">
                        Question count
                      </dt>
                      <dd className="text-right font-semibold text-slate-900">
                        Not fixed publicly
                      </dd>
                    </div>
                  </dl>

                  <a
                    href="https://www.cisco.com/site/us/en/learn/training-certifications/exams/ccna.html"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-600"
                  >
                    Official Cisco source
                    <ExternalLink
                      className="size-4"
                      aria-hidden="true"
                    />
                  </a>
                </Card>
              </div>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Exam versions, delivery options, pricing, and policies
                can change. Verify current details with the
                certification provider before registering.
              </p>
            </section>

            <section aria-labelledby="timing-note">
              <Card className="border-blue-200 bg-blue-50 p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-blue-700">
                  2026 CCNA timing note
                </p>

                <h2
                  id="timing-note"
                  className="mt-2 text-2xl font-bold tracking-tight text-slate-950"
                >
                  Cisco has announced a refreshed CCNA for February 3,
                  2027.
                </h2>

                <p className="mt-3 leading-7 text-slate-700">
                  Cisco says the current CCNA exam remains live until
                  the refreshed exam goes into effect. If you are
                  already preparing for the current version, use
                  Cisco&apos;s official transition guidance rather than
                  changing your plan based on rumors or unofficial exam
                  dates.
                </p>

                <a
                  href="https://blogs.cisco.com/learning/ai-updates-ccna-ccie-automation"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-2 font-semibold text-blue-700 hover:text-blue-600"
                >
                  Read Cisco&apos;s update
                  <ExternalLink
                    className="size-4"
                    aria-hidden="true"
                  />
                </a>
              </Card>
            </section>

            <section aria-labelledby="sequence">
              <div className="flex items-center gap-3">
                <Route
                  className="size-6 text-blue-700"
                  aria-hidden="true"
                />

                <h2
                  id="sequence"
                  className="text-3xl font-bold tracking-tight text-slate-950"
                >
                  Should you take Network+ before CCNA?
                </h2>
              </div>

              <Card className="mt-4 p-6">
                <p className="leading-8 text-slate-700">
                  Not necessarily. There is no rule requiring Network+
                  before CCNA. If networking is new to you, Network+
                  can provide a smoother foundation before the deeper
                  CCNA material. If you already understand IP
                  addressing, basic routing and switching, TCP/IP, and
                  troubleshooting—and your goal is clearly network
                  engineering—you may decide to study directly for CCNA
                  instead.
                </p>
              </Card>
            </section>

            <section aria-labelledby="career-choice">
              <h2
                id="career-choice"
                className="text-3xl font-bold tracking-tight text-slate-950"
              >
                Let the career goal make the final decision
              </h2>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <Link
                  href="/career-paths/network-engineer"
                  className="group"
                >
                  <Card className="h-full p-6 transition group-hover:border-blue-300 group-hover:shadow-sm">
                    <Network
                      className="size-6 text-blue-700"
                      aria-hidden="true"
                    />

                    <h3 className="mt-3 text-xl font-bold text-slate-950">
                      Network Engineer roadmap
                    </h3>

                    <p className="mt-2 leading-7 text-slate-600">
                      See how networking certifications fit into a
                      longer skills and career progression.
                    </p>

                    <p className="mt-4 inline-flex items-center gap-1 font-semibold text-blue-700">
                      View roadmap
                      <ArrowRight
                        className="size-4"
                        aria-hidden="true"
                      />
                    </p>
                  </Card>
                </Link>

                <Link
                  href="/certifications/networking"
                  className="group"
                >
                  <Card className="h-full p-6 transition group-hover:border-blue-300 group-hover:shadow-sm">
                    <Scale
                      className="size-6 text-blue-700"
                      aria-hidden="true"
                    />

                    <h3 className="mt-3 text-xl font-bold text-slate-950">
                      Explore networking certifications
                    </h3>

                    <p className="mt-2 leading-7 text-slate-600">
                      Compare the broader set of active networking
                      credentials in ThirdBadge.
                    </p>

                    <p className="mt-4 inline-flex items-center gap-1 font-semibold text-blue-700">
                      Browse category
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
                Compare the full records
              </p>

              <h2
                id="next-step"
                className="mt-2 text-3xl font-bold tracking-tight"
              >
                Review both certifications before choosing
              </h2>

              <p className="mt-3 max-w-2xl leading-7 text-slate-300">
                ThirdBadge&apos;s certification pages include exam
                details, study estimates, official resources, renewal
                information, and related career links so you can make
                the decision with the full context.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/certifications/comptia-network-plus"
                  className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 font-semibold text-white hover:bg-blue-500"
                >
                  Explore Network+
                  <ArrowRight
                    className="size-4"
                    aria-hidden="true"
                  />
                </Link>

                <Link
                  href="/certifications/cisco-ccna"
                  className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/20 px-5 py-2.5 font-semibold text-white hover:bg-white/10"
                >
                  Explore CCNA
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
                Fast decision
              </h2>

              <dl className="mt-4 space-y-4 text-sm">
                <div>
                  <dt className="font-semibold text-slate-500">
                    Newer to networking
                  </dt>
                  <dd className="mt-1 text-slate-900">
                    Start by considering Network+
                  </dd>
                </div>

                <div>
                  <dt className="font-semibold text-slate-500">
                    Network engineering goal
                  </dt>
                  <dd className="mt-1 text-slate-900">
                    Lean toward CCNA
                  </dd>
                </div>

                <div>
                  <dt className="font-semibold text-slate-500">
                    Want vendor-neutral breadth
                  </dt>
                  <dd className="mt-1 text-slate-900">Network+</dd>
                </div>

                <div>
                  <dt className="font-semibold text-slate-500">
                    Want deeper Cisco networking
                  </dt>
                  <dd className="mt-1 text-slate-900">CCNA</dd>
                </div>
              </dl>
            </Card>

            <Card className="p-5">
              <h2 className="font-bold text-slate-950">
                Keep exploring
              </h2>

              <div className="mt-4 space-y-3 text-sm font-semibold">
                <Link
                  href="/guides"
                  className="block text-blue-700 hover:text-blue-600"
                >
                  All ThirdBadge Guides
                </Link>

                <Link
                  href="/certifications/networking"
                  className="block text-blue-700 hover:text-blue-600"
                >
                  Networking certifications
                </Link>

                <Link
                  href="/courses"
                  className="block text-blue-700 hover:text-blue-600"
                >
                  Courses & training providers
                </Link>

                <Link
                  href="/study-store"
                  className="block text-blue-700 hover:text-blue-600"
                >
                  Study resources
                </Link>
              </div>
            </Card>

            <p className="px-1 text-xs leading-5 text-slate-500">
              ThirdBadge is an independent educational resource.
              Certification names may be trademarks of their respective
              owners, and provider inclusion does not imply endorsement
              of ThirdBadge.
            </p>
          </aside>
        </div>
      </article>
    </main>
  );
}