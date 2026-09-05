import type { Metadata } from "next";
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Boxes,
  ExternalLink,
  GraduationCap,
  Library,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  HeroOption,
  HeroPanel,
  MarketingHero,
} from "@/components/layout/marketing-hero";

export const metadata: Metadata = {
  title: "Study Store | ThirdBadge",
  description:
    "Browse curated IT certification books, study guides, practice resources, and learning material from trusted publishers and training providers.",
};

const publishers = [
  {
    name: "Cisco Press",
    mark: "CP",
    description:
      "Authorized Cisco certification books, official cert guides, command references, networking titles, and self-study resources.",
    specialties: ["CCNA", "CCNP", "Cisco CyberOps", "Networking"],
    href: "https://www.ciscopress.com/store/",
    accent: "from-blue-700 to-sky-500",
  },
  {
    name: "Pearson IT Certification",
    mark: "PIT",
    description:
      "Certification-focused books, video training, exam preparation, and professional technology learning from Pearson authors.",
    specialties: ["Cloud", "Security", "Networking", "Professional IT"],
    href: "https://www.pearsonitcertification.com/store/",
    accent: "from-indigo-700 to-blue-500",
  },
  {
    name: "Wiley / Sybex",
    mark: "SY",
    description:
      "A deep certification-prep catalog with study guides, practice tests, official ISC2 resources, CompTIA books, and more.",
    specialties: ["CompTIA", "ISC2", "AWS", "Microsoft"],
    href:
      "https://www.wiley.com/en-us/grow/teach-learn/student-resources/exam-guides/sybex/",
    accent: "from-violet-700 to-fuchsia-500",
  },
  {
    name: "Packt",
    mark: "PK",
    description:
      "Technology books, eBooks, videos, courses, and practical learning across cloud, DevOps, cybersecurity, data, AI, and software.",
    specialties: ["AWS", "Azure", "DevOps", "Cybersecurity"],
    href: "https://www.packtpub.com/en-us/",
    accent: "from-orange-600 to-amber-400",
  },
  {
    name: "O'Reilly",
    mark: "OR",
    description:
      "A broad technology learning library covering books, courses, hands-on learning, certification preparation, and emerging IT skills.",
    specialties: ["Linux", "Cloud", "Kubernetes", "Programming"],
    href: "https://www.oreilly.com/",
    accent: "from-rose-700 to-red-500",
  },
  {
    name: "CompTIA Learning",
    mark: "CT",
    description:
      "Official CompTIA learning resources, including certification training products and exam-preparation options from the credential owner.",
    specialties: ["A+", "Network+", "Security+", "CySA+"],
    href: "https://www.comptia.org/training/",
    accent: "from-emerald-700 to-teal-500",
  },
];

const featuredResources = [
  {
    certification: "Cisco CCNA",
    publisher: "Cisco Press",
    title: "CCNA 200-301 Official Cert Guide, Volume 1, 2nd Edition",
    type: "Official Cert Guide",
    formats: "Book + eBook",
    description:
      "A Cisco Press official certification guide designed around the CCNA 200-301 exam objectives and structured self-study.",
    href:
      "https://www.ciscopress.com/store/ccna-200-301-official-cert-guide-volume-1-9780138229702",
    cover: "CCNA",
    accent: "from-blue-700 via-blue-600 to-sky-500",
    official: true,
  },
  {
    certification: "CompTIA Security+",
    publisher: "Wiley / Sybex",
    title: "CompTIA Security+ Study Guide: Exam SY0-701, 9th Edition",
    type: "Study Guide",
    formats: "Print + eBook",
    description:
      "A Sybex Security+ study guide with exam-focused review material and practice-question support for SY0-701 preparation.",
    href:
      "https://www.wiley.com/en-us/shop/sybex-study-guide-c-4052",
    cover: "SEC+",
    accent: "from-violet-700 via-purple-600 to-fuchsia-500",
    official: false,
  },
  {
    certification: "ISC2 CISSP",
    publisher: "Wiley / Sybex",
    title: "ISC2 CISSP Official Study Guide, 10th Edition",
    type: "Official Study Guide",
    formats: "Print + eBook",
    description:
      "An official CISSP study guide from Sybex covering the current ISC2 body of knowledge with structured exam preparation.",
    href:
      "https://www.wiley.com/en-us/grow/teach-learn/student-resources/exam-guides/sybex/",
    cover: "CISSP",
    accent: "from-slate-800 via-slate-700 to-blue-600",
    official: true,
  },
  {
    certification: "CompTIA A+",
    publisher: "Wiley / Sybex",
    title: "CompTIA A+ Complete Study Guide, 6th Edition",
    type: "Study Guide Set",
    formats: "Print + eBook",
    description:
      "A current two-volume A+ study-guide set aligned to the 220-1201 and 220-1202 Core exams.",
    href:
      "https://www.wiley.com/en-us/shop/sybex-study-guide-c-4052",
    cover: "A+",
    accent: "from-cyan-700 via-sky-600 to-blue-500",
    official: false,
  },
];

const certificationShelves = [
  {
    title: "CompTIA",
    description:
      "A+, Network+, Security+, Linux+, CySA+, PenTest+ and more.",
    publishers: "CompTIA • Wiley / Sybex • Pearson • Packt",
  },
  {
    title: "Cisco",
    description:
      "CCNA, CCNP, CyberOps, DevNet and networking references.",
    publishers: "Cisco Press • Pearson • O'Reilly",
  },
  {
    title: "Cybersecurity",
    description:
      "CISSP, CCSP, SSCP, CISA, CISM, Security+ and security skills.",
    publishers: "Wiley / Sybex • Pearson • Packt • O'Reilly",
  },
  {
    title: "Cloud",
    description:
      "AWS, Azure, Google Cloud and cloud architecture learning.",
    publishers: "Wiley / Sybex • Packt • O'Reilly • Pearson",
  },
  {
    title: "Linux & DevOps",
    description:
      "Linux+, Red Hat, Kubernetes, Docker, automation and operations.",
    publishers: "O'Reilly • Packt • Pearson • Wiley / Sybex",
  },
  {
    title: "Data & AI",
    description:
      "Data engineering, analytics, AI, machine learning and platform skills.",
    publishers: "O'Reilly • Packt • Wiley • Pearson",
  },
];

const storePrinciples = [
  {
    icon: BadgeCheck,
    title: "Certification-first curation",
    description:
      "Resources are organized around the certification or skill you are pursuing instead of making you search unrelated bookstore catalogs.",
  },
  {
    icon: ShieldCheck,
    title: "Publisher transparency",
    description:
      "Every card tells you who publishes or sells the resource before you leave ThirdBadge, so the destination is never a surprise.",
  },
  {
    icon: ShoppingBag,
    title: "Buy from the source",
    description:
      "ThirdBadge helps you discover the resource. Purchases, pricing, fulfillment, returns, and subscriptions stay with the external publisher or seller.",
  },
];

export default function StudyStorePage() {
  return (
    <main>
      <MarketingHero
        aside={
          <HeroPanel>
            <div className="flex items-center gap-3">
              <span className="flex size-11 items-center justify-center rounded-2xl bg-blue-500/15 text-blue-200 ring-1 ring-inset ring-blue-300/25">
                <Star className="size-5" aria-hidden="true" />
              </span>

              <div>
                <h2 className="text-xl font-bold text-white">
                  Featured resources
                </h2>
                <p className="mt-1 text-sm text-slate-300">
                  Top picks to help you prepare.
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              {featuredResources
                .slice(0, 3)
                .map((resource, index) => (
                  <a
                    key={resource.title}
                    href={resource.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <HeroOption className="flex items-center gap-4">
                      <span
                        className={`flex size-12 shrink-0 items-center justify-center rounded-2xl text-xs font-black text-white ${
                          index === 0
                            ? "bg-blue-600"
                            : index === 1
                              ? "bg-violet-600"
                              : "bg-emerald-600"
                        }`}
                      >
                        {resource.cover}
                      </span>

                      <div className="min-w-0 flex-1">
                        <p className="line-clamp-1 font-bold text-white">
                          {resource.title}
                        </p>
                        <p className="mt-1 text-sm text-slate-300">
                          {resource.publisher}
                        </p>
                      </div>

                      <ArrowRight
                        className="size-5 shrink-0 text-blue-200"
                        aria-hidden="true"
                      />
                    </HeroOption>
                  </a>
                ))}
            </div>
          </HeroPanel>
        }
      >
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-300">
          Study Store
        </p>

        <h1 className="mt-5 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Find study resources
          <span className="block bg-gradient-to-r from-blue-200 via-blue-400 to-blue-600 bg-clip-text text-transparent">
            that fit your certification goal.
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
          Discover official guides, study books, practice material,
          and trusted publishers without searching every storefront
          separately.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href="#featured-resources"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-lg shadow-blue-950/30 transition hover:bg-blue-500"
          >
            Shop study resources
            <ArrowRight
              className="size-4"
              aria-hidden="true"
            />
          </a>

          <a
            href="#publishers"
            className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/25 bg-white/[0.03] px-5 py-3 font-semibold text-white transition hover:bg-white/10"
          >
            Explore publishers
          </a>
        </div>

        <div className="mt-9 flex flex-wrap gap-x-7 gap-y-3 text-sm text-slate-300">
          <span className="inline-flex items-center gap-2">
            <BadgeCheck className="size-4 text-blue-300" />
            Official resources identified
          </span>

          <span className="inline-flex items-center gap-2">
            <ShieldCheck className="size-4 text-blue-300" />
            Independent curation
          </span>

          <span className="inline-flex items-center gap-2">
            <ShoppingBag className="size-4 text-blue-300" />
            Buy from the source
          </span>
        </div>
      </MarketingHero>

      <section
        id="featured-resources"
        className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-700">
            Popular study resources
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Certification resources worth finding quickly.
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            A curated starting shelf from established IT publishers.
            Pricing and availability remain with the external
            publisher and may change.
          </p>
        </div>

        <div className="mt-9 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {featuredResources.map((resource) => (
            <Card
              key={resource.title}
              className="group flex h-full flex-col overflow-hidden p-0 transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
            >
              <div className="p-5 pb-0">
                <div
                  className={`relative mx-auto flex aspect-[3/4] w-full max-w-[210px] flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-br ${resource.accent} p-5 text-white shadow-lg`}
                >
                  <div className="flex items-center justify-between gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-white/80">
                    <span>ThirdBadge pick</span>
                    <BookOpen
                      className="size-4"
                      aria-hidden="true"
                    />
                  </div>

                  <div>
                    <p className="text-3xl font-black tracking-tight">
                      {resource.cover}
                    </p>
                    <p className="mt-2 text-sm font-semibold text-white/80">
                      Study resource
                    </p>
                  </div>

                  <p className="text-xs font-medium text-white/75">
                    {resource.publisher}
                  </p>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <div className="flex flex-wrap justify-center gap-2">
                  <Badge>{resource.certification}</Badge>

                  {resource.official ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-800">
                      <BadgeCheck
                        className="size-3.5"
                        aria-hidden="true"
                      />
                      Official
                    </span>
                  ) : null}
                </div>

                <h3 className="mt-4 text-center text-lg font-bold leading-6 text-slate-950">
                  {resource.title}
                </h3>

                <p className="mt-2 text-center text-sm font-semibold text-blue-700">
                  {resource.publisher}
                </p>

                <p className="mt-4 text-center text-sm leading-6 text-slate-600">
                  {resource.description}
                </p>

                <div className="mt-5 flex flex-wrap justify-center gap-2 text-xs font-semibold text-slate-600">
                  <span className="rounded-full bg-slate-100 px-2.5 py-1">
                    {resource.type}
                  </span>

                  <span className="rounded-full bg-slate-100 px-2.5 py-1">
                    {resource.formats}
                  </span>
                </div>

                <div className="mt-auto pt-6">
                  <a
                    href={resource.href}
                    target="_blank"
                    rel={
                      "affiliate" in resource &&
                      resource.affiliate
                        ? "sponsored noopener noreferrer"
                        : "noopener noreferrer"
                    }
                    className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
                  >
                    View at publisher
                    <ExternalLink
                      className="size-4"
                      aria-hidden="true"
                    />
                  </a>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section
        id="certification-shelves"
        className="border-y border-slate-200 bg-slate-50"
      >
        <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-700">
              Shop by certification
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Start with the credential, then review publishers.
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              See which established publishers cover the
              certification or technical area you are working toward.
            </p>
          </div>

          <div className="mt-9 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {certificationShelves.map((shelf) => (
              <Card
                key={shelf.title}
                className="group h-full p-4 text-center transition hover:border-blue-200 hover:shadow-md"
              >
                <span className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700 transition group-hover:bg-blue-600 group-hover:text-white">
                  <Library
                    className="size-5"
                    aria-hidden="true"
                  />
                </span>

                <h3 className="mt-4 text-xl font-bold text-slate-950">
                  {shelf.title}
                </h3>

                <p className="mt-2 leading-6 text-slate-600">
                  {shelf.description}
                </p>

                <div className="mt-4 rounded-xl bg-white p-3 ring-1 ring-inset ring-slate-200">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                    Publishers to review
                  </p>

                  <p className="mt-1 text-sm font-semibold leading-5 text-slate-800">
                    {shelf.publishers}
                  </p>
                </div>

                <a
                  href="#publishers"
                  className="mt-4 inline-flex items-center justify-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-600"
                >
                  Browse publisher options
                  <ArrowRight
                    className="size-4"
                    aria-hidden="true"
                  />
                </a>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section
        id="publishers"
        className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-700">
            Trusted publishers
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            One storefront directory. Many trusted learning
            publishers.
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            Each publisher keeps a clear identity, specialty list, and
            direct outbound link rather than being blended into one
            anonymous catalog.
          </p>
        </div>

        <div className="mt-9 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {publishers.map((publisher) => (
            <Card
              key={publisher.name}
              className="flex h-full flex-col overflow-hidden p-0 transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              <div
                className={`bg-gradient-to-r ${publisher.accent} p-5 text-white`}
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-white/15 text-sm font-black tracking-wide ring-1 ring-inset ring-white/20">
                    {publisher.mark}
                  </span>

                  <Boxes
                    className="size-5 text-white/75"
                    aria-hidden="true"
                  />
                </div>

                <h3 className="mt-5 text-2xl font-bold">
                  {publisher.name}
                </h3>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <p className="leading-7 text-slate-600">
                  {publisher.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {publisher.specialties.map((specialty) => (
                    <span
                      key={specialty}
                      className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-800"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>

                <div className="mt-auto pt-6">
                  <a
                    href={publisher.href}
                    target="_blank"
                    rel={
                      "affiliate" in publisher &&
                      publisher.affiliate
                        ? "sponsored noopener noreferrer"
                        : "noopener noreferrer"
                    }
                    className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 font-semibold text-blue-800 transition hover:border-blue-600 hover:bg-blue-600 hover:text-white"
                  >
                    Visit {publisher.name}
                    <ExternalLink
                      className="size-4"
                      aria-hidden="true"
                    />
                  </a>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-blue-50/60">
        <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-700">
              The ThirdBadge difference
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              A study marketplace should help you choose, not just
              sell.
            </h2>
          </div>

          <div className="mt-9 grid gap-5 lg:grid-cols-3">
            {storePrinciples.map(
              ({ icon: Icon, title, description }) => (
                <Card
                  key={title}
                  className="flex h-full flex-col items-center text-center"
                >
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-sm">
                    <Icon
                      className="size-5"
                      aria-hidden="true"
                    />
                  </span>

                  <h3 className="mt-5 text-xl font-bold text-slate-950">
                    {title}
                  </h3>

                  <p className="mt-3 leading-7 text-slate-600">
                    {description}
                  </p>
                </Card>
              ),
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <Card className="overflow-hidden border-amber-200 bg-amber-50 p-0">
          <div className="grid gap-0 lg:grid-cols-[auto_1fr]">
            <div className="flex items-center justify-center bg-amber-100 p-6 text-amber-800 lg:w-28">
              <GraduationCap
                className="size-9"
                aria-hidden="true"
              />
            </div>

            <div className="p-6 sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-amber-800">
                Affiliate disclosure
              </p>

              <h2 className="mt-2 text-xl font-bold text-slate-950">
                ThirdBadge may earn from qualifying purchases.
              </h2>

              <p className="mt-3 max-w-4xl leading-7 text-slate-700">
                ThirdBadge may use affiliate links for some shopping
                resources. If you purchase through an eligible
                affiliate link, ThirdBadge may receive a commission at
                no additional cost to you. A publisher&apos;s inclusion
                does not mean it paid for placement, and affiliate
                status does not determine whether a resource is
                recommended.
              </p>
            </div>
          </div>
        </Card>
      </section>
    </main>
  );
}