import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  ExternalLink,
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

const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.aimtocert.com"
).replace(/\/$/, "");

const pageUrl = `${siteUrl}/guides/security-plus-vs-cysa-plus`;

const title =
  "Security+ vs CySA+: Which Should You Choose in 2026? | AimToCert";

const description =
  "Compare CompTIA Security+ and CySA+ in 2026. See differences in experience, exam format, cybersecurity focus, study effort, career fit, and which certification you should take first.";

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
    siteName: "AimToCert",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

const comparison = [
  ["AimToCert level", "Foundational", "Intermediate"],
  ["Vendor focus", "Vendor-neutral", "Vendor-neutral"],
  ["Current exam", "SY0-701", "CS0-004"],
  ["Exam duration", "90 minutes", "165 minutes"],
  ["Question count", "Up to 90", "Up to 85"],
  [
    "Passing score",
    "750 on a 100–900 scale",
    "750 on a 100–900 scale",
  ],
  [
    "Recommended experience",
    "About 2 years in security or systems administration",
    "About 4 years of hands-on information security or equivalent experience",
  ],
  [
    "Primary focus",
    "Broad cybersecurity fundamentals",
    "Security analytics and defensive operations",
  ],
  [
    "AimToCert study estimate",
    "60–120 hours",
    "100–160 hours",
  ],
  [
    "Best fit",
    "Building a broad cybersecurity foundation",
    "SOC, detection, vulnerability management, and incident response",
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
          name: "AimToCert",
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
          name: "Security+ vs CySA+",
          item: pageUrl,
        },
      ],
    },
    {
      "@type": "Article",
      headline:
        "Security+ vs CySA+: Which Should You Choose in 2026?",
      description,
      datePublished: "2026-09-11",
      dateModified: "2026-09-11",
      mainEntityOfPage: pageUrl,
      author: {
        "@type": "Organization",
        name: "AimToCert",
        url: siteUrl,
      },
      publisher: {
        "@type": "Organization",
        name: "AimToCert",
        url: siteUrl,
      },
      about: [
        {
          "@type": "EducationalOccupationalCredential",
          name: "CompTIA Security+",
          credentialCategory: "Professional certification",
          url: `${siteUrl}/certifications/comptia-security-plus`,
        },
        {
          "@type": "EducationalOccupationalCredential",
          name: "CompTIA CySA+",
          credentialCategory: "Professional certification",
          url: `${siteUrl}/certifications/comptia-cysa-plus`,
        },
      ],
    },
  ],
};

export default function SecurityPlusVsCysaPlusGuide() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(
            /</g,
            "\\u003c",
          ),
        }}
      />

      <MarketingHero
        aside={
          <HeroPanel>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-300">
              Quick answer
            </p>

            <h2 className="mt-3 text-2xl font-bold text-white">
              Choose Security+ for cybersecurity breadth. Choose CySA+
              when you are ready to specialize in defensive security
              operations.
            </h2>

            <p className="mt-3 leading-7 text-slate-300">
              These certifications are not direct substitutes.
              Security+ establishes broad security knowledge, while
              CySA+ moves deeper into analyzing threats, monitoring
              environments, managing vulnerabilities, and responding
              to incidents.
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/[0.055] p-4">
                <p className="text-sm text-slate-300">Security+</p>
                <p className="mt-1 font-bold text-white">SY0-701</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.055] p-4">
                <p className="text-sm text-slate-300">CySA+</p>
                <p className="mt-1 font-bold text-white">CS0-004</p>
              </div>
            </div>
          </HeroPanel>
        }
      >
        <div className="flex flex-wrap gap-2">
          <Badge className="bg-blue-500/15 text-blue-100 ring-1 ring-inset ring-blue-400/30">
            AimToCert Guide
          </Badge>

          <Badge className="bg-white/10 text-slate-100">
            Cybersecurity
          </Badge>

          <Badge className="bg-white/10 text-slate-100">
            Comparison
          </Badge>
        </div>

        <h1 className="mt-5 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Security+ vs CySA+
          <span className="block bg-gradient-to-r from-blue-200 via-blue-400 to-blue-600 bg-clip-text text-transparent">
            which should you choose?
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
          A practical comparison of CompTIA Security+ and CompTIA
          CySA+ based on experience, exam structure, technical depth,
          study effort, and the cybersecurity roles each certification
          supports.
        </p>

        <p className="mt-5 text-sm text-slate-400">
          Reviewed against current certification information September
          11, 2026.
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
                  Security+ is generally the better choice when you are
                  building your cybersecurity foundation or moving into
                  security from IT support, networking, or systems
                  administration. CySA+ is better suited to people who
                  already understand core security concepts and want to
                  develop deeper skills in defensive operations,
                  security monitoring, vulnerability management,
                  threat analysis, and incident response.
                </p>

                <p className="mt-4 leading-8 text-slate-700">
                  For many learners, the question is therefore not
                  Security+ <em>or</em> CySA+. A logical progression can
                  be Security+ first and CySA+ later as your hands-on
                  security experience grows.
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
                  Security+ vs CySA+ at a glance
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
                          CompTIA Security+
                        </th>

                        <th className="px-5 py-4 text-sm font-semibold">
                          CompTIA CySA+
                        </th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-200">
                      {comparison.map(
                        ([factor, securityPlus, cysaPlus]) => (
                          <tr key={factor} className="align-top">
                            <th className="bg-slate-50 px-5 py-4 text-sm font-semibold text-slate-600">
                              {factor}
                            </th>

                            <td className="px-5 py-4 text-slate-800">
                              {securityPlus}
                            </td>

                            <td className="px-5 py-4 text-slate-800">
                              {cysaPlus}
                            </td>
                          </tr>
                        ),
                      )}
                    </tbody>
                  </table>
                </div>
              </Card>
            </section>

            <section aria-labelledby="security-plus-fit">
              <h2
                id="security-plus-fit"
                className="text-3xl font-bold tracking-tight text-slate-950"
              >
                Choose Security+ when...
              </h2>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {[
                  "You are building your first broad cybersecurity foundation.",
                  "You are moving into cybersecurity from IT support, networking, systems administration, or another technology role.",
                  "You want exposure to threats, architecture, operations, identity, risk, governance, and security controls before specializing.",
                  "You do not yet have extensive hands-on security operations experience.",
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

            <section aria-labelledby="cysa-fit">
              <h2
                id="cysa-fit"
                className="text-3xl font-bold tracking-tight text-slate-950"
              >
                Choose CySA+ when...
              </h2>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {[
                  "You already understand foundational cybersecurity concepts and want to go deeper.",
                  "You are working toward a SOC analyst, cybersecurity analyst, incident response, or defensive security role.",
                  "You want more emphasis on analyzing security data, identifying malicious activity, and responding to incidents.",
                  "Your work involves SIEM platforms, vulnerability management, security monitoring, detection, investigation, or incident handling.",
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
                <ShieldCheck
                  className="size-6 text-blue-700"
                  aria-hidden="true"
                />

                <h2
                  id="experience"
                  className="text-3xl font-bold tracking-tight text-slate-950"
                >
                  CySA+ assumes considerably more hands-on experience
                </h2>
              </div>

              <Card className="mt-4 p-6">
                <p className="leading-8 text-slate-700">
                  Neither certification requires you to document a
                  specific number of years of professional experience
                  before taking the exam. However, CompTIA publishes
                  recommended experience because the exams target
                  different stages of development.
                </p>

                <p className="mt-4 leading-8 text-slate-700">
                  Security+ is positioned around foundational security
                  skills and recommends experience roughly equivalent
                  to Network+ knowledge plus about two years in a
                  security or systems administrator role. CySA+ goes
                  further and is designed around several years of
                  practical experience performing security analysis,
                  monitoring, vulnerability management, and related
                  defensive work.
                </p>

                <p className="mt-4 leading-8 text-slate-700">
                  That difference matters. Someone can study security
                  concepts from books and labs, but CySA+ expects more
                  comfort interpreting security information and
                  deciding what to do with it.
                </p>
              </Card>
            </section>

            <section aria-labelledby="focus">
              <h2
                id="focus"
                className="text-3xl font-bold tracking-tight text-slate-950"
              >
                The biggest difference is breadth versus analysis
              </h2>

              <div className="mt-4 grid gap-5 md:grid-cols-2">
                <Card className="p-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.14em] text-blue-700">
                    Security+
                  </p>

                  <h3 className="mt-2 text-2xl font-bold text-slate-950">
                    Broad security foundation
                  </h3>

                  <p className="mt-4 leading-7 text-slate-600">
                    Security+ covers a wide range of cybersecurity
                    concepts. You need to understand threats,
                    vulnerabilities, architecture, identity, security
                    operations, governance, risk, cryptography, and
                    security controls.
                  </p>

                  <p className="mt-4 leading-7 text-slate-600">
                    The goal is breadth: understand how the major parts
                    of cybersecurity fit together.
                  </p>
                </Card>

                <Card className="p-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.14em] text-blue-700">
                    CySA+
                  </p>

                  <h3 className="mt-2 text-2xl font-bold text-slate-950">
                    Defensive analysis and operations
                  </h3>

                  <p className="mt-4 leading-7 text-slate-600">
                    CySA+ focuses much more heavily on what security
                    analysts actually do with security information:
                    monitor systems, investigate activity, assess
                    vulnerabilities, analyze indicators, respond to
                    incidents, and communicate findings.
                  </p>

                  <p className="mt-4 leading-7 text-slate-600">
                    The goal is application: use security information
                    to identify and respond to risk.
                  </p>
                </Card>
              </div>
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
                    CompTIA Security+
                  </p>

                  <h3 className="mt-2 text-2xl font-bold text-slate-950">
                    SY0-701
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
                      <dt className="text-slate-500">
                        Passing score
                      </dt>
                      <dd className="text-right font-semibold text-slate-900">
                        750 / 900 scale
                      </dd>
                    </div>

                    <div className="flex justify-between gap-4">
                      <dt className="text-slate-500">
                        Question types
                      </dt>
                      <dd className="text-right font-semibold text-slate-900">
                        Multiple choice + PBQs
                      </dd>
                    </div>
                  </dl>

                  <a
                    href="https://www.comptia.org/certifications/security"
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
                    CompTIA CySA+
                  </p>

                  <h3 className="mt-2 text-2xl font-bold text-slate-950">
                    CS0-004
                  </h3>

                  <dl className="mt-5 space-y-3 text-sm">
                    <div className="flex justify-between gap-4">
                      <dt className="text-slate-500">Duration</dt>
                      <dd className="font-semibold text-slate-900">
                        165 minutes
                      </dd>
                    </div>

                    <div className="flex justify-between gap-4">
                      <dt className="text-slate-500">Questions</dt>
                      <dd className="font-semibold text-slate-900">
                        Up to 85
                      </dd>
                    </div>

                    <div className="flex justify-between gap-4">
                      <dt className="text-slate-500">
                        Passing score
                      </dt>
                      <dd className="text-right font-semibold text-slate-900">
                        750 / 900 scale
                      </dd>
                    </div>

                    <div className="flex justify-between gap-4">
                      <dt className="text-slate-500">
                        Question types
                      </dt>
                      <dd className="text-right font-semibold text-slate-900">
                        Multiple choice + PBQs
                      </dd>
                    </div>
                  </dl>

                  <a
                    href="https://www.comptia.org/certifications/cybersecurity-analyst"
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
              </div>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Exam versions, pricing, delivery options, objectives,
                and policies can change. Verify current information
                with CompTIA before purchasing a voucher or scheduling
                an exam.
              </p>
            </section>

            <section aria-labelledby="version-transition">
              <h2
                id="version-transition"
                className="text-3xl font-bold tracking-tight text-slate-950"
              >
                What if your CySA+ material says CS0-003?
              </h2>

              <Card className="mt-4 p-6">
                <p className="leading-8 text-slate-700">
                  CySA+ is currently transitioning from the CS0-003
                  generation to CS0-004. That means you may still see
                  books, courses, practice exams, or search results
                  labeled CS0-003.
                </p>

                <p className="mt-4 leading-8 text-slate-700">
                  Before beginning a study plan, verify the exact exam
                  version you intend to schedule and make sure your
                  primary study materials match that version. Do not
                  assume older CySA+ objectives and newer objectives
                  are interchangeable simply because they lead to the
                  same CySA+ certification.
                </p>
              </Card>
            </section>

            <section aria-labelledby="study-time">
              <div className="flex items-center gap-3">
                <Clock3
                  className="size-6 text-blue-700"
                  aria-hidden="true"
                />

                <h2
                  id="study-time"
                  className="text-3xl font-bold tracking-tight text-slate-950"
                >
                  How much study time should you expect?
                </h2>
              </div>

              <div className="mt-4 grid gap-5 md:grid-cols-2">
                <Card className="p-6">
                  <p className="text-sm font-semibold text-blue-700">
                    Security+
                  </p>

                  <p className="mt-2 text-2xl font-bold text-slate-950">
                    60–120 hours
                  </p>

                  <p className="mt-3 leading-7 text-slate-600">
                    AimToCert&apos;s estimate assumes you already have
                    basic familiarity with computers, networking, and
                    operating systems. Learners who are also building
                    those fundamentals may need more preparation time.
                  </p>
                </Card>

                <Card className="p-6">
                  <p className="text-sm font-semibold text-blue-700">
                    CySA+
                  </p>

                  <p className="mt-2 text-2xl font-bold text-slate-950">
                    100–160 hours
                  </p>

                  <p className="mt-3 leading-7 text-slate-600">
                    AimToCert&apos;s estimate assumes you already have
                    security fundamentals. Preparation should include
                    practical work with logs, alerts, vulnerability
                    information, incident scenarios, and security
                    analysis rather than memorization alone.
                  </p>
                </Card>
              </div>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                These are AimToCert planning estimates, not requirements
                published by CompTIA. Your existing experience can
                significantly change the amount of preparation you
                need.
              </p>
            </section>

            <section aria-labelledby="which-is-harder">
              <h2
                id="which-is-harder"
                className="text-3xl font-bold tracking-tight text-slate-950"
              >
                Is CySA+ harder than Security+?
              </h2>

              <Card className="mt-4 p-6">
                <p className="leading-8 text-slate-700">
                  For most learners, CySA+ is the more advanced exam.
                  Security+ asks whether you understand a broad set of
                  security concepts and can apply them appropriately.
                  CySA+ expects you to work more deeply with security
                  operations and analysis.
                </p>

                <p className="mt-4 leading-8 text-slate-700">
                  CySA+ also gives candidates considerably more testing
                  time, but the additional time reflects the analytical
                  nature of the exam. You may need to interpret
                  security information, assess what happened, determine
                  risk, and identify an appropriate response.
                </p>

                <p className="mt-4 leading-8 text-slate-700">
                  Difficulty still depends heavily on your background.
                  Someone working in a SOC every day may find CySA+
                  concepts familiar, while someone new to cybersecurity
                  may find the same material considerably more
                  challenging.
                </p>
              </Card>
            </section>

            <section aria-labelledby="take-both">
              <h2
                id="take-both"
                className="text-3xl font-bold tracking-tight text-slate-950"
              >
                Should you take both Security+ and CySA+?
              </h2>

              <Card className="mt-4 p-6">
                <p className="leading-8 text-slate-700">
                  You do not need to earn Security+ before CySA+.
                  CompTIA does not make Security+ a prerequisite for
                  taking the CySA+ exam.
                </p>

                <p className="mt-4 leading-8 text-slate-700">
                  However, Security+ followed by CySA+ can be a logical
                  progression for someone developing toward defensive
                  cybersecurity work. Security+ establishes broad
                  knowledge first. CySA+ can then build on that
                  foundation with deeper emphasis on security
                  operations, analysis, vulnerability management, and
                  incident response.
                </p>

                <p className="mt-4 leading-8 text-slate-700">
                  If you already have substantial security experience,
                  going directly to CySA+ may make more sense. Choose
                  certifications based on the knowledge and roles you
                  need rather than collecting credentials simply
                  because they appear in a particular order.
                </p>
              </Card>
            </section>

            <section aria-labelledby="career-direction">
              <h2
                id="career-direction"
                className="text-3xl font-bold tracking-tight text-slate-950"
              >
                Which one fits your career direction?
              </h2>

              <div className="mt-4 grid gap-5 md:grid-cols-2">
                <Card className="p-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.14em] text-blue-700">
                    Security+ can fit
                  </p>

                  <ul className="mt-4 space-y-3 text-slate-700">
                    {[
                      "Entry-level cybersecurity roles",
                      "Security-focused systems administration",
                      "Network security support",
                      "IT professionals adding security responsibilities",
                      "Learners deciding which cybersecurity specialty to pursue",
                    ].map((item) => (
                      <li key={item} className="flex gap-3">
                        <CheckCircle2
                          className="mt-1 size-5 shrink-0 text-emerald-600"
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </Card>

                <Card className="p-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.14em] text-blue-700">
                    CySA+ can fit
                  </p>

                  <ul className="mt-4 space-y-3 text-slate-700">
                    {[
                      "SOC analyst",
                      "Cybersecurity analyst",
                      "Security operations analyst",
                      "Vulnerability analyst",
                      "Incident response and detection-focused roles",
                    ].map((item) => (
                      <li key={item} className="flex gap-3">
                        <CheckCircle2
                          className="mt-1 size-5 shrink-0 text-blue-700"
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>

              <p className="mt-4 leading-7 text-slate-600">
                A certification does not guarantee a particular job.
                Employers can also evaluate experience, education,
                technical skills, projects, clearance requirements,
                location, and other qualifications.
              </p>
            </section>

            <section aria-labelledby="career-paths">
              <div className="flex items-center gap-3">
                <Route
                  className="size-6 text-blue-700"
                  aria-hidden="true"
                />

                <h2
                  id="career-paths"
                  className="text-3xl font-bold tracking-tight text-slate-950"
                >
                  Connect the certification to a career path
                </h2>
              </div>

              <p className="mt-3 leading-7 text-slate-600">
                Certifications are most useful when they support a
                larger skills plan. Explore AimToCert career roadmaps
                to see how certifications can fit alongside hands-on
                experience and technical skills.
              </p>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {[
                  ["SOC Analyst", "/career-paths/soc-analyst"],
                  [
                    "Cloud Security Engineer",
                    "/career-paths/cloud-security-engineer",
                  ],
                  [
                    "Penetration Tester",
                    "/career-paths/penetration-tester",
                  ],
                  [
                    "GRC and IT Audit",
                    "/career-paths/grc-and-it-audit",
                  ],
                ].map(([name, href]) => (
                  <Link key={href} href={href} className="group">
                    <Card className="h-full p-5 transition group-hover:border-blue-300 group-hover:shadow-sm">
                      <h3 className="font-bold text-slate-950">
                        {name}
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
                ))}
              </div>
            </section>

            <section aria-labelledby="decision">
              <h2
                id="decision"
                className="text-3xl font-bold tracking-tight text-slate-950"
              >
                A simple way to decide
              </h2>

              <div className="mt-4 grid gap-4">
                {[
                  {
                    question:
                      "Are you still building cybersecurity fundamentals?",
                    answer: "Start by evaluating Security+.",
                  },
                  {
                    question:
                      "Do you already understand foundational security concepts?",
                    answer:
                      "Look at your practical experience and target role.",
                  },
                  {
                    question:
                      "Are you pursuing SOC, detection, security analytics, vulnerability management, or incident response work?",
                    answer:
                      "CySA+ is likely the more directly aligned certification.",
                  },
                  {
                    question:
                      "Do you eventually want both breadth and defensive specialization?",
                    answer:
                      "Security+ followed by CySA+ can be a sensible progression.",
                  },
                ].map((item) => (
                  <Card key={item.question} className="p-5">
                    <p className="font-bold text-slate-950">
                      {item.question}
                    </p>

                    <p className="mt-2 leading-7 text-slate-600">
                      {item.answer}
                    </p>
                  </Card>
                ))}
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
                Review Security+ and CySA+ in AimToCert
              </h2>

              <p className="mt-3 max-w-2xl leading-7 text-slate-300">
                Open each certification record for exam details, study
                resources, renewal information, related
                certifications, and official provider links.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/certifications/comptia-security-plus"
                  className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 font-semibold text-white hover:bg-blue-500"
                >
                  Security+ details
                  <ArrowRight
                    className="size-4"
                    aria-hidden="true"
                  />
                </Link>

                <Link
                  href="/certifications/comptia-cysa-plus"
                  className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/20 px-5 py-2.5 font-semibold text-white hover:bg-white/10"
                >
                  CySA+ details
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

              <div className="mt-4 space-y-4 text-sm leading-6">
                <div>
                  <p className="font-semibold text-blue-700">
                    Building your foundation
                  </p>
                  <p className="text-slate-600">
                    Start by evaluating Security+.
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-blue-700">
                    Moving into security analytics
                  </p>
                  <p className="text-slate-600">
                    Evaluate CySA+.
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-blue-700">
                    Want a progression
                  </p>
                  <p className="text-slate-600">
                    Security+ → experience → CySA+ is a logical path
                    for many learners.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-5">
              <h2 className="font-bold text-slate-950">
                Related AimToCert pages
              </h2>

              <nav
                className="mt-4 space-y-3 text-sm font-semibold"
                aria-label="Related guide links"
              >
                <Link
                  href="/guides/is-security-plus-worth-it"
                  className="block text-blue-700 hover:text-blue-600"
                >
                  Is Security+ worth it?
                </Link>

                <Link
                  href="/guides/security-plus-vs-sscp"
                  className="block text-blue-700 hover:text-blue-600"
                >
                  Security+ vs SSCP
                </Link>

                <Link
                  href="/guides/best-cybersecurity-certifications"
                  className="block text-blue-700 hover:text-blue-600"
                >
                  Best cybersecurity certifications
                </Link>

                <Link
                  href="/certifications/cybersecurity"
                  className="block text-blue-700 hover:text-blue-600"
                >
                  Cybersecurity certifications
                </Link>

                <Link
                  href="/certifications"
                  className="block text-blue-700 hover:text-blue-600"
                >
                  Browse certifications
                </Link>
              </nav>
            </Card>
          </aside>
        </div>
      </article>
    </main>
  );
}
