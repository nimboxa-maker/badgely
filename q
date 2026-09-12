import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  BookOpen,
  CalendarClock,
  CheckCircle2,
  Clock3,
  GraduationCap,
  RefreshCw,
  Search,
  ShieldCheck,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  HeroOption,
  HeroPanel,
  MarketingHero,
} from "@/components/layout/marketing-hero";

export const metadata: Metadata = {
  title: "IT Certification Recertification & Renewal | ThirdBadge",
  description:
    "Understand IT certification renewal, recertification, continuing education, CPE and CE requirements, renewal fees, and expiration timelines.",
};

const providers = [
  {
    name: "CompTIA",
    slug: "comptia",
    description:
      "Explore CompTIA renewal options, Continuing Education requirements, renewal activities, and certification maintenance.",
    focus: "Continuing Education & Renewal",
    logo: "/vendors/comptia.png",
  },
  {
    name: "Cisco",
    slug: "cisco",
    description:
      "Explore Cisco recertification requirements, Continuing Education options, exams, and certification renewal paths.",
    focus: "Recertification",
    logo: "/vendors/cisco.png",
  },
  {
    name: "Microsoft",
    slug: "microsoft",
    description:
      "Understand Microsoft certification renewal, eligibility, online renewal assessments, and credential maintenance.",
    focus: "Certification Renewal",
    logo: "/vendors/microsoft.png",
  },
  {
    name: "AWS",
    slug: "aws",
    description:
      "Review AWS certification validity periods, recertification options, and ways to keep AWS credentials current.",
    focus: "Recertification",
    logo: "/vendors/aws.png",
  },
  {
    name: "ISC2",
    slug: "isc2",
    description:
      "Understand ISC2 CPE requirements, annual maintenance expectations, renewal cycles, and credential maintenance.",
    focus: "CPE & Maintenance",
    logo: "/vendors/isc2.png",
  },
  {
    name: "ISACA",
    slug: "isaca",
    description:
      "Review ISACA Continuing Professional Education requirements and renewal expectations for professional certifications.",
    focus: "CPE & Renewal",
    logo: "/vendors/isaca.png",
  },
  {
    name: "PMI",
    slug: "pmi",
    description:
      "Understand PMI Professional Development Units, certification renewal cycles, and Continuing Certification Requirements.",
    focus: "PDU & Renewal",
    logo: "/vendors/pmi.png",
  },
  {
    name: "GIAC",
    slug: "giac",
    description:
      "Explore GIAC certification renewal, certification maintenance, continuing professional experience, and recertification options.",
    focus: "Certification Renewal",
    logo: "/vendors/giac.png",
  },
  {
    name: "Red Hat",
    slug: "red-hat",
    description:
      "Review Red Hat certification validity, credential currency, and options for maintaining current certifications.",
    focus: "Certification Currency",
    logo: "/vendors/red-hat.png",
  },
  {
    name: "Google Cloud",
    slug: "google-cloud",
    description:
      "Understand Google Cloud certification validity periods, recertification requirements, and renewal expectations.",
    focus: "Recertification",
    logo: "/vendors/google-cloud.png",
  },
];

const renewalQuestions = [
  {
    icon: CalendarClock,
    title: "When does my certification expire?",
    description:
      "Understand the certification validity period and when you should begin preparing for renewal.",
  },
  {
    icon: GraduationCap,
    title: "What counts toward renewal?",
    description:
      "Identify continuing education, training, exams, professional activities, or other approved renewal options.",
  },
  {
    icon: Award,
    title: "Do I need to retake an exam?",
    description:
      "See whether your certification can be renewed through education or whether a current exam is required.",
  },
  {
    icon: Clock3,
    title: "How much time do I have?",
    description:
      "Understand renewal windows, submission deadlines, and when renewal activities must be completed.",
  },
];

export default function RecertificationPage() {
  return (
    <main>
      <MarketingHero
        aside={
          <HeroPanel>
            <div className="flex items-center justify-center gap-3 text-center">
              <span className="flex size-11 items-center justify-center rounded-2xl bg-blue-500/15 text-blue-200 ring-1 ring-inset ring-blue-300/25">
                <RefreshCw className="size-5" aria-hidden="true" />
              </span>

              <div>
                <h2 className="text-xl font-bold text-white">
                  Keep your certification current
                </h2>

                <p className="mt-1 text-sm text-slate-300">
                  Start with the certification provider.
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              <HeroOption className="flex items-center gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white">
                  <CalendarClock className="size-5" aria-hidden="true" />
                </span>

                <div className="flex-1">
                  <p className="font-bold text-white">
                    Check renewal timing
                  </p>

                  <p className="mt-1 text-sm text-slate-300">
                    Know when your credential needs attention.
                  </p>
                </div>
              </HeroOption>

              <HeroOption className="flex items-center gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-violet-600 text-white">
                  <GraduationCap className="size-5" aria-hidden="true" />
                </span>

                <div className="flex-1">
                  <p className="font-bold text-white">
                    Understand CE, CPE, and PDU options
                  </p>

                  <p className="mt-1 text-sm text-slate-300">
                    Learn what professional development may count.
                  </p>
                </div>
              </HeroOption>

              <HeroOption className="flex items-center gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-600 text-white">
                  <CheckCircle2 className="size-5" aria-hidden="true" />
                </span>

                <div className="flex-1">
                  <p className="font-bold text-white">
                    Review provider requirements
                  </p>

                  <p className="mt-1 text-sm text-slate-300">
                    Compare how major certification providers handle renewal.
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
          Earned the certification?
          <span className="block bg-gradient-to-r from-blue-200 via-blue-400 to-blue-600 bg-clip-text text-transparent">
            Keep it current.
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
          Understand renewal requirements, continuing education, expiration
          timelines, fees, and recertification options before your credential
          expires.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href="#providers"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-lg shadow-blue-950/30 transition hover:bg-blue-500"
          >
            Explore providers
            <ArrowRight className="size-4" aria-hidden="true" />
          </a>

          <Link
            href="/certifications"
            className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/25 bg-white/[0.03] px-5 py-3 font-semibold text-white transition hover:bg-white/10"
          >
            Browse certifications
          </Link>
        </div>

        <div className="mt-9 flex flex-wrap gap-x-7 gap-y-3 text-sm text-slate-300">
          <span className="inline-flex items-center gap-2">
            <ShieldCheck className="size-4 text-blue-300" />
            Independent guidance
          </span>

          <span className="inline-flex items-center gap-2">
            <CalendarClock className="size-4 text-blue-300" />
            Renewal timing
          </span>

          <span className="inline-flex items-center gap-2">
            <RefreshCw className="size-4 text-blue-300" />
            Recertification options
          </span>
        </div>
      </MarketingHero>

      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-700">
            Renewal questions
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Know what happens after you earn the badge.
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            Certification renewal varies by provider. ThirdBadge helps you
            understand what to check before your credential approaches
            expiration.
          </p>
        </div>

        <div className="mt-9 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {renewalQuestions.map(({ icon: Icon, title, description }) => (
            <Card
              key={title}
              className="flex h-full flex-col items-center text-center transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
            >
              <span className="flex size-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                <Icon className="size-6" aria-hidden="true" />
              </span>

              <h3 className="mt-5 text-lg font-bold text-slate-950">
                {title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                {description}
              </p>
            </Card>
          ))}
        </div>
      </section>

      <section
        id="providers"
        className="border-y border-slate-200 bg-slate-50"
      >
        <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-700">
              Certification providers
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Explore renewal by provider.
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              Choose your certification provider to review renewal
              requirements, timelines, continuing education options, and
              official resources.
            </p>
          </div>

          <div className="mt-9 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {providers.map((provider) => (
              <Link
                key={provider.slug}
                href={`/recertification/${provider.slug}`}
                className="group block h-full rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-700"
              >
                <Card className="flex h-full flex-col items-center text-center transition group-hover:-translate-y-1 group-hover:border-blue-300 group-hover:shadow-xl">
                  <div className="flex min-h-32 w-full items-center justify-center rounded-2xl border border-slate-100 bg-white p-5">
                    <Image
                      src={provider.logo}
                      alt={`${provider.name} logo`}
                      width={150}
                      height={90}
                      className="max-h-20 max-w-[170px] object-contain"
                    />
                  </div>

                  <p className="mt-5 text-sm font-semibold uppercase tracking-[0.12em] text-blue-700">
                    {provider.focus}
                  </p>

                  <h3 className="mt-2 text-2xl font-bold text-slate-950">
                    {provider.name}
                  </h3>

                  <p className="mt-4 leading-7 text-slate-600">
                    {provider.description}
                  </p>

                  <div className="mt-auto pt-6">
                    <span className="inline-flex items-center gap-2 font-semibold text-blue-700 transition group-hover:text-blue-900">
                      View renewal information
                      <ArrowRight
                        className="size-4 transition group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                </Card>
              </Link>
            ))}

            <Link
              href="/recertification/request-provider"
              className="group block h-full rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-700"
            >
              <Card className="flex h-full flex-col items-center border-dashed border-blue-200 bg-blue-50/40 text-center transition group-hover:-translate-y-1 group-hover:border-blue-400 group-hover:shadow-xl">
                <div className="flex min-h-32 w-full items-center justify-center rounded-2xl border border-blue-100 bg-white p-5">
                  <span className="flex size-20 items-center justify-center rounded-3xl bg-blue-100 text-blue-700">
                    <Search className="size-10" aria-hidden="true" />
                  </span>
                </div>

                <p className="mt-5 text-sm font-semibold uppercase tracking-[0.12em] text-blue-700">
                  More Providers
                </p>

                <h3 className="mt-2 text-2xl font-bold text-slate-950">
                  Can&apos;t find your provider?
                </h3>

                <p className="mt-4 leading-7 text-slate-600">
                  ThirdBadge is continuing to expand its recertification
                  coverage. Tell us which certification provider you would like
                  to see added next.
                </p>

                <div className="mt-auto pt-6">
                  <span className="inline-flex items-center gap-2 font-semibold text-blue-700 transition group-hover:text-blue-900">
                    Request a provider
                    <ArrowRight
                      className="size-4 transition group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </Card>
            </Link>

            <Link
              href="/recertification/renewal-glossary"
              className="group block h-full rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-700"
            >
              <Card className="flex h-full flex-col items-center border-dashed border-violet-200 bg-violet-50/40 text-center transition group-hover:-translate-y-1 group-hover:border-violet-400 group-hover:shadow-xl">
                <div className="flex min-h-32 w-full items-center justify-center rounded-2xl border border-violet-100 bg-white p-5">
                  <span className="flex size-20 items-center justify-center rounded-3xl bg-violet-100 text-violet-700">
                    <BookOpen className="size-10" aria-hidden="true" />
                  </span>
                </div>

                <p className="mt-5 text-sm font-semibold uppercase tracking-[0.12em] text-violet-700">
                  Renewal Help
                </p>

                <h3 className="mt-2 text-2xl font-bold text-slate-950">
                  Renewal Terms Explained
                </h3>

                <p className="mt-4 leading-7 text-slate-600">
                  Confused by CE, CEU, CPE, PDU, maintenance fees, renewal
                  windows, or recertification? Learn what the most common
                  renewal terms mean.
                </p>

                <div className="mt-auto pt-6">
                  <span className="inline-flex items-center gap-2 font-semibold text-violet-700 transition group-hover:text-violet-900">
                    Explore renewal terms
                    <ArrowRight
                      className="size-4 transition group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6 sm:p-8">
          <div className="flex flex-col items-center gap-5 text-center lg:flex-row lg:justify-between lg:text-left">
            <div>
              <h2 className="text-2xl font-bold text-slate-950">
                Renewal policies can change.
              </h2>

              <p className="mt-3 max-w-3xl leading-7 text-slate-700">
                ThirdBadge provides independent educational guidance. Always
                confirm renewal deadlines, fees, accepted activities, and
                certification-specific requirements with the official
                certification provider before taking action.
              </p>
            </div>

            <Link
              href="/certifications"
              className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-3 font-semibold text-white transition hover:bg-blue-800"
            >
              Browse certifications
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}