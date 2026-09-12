import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  BookOpen,
  CalendarClock,
  CircleDollarSign,
  Clock3,
  GraduationCap,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";
import { Card } from "@/components/ui/card";

const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.aimtocert.com"
).replace(/\/$/, "");

const pageUrl = `${siteUrl}/recertification/renewal-glossary`;

const title = "Certification Renewal Terms Explained | AimToCert";

const description =
  "Understand common certification renewal terms including CE, CEU, CPE, PDU, recertification, renewal windows, maintenance fees, and certification cycles.";

export const metadata: Metadata = {
  title: {
    absolute: title,
  },
  description,
  alternates: {
    canonical: pageUrl,
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

const terms = [
  {
    term: "CE",
    fullName: "Continuing Education",
    icon: GraduationCap,
    description:
      "A broad term for approved learning or professional-development activities used by some certification providers to help maintain a credential.",
  },
  {
    term: "CEU",
    fullName: "Continuing Education Unit",
    icon: BookOpen,
    description:
      "A unit used by some organizations to measure participation in qualifying continuing-education activities. The exact meaning and value can vary by provider.",
  },
  {
    term: "CPE",
    fullName: "Continuing Professional Education",
    icon: BadgeCheck,
    description:
      "Professional-development credits commonly used by certification organizations such as ISC2 and ISACA to help certification holders maintain credentials.",
  },
  {
    term: "PDU",
    fullName: "Professional Development Unit",
    icon: GraduationCap,
    description:
      "A unit used by PMI to measure professional learning and other qualifying activities toward certification renewal.",
  },
  {
    term: "Recertification",
    fullName: "Recertification",
    icon: RefreshCw,
    description:
      "The process of renewing or extending a certification by meeting the provider's current requirements before the credential becomes inactive or non-current.",
  },
  {
    term: "Renewal Window",
    fullName: "Renewal Eligibility Window",
    icon: CalendarClock,
    description:
      "The period during which a certification holder is allowed to complete or submit renewal requirements.",
  },
  {
    term: "Certification Cycle",
    fullName: "Certification Maintenance Cycle",
    icon: Clock3,
    description:
      "The period for which a certification remains active or current before renewal, recertification, or maintenance requirements must be completed.",
  },
  {
    term: "Maintenance Fee",
    fullName: "Certification Maintenance Fee",
    icon: CircleDollarSign,
    description:
      "A fee some certification providers require during the certification cycle or as part of maintaining or renewing a credential.",
  },
  {
    term: "Higher-Level Renewal",
    fullName: "Renewal Through a Higher-Level Certification",
    icon: BadgeCheck,
    description:
      "Some providers allow an eligible certification to be renewed when you earn a qualifying higher-level credential.",
  },
  {
    term: "Exam Renewal",
    fullName: "Renewal by Examination",
    icon: ShieldCheck,
    description:
      "A renewal method where the certification holder passes an eligible current exam instead of, or sometimes in combination with, continuing-education activities.",
  },
];

export default function RenewalGlossaryPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
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
            name: "Renewal Glossary",
            item: pageUrl,
          },
        ],
      },
      {
        "@type": "DefinedTermSet",
        "@id": `${pageUrl}#glossary`,
        name: "Certification Renewal Glossary",
        description,
        url: pageUrl,
        hasDefinedTerm: terms.map((item) => ({
          "@type": "DefinedTerm",
          name: item.term,
          alternateName: item.fullName,
          description: item.description,
          inDefinedTermSet: `${pageUrl}#glossary`,
        })),
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

      <section className="border-b border-slate-200 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white">
        <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <Link
            href="/recertification"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-200 transition hover:text-white"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back to Recertification
          </Link>

          <div className="mx-auto mt-10 max-w-3xl text-center">
            <span className="mx-auto flex size-16 items-center justify-center rounded-3xl bg-violet-500/15 text-violet-200 ring-1 ring-inset ring-violet-300/25">
              <BookOpen className="size-8" aria-hidden="true" />
            </span>

            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-blue-300">
              Renewal Help
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Renewal terms
              <span className="block bg-gradient-to-r from-blue-200 via-violet-300 to-blue-500 bg-clip-text text-transparent">
                explained simply.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              CE, CEU, CPE, PDU, renewal windows, maintenance fees, and
              recertification can sound similar. Here&apos;s what the most
              common certification-renewal terms generally mean.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-700">
            Certification glossary
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Understand the language of renewal.
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            Providers do not always use the same terminology. The definitions
            below explain the general concepts, but your certification
            provider&apos;s official policy determines what applies to your
            credential.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {terms.map(({ term, fullName, icon: Icon, description }) => (
            <Card
              key={term}
              className="flex h-full flex-col items-center text-center transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
            >
              <span className="flex size-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                <Icon className="size-6" aria-hidden="true" />
              </span>

              <p className="mt-5 text-sm font-semibold uppercase tracking-[0.14em] text-blue-700">
                {term}
              </p>

              <h3 className="mt-2 text-xl font-bold text-slate-950">
                {fullName}
              </h3>

              <p className="mt-4 leading-7 text-slate-600">
                {description}
              </p>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <Card className="border-blue-200 bg-white">
              <div className="flex flex-col items-center gap-5 text-center sm:flex-row sm:text-left">
                <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                  <ShieldCheck className="size-6" aria-hidden="true" />
                </span>

                <div>
                  <h2 className="text-xl font-bold text-slate-950">
                    Provider rules always come first
                  </h2>

                  <p className="mt-2 leading-7 text-slate-600">
                    A CE, CPE, PDU, renewal fee, or recertification requirement
                    can mean something slightly different from one
                    certification organization to another. Always confirm the
                    rules for your exact credential on the provider&apos;s
                    official website.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-5 rounded-2xl border border-blue-100 bg-blue-50 p-6 text-center sm:p-8 md:flex-row md:text-left">
          <div>
            <h2 className="text-2xl font-bold text-slate-950">
              Ready to check your provider?
            </h2>

            <p className="mt-2 text-slate-700">
              Return to the AimToCert Recertification directory and select
              your certification provider.
            </p>
          </div>

          <Link
            href="/recertification"
            className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-3 font-semibold text-white transition hover:bg-blue-800"
          >
            View providers
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}