import type { Metadata } from "next";
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Boxes,
  ExternalLink,
  FileQuestion,
  GraduationCap,
  Library,
  ShieldCheck,
  ShoppingBag,
  Star,
  Ticket,
  Video,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  HeroOption,
  HeroPanel,
  MarketingHero,
} from "@/components/layout/marketing-hero";

export const metadata: Metadata = {
  title: "Study Store | AimToCert",
  description:
    "Browse curated IT certification books, practice exams, labs, video training, exam vouchers, and learning resources from trusted publishers and providers.",
};

const studyCategories = [
  {
    title: "Books & Study Guides",
    description:
      "Official certification guides, study books, exam references, eBooks, and structured self-study material.",
    icon: BookOpen,
    href: "#books-study-guides",
    examples: "Cisco Press • Sybex • Pearson • O'Reilly",
    accent: "bg-blue-50 text-blue-700",
  },
  {
    title: "Practice Exams",
    description:
      "Practice questions, exam simulations, assessment tools, and readiness checks for certification preparation.",
    icon: FileQuestion,
    href: "#practice-exams",
    examples: "MeasureUp • Boson • Tutorials Dojo • CompTIA",
    accent: "bg-violet-50 text-violet-700",
  },
  {
    title: "Labs & Simulators",
    description:
      "Hands-on labs, virtual environments, network simulators, sandboxes, and practical technical exercises.",
    icon: Boxes,
    href: "#labs-simulators",
    examples: "Packet Tracer • NetSim • TryHackMe • HTB Academy",
    accent: "bg-emerald-50 text-emerald-700",
  },
  {
    title: "Video Training",
    description:
      "Instructor-led and self-paced video courses covering certification objectives and practical IT skills.",
    icon: Video,
    href: "#video-training",
    examples: "CBT Nuggets • Pluralsight • LinkedIn Learning • Udemy",
    accent: "bg-orange-50 text-orange-700",
  },
  {
    title: "Exam Vouchers",
    description:
      "Find official or authorized exam-purchase options and certification voucher providers.",
    icon: Ticket,
    href: "#exam-vouchers",
    examples: "Pearson VUE • Certiport • Cisco • Microsoft",
    accent: "bg-cyan-50 text-cyan-700",
  },
];

const bookSources = [
  {
    name: "Cisco Press",
    label: "Official Cisco publishing",
    mark: "CP",
    description:
      "Cisco Press publishes certification-focused books, official cert guides, command references, and networking study resources.",
    bestFor: "CCNA • CCNP • CyberOps • Networking",
    href: "https://www.ciscopress.com/store/",
    accent: "from-blue-700 to-sky-500",
  },
  {
    name: "Wiley / Sybex",
    label: "Certification study guides",
    mark: "SY",
    description:
      "Sybex offers certification study guides, practice-focused books, and official or authorized resources across major IT credentials.",
    bestFor: "CompTIA • ISC2 • AWS • Microsoft",
    href:
      "https://www.wiley.com/en-us/grow/teach-learn/student-resources/exam-guides/sybex/",
    accent: "from-violet-700 to-fuchsia-500",
  },
  {
    name: "Pearson IT Certification",
    label: "Professional IT publishing",
    mark: "PIT",
    description:
      "Pearson IT Certification publishes certification books, exam-preparation material, reference guides, and professional technology resources.",
    bestFor: "Networking • Security • Cloud • Professional IT",
    href: "https://www.pearsonitcertification.com/store/",
    accent: "from-indigo-700 to-blue-500",
  },
  {
    name: "O'Reilly",
    label: "Technical book library",
    mark: "OR",
    description:
      "O'Reilly provides a large technical book catalog covering IT, cloud, security, Linux, DevOps, programming, infrastructure, data, and emerging technologies.",
    bestFor: "Linux • Cloud • DevOps • Programming",
    href: "https://www.oreilly.com/products/books-videos.html",
    accent: "from-rose-700 to-red-500",
  },
];

