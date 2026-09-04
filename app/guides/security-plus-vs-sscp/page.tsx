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
import { HeroPanel, MarketingHero } from "@/components/layout/marketing-hero";

const siteUrl = "https://badgely-alpha.vercel.app";
const pageUrl = `${siteUrl}/guides/security-plus-vs-sscp`;
const title = "Security+ vs SSCP: Which Should You Choose in 2026? | Badgely";
const description =
  "Compare CompTIA Security+ and ISC2 SSCP in 2026. See differences in experience requirements, exam format, study time, career fit, and which certification matches your stage.";

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

const comparison = [
  ["Badgely level", "Foundational", "Intermediate"],
  ["Vendor focus", "Vendor-neutral", "Vendor-neutral"],
  ["Current exam", "SY0-701", "SSCP"],
  ["Exam duration", "90 minutes", "120 minutes"],
  ["Question count", "Up to 90", "100–125 CAT items"],
  ["Passing score", "750 on a 100–900 scale", "700 out of 1000"],
  ["Experience", "Recommended experience; no experience required for the credential itself", "One year of qualifying experience for full certification"],
  ["Badgely study estimate", "60–120 hours", "80–140 hours"],
  ["Best fit", "Broad cybersecurity foundation", "Hands-on security administration and operations"],
] as const;

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Badgely", item: siteUrl },
        { "@type": "ListItem", position: 2, name: "Guides", item: `${siteUrl}/guides` },
        { "@type": "ListItem", position: 3, name: "Security+ vs SSCP", item: pageUrl },
      ],
    },
    {
      "@type": "Article",
      headline: "Security+ vs SSCP: Which Should You Choose in 2026?",
      description,
      datePublished: "2026-09-03",
      dateModified: "2026-09-03",
      mainEntityOfPage: pageUrl,
      author: { "@type": "Organization", name: "Badgely", url: siteUrl },
      publisher: { "@type": "Organization", name: "Badgely", url: siteUrl },
      about: [
        {
          "@type": "EducationalOccupationalCredential",
          name: "CompTIA Security+",
          credentialCategory: "Professional certification",
          url: `${siteUrl}/certifications/comptia-security-plus`,
        },
        {
          "@type": "EducationalOccupationalCredential",
          name: "ISC2 SSCP",
          credentialCategory: "Professional certification",
          url: `${siteUrl}/certifications/isc2-sscp`,
        },
      ],
    },
  ],
};

export default function SecurityPlusVsSscpGuide() {
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
              Quick answer
            </p>
            <h2 className="mt-3 text-2xl font-bold text-white">
              Choose Security+ for a broad foundation. Choose SSCP when you are closer to hands-on security operations.
            </h2>
            <p className="mt-3 leading-7 text-slate-300">
              Both are vendor-neutral, but they serve different stages. Security+ is the cleaner foundational choice for
              many learners entering cybersecurity. SSCP is more practitioner-oriented and requires qualifying experience
              for full ISC2 certification.
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/[0.055] p-4">
                <p className="text-sm text-slate-300">Security+</p>
                <p className="mt-1 font-bold text-white">SY0-701</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.055] p-4">
                <p className="text-sm text-slate-300">SSCP</p>
                <p className="mt-1 font-bold text-white">100–125 CAT items</p>
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
          <Badge className="bg-white/10 text-slate-100">Comparison</Badge>
        </div>
        <h1 className="mt-5 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Security+ vs SSCP
          <span className="block bg-gradient-to-r from-blue-200 via-blue-400 to-blue-600 bg-clip-text text-transparent">
            which should you choose?
          </span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
          A practical comparison of CompTIA Security+ and ISC2 SSCP based on experience, exam structure, study effort,
          and the kind of cybersecurity work each credential supports.
        </p>
        <p className="mt-5 text-sm text-slate-400">
          Reviewed against Badgely certification data verified September 1, 2026.
        </p>
      </MarketingHero>

      <article className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-10">
            <section aria-labelledby="bottom-line">
              <h2 id="bottom-line" className="text-3xl font-bold tracking-tight text-slate-950">
                The bottom line
              </h2>
              <Card className="mt-4 p-6">
                <p className="leading-8 text-slate-700">
                  Security+ is usually the better fit when you are building a broad cybersecurity foundation and want a
                  credential that can support several entry and early-career directions. SSCP is usually the stronger fit
                  when your work is already closer to implementing, monitoring, and administering security controls and
                  infrastructure. The biggest difference is not vendor neutrality—both are vendor-neutral—it is the stage
                  of practitioner experience each credential is designed around.
                </p>
              </Card>
            </section>

            <section aria-labelledby="comparison">
              <div className="flex items-center gap-3">
                <Scale className="size-6 text-blue-700" aria-hidden="true" />
                <h2 id="comparison" className="text-3xl font-bold tracking-tight text-slate-950">
                  Security+ vs SSCP at a glance
                </h2>
              </div>
              <Card className="mt-4 overflow-hidden p-0">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[760px] border-collapse text-left">
                    <thead className="bg-slate-950 text-white">
                      <tr>
                        <th className="px-5 py-4 text-sm font-semibold">Factor</th>
                        <th className="px-5 py-4 text-sm font-semibold">CompTIA Security+</th>
                        <th className="px-5 py-4 text-sm font-semibold">ISC2 SSCP</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {comparison.map(([factor, securityPlus, sscp]) => (
                        <tr key={factor} className="align-top">
                          <th className="bg-slate-50 px-5 py-4 text-sm font-semibold text-slate-600">{factor}</th>
                          <td className="px-5 py-4 text-slate-800">{securityPlus}</td>
                          <td className="px-5 py-4 text-slate-800">{sscp}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </section>

            <section aria-labelledby="security-plus-fit">
              <h2 id="security-plus-fit" className="text-3xl font-bold tracking-tight text-slate-950">
                Choose Security+ when...
              </h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {[
                  "You want a broad introduction to security concepts, threats, architecture, operations, risk, and governance.",
                  "You are moving from IT support, systems, or networking into cybersecurity.",
                  "You want a vendor-neutral foundation before choosing a deeper specialty.",
                  "You are still building hands-on security experience and want the more foundational of the two credentials.",
                ].map((item) => (
                  <Card key={item} className="p-5">
                    <CheckCircle2 className="size-5 text-emerald-600" aria-hidden="true" />
                    <p className="mt-3 leading-7 text-slate-700">{item}</p>
                  </Card>
                ))}
              </div>
            </section>

            <section aria-labelledby="sscp-fit">
              <h2 id="sscp-fit" className="text-3xl font-bold tracking-tight text-slate-950">
                Choose SSCP when...
              </h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {[
                  "Your work already involves security administration, monitoring, access controls, incident response, or systems security.",
                  "You want a practitioner-oriented credential centered on implementing and operating security controls.",
                  "You have, or are actively working toward, the experience needed for full ISC2 certification.",
                  "You want an intermediate next step after building foundational security knowledge.",
                ].map((item) => (
                  <Card key={item} className="p-5">
                    <CheckCircle2 className="size-5 text-blue-700" aria-hidden="true" />
                    <p className="mt-3 leading-7 text-slate-700">{item}</p>
                  </Card>
                ))}
              </div>
            </section>

            <section aria-labelledby="experience">
              <div className="flex items-center gap-3">
                <ShieldCheck className="size-6 text-blue-700" aria-hidden="true" />
                <h2 id="experience" className="text-3xl font-bold tracking-tight text-slate-950">
                  The experience requirement is the biggest practical difference
                </h2>
              </div>
              <Card className="mt-4 p-6">
                <p className="leading-8 text-slate-700">
                  CompTIA recommends Network+ level knowledge and about two years of experience in a security or systems
                  administrator role for Security+, but that experience is guidance rather than a requirement to hold the
                  credential. For full SSCP certification, ISC2 requires one year of cumulative qualifying work experience
                  in one or more SSCP domains. Candidates who pass the SSCP exam without the required experience can become
                  an Associate of ISC2 and then earn the experience within the allowed period.
                </p>
                <a
                  href="https://www.isc2.org/certifications/sscp/sscp-experience-requirements"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-2 font-semibold text-blue-700 hover:text-blue-600"
                >
                  Review ISC2 experience requirements <ExternalLink className="size-4" aria-hidden="true" />
                </a>
              </Card>
            </section>

            <section aria-labelledby="exam-snapshot">
              <h2 id="exam-snapshot" className="text-3xl font-bold tracking-tight text-slate-950">
                Current exam snapshot
              </h2>
              <div className="mt-4 grid gap-5 md:grid-cols-2">
                <Card className="p-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.14em] text-blue-700">CompTIA Security+</p>
                  <h3 className="mt-2 text-2xl font-bold text-slate-950">SY0-701</h3>
                  <dl className="mt-5 space-y-3 text-sm">
                    <div className="flex justify-between gap-4"><dt className="text-slate-500">Duration</dt><dd className="font-semibold text-slate-900">90 minutes</dd></div>
                    <div className="flex justify-between gap-4"><dt className="text-slate-500">Questions</dt><dd className="font-semibold text-slate-900">Up to 90</dd></div>
                    <div className="flex justify-between gap-4"><dt className="text-slate-500">Passing score</dt><dd className="text-right font-semibold text-slate-900">750 / 900 scale</dd></div>
                  </dl>
                  <a
                    href="https://www.comptia.org/certifications/security"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-600"
                  >
                    Official CompTIA source <ExternalLink className="size-4" aria-hidden="true" />
                  </a>
                </Card>

                <Card className="p-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.14em] text-blue-700">ISC2 SSCP</p>
                  <h3 className="mt-2 text-2xl font-bold text-slate-950">SSCP</h3>
                  <dl className="mt-5 space-y-3 text-sm">
                    <div className="flex justify-between gap-4"><dt className="text-slate-500">Duration</dt><dd className="font-semibold text-slate-900">120 minutes</dd></div>
                    <div className="flex justify-between gap-4"><dt className="text-slate-500">Items</dt><dd className="font-semibold text-slate-900">100–125 CAT</dd></div>
                    <div className="flex justify-between gap-4"><dt className="text-slate-500">Passing score</dt><dd className="font-semibold text-slate-900">700 / 1000</dd></div>
                  </dl>
                  <a
                    href="https://www.isc2.org/certifications/sscp/sscp-certification-exam-outline"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-600"
                  >
                    Official ISC2 exam outline <ExternalLink className="size-4" aria-hidden="true" />
                  </a>
                </Card>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-500">
                Exam versions, pricing, delivery options, and policies can change. Verify current information with the
                certification provider before registering.
              </p>
            </section>

            <section aria-labelledby="study-time">
              <div className="flex items-center gap-3">
                <Clock3 className="size-6 text-blue-700" aria-hidden="true" />
                <h2 id="study-time" className="text-3xl font-bold tracking-tight text-slate-950">
                  How much study time should you expect?
                </h2>
              </div>
              <div className="mt-4 grid gap-5 md:grid-cols-2">
                <Card className="p-6">
                  <p className="text-sm font-semibold text-blue-700">Security+</p>
                  <p className="mt-2 text-2xl font-bold text-slate-950">60–120 hours</p>
                  <p className="mt-3 leading-7 text-slate-600">
                    Badgely&apos;s estimate reflects a broad foundational exam. Learners who still need networking and
                    systems fundamentals may need additional preparation time.
                  </p>
                </Card>
                <Card className="p-6">
                  <p className="text-sm font-semibold text-blue-700">SSCP</p>
                  <p className="mt-2 text-2xl font-bold text-slate-950">80–140 hours</p>
                  <p className="mt-3 leading-7 text-slate-600">
                    Badgely&apos;s estimate assumes the learner already has some operational security context. SSCP is
                    experience-oriented, so practice matters as much as reviewing definitions.
                  </p>
                </Card>
              </div>
            </section>

            <section aria-labelledby="take-both">
              <h2 id="take-both" className="text-3xl font-bold tracking-tight text-slate-950">
                Should you take both?
              </h2>
              <Card className="mt-4 p-6">
                <p className="leading-8 text-slate-700">
                  You do not need both simply because they overlap. A sensible sequence for some learners is Security+
                  first to establish breadth, then SSCP after gaining more hands-on security administration experience.
                  But if your experience already lines up with SSCP domains, going directly to SSCP may make more sense.
                  Let your target role and experience level drive the decision rather than collecting credentials for their
                  own sake.
                </p>
              </Card>
            </section>

            <section aria-labelledby="career-paths">
              <div className="flex items-center gap-3">
                <Route className="size-6 text-blue-700" aria-hidden="true" />
                <h2 id="career-paths" className="text-3xl font-bold tracking-tight text-slate-950">
                  Connect the choice to a career path
                </h2>
              </div>
              <p className="mt-3 leading-7 text-slate-600">
                Use the certification comparison as one part of a larger plan. Badgely&apos;s cybersecurity roadmaps can
                help you see where foundational and intermediate credentials fit alongside hands-on skills.
              </p>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {[
                  ["SOC Analyst", "/career-paths/soc-analyst"],
                  ["Cloud Security Engineer", "/career-paths/cloud-security-engineer"],
                  ["Penetration Tester", "/career-paths/penetration-tester"],
                  ["GRC and IT Audit", "/career-paths/grc-and-it-audit"],
                ].map(([name, href]) => (
                  <Link key={href} href={href} className="group">
                    <Card className="h-full p-5 transition group-hover:border-blue-300 group-hover:shadow-sm">
                      <h3 className="font-bold text-slate-950">{name}</h3>
                      <p className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-blue-700">
                        View roadmap <ArrowRight className="size-4" aria-hidden="true" />
                      </p>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>

            <section aria-labelledby="next-step" className="rounded-3xl bg-slate-950 p-7 text-white sm:p-9">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-300">Compare the full records</p>
              <h2 id="next-step" className="mt-2 text-3xl font-bold tracking-tight">
                Review Security+ and SSCP in Badgely
              </h2>
              <p className="mt-3 max-w-2xl leading-7 text-slate-300">
                Open each certification record for exam details, study resources, renewal information, related
                certifications, and official provider links.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/certifications/comptia-security-plus"
                  className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 font-semibold text-white hover:bg-blue-500"
                >
                  Security+ details <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/certifications/isc2-sscp"
                  className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/20 px-5 py-2.5 font-semibold text-white hover:bg-white/10"
                >
                  SSCP details <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </section>
          </div>

          <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
            <Card className="p-5">
              <h2 className="font-bold text-slate-950">Fast decision</h2>
              <div className="mt-4 space-y-4 text-sm leading-6">
                <div>
                  <p className="font-semibold text-blue-700">Earlier in your security path</p>
                  <p className="text-slate-600">Start by evaluating Security+.</p>
                </div>
                <div>
                  <p className="font-semibold text-blue-700">Already doing security operations</p>
                  <p className="text-slate-600">Evaluate SSCP and its experience requirement.</p>
                </div>
              </div>
            </Card>

            <Card className="p-5">
              <h2 className="font-bold text-slate-950">Related Badgely pages</h2>
              <nav className="mt-4 space-y-3 text-sm font-semibold" aria-label="Related guide links">
                <Link href="/guides/is-security-plus-worth-it" className="block text-blue-700 hover:text-blue-600">
                  Is Security+ worth it?
                </Link>
                <Link href="/certifications/cybersecurity" className="block text-blue-700 hover:text-blue-600">
                  Cybersecurity certifications
                </Link>
                <Link href="/guides" className="block text-blue-700 hover:text-blue-600">
                  All Badgely Guides
                </Link>
              </nav>
            </Card>
          </aside>
        </div>
      </article>
    </main>
  );
}
