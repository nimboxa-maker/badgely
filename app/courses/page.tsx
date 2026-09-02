import type { Metadata } from "next";
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Building2,
  ExternalLink,
  GraduationCap,
  Laptop,
  PlayCircle,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  HeroOption,
  HeroPanel,
  MarketingHero,
} from "@/components/layout/marketing-hero";

export const metadata: Metadata = {
  title: "Courses | Badgely",
  description:
    "Compare IT certification courses, training platforms, labs, and official learning resources from trusted providers.",
};

const courseProviders = [
  {
    name: "Udemy",
    mark: "U",
    type: "Course marketplace",
    summary:
      "Large catalog of self-paced IT certification courses from independent instructors.",
    bestFor: "CompTIA, AWS, Azure, Cisco, Linux and general IT skills",
    features: ["Video courses", "Self-paced", "One-time purchases"],
    href: "https://trk.udemy.com/c/7711424/3193860/39854",
    accent: "from-violet-700 to-purple-500",
    official: false,
    affiliate: true,
  },
  {
    name: "Coursera",
    mark: "C",
    type: "Learning platform",
    summary:
      "Structured courses and professional certificate programs from universities and technology companies.",
    bestFor: "Cloud, cybersecurity, data, AI and career-focused programs",
    features: ["Courses", "Professional Certificates", "Guided programs"],
    href: "https://www.coursera.org/certificates/computer-science-it/",
    accent: "from-blue-700 to-sky-500",
    official: false,
  },
  {
    name: "O'Reilly",
    mark: "OR",
    type: "Technology learning platform",
    summary:
      "Books, live and on-demand courses, certification guides, practice tests, and technical learning.",
    bestFor: "Cloud, Linux, DevOps, security, programming and architecture",
    features: ["Courses", "Books", "Practice tests"],
    href: "https://www.oreilly.com/products/certification-prep.html",
    accent: "from-rose-700 to-red-500",
    official: false,
  },
  {
    name: "Pluralsight",
    mark: "PS",
    type: "Technology skills platform",
    summary:
      "Certification paths built around technical courses, hands-on labs, and practice exams.",
    bestFor: "AWS, Azure, CompTIA, ISC2, cloud and IT operations",
    features: ["Learning paths", "Labs", "Practice exams"],
    href: "https://www.pluralsight.com/product/cert-prep",
    accent: "from-pink-700 to-fuchsia-500",
    official: false,
  },
  {
    name: "Cybrary",
    mark: "CY",
    type: "Cybersecurity training",
    summary:
      "Cybersecurity-focused certification preparation with video instruction, virtual labs, and skill paths.",
    bestFor: "Security+, CISSP, CySA+, CCSP, SSCP, CISM and cyber skills",
    features: ["Certification prep", "Virtual labs", "Skill paths"],
    href: "https://www.cybrary.it/catalog",
    accent: "from-cyan-700 to-blue-500",
    official: false,
  },
  {
    name: "Microsoft Learn",
    mark: "MS",
    type: "Official vendor training",
    summary:
      "Official Microsoft learning paths and modules covering Azure, Microsoft 365, security, data, AI, and Power Platform.",
    bestFor: "Azure, Microsoft 365, Security, Data and Power Platform",
    features: ["Official", "Learning paths", "Interactive modules"],
    href: "https://learn.microsoft.com/en-us/training/",
    accent: "from-blue-700 to-indigo-500",
    official: true,
  },
  {
    name: "Cisco U.",
    mark: "CU",
    type: "Official vendor training",
    summary:
      "Cisco's official learning platform with tutorials, courses, learning paths, labs, and certification preparation.",
    bestFor: "CCNA, CCNP, CyberOps, DevNet and Cisco technologies",
    features: ["Official", "Labs", "Learning paths"],
    href: "https://u.cisco.com/learn",
    accent: "from-sky-700 to-cyan-500",
    official: true,
  },
  {
    name: "AWS Skill Builder",
    mark: "AWS",
    type: "Official vendor training",
    summary:
      "Official AWS digital learning, certification exam preparation, labs, and cloud skill development.",
    bestFor: "AWS Cloud Practitioner, Solutions Architect, Security and specialty certifications",
    features: ["Official", "Exam prep", "Hands-on learning"],
    href: "https://aws.amazon.com/training/digital/",
    accent: "from-orange-600 to-amber-400",
    official: true,
  },
];

const certificationTracks = [
  {
    title: "CompTIA",
    description:
      "A+, Network+, Security+, Linux+, Cloud+, CySA+, PenTest+ and other CompTIA credentials.",
    providers: "Udemy • Pluralsight • Cybrary • O'Reilly",
  },
  {
    title: "Cisco",
    description:
      "CCNA, CCNP, CyberOps, DevNet and networking-focused technical training.",
    providers: "Cisco U. • Udemy • O'Reilly • Pluralsight",
  },
  {
    title: "Cybersecurity",
    description:
      "Security+, CISSP, CCSP, SSCP, CySA+, CISM and practical security skills.",
    providers: "Cybrary • Pluralsight • O'Reilly • Udemy",
  },
  {
    title: "AWS",
    description:
      "Cloud Practitioner, Solutions Architect, Security, networking and advanced cloud topics.",
    providers: "AWS Skill Builder • Udemy • Coursera • Pluralsight",
  },
  {
    title: "Microsoft",
    description:
      "Azure, Microsoft 365, security, data, AI and Power Platform learning.",
    providers: "Microsoft Learn • Udemy • Coursera • Pluralsight",
  },
  {
    title: "Linux & DevOps",
    description:
      "Linux, Red Hat, Kubernetes, containers, automation, DevOps and platform engineering.",
    providers: "O'Reilly • Udemy • Pluralsight • Coursera",
  },
];

const courseTypes = [
  {
    icon: PlayCircle,
    title: "Video courses",
    description:
      "Self-paced instructor-led lessons you can work through on your own schedule.",
  },
  {
    icon: Target,
    title: "Certification prep",
    description:
      "Training organized around exam domains, objectives, and certification readiness.",
  },
  {
    icon: Laptop,
    title: "Hands-on labs",
    description:
      "Practice technical tasks in lab environments instead of relying only on videos.",
  },
  {
    icon: BookOpen,
    title: "Learning paths",
    description:
      "Structured sequences that connect courses, labs, and skills into a clear progression.",
  },
];

export default function CoursesPage() {
  const spotlight = courseProviders.find((provider) => provider.name === "AWS Skill Builder")!;

  return (
    <main>
      <MarketingHero
        aside={
          <HeroPanel>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-300">
                Popular provider categories
              </p>
              <h2 className="mt-2 text-xl font-bold text-white">Explore top destinations for IT pros.</h2>
            </div>

            <div className="mt-5 space-y-3">
              <a href="#providers" className="block">
                <HeroOption className="flex items-center gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white">
                    <Building2 className="size-5" aria-hidden="true" />
                  </span>
                  <div className="flex-1">
                    <p className="font-bold text-white">Official vendor training</p>
                    <p className="mt-1 text-sm text-slate-300">Learn directly from the creators of the technology.</p>
                  </div>
                  <ArrowRight className="size-5 text-blue-200" aria-hidden="true" />
                </HeroOption>
              </a>

              <a href="#providers" className="block">
                <HeroOption className="flex items-center gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-violet-600 text-white">
                    <Users className="size-5" aria-hidden="true" />
                  </span>
                  <div className="flex-1">
                    <p className="font-bold text-white">Industry-leading platforms</p>
                    <p className="mt-1 text-sm text-slate-300">Broad catalogs with flexible learning formats.</p>
                  </div>
                  <ArrowRight className="size-5 text-blue-200" aria-hidden="true" />
                </HeroOption>
              </a>

              <a href="#certification-courses" className="block">
                <HeroOption className="flex items-center gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-600 text-white">
                    <Target className="size-5" aria-hidden="true" />
                  </span>
                  <div className="flex-1">
                    <p className="font-bold text-white">Specialized & niche training</p>
                    <p className="mt-1 text-sm text-slate-300">Focused preparation for deeper technical skills.</p>
                  </div>
                  <ArrowRight className="size-5 text-blue-200" aria-hidden="true" />
                </HeroOption>
              </a>
            </div>

            <div className="mt-5 border-t border-white/10 pt-5">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-300">Provider spotlight</p>
              <a
                href={spotlight.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 flex items-center gap-4 rounded-2xl bg-white/[0.055] p-4 transition hover:bg-blue-500/10"
              >
                <span className="flex size-12 items-center justify-center rounded-2xl bg-slate-950 text-sm font-black text-white">AWS</span>
                <div className="flex-1">
                  <p className="font-bold text-white">AWS Skill Builder</p>
                  <p className="mt-1 text-sm text-slate-300">Free and paid official AWS digital learning.</p>
                </div>
                <ExternalLink className="size-4 text-blue-200" aria-hidden="true" />
              </a>
            </div>
          </HeroPanel>
        }
      >
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-300">
          Independent IT certification guidance
        </p>

        <h1 className="mt-5 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Compare IT certification
          <span className="block bg-gradient-to-r from-blue-200 via-blue-400 to-blue-600 bg-clip-text text-transparent">
            courses and training providers.
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
          Find the right training for your goals. Review official and trusted providers side by side to learn, practice, and prepare with confidence.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href="#providers"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-lg shadow-blue-950/30 transition hover:bg-blue-500"
          >
            Browse all providers <ArrowRight className="size-4" aria-hidden="true" />
          </a>
          <a
            href="#certification-courses"
            className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/25 bg-white/[0.03] px-5 py-3 font-semibold text-white transition hover:bg-white/10"
          >
            Browse by certification
          </a>
        </div>

        <div className="mt-9 flex flex-wrap gap-x-7 gap-y-3 text-sm text-slate-300">
          <span className="inline-flex items-center gap-2"><ShieldCheck className="size-4 text-blue-300" /> Independent & unbiased</span>
          <span className="inline-flex items-center gap-2"><BadgeCheck className="size-4 text-blue-300" /> Official options identified</span>
          <span className="inline-flex items-center gap-2"><Laptop className="size-4 text-blue-300" /> Multiple learning formats</span>
        </div>
      </MarketingHero>

      <section className="mx-auto w-full max-w-7xl px-4 py-14 text-center sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-700">Choose how you learn</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">More than just video courses.</h2>
          <p className="mt-4 leading-7 text-slate-600">Different learners need different tools. Badgely helps you identify what each learning platform actually provides.</p>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {courseTypes.map(({ icon: Icon, title, description }) => (
            <Card key={title} className="h-full p-5 text-center transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg">
              <div className="mx-auto flex size-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                <Icon className="size-5" aria-hidden="true" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-slate-950">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
            </Card>
          ))}
        </div>
      </section>

      <section id="certification-courses" className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto w-full max-w-7xl px-4 py-14 text-center sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-700">Browse by certification</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Start with what you want to earn.</h2>
            <p className="mt-4 leading-7 text-slate-600">Review learning platforms that cover the certification or technical area you are working toward.</p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {certificationTracks.map((track) => (
              <Card key={track.title} className="flex h-full flex-col items-center p-5 text-center transition hover:border-blue-200 hover:shadow-md">
                <div className="flex size-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                  <GraduationCap className="size-5" aria-hidden="true" />
                </div>
                <h3 className="mt-4 text-xl font-bold text-slate-950">{track.title}</h3>
                <p className="mt-2 leading-6 text-slate-600">{track.description}</p>
                <div className="mt-3 w-full rounded-xl bg-slate-50 p-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Platforms to review</p>
                  <p className="mt-1 text-sm font-semibold leading-5 text-slate-800">{track.providers}</p>
                </div>
                <a href="#providers" className="mt-3 inline-flex items-center justify-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-600">
                  Browse course providers <ArrowRight className="size-4" aria-hidden="true" />
                </a>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="providers" className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-700">Course marketplace</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Top IT training providers.</h2>
          <p className="mt-4 leading-7 text-slate-600">Badgely helps you discover the platform. Enrollment, pricing, subscriptions, refunds, and access remain with the external training provider.</p>
        </div>

        <div className="mt-9 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {courseProviders.map((provider) => (
            <Card key={provider.name} className="group flex h-full flex-col items-center overflow-hidden p-0 text-center transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl">
              <div className={`flex w-full items-center justify-center bg-gradient-to-br ${provider.accent} px-5 py-7 text-white`}>
                <div className="flex size-16 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-xl font-black shadow-lg backdrop-blur">{provider.mark}</div>
              </div>

              <div className="flex h-full w-full flex-col items-center p-5">
                <div className="flex flex-wrap justify-center gap-2">
                  <Badge className="bg-slate-100 text-slate-700">{provider.type}</Badge>
                  {provider.official ? (
                    <Badge className="bg-emerald-50 text-emerald-800"><BadgeCheck className="mr-1 size-3.5" aria-hidden="true" />Official</Badge>
                  ) : (
                    <Badge className="bg-blue-50 text-blue-700">Third-party</Badge>
                  )}
                  {provider.affiliate ? (
                    <Badge className="bg-amber-50 text-amber-800"><Sparkles className="mr-1 size-3.5" aria-hidden="true" />Affiliate</Badge>
                  ) : null}
                </div>

                <h3 className="mt-4 text-xl font-bold text-slate-950">{provider.name}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{provider.summary}</p>

                <div className="mt-4 w-full rounded-xl bg-slate-50 p-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Best for</p>
                  <p className="mt-1 text-sm font-medium leading-5 text-slate-800">{provider.bestFor}</p>
                </div>

                <div className="mt-3 flex flex-wrap justify-center gap-2">
                  {provider.features.map((feature) => (
                    <span key={feature} className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">{feature}</span>
                  ))}
                </div>

                <a
                  href={provider.href}
                  target="_blank"
                  rel={provider.affiliate ? "sponsored noopener noreferrer" : "noopener noreferrer"}
                  className="mt-auto inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-600"
                >
                  Visit {provider.name} <ExternalLink className="size-4" aria-hidden="true" />
                </a>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-5xl px-4 py-12 text-center sm:px-6 lg:px-8">
          <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
            <ShieldCheck className="size-6" aria-hidden="true" />
          </div>
          <h2 className="mt-4 text-2xl font-bold text-slate-950">Independent recommendations</h2>
          <p className="mx-auto mt-3 max-w-3xl leading-7 text-slate-600">Badgely is independent from the course providers listed here. Course availability, pricing, subscriptions, and certification alignment may change, so always verify details with the training provider before enrolling.</p>
          <div className="mx-auto mt-5 max-w-3xl rounded-2xl border border-amber-200 bg-amber-50 p-4">
            <div className="flex items-center justify-center gap-2 font-semibold text-amber-900"><Sparkles className="size-4" aria-hidden="true" />Affiliate disclosure</div>
            <p className="mt-2 text-sm leading-6 text-amber-800">Some links on this page are affiliate links. If you use one of these links to make a qualifying purchase, Badgely may earn a commission at no additional cost to you.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
