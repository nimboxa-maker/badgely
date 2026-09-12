import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  Mail,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  HeroOption,
  HeroPanel,
  MarketingHero,
} from "@/components/layout/marketing-hero";

const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.aimtocert.com"
).replace(/\/$/, "");

const pageUrl = `${siteUrl}/recertification/request-provider`;

const title = "Request a Certification Provider | AimToCert";

const description =
  "Suggest a certification provider you would like AimToCert to add to its recertification and renewal resources.";

export const metadata: Metadata = {
  title: {
    absolute: title,
  },
  description,
  alternates: {
    canonical: pageUrl,
  },
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title,
    description,
    url: pageUrl,
    type: "website",
    siteName: "AimToCert",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

const requestDetails = [
  {
    icon: Search,
    title: "Certification provider",
    description:
      "Tell us the organization whose certification renewal information you would like to see added.",
  },
  {
    icon: CheckCircle2,
    title: "Certification name",
    description:
      "If possible, include the specific certification or credential you are researching.",
  },
  {
    icon: Sparkles,
    title: "What you need help with",
    description:
      "Let us know whether you are looking for renewal timing, continuing education, fees, exams, or another requirement.",
  },
];

export default function RequestProviderPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Recertification",
        item: `${siteUrl}/recertification`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Request a Provider",
        item: pageUrl,
      },
    ],
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />

      <MarketingHero
        aside={
          <HeroPanel>
            <div className="flex items-center justify-center gap-3 text-center">
              <span className="flex size-11 items-center justify-center rounded-2xl bg-blue-500/15 text-blue-200 ring-1 ring-inset ring-blue-300/25">
                <Search className="size-5" aria-hidden="true" />
              </span>

              <div>
                <h2 className="text-xl font-bold text-white">
                  Help us expand AimToCert
                </h2>

                <p className="mt-1 text-sm text-slate-300">
                  Tell us which provider should be added next.
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              <HeroOption className="flex items-center gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white">
                  <Search className="size-5" aria-hidden="true" />
                </span>

                <div className="flex-1">
                  <p className="font-bold text-white">
                    Request a provider
                  </p>

                  <p className="mt-1 text-sm text-slate-300">
                    Suggest a certification organization we do not yet cover.
                  </p>
                </div>
              </HeroOption>

              <HeroOption className="flex items-center gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-violet-600 text-white">
                  <Sparkles className="size-5" aria-hidden="true" />
                </span>

                <div className="flex-1">
                  <p className="font-bold text-white">
                    Help prioritize new content
                  </p>

                  <p className="mt-1 text-sm text-slate-300">
                    Your request helps us understand what visitors need next.
                  </p>
                </div>
              </HeroOption>

              <HeroOption className="flex items-center gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-600 text-white">
                  <ShieldCheck className="size-5" aria-hidden="true" />
                </span>

                <div className="flex-1">
                  <p className="font-bold text-white">
                    Official sources matter
                  </p>

                  <p className="mt-1 text-sm text-slate-300">
                    We build renewal guidance around provider information.
                  </p>
                </div>
              </HeroOption>
            </div>
          </HeroPanel>
        }
      >
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-300">
          Recertification
        </p>

        <h1 className="mt-5 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Can&apos;t find your provider?
          <span className="block bg-gradient-to-r from-blue-200 via-blue-400 to-blue-600 bg-clip-text text-transparent">
            Tell us what to add next.
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
          AimToCert is continuing to expand its certification renewal coverage.
          If your certification provider is not listed yet, send us a request
          and tell us what you would like to see covered.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href="mailto:team@AimToCert.com?subject=Recertification%20Provider%20Request"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-lg shadow-blue-950/30 transition hover:bg-blue-500"
          >
            <Mail className="size-4" aria-hidden="true" />
            Request a provider
          </a>

          <Link
            href="/recertification"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/[0.03] px-5 py-3 font-semibold text-white transition hover:bg-white/10"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back to recertification
          </Link>
        </div>
      </MarketingHero>

      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-700">
            What to include
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Help us understand what you&apos;re looking for.
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            You do not need to send a long message. A few details are enough
            for us to understand which certification provider and renewal
            information you would like AimToCert to cover.
          </p>
        </div>

        <div className="mt-9 grid gap-5 md:grid-cols-3">
          {requestDetails.map(({ icon: Icon, title: itemTitle, description }) => (
            <Card
              key={itemTitle}
              className="flex h-full flex-col items-center text-center transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
            >
              <span className="flex size-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                <Icon className="size-6" aria-hidden="true" />
              </span>

              <h3 className="mt-5 text-lg font-bold text-slate-950">
                {itemTitle}
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                {description}
              </p>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
          <Card className="overflow-hidden p-0">
            <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
              <div className="bg-slate-950 p-7 text-white sm:p-9">
                <span className="flex size-14 items-center justify-center rounded-2xl bg-blue-500/15 text-blue-300 ring-1 ring-inset ring-blue-300/20">
                  <Mail className="size-6" aria-hidden="true" />
                </span>

                <h2 className="mt-6 text-2xl font-bold">
                  Send your provider request
                </h2>

                <p className="mt-4 leading-7 text-slate-300">
                  Email AimToCert with the certification provider you would
                  like us to research and add to the recertification section.
                </p>

                <p className="mt-5 text-sm text-slate-400">
                  Requests help us prioritize future certification renewal
                  coverage, but submitting a request does not guarantee that a
                  provider will be added immediately.
                </p>
              </div>

              <div className="p-7 sm:p-9">
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-blue-700">
                  Suggested message
                </p>

                <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <p className="font-semibold text-slate-950">
                    Certification provider:
                  </p>

                  <p className="mt-1 text-slate-600">
                    Name of the organization
                  </p>

                  <p className="mt-5 font-semibold text-slate-950">
                    Certification:
                  </p>

                  <p className="mt-1 text-slate-600">
                    Name of the certification or credential
                  </p>

                  <p className="mt-5 font-semibold text-slate-950">
                    Information needed:
                  </p>

                  <p className="mt-1 text-slate-600">
                    Renewal requirements, expiration, continuing education,
                    fees, exams, or another topic
                  </p>
                </div>

                <a
                  href="mailto:team@AimToCert.com?subject=Recertification%20Provider%20Request"
                  className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-3 font-semibold text-white transition hover:bg-blue-800 sm:w-auto"
                >
                  <Mail className="size-4" aria-hidden="true" />
                  Email AimToCert
                </a>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6 sm:p-8">
          <div className="flex flex-col items-center gap-5 text-center lg:flex-row lg:justify-between lg:text-left">
            <div>
              <h2 className="text-2xl font-bold text-slate-950">
                Looking for a provider we already cover?
              </h2>

              <p className="mt-3 max-w-3xl leading-7 text-slate-700">
                Return to the Recertification hub to explore renewal
                information for CompTIA, Cisco, Microsoft, AWS, ISC2, ISACA,
                PMI, GIAC, Red Hat, Google Cloud, and other resources as they
                are added.
              </p>
            </div>

            <Link
              href="/recertification"
              className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-3 font-semibold text-white transition hover:bg-blue-800"
            >
              View recertification
              <ArrowLeft className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}