import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpenCheck,
  Cloud,
  Crosshair,
  Layers3,
  Radar,
  ShieldCheck,
  UserRoundCog,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { HeroPanel, MarketingHero } from "@/components/layout/marketing-hero";

const siteUrl = "https://badgely-alpha.vercel.app";
const pageUrl = `${siteUrl}/guides/best-cybersecurity-certifications`;
const title = "Best Cybersecurity Certifications in 2026 | Badgely";
const description =
  "Explore cybersecurity certifications by career goal in 2026, from beginner foundations and SOC work to penetration testing, cloud security, and advanced security leadership.";

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
    siteName: "Badgely",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

const recommendations = [
  {
    goal: "Starting cybersecurity from scratch",
    primary: "ISC2 Certified in Cybersecurity (CC)",
    slug: "isc2-certified-in-cybersecurity",
    level: "Foundational",
    why: "No work experience is required, and the credential is designed to introduce security principles, access controls, network security, incident response, and security operations.",
  },
  {
    goal: "Building a broad security foundation",
    primary: "CompTIA Security+",
    slug: "comptia-security-plus",
    level: "Foundational",
    why: "Security+ provides broad vendor-neutral coverage across threats, architecture, identity, operations, risk, and governance, making it a flexible bridge from general IT into cybersecurity.",
  },
  {
    goal: "SOC and defensive security",
    primary: "CompTIA CySA+",
    slug: "comptia-cysa-plus",
    level: "Intermediate",
    why: "CySA+ is centered on analyzing security data, identifying suspicious activity, supporting incident response, vulnerability analysis, and day-to-day defensive security operations.",
  },
  {
    goal: "Security administration and operations",
    primary: "ISC2 SSCP",
    slug: "isc2-sscp",
    level: "Intermediate",
    why: "SSCP is practitioner-oriented and focuses on access controls, monitoring, incident response, cryptography, systems security, and operational security administration.",
  },
  {
    goal: "Learning practical penetration testing",
    primary: "eLearnSecurity Junior Penetration Tester",
    slug: "elearnsecurity-junior-penetration-tester",
    level: "Foundational",
    why: "eJPT is positioned for learners with little cybersecurity experience and emphasizes practical assessment workflows, basic exploitation, web testing, and reporting habits.",
  },
  {
    goal: "Advanced offensive security",
    primary: "Offensive Security Certified Professional",
    slug: "offensive-security-certified-professional",
    level: "Advanced",
    why: "OSCP emphasizes hands-on penetration-testing methodology, enumeration, exploitation, privilege escalation, Active Directory work, and technical reporting.",
  },
  {
    goal: "AWS cloud security",
    primary: "AWS Certified Security – Specialty",
    slug: "aws-certified-security-specialty",
    level: "Advanced",
    why: "This credential is designed for experienced professionals securing AWS workloads with identity, logging, monitoring, infrastructure security, data protection, and incident response.",
  },
  {
    goal: "Google Cloud security",
    primary: "Google Cloud Professional Cloud Security Engineer",
    slug: "google-cloud-professional-cloud-security-engineer",
    level: "Advanced",
    why: "It focuses on identity, data protection, network security, operations, compliance, and secure infrastructure design within Google Cloud.",
  },
  {
    goal: "Broad advanced security leadership",
    primary: "ISC2 CISSP",
    slug: "isc2-cissp",
    level: "Advanced",
    why: "CISSP spans security leadership, architecture, engineering, operations, risk, software security, identity, and communications security for experienced practitioners.",
  },
  {
    goal: "Advanced security architecture and engineering",
    primary: "CompTIA SecurityX",
    slug: "comptia-securityx",
    level: "Advanced",
    why: "SecurityX is aimed at experienced practitioners working with enterprise security architecture, engineering, risk, and secure operations.",
  },
] as const;

const additionalOptions = [
  ["Cisco CCST Cybersecurity", "cisco-ccst-cybersecurity", "Introductory Cisco-focused cybersecurity foundation"],
  ["Microsoft Security, Compliance, and Identity Fundamentals", "microsoft-security-compliance-identity-fundamentals", "Microsoft security, compliance, and identity fundamentals"],
  ["Splunk Core Certified User", "splunk-core-certified-user", "Foundational Splunk search and data skills useful around security operations"],
  ["Microsoft Security Operations Analyst", "microsoft-security-operations-analyst", "Microsoft-focused SOC, incident response, Sentinel, and Defender work"],
  ["CEH (Certified Ethical Hacker)", "ec-council-ceh", "Ethical-hacking concepts, attack techniques, tools, and defensive awareness"],
  ["CompTIA PenTest+", "comptia-pentest-plus", "Intermediate vendor-neutral penetration-testing and assessment work"],
] as const;

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Badgely", item: siteUrl },
        { "@type": "ListItem", position: 2, name: "Guides", item: `${siteUrl}/guides` },
        {
          "@type": "ListItem",
          position: 3,
          name: "Best Cybersecurity Certifications in 2026",
          item: pageUrl,
        },
      ],
    },
    {
      "@type": "Article",
      headline: "Best Cybersecurity Certifications in 2026",
      description,
      datePublished: "2026-09-03",
      dateModified: "2026-09-03",
      mainEntityOfPage: pageUrl,
      author: { "@type": "Organization", name: "Badgely", url: siteUrl },
      publisher: { "@type": "Organization", name: "Badgely", url: siteUrl },
      about: {
        "@type": "Thing",
        name: "Cybersecurity certifications",
      },
    },
  ],
};

export default function BestCybersecurityCertificationsGuide() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <MarketingHero
        aside={
          <HeroPanel>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-300">
              The quick answer
            </p>
            <h2 className="mt-3 text-2xl font-bold text-white">
              The best cybersecurity certification depends on what you want to do next.
            </h2>
            <p className="mt-3 leading-7 text-slate-300">
              A beginner, SOC analyst, penetration tester, cloud security engineer, and security architect should not
              all choose the same credential. Badgely groups the options by career goal instead of forcing a universal
              ranking.
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/[0.055] p-4">
                <p className="text-sm text-slate-300">Cybersecurity catalog</p>
                <p className="mt-1 font-bold text-white">16 active certifications</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.055] p-4">
                <p className="text-sm text-slate-300">Badgely approach</p>
                <p className="mt-1 font-bold text-white">Best by goal</p>
              </div>
            </div>
          </HeroPanel>
        }
      >
        <div className="flex flex-wrap gap-2">
          <Badge className="bg-blue-500/15 text-blue-100 ring-1 ring-inset ring-blue-400/30">
            Badgely Guide
          </Badge>
          <Badge className="bg-white/10 text-slate-100">Cybersecurity</Badge>
        </div>
        <h1 className="mt-5 max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Best cybersecurity certifications
          <span className="block bg-gradient-to-r from-blue-200 via-blue-400 to-blue-600 bg-clip-text text-transparent">
            in 2026, by career goal.
          </span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
          A practical way to choose among beginner, defensive-security, offensive-security, cloud-security, and advanced
          cybersecurity credentials without treating every learner as if they have the same destination.
        </p>
        <p className="mt-5 text-sm text-slate-400">
          Reviewed against Badgely certification data verified September 1, 2026.
        </p>
      </MarketingHero>

      <article className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-10">
            <section aria-labelledby="method">
              <div className="flex items-center gap-3">
                <Layers3 className="size-6 text-blue-700" aria-hidden="true" />
                <h2 id="method" className="text-3xl font-bold tracking-tight text-slate-950">
                  How Badgely uses the word “best”
                </h2>
              </div>
              <Card className="mt-4 p-6">
                <p className="leading-8 text-slate-700">
                  This is not a prestige ranking. Badgely looks at certification level, recommended experience, vendor
                  scope, target job roles, subject-matter focus, and how naturally a credential fits a learner&apos;s next
                  career step. A certification can be excellent for one goal and unnecessary for another.
                </p>
              </Card>
            </section>

            <section aria-labelledby="recommendations">
              <h2 id="recommendations" className="text-3xl font-bold tracking-tight text-slate-950">
                Best cybersecurity certifications by goal
              </h2>
              <div className="mt-5 space-y-5">
                {recommendations.map((item) => (
                  <Card key={item.slug} className="p-6">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-blue-700">{item.goal}</p>
                        <h3 className="mt-2 text-2xl font-bold text-slate-950">{item.primary}</h3>
                      </div>
                      <Badge>{item.level}</Badge>
                    </div>
                    <p className="mt-4 leading-7 text-slate-600">{item.why}</p>
                    <Link
                      href={`/certifications/${item.slug}`}
                      className="mt-5 inline-flex items-center gap-2 font-semibold text-blue-700 hover:text-blue-600"
                    >
                      View certification details <ArrowRight className="size-4" aria-hidden="true" />
                    </Link>
                  </Card>
                ))}
              </div>
            </section>

            <section aria-labelledby="paths">
              <h2 id="paths" className="text-3xl font-bold tracking-tight text-slate-950">
                Think in paths, not isolated exams
              </h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <Link href="/career-paths/soc-analyst" className="group">
                  <Card className="h-full p-5 transition group-hover:border-blue-300 group-hover:shadow-sm">
                    <Radar className="size-5 text-blue-700" aria-hidden="true" />
                    <h3 className="mt-3 font-bold text-slate-950">SOC Analyst</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">Build toward monitoring, triage, investigation, and incident response.</p>
                  </Card>
                </Link>
                <Link href="/career-paths/penetration-tester" className="group">
                  <Card className="h-full p-5 transition group-hover:border-blue-300 group-hover:shadow-sm">
                    <Crosshair className="size-5 text-blue-700" aria-hidden="true" />
                    <h3 className="mt-3 font-bold text-slate-950">Penetration Tester</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">Move from security foundations into authorized offensive-security work.</p>
                  </Card>
                </Link>
                <Link href="/career-paths/cloud-security-engineer" className="group">
                  <Card className="h-full p-5 transition group-hover:border-blue-300 group-hover:shadow-sm">
                    <Cloud className="size-5 text-blue-700" aria-hidden="true" />
                    <h3 className="mt-3 font-bold text-slate-950">Cloud Security Engineer</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">Connect general security knowledge to cloud identity, infrastructure, monitoring, and data protection.</p>
                  </Card>
                </Link>
                <Link href="/career-paths/grc-and-it-audit" className="group">
                  <Card className="h-full p-5 transition group-hover:border-blue-300 group-hover:shadow-sm">
                    <UserRoundCog className="size-5 text-blue-700" aria-hidden="true" />
                    <h3 className="mt-3 font-bold text-slate-950">GRC and IT Audit</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">Follow a governance, risk, compliance, and assurance-oriented route.</p>
                  </Card>
                </Link>
              </div>
            </section>

            <section aria-labelledby="more-options">
              <h2 id="more-options" className="text-3xl font-bold tracking-tight text-slate-950">
                Other cybersecurity certifications worth considering
              </h2>
              <p className="mt-3 leading-7 text-slate-600">
                These can be strong choices when their platform, training style, or job focus matches your environment.
              </p>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {additionalOptions.map(([name, slug, fit]) => (
                  <Card key={slug} className="p-5">
                    <BookOpenCheck className="size-5 text-blue-700" aria-hidden="true" />
                    <h3 className="mt-3 font-bold text-slate-950">{name}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{fit}</p>
                    <Link
                      href={`/certifications/${slug}`}
                      className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-600"
                    >
                      View details <ArrowRight className="size-4" aria-hidden="true" />
                    </Link>
                  </Card>
                ))}
              </div>
            </section>

            <section aria-labelledby="first-cert">
              <h2 id="first-cert" className="text-3xl font-bold tracking-tight text-slate-950">
                Which cybersecurity certification should you get first?
              </h2>
              <Card className="mt-4 p-6">
                <p className="leading-8 text-slate-700">
                  If you are completely new to cybersecurity, start by strengthening basic computing and networking
                  knowledge, then consider an entry credential such as ISC2 CC or Cisco CCST Cybersecurity. If you already
                  have general IT or networking experience and want a broad vendor-neutral security foundation, Security+
                  is often the more natural next step. From there, let the role you want determine whether you move toward
                  SOC analysis, security administration, penetration testing, cloud security, governance, or advanced
                  architecture.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Link
                    href="/guides/is-security-plus-worth-it"
                    className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 font-semibold text-white hover:bg-blue-500"
                  >
                    Is Security+ worth it? <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                  <Link
                    href="/certifications/cybersecurity"
                    className="inline-flex min-h-11 items-center rounded-xl border border-slate-300 px-5 py-2.5 font-semibold text-slate-800 hover:bg-slate-50"
                  >
                    Browse all cybersecurity certifications
                  </Link>
                </div>
              </Card>
            </section>

            <section className="rounded-3xl bg-slate-950 p-7 text-white sm:p-9" aria-labelledby="next-step">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-300">Build your path</p>
              <h2 id="next-step" className="mt-2 text-3xl font-bold tracking-tight">
                Choose the role first, then choose the certification.
              </h2>
              <p className="mt-3 max-w-2xl leading-7 text-slate-300">
                Certifications are most useful when they support a clear next step. Use Badgely&apos;s career roadmaps to
                connect credentials with the skills and direction you actually want to build.
              </p>
              <Link
                href="/career-paths"
                className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 font-semibold text-white hover:bg-blue-500"
              >
                Explore career paths <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </section>
          </div>

          <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
            <Card className="p-5">
              <h2 className="font-bold text-slate-950">Quick picks</h2>
              <dl className="mt-4 space-y-4 text-sm">
                <div><dt className="font-semibold text-slate-500">New to cyber</dt><dd className="mt-1 text-slate-900">ISC2 CC</dd></div>
                <div><dt className="font-semibold text-slate-500">Broad foundation</dt><dd className="mt-1 text-slate-900">Security+</dd></div>
                <div><dt className="font-semibold text-slate-500">Blue team</dt><dd className="mt-1 text-slate-900">CySA+</dd></div>
                <div><dt className="font-semibold text-slate-500">Security admin</dt><dd className="mt-1 text-slate-900">SSCP</dd></div>
                <div><dt className="font-semibold text-slate-500">Entry pentesting</dt><dd className="mt-1 text-slate-900">eJPT</dd></div>
                <div><dt className="font-semibold text-slate-500">Advanced pentesting</dt><dd className="mt-1 text-slate-900">OSCP</dd></div>
                <div><dt className="font-semibold text-slate-500">Advanced breadth</dt><dd className="mt-1 text-slate-900">CISSP</dd></div>
              </dl>
            </Card>
            <Card className="p-5">
              <ShieldCheck className="size-5 text-blue-700" aria-hidden="true" />
              <h2 className="mt-3 font-bold text-slate-950">No certification guarantees a job</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Pair certification study with labs, projects, troubleshooting, communication skills, and practical
                experience appropriate to the role you want.
              </p>
            </Card>
          </aside>
        </div>
      </article>
    </main>
  );
}