const practiceExamSources = [
  {
    name: "MeasureUp",
    label: "Certification practice tests",
    mark: "MU",
    description:
      "Practice tests with learning and exam-simulation modes, detailed explanations, progress reporting, and certification-focused assessments.",
    bestFor: "Microsoft • Cisco • CompTIA • ISACA • IT certifications",
    href: "https://www.measureup.com/",
    accent: "from-violet-700 to-purple-500",
    button: "Browse practice tests",
  },
  {
    name: "Boson ExSim-Max",
    label: "Exam simulation",
    mark: "BX",
    description:
      "Exam simulations designed around certification topics, question styles, difficulty, timing, detailed explanations, and performance reports.",
    bestFor: "CCNA • CISSP • Security+ • Network+ • A+",
    href: "https://www.boson.com/exsim-max-practice-exams/",
    accent: "from-blue-800 to-indigo-500",
    button: "Browse exam simulations",
  },
  {
    name: "Tutorials Dojo",
    label: "Cloud practice exams",
    mark: "TD",
    description:
      "A dedicated practice-exam catalog with a strong focus on AWS and other cloud certification preparation.",
    bestFor: "AWS • Azure • Google Cloud • Cloud certifications",
    href:
      "https://portal.tutorialsdojo.com/product-category/practice-exams/",
    accent: "from-orange-600 to-amber-400",
    button: "Browse practice exams",
  },
  {
    name: "CompTIA CertMaster Practice",
    label: "Official CompTIA exam prep",
    mark: "CT",
    description:
      "CompTIA's official adaptive practice product helps identify knowledge gaps and includes timed exam-preparation assessments.",
    bestFor: "A+ • Network+ • Security+ • CySA+ • CompTIA",
    href: "https://www.comptia.org/training/",
    accent: "from-emerald-700 to-teal-500",
    button: "Explore CompTIA training",
  },
];

const labSources = [
  {
    name: "Cisco Packet Tracer",
    label: "Network simulation",
    mark: "PT",
    description:
      "Cisco's network simulation environment lets learners build virtual network topologies and practice networking concepts without physical lab equipment.",
    bestFor: "CCNA • Networking • Cisco fundamentals",
    href: "https://www.netacad.com/resources/lab-downloads?courseLang=en-US",
    accent: "from-sky-700 to-blue-500",
    button: "Explore Packet Tracer",
  },
  {
    name: "Boson NetSim",
    label: "Cisco certification labs",
    mark: "NS",
    description:
      "A browser-based Cisco network simulator with guided lab scenarios designed for certification preparation and practical networking experience.",
    bestFor: "CCNA • CCNP ENCOR • Cisco networking",
    href: "https://boson.com/netsim-cisco-network-simulator/",
    accent: "from-blue-800 to-indigo-600",
    button: "Browse NetSim labs",
  },
  {
    name: "TryHackMe",
    label: "Cybersecurity labs",
    mark: "THM",
    description:
      "Interactive cybersecurity learning with browser-based exercises, guided learning paths, challenges, and hands-on technical practice.",
    bestFor: "Cybersecurity • SOC • Security fundamentals",
    href: "https://tryhackme.com/",
    accent: "from-red-700 to-rose-500",
    button: "Explore labs",
  },
  {
    name: "Hack The Box Academy",
    label: "Guided security labs",
    mark: "HTB",
    description:
      "Guided cybersecurity training with interactive exercises, skills assessments, learning paths, and browser-based lab environments.",
    bestFor: "Cybersecurity • Defensive security • Security skills",
    href: "https://academy.hackthebox.com/",
    accent: "from-emerald-800 to-green-500",
    button: "Explore Academy",
  },
];

