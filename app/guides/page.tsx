import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, BriefcaseBusiness, Compass, Network, Scale, ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/card";
import { HeroOption, HeroPanel, MarketingHero } from "@/components/layout/marketing-hero";

const description =
  "Practical IT certification guides that help you decide what to pursue, how certifications compare, and where each credential fits in a career path.";

export const metadata: Metadata = {
  title: "IT Certification Guides | Badgely",
  description,
  alternates: {
    canonical: "/guides",
  },
  openGraph: {
    title: "IT Certification Guides | Badgely",
    description,
    url: "/guides",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "IT Certification Guides | Badgely",
    description,
  },
};

export default function GuidesPage() {
  return (
    <main>
      <MarketingHero
        aside={
          <HeroPanel>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-300">Featured guide</p>
            <h2 className="mt-3 text-2xl font-bold text-white">Is CompTIA Security+ worth it in 2026?</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              See who Security+ fits, when it may not be the right first step, what the current exam looks like,
              and where it can lead next.
            </p>
            <Link href="/guides/is-security-plus-worth-it" className="mt-5 block">
              <HeroOption className="flex items-center gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white">
                  <ShieldCheck className="size-5" aria-hidden="true" />
                </span>
                <div className="flex-1">
                  <p className="font-bold text-white">Read the Security+ guide</p>
                  <p className="mt-1 text-sm text-slate-300">A decision guide, not just exam facts.</p>
                </div>
                <ArrowRight className="size-5 text-blue-200" aria-hidden="true" />
              </HeroOption>
            </Link>
          </HeroPanel>
        }
      >
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-300">Badgely Guides</p>
        <h1 className="mt-5 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Make better
          <span className="block bg-gradient-to-r from-blue-200 via-blue-400 to-blue-600 bg-clip-text text-transparent">
            certification decisions.
          </span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
          Practical guides for choosing certifications, comparing options, and connecting credentials to real IT
          career paths.
        </p>
        <div className="mt-8 flex flex-wrap gap-x-7 gap-y-3 text-sm text-slate-300">
          <span className="inline-flex items-center gap-2"><Compass className="size-4 text-blue-300" /> Decision-focused</span>
          <span className="inline-flex items-center gap-2"><BookOpen className="size-4 text-blue-300" /> Connected to Badgely data</span>
        </div>
      </MarketingHero>

      <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-700">Start here</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">Featured certification guides</h2>
          <p className="mt-3 leading-7 text-slate-600">
            Each guide is designed to answer a specific decision question and then connect you to deeper certification,
            career-path, training, and study-resource pages.
          </p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <Card className="p-6">
            <div className="flex items-center gap-3">
              <span className="flex size-11 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
                <ShieldCheck className="size-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-semibold text-blue-700">Cybersecurity</p>
                <h3 className="text-xl font-bold text-slate-950">Is CompTIA Security+ worth it in 2026?</h3>
              </div>
            </div>
            <p className="mt-4 leading-7 text-slate-600">
              A balanced look at who Security+ fits, the current SY0-701 exam, study expectations, and the career paths
              it can support.
            </p>
            <Link
              href="/guides/is-security-plus-worth-it"
              className="mt-5 inline-flex items-center gap-2 font-semibold text-blue-700 hover:text-blue-600"
            >
              Read guide <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3">
              <span className="flex size-11 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
                <Network className="size-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-semibold text-blue-700">Networking</p>
                <h3 className="text-xl font-bold text-slate-950">CCNA vs Network+: Which should you choose?</h3>
              </div>
            </div>
            <p className="mt-4 leading-7 text-slate-600">
              Compare vendor-neutral breadth with deeper Cisco-oriented networking and decide which certification best
              matches your starting point and career goal.
            </p>
            <Link
              href="/guides/ccna-vs-network-plus"
              className="mt-5 inline-flex items-center gap-2 font-semibold text-blue-700 hover:text-blue-600"
            >
              Read comparison <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3">
              <span className="flex size-11 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
                <Scale className="size-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-semibold text-blue-700">Cybersecurity comparison</p>
                <h3 className="text-xl font-bold text-slate-950">Security+ vs SSCP: Which should you choose?</h3>
              </div>
            </div>
            <p className="mt-4 leading-7 text-slate-600">
              Compare a broad foundational security credential with a practitioner-oriented certification that includes
              an experience requirement for full certification.
            </p>
            <Link
              href="/guides/security-plus-vs-sscp"
              className="mt-5 inline-flex items-center gap-2 font-semibold text-blue-700 hover:text-blue-600"
            >
              Read comparison <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3">
              <span className="flex size-11 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
                <BriefcaseBusiness className="size-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-semibold text-blue-700">Advanced security & management</p>
                <h3 className="text-xl font-bold text-slate-950">CISSP vs CISM: Which should you choose?</h3>
              </div>
            </div>
            <p className="mt-4 leading-7 text-slate-600">
              Compare broad security leadership and architecture coverage with a credential focused more directly on
              governance, risk, security programs, and management responsibilities.
            </p>
            <Link
              href="/guides/cissp-vs-cism"
              className="mt-5 inline-flex items-center gap-2 font-semibold text-blue-700 hover:text-blue-600"
            >
              Read comparison <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </Card>
        </div>
      </section>
    </main>
  );
}
