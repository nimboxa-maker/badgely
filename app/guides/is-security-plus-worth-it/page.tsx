import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock3,
  ExternalLink,
  Route,
  ShieldCheck,
  XCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { HeroPanel, MarketingHero } from "@/components/layout/marketing-hero";

const siteUrl = "https://badgely-alpha.vercel.app";
const pageUrl = `${siteUrl}/guides/is-security-plus-worth-it`;
const title = "Is CompTIA Security+ Worth It in 2026? | Badgely";
const description =
  "See who CompTIA Security+ fits in 2026, when it may not be the right first certification, what SY0-701 covers, how long to study, and where it can lead next.";

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

const domains = [
  ["General Security Concepts", "12%"],
  ["Threats, Vulnerabilities, and Mitigations", "22%"],
  ["Security Architecture", "18%"],
  ["Security Operations", "28%"],
  ["Security Program Management and Oversight", "20%"],
] as const;

const careerPaths = [
  ["SOC Analyst", "/career-paths/soc-analyst"],
  ["Penetration Tester", "/career-paths/penetration-tester"],
  ["Cloud Security Engineer", "/career-paths/cloud-security-engineer"],
  ["GRC and IT Audit", "/career-paths/grc-and-it-audit"],
] as const;

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Badgely", item: siteUrl },
        { "@type": "ListItem", position: 2, name: "Guides", item: `${siteUrl}/guides` },
        { "@type": "ListItem", position: 3, name: "Is CompTIA Security+ worth it in 2026?", item: pageUrl },
      ],
    },
    {
      "@type": "Article",
      headline: "Is CompTIA Security+ Worth It in 2026?",
      description,
      datePublished: "2026-09-03",
      dateModified: "2026-09-03",
      mainEntityOfPage: pageUrl,
      author: { "@type": "Organization", name: "Badgely", url: siteUrl },
      publisher: { "@type": "Organization", name: "Badgely", url: siteUrl },
      about: {
        "@type": "EducationalOccupationalCredential",
        name: "CompTIA Security+",
        credentialCategory: "Professional certification",
        url: `${siteUrl}/certifications/comptia-security-plus`,
      },
    },
  ],
};

export default function SecurityPlusWorthItGuide() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <MarketingHero
        aside={
          <HeroPanel>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-300">Quick answer</p>
            <h2 className="mt-3 text-2xl font-bold text-white">Security+ can be a strong first cybersecurity certification.</h2>
            <p className="mt-3 leading-7 text-slate-300">
              It makes the most sense when you already understand basic IT and networking and want a broad,
              vendor-neutral security foundation. It is a starting point—not a substitute for hands-on practice or
              experience.
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/[0.055] p-4">
                <p className="text-sm text-slate-300">Current exam</p>
                <p className="mt-1 font-bold text-white">SY0-701</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.055] p-4">
                <p className="text-sm text-slate-300">Badgely study estimate</p>
                <p className="mt-1 font-bold text-white">60–120 hours</p>
              </div>
            </div>
          </HeroPanel>
        }
      >
        <div className="flex flex-wrap gap-2">
          <Badge className="bg-blue-500/15 text-blue-100 ring-1 ring-inset ring-blue-400/30">Badgely Guide</Badge>
          <Badge className="bg-white/10 text-slate-100">Cybersecurity</Badge>
        </div>
        <h1 className="mt-5 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Is CompTIA Security+
          <span className="block bg-gradient-to-r from-blue-200 via-blue-400 to-blue-600 bg-clip-text text-transparent">
            worth it in 2026?
          </span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
          A practical look at who Security+ fits, when another first step may make more sense, what the current exam
          covers, and how the credential can fit into a longer cybersecurity path.
        </p>
        <p className="mt-5 text-sm text-slate-400">Reviewed against Badgely certification data verified September 1, 2026.</p>
      </MarketingHero>

      <article className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-10">
            <section aria-labelledby="bottom-line">
              <h2 id="bottom-line" className="text-3xl font-bold tracking-tight text-slate-950">The bottom line</h2>
              <Card className="mt-4 p-6">
                <p className="leading-8 text-slate-700">
                  Security+ is a good fit for many people moving from general IT into cybersecurity because it covers a
                  broad set of foundational security skills without tying them to one vendor. Badgely classifies it as a
                  foundational, vendor-neutral certification. That makes it useful as a bridge into security-focused
                  roles, but earning the credential by itself does not guarantee a job.
                </p>
              </Card>
            </section>

            <section aria-labelledby="who-fit">
              <h2 id="who-fit" className="text-3xl font-bold tracking-tight text-slate-950">Who Security+ fits well</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {[
                  "You understand basic networking and operating-system concepts and want to move into security.",
                  "You work in IT support, systems, or networking and security is becoming part of your responsibilities.",
                  "You want a vendor-neutral foundation before choosing a deeper specialty.",
                  "You are targeting paths such as SOC analysis, security administration, cloud security, or GRC.",
                ].map((item) => (
                  <Card key={item} className="p-5">
                    <CheckCircle2 className="size-5 text-emerald-600" aria-hidden="true" />
                    <p className="mt-3 leading-7 text-slate-700">{item}</p>
                  </Card>
                ))}
              </div>
            </section>

            <section aria-labelledby="not-first">
              <h2 id="not-first" className="text-3xl font-bold tracking-tight text-slate-950">When it may not be your best first step</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {[
                  "You are completely new to computers and networking. Building basic IT fundamentals first may make Security+ much easier to understand.",
                  "You already have strong security experience and need a credential focused on a specific advanced role rather than broad fundamentals.",
                  "You are choosing a certification only because you expect it to replace projects, labs, troubleshooting practice, or work experience.",
                  "Your target role requires a very specific vendor or platform credential and Security+ is not part of that plan.",
                ].map((item) => (
                  <Card key={item} className="p-5">
                    <XCircle className="size-5 text-slate-500" aria-hidden="true" />
                    <p className="mt-3 leading-7 text-slate-700">{item}</p>
                  </Card>
                ))}
              </div>
            </section>

            <section aria-labelledby="exam-snapshot">
              <h2 id="exam-snapshot" className="text-3xl font-bold tracking-tight text-slate-950">Current Security+ exam snapshot</h2>
              <Card className="mt-4 overflow-hidden p-0">
                <dl className="divide-y divide-slate-200">
                  {[
                    ["Exam code", "SY0-701"],
                    ["Questions", "Up to 90"],
                    ["Time", "90 minutes"],
                    ["Passing score", "750 on a 100–900 scale"],
                    ["Delivery", "Pearson VUE testing center or online proctored exam"],
                    ["U.S. retail price", "$439 USD; regional pricing may vary"],
                  ].map(([label, value]) => (
                    <div key={label} className="grid gap-1 px-6 py-4 sm:grid-cols-[180px_1fr]">
                      <dt className="font-semibold text-slate-500">{label}</dt>
                      <dd className="text-slate-900">{value}</dd>
                    </div>
                  ))}
                </dl>
              </Card>
              <p className="mt-3 text-sm leading-6 text-slate-500">
                Exam pricing, availability, policies, and exam versions can change. Confirm current details with CompTIA
                and Pearson VUE before registering.
              </p>
            </section>

            <section aria-labelledby="domains">
              <h2 id="domains" className="text-3xl font-bold tracking-tight text-slate-950">What SY0-701 emphasizes</h2>
              <p className="mt-3 max-w-3xl leading-7 text-slate-600">
                The largest single domain is Security Operations, but the exam is intentionally broad. You need to be
                comfortable connecting technical controls, threats, architecture, operations, risk, and governance.
              </p>
              <div className="mt-5 space-y-3">
                {domains.map(([name, weight]) => (
                  <div key={name} className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white px-5 py-4">
                    <span className="font-semibold text-slate-900">{name}</span>
                    <span className="shrink-0 font-bold text-blue-700">{weight}</span>
                  </div>
                ))}
              </div>
            </section>

            <section aria-labelledby="study-time">
              <h2 id="study-time" className="text-3xl font-bold tracking-tight text-slate-950">How long should you expect to study?</h2>
              <Card className="mt-4 p-6">
                <div className="flex items-start gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
                    <Clock3 className="size-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-xl font-bold text-slate-950">Badgely estimate: 60–120 hours</p>
                    <p className="mt-2 leading-7 text-slate-600">
                      Your actual time depends on your networking, systems, and security background. Someone already
                      working in IT may move faster; a beginner may need additional time to build prerequisite knowledge
                      instead of memorizing security terms in isolation.
                    </p>
                  </div>
                </div>
              </Card>
            </section>

            <section aria-labelledby="career-paths">
              <h2 id="career-paths" className="text-3xl font-bold tracking-tight text-slate-950">Where Security+ can lead next</h2>
              <p className="mt-3 leading-7 text-slate-600">
                In Badgely&apos;s current roadmap data, Security+ appears in four different career paths. That is a useful
                signal of its breadth: the same foundation can support technical, cloud, offensive-security, and
                governance directions.
              </p>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {careerPaths.map(([name, href]) => (
                  <Link key={href} href={href} className="group">
                    <Card className="h-full p-5 transition group-hover:border-blue-300 group-hover:shadow-sm">
                      <Route className="size-5 text-blue-700" aria-hidden="true" />
                      <h3 className="mt-3 font-bold text-slate-950">{name}</h3>
                      <p className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-blue-700">
                        View roadmap <ArrowRight className="size-4" aria-hidden="true" />
                      </p>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>

            <section aria-labelledby="pair-with">
              <h2 id="pair-with" className="text-3xl font-bold tracking-tight text-slate-950">What should you pair with Security+?</h2>
              <p className="mt-3 leading-7 text-slate-600">
                Treat the certification as a knowledge framework. Pair the study with practical work: networking and
                operating-system troubleshooting, identity and access-control exercises, log review, vulnerability
                management practice, security configuration, and incident-response scenarios. The goal is to understand
                how the concepts behave in real environments—not just recognize definitions on a test.
              </p>
            </section>

            <section aria-labelledby="next-step" className="rounded-3xl bg-slate-950 p-7 text-white sm:p-9">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-300">Your next step</p>
              <h2 id="next-step" className="mt-2 text-3xl font-bold tracking-tight">Explore the full Security+ record</h2>
              <p className="mt-3 max-w-2xl leading-7 text-slate-300">
                Review the detailed exam record, official resources, renewal information, related certifications, and
                verified source links before deciding how Security+ fits your plan.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/certifications/comptia-security-plus"
                  className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 font-semibold text-white hover:bg-blue-500"
                >
                  Security+ certification details <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/certifications/cybersecurity"
                  className="inline-flex min-h-11 items-center rounded-xl border border-white/20 px-5 py-2.5 font-semibold text-white hover:bg-white/10"
                >
                  Explore cybersecurity certifications
                </Link>
              </div>
            </section>
          </div>

          <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
            <Card className="p-5">
              <h2 className="font-bold text-slate-950">Security+ at a glance</h2>
              <dl className="mt-4 space-y-4 text-sm">
                <div><dt className="font-semibold text-slate-500">Level</dt><dd className="mt-1 text-slate-900">Foundational</dd></div>
                <div><dt className="font-semibold text-slate-500">Type</dt><dd className="mt-1 text-slate-900">Vendor-neutral</dd></div>
                <div><dt className="font-semibold text-slate-500">Current exam</dt><dd className="mt-1 text-slate-900">SY0-701</dd></div>
                <div><dt className="font-semibold text-slate-500">Recommended background</dt><dd className="mt-1 leading-6 text-slate-900">Network+ level knowledge and about two years in a security or systems administrator role, according to CompTIA&apos;s recommendation.</dd></div>
              </dl>
            </Card>

            <Card className="p-5">
              <h2 className="font-bold text-slate-950">Continue learning</h2>
              <div className="mt-4 space-y-3">
                <Link href="/courses" className="flex items-center justify-between gap-3 font-semibold text-blue-700 hover:text-blue-600">
                  Courses <BookOpen className="size-4" aria-hidden="true" />
                </Link>
                <Link href="/study-store" className="flex items-center justify-between gap-3 font-semibold text-blue-700 hover:text-blue-600">
                  Study resources <BookOpen className="size-4" aria-hidden="true" />
                </Link>
                <Link href="/guides" className="flex items-center justify-between gap-3 font-semibold text-blue-700 hover:text-blue-600">
                  More Badgely Guides <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </Card>

            <Card className="p-5">
              <h2 className="font-bold text-slate-950">Official source</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Always verify current exam details directly with CompTIA before purchasing or scheduling.
              </p>
              <a
                href="https://www.comptia.org/certifications/security"
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-2 font-semibold text-blue-700 hover:text-blue-600"
              >
                CompTIA Security+ <ExternalLink className="size-4" aria-hidden="true" />
              </a>
            </Card>

            <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5 text-sm leading-6 text-blue-950">
              <div className="flex items-center gap-2 font-bold"><ShieldCheck className="size-4" aria-hidden="true" /> Independent guidance</div>
              <p className="mt-2">Badgely is not CompTIA and does not issue the Security+ certification.</p>
            </div>
          </aside>
        </div>
      </article>
    </main>
  );
}