const videoTrainingSources = [
  {
    name: "CBT Nuggets",
    label: "IT certification video training",
    mark: "CBT",
    description:
      "On-demand IT training built around certification goals, with expert-led videos, learning paths, labs, and supporting exam-preparation resources.",
    bestFor: "Cisco • CompTIA • Microsoft • Linux • Security",
    href: "https://www.cbtnuggets.com/certification-playlist",
    accent: "from-orange-600 to-amber-400",
    button: "Browse certification training",
  },
  {
    name: "Pluralsight",
    label: "Technology certification prep",
    mark: "PS",
    description:
      "Expert-led technology courses and structured certification paths supported by assessments, labs, and certification-preparation resources.",
    bestFor: "AWS • Microsoft • CompTIA • ISC2 • Google Cloud",
    href: "https://www.pluralsight.com/product/cert-prep",
    accent: "from-fuchsia-700 to-pink-500",
    button: "Explore certification prep",
  },
  {
    name: "LinkedIn Learning",
    label: "Certification preparation",
    mark: "LI",
    description:
      "Expert-led courses and learning paths covering technical certification preparation across major vendors and professional technology topics.",
    bestFor: "Cisco • CompTIA • AWS • Microsoft • ISC2",
    href: "https://www.linkedin.com/learning/topics/certification-preparation",
    accent: "from-sky-700 to-blue-500",
    button: "Browse certification courses",
  },
  {
    name: "Udemy",
    label: "IT certification courses",
    mark: "UD",
    description:
      "A large marketplace of instructor-led, self-paced IT certification courses covering entry-level through advanced technology credentials.",
    bestFor: "Cloud • CompTIA • Cisco • Security • IT skills",
    href: "https://www.udemy.com/courses/it-and-software/it-certification/",
    accent: "from-violet-800 to-purple-500",
    button: "Browse IT certification courses",
  },
];

const examVoucherSources = [
  {
    name: "Pearson VUE Voucher Store",
    label: "Multi-vendor voucher store",
    mark: "PV",
    description:
      "Pearson VUE's voucher store provides exam-voucher purchasing options for a range of technology certification programs.",
    bestFor:
      "Microsoft • Google Cloud • LPI • Palo Alto • IBM • Salesforce",
    href: "https://us-voucherstore.pearsonvue.com/shop/exam-vouchers",
    accent: "from-cyan-700 to-blue-500",
    button: "Browse exam vouchers",
  },
  {
    name: "Certiport Store",
    label: "Individual exam vouchers",
    mark: "CP",
    description:
      "Certiport provides exam vouchers and selected certification products directly to individual customers in the United States.",
    bestFor: "Microsoft • Cisco CCST • IT Specialist • PMI • Unity",
    href:
      "https://store.certiport.com/shop/certiport-products?facetValueFilter=tenant~content-type%3Aexam-vouchers",
    accent: "from-teal-700 to-cyan-500",
    button: "Browse Certiport vouchers",
  },
  {
    name: "Cisco Exam Vouchers",
    label: "Official Cisco voucher store",
    mark: "CS",
    description:
      "Cisco's official voucher store provides exam-voucher purchase options for supported Cisco certification exams.",
    bestFor: "CCNA • CCNP • CyberOps • Cisco Specialist",
    href: "https://u.cisco.com/store/exam-voucher",
    accent: "from-blue-800 to-sky-500",
    button: "Browse Cisco vouchers",
  },
  {
    name: "Microsoft Exam Vouchers",
    label: "Official Pearson VUE ordering",
    mark: "MS",
    description:
      "Pearson VUE provides an official Microsoft voucher-ordering process. Microsoft Office Specialist vouchers are handled separately through Certiport.",
    bestFor: "Microsoft certification exams",
    href: "https://www.pearsonvue.com/us/en/microsoft/vouchers.html",
    accent: "from-indigo-700 to-blue-500",
    button: "Review Microsoft vouchers",
  },
];

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
    href: "https://www.oreilly.com/products/books-videos.html",
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
    href: "https://www.wiley.com/en-us/shop/sybex-study-guide-c-4052",
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
    href: "https://www.wiley.com/en-us/shop/sybex-study-guide-c-4052",
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
      "Every card tells you who publishes or sells the resource before you leave AimToCert, so the destination is never a surprise.",
  },
  {
    icon: ShoppingBag,
    title: "Buy from the source",
    description:
      "AimToCert helps you discover the resource. Purchases, pricing, fulfillment, returns, and subscriptions stay with the external publisher or seller.",
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
                  Shop by resource type
                </h2>
                <p className="mt-1 text-sm text-slate-300">
                  Start with what you need to prepare.
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              {studyCategories.slice(0, 3).map((category, index) => {
                const Icon = category.icon;

                return (
                  <a key={category.title} href={category.href}>
                    <HeroOption className="flex items-center gap-4">
                      <span
                        className={`flex size-12 shrink-0 items-center justify-center rounded-2xl text-white ${
                          index === 0
                            ? "bg-blue-600"
                            : index === 1
                              ? "bg-violet-600"
                              : "bg-emerald-600"
                        }`}
                      >
                        <Icon className="size-5" aria-hidden="true" />
                      </span>

                      <div className="min-w-0 flex-1">
                        <p className="font-bold text-white">
                          {category.title}
                        </p>
                        <p className="mt-1 line-clamp-1 text-sm text-slate-300">
                          {category.examples}
                        </p>
                      </div>

                      <ArrowRight
                        className="size-5 shrink-0 text-blue-200"
                        aria-hidden="true"
                      />
                    </HeroOption>
                  </a>
                );
              })}
            </div>
          </HeroPanel>
        }
      >
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-300">
          Study Store
        </p>

        <h1 className="mt-5 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Find the right resource
          <span className="block bg-gradient-to-r from-blue-200 via-blue-400 to-blue-600 bg-clip-text text-transparent">
            for the way you study.
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
          Browse books, practice exams, labs, video training, and exam vouchers
          organized around your certification goals.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href="#shop-by-category"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-lg shadow-blue-950/30 transition hover:bg-blue-500"
          >
            Shop by category
            <ArrowRight className="size-4" aria-hidden="true" />
          </a>

          <a
            href="#featured-resources"
            className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/25 bg-white/[0.03] px-5 py-3 font-semibold text-white transition hover:bg-white/10"
          >
            View featured resources
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
        id="shop-by-category"
        className="border-b border-slate-200 bg-slate-50"
      >
        <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-700">
              Shop by category
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Start with the kind of study resource you need.
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              AimToCert organizes study products by purpose so you can compare
              resources without digging through unrelated storefronts.
            </p>
          </div>

          <div className="mt-9 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            {studyCategories.map((category) => {
              const Icon = category.icon;

              return (
                <a
                  key={category.title}
                  href={category.href}
                  className="group block h-full rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-700"
                >
                  <Card className="flex h-full flex-col items-center text-center transition group-hover:-translate-y-1 group-hover:border-blue-200 group-hover:shadow-lg">
                    <span
                      className={`flex size-14 items-center justify-center rounded-2xl ${category.accent}`}
                    >
                      <Icon className="size-6" aria-hidden="true" />
                    </span>

                    <h3 className="mt-5 text-lg font-bold text-slate-950">
                      {category.title}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      {category.description}
                    </p>

                    <div className="mt-auto pt-5">
                      <p className="text-xs font-semibold leading-5 text-slate-500">
                        {category.examples}
                      </p>

                      <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-700">
                        Browse category
                        <ArrowRight
                          className="size-4 transition group-hover:translate-x-1"
                          aria-hidden="true"
                        />
                      </span>
                    </div>
                  </Card>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="books-study-guides"
        className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-700">
            Books & Study Guides
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Start with established certification publishers.
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            Browse official certification guides, study books, references, and
            structured self-study material from recognized IT publishers.
          </p>
        </div>

        <div className="mt-9 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {bookSources.map((source) => (
            <Card
              key={source.name}
              className="flex h-full flex-col overflow-hidden p-0 transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
            >
              <div
                className={`flex min-h-[220px] flex-col items-center justify-center bg-gradient-to-r ${source.accent} p-5 text-white`}
              >
                <span className="flex size-16 items-center justify-center rounded-2xl bg-white/15 text-base font-black tracking-wide ring-1 ring-inset ring-white/20">
                  {source.mark}
                </span>

                <p className="mt-4 text-center text-xs font-semibold uppercase tracking-[0.14em] text-white/75">
                  {source.label}
                </p>

                <h3 className="mt-2 text-center text-2xl font-bold">
                  {source.name}
                </h3>
              </div>

              <div className="flex flex-1 flex-col p-5 text-center">
                <p className="leading-7 text-slate-600">
                  {source.description}
                </p>

                <div className="mt-5 rounded-xl bg-slate-50 p-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                    Best for
                  </p>
                  <p className="mt-1 text-sm font-semibold leading-6 text-slate-800">
                    {source.bestFor}
                  </p>
                </div>

                <div className="mt-auto pt-6">
                  <a
                    href={source.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-500"
                  >
                    Browse books
                    <ExternalLink className="size-4" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section
        id="practice-exams"
        className="border-y border-slate-200 bg-violet-50/40"
      >
        <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-violet-700">
              Practice Exams
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Test your readiness before exam day.
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              Explore practice tests, question banks, assessment tools, and exam
              simulations from established certification-preparation providers.
            </p>
          </div>

          <div className="mt-9 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {practiceExamSources.map((source) => (
              <Card
                key={source.name}
                className="flex h-full flex-col overflow-hidden p-0 transition hover:-translate-y-1 hover:border-violet-200 hover:shadow-xl"
              >
                <div
                  className={`flex min-h-[220px] flex-col items-center justify-center bg-gradient-to-r ${source.accent} p-5 text-white`}
                >
                  <span className="flex size-16 items-center justify-center rounded-2xl bg-white/15 text-base font-black tracking-wide ring-1 ring-inset ring-white/20">
                    {source.mark}
                  </span>

                  <p className="mt-4 text-center text-xs font-semibold uppercase tracking-[0.14em] text-white/75">
                    {source.label}
                  </p>

                  <h3 className="mt-2 text-center text-2xl font-bold">
                    {source.name}
                  </h3>
                </div>

                <div className="flex flex-1 flex-col p-5 text-center">
                  <p className="leading-7 text-slate-600">
                    {source.description}
                  </p>

                  <div className="mt-5 rounded-xl bg-slate-50 p-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                      Best for
                    </p>
                    <p className="mt-1 text-sm font-semibold leading-6 text-slate-800">
                      {source.bestFor}
                    </p>
                  </div>

                  <div className="mt-auto pt-6">
                    <a
                      href={source.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-3 font-semibold text-white transition hover:bg-violet-500"
                    >
                      {source.button}
                      <ExternalLink className="size-4" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section
        id="labs-simulators"
        className="border-b border-slate-200 bg-emerald-50/40"
      >
        <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-700">
              Labs & Simulators
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Turn certification knowledge into practical skill.
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              Explore network simulators and guided lab platforms that let you
              practice technical concepts in controlled learning environments.
            </p>
          </div>

          <div className="mt-9 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {labSources.map((source) => (
              <Card
                key={source.name}
                className="flex h-full flex-col overflow-hidden p-0 transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl"
              >
                <div
                  className={`flex min-h-[220px] flex-col items-center justify-center bg-gradient-to-r ${source.accent} p-5 text-white`}
                >
                  <span className="flex size-16 items-center justify-center rounded-2xl bg-white/15 text-sm font-black tracking-wide ring-1 ring-inset ring-white/20">
                    {source.mark}
                  </span>

                  <p className="mt-4 text-center text-xs font-semibold uppercase tracking-[0.14em] text-white/75">
                    {source.label}
                  </p>

                  <h3 className="mt-2 text-center text-2xl font-bold">
                    {source.name}
                  </h3>
                </div>

                <div className="flex flex-1 flex-col p-5 text-center">
                  <p className="leading-7 text-slate-600">
                    {source.description}
                  </p>

                  <div className="mt-5 rounded-xl bg-slate-50 p-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                      Best for
                    </p>
                    <p className="mt-1 text-sm font-semibold leading-6 text-slate-800">
                      {source.bestFor}
                    </p>
                  </div>

                  <div className="mt-auto pt-6">
                    <a
                      href={source.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 font-semibold text-white transition hover:bg-emerald-500"
                    >
                      {source.button}
                      <ExternalLink className="size-4" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section
        id="video-training"
        className="border-b border-slate-200 bg-orange-50/40"
      >
        <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-orange-700">
              Video Training
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Learn from instructors at your own pace.
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              Explore structured certification courses, expert-led video
              lessons, and learning paths from established technology-training
              platforms.
            </p>
          </div>

          <div className="mt-9 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {videoTrainingSources.map((source) => (
              <Card
                key={source.name}
                className="flex h-full flex-col overflow-hidden p-0 transition hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl"
              >
                <div
                  className={`flex min-h-[220px] flex-col items-center justify-center bg-gradient-to-r ${source.accent} p-5 text-white`}
                >
                  <span className="flex size-16 items-center justify-center rounded-2xl bg-white/15 text-sm font-black tracking-wide ring-1 ring-inset ring-white/20">
                    {source.mark}
                  </span>

                  <p className="mt-4 text-center text-xs font-semibold uppercase tracking-[0.14em] text-white/75">
                    {source.label}
                  </p>

                  <h3 className="mt-2 text-center text-2xl font-bold">
                    {source.name}
                  </h3>
                </div>

                <div className="flex flex-1 flex-col p-5 text-center">
                  <p className="leading-7 text-slate-600">
                    {source.description}
                  </p>

                  <div className="mt-5 rounded-xl bg-slate-50 p-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                      Best for
                    </p>
                    <p className="mt-1 text-sm font-semibold leading-6 text-slate-800">
                      {source.bestFor}
                    </p>
                  </div>

                  <div className="mt-auto pt-6">
                    <a
                      href={source.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-orange-600 px-4 py-3 font-semibold text-white transition hover:bg-orange-500"
                    >
                      {source.button}
                      <ExternalLink className="size-4" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section
        id="exam-vouchers"
        className="border-b border-slate-200 bg-cyan-50/40"
      >
        <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-700">
              Exam Vouchers
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Find approved ways to purchase your exam.
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              Review official and authorized voucher channels before purchasing.
              Voucher availability, eligibility, region, expiration, and
              redemption rules vary by certification program.
            </p>
          </div>

          <div className="mt-9 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {examVoucherSources.map((source) => (
              <Card
                key={source.name}
                className="flex h-full flex-col overflow-hidden p-0 transition hover:-translate-y-1 hover:border-cyan-200 hover:shadow-xl"
              >
                <div
                  className={`flex min-h-[220px] flex-col items-center justify-center bg-gradient-to-r ${source.accent} p-5 text-white`}
                >
                  <span className="flex size-16 items-center justify-center rounded-2xl bg-white/15 text-sm font-black tracking-wide ring-1 ring-inset ring-white/20">
                    {source.mark}
                  </span>

                  <p className="mt-4 text-center text-xs font-semibold uppercase tracking-[0.14em] text-white/75">
                    {source.label}
                  </p>

                  <h3 className="mt-2 text-center text-2xl font-bold">
                    {source.name}
                  </h3>
                </div>

                <div className="flex flex-1 flex-col p-5 text-center">
                  <p className="leading-7 text-slate-600">
                    {source.description}
                  </p>

                  <div className="mt-5 rounded-xl bg-slate-50 p-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                      Best for
                    </p>

                    <p className="mt-1 text-sm font-semibold leading-6 text-slate-800">
                      {source.bestFor}
                    </p>
                  </div>

                  <div className="mt-auto pt-6">
                    <a
                      href={source.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-cyan-700 px-4 py-3 font-semibold text-white transition hover:bg-cyan-600"
                    >
                      {source.button}
                      <ExternalLink className="size-4" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="mx-auto mt-8 max-w-4xl rounded-2xl border border-cyan-200 bg-white p-5 text-center shadow-sm">
            <p className="font-semibold text-slate-950">
              Voucher seller ≠ exam delivery provider
            </p>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              Buying a voucher does not necessarily mean that company will
              proctor or deliver your exam. Always confirm the certification
              provider, testing provider, redemption rules, region, and
              expiration date before purchasing.
            </p>
          </div>
        </div>
      </section>

      <section
        id="featured-resources"
        className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-700">
            Featured books
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Certification resources worth finding quickly.
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            A curated starting shelf from established IT publishers. Pricing
            and availability remain with the external publisher and may change.
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
                    <span>AimToCert pick</span>
                    <BookOpen className="size-4" aria-hidden="true" />
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
                      <BadgeCheck className="size-3.5" aria-hidden="true" />
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
                    rel="noopener noreferrer"
                    className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
                  >
                    View at publisher
                    <ExternalLink className="size-4" aria-hidden="true" />
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
              See which established publishers cover the certification or
              technical area you are working toward.
            </p>
          </div>

          <div className="mt-9 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {certificationShelves.map((shelf) => (
              <Card
                key={shelf.title}
                className="group h-full p-4 text-center transition hover:border-blue-200 hover:shadow-md"
              >
                <span className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700 transition group-hover:bg-blue-600 group-hover:text-white">
                  <Library className="size-5" aria-hidden="true" />
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
                  <ArrowRight className="size-4" aria-hidden="true" />
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
            One storefront directory. Many trusted learning publishers.
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            Each publisher keeps a clear identity, specialty list, and direct
            outbound link rather than being blended into one anonymous catalog.
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
                    rel="noopener noreferrer"
                    className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 font-semibold text-blue-800 transition hover:border-blue-600 hover:bg-blue-600 hover:text-white"
                  >
                    Visit {publisher.name}
                    <ExternalLink className="size-4" aria-hidden="true" />
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
              The AimToCert difference
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              A study marketplace should help you choose, not just sell.
            </h2>
          </div>

          <div className="mt-9 grid gap-5 lg:grid-cols-3">
            {storePrinciples.map(({ icon: Icon, title, description }) => (
              <Card
                key={title}
                className="flex h-full flex-col items-center text-center"
              >
                <span className="flex size-12 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-sm">
                  <Icon className="size-5" aria-hidden="true" />
                </span>

                <h3 className="mt-5 text-xl font-bold text-slate-950">
                  {title}
                </h3>

                <p className="mt-3 leading-7 text-slate-600">
                  {description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <Card className="overflow-hidden border-amber-200 bg-amber-50 p-0">
          <div className="grid gap-0 lg:grid-cols-[auto_1fr]">
            <div className="flex items-center justify-center bg-amber-100 p-6 text-amber-800 lg:w-28">
              <GraduationCap className="size-9" aria-hidden="true" />
            </div>

            <div className="p-6 sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-amber-800">
                Affiliate disclosure
              </p>

              <h2 className="mt-2 text-xl font-bold text-slate-950">
                AimToCert may earn from qualifying purchases.
              </h2>

              <p className="mt-3 max-w-4xl leading-7 text-slate-700">
                AimToCert may use affiliate links for some shopping resources.
                If you purchase through an eligible affiliate link, AimToCert
                may receive a commission at no additional cost to you. A
                publisher&apos;s inclusion does not mean it paid for placement,
                and affiliate status does not determine whether a resource is
                recommended.
              </p>
            </div>
          </div>
        </Card>
      </section>
    </main>
  );
}