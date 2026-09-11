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
  title: "Courses | AimToCert",
  description:
    "Compare self-paced IT certification courses, instructor-led training, bootcamps, official vendor training, and free learning resources.",
};

const courseCategories = [
  {
    title: "Self-Paced Courses",
    description:
      "Learn on your own schedule with recorded lessons, structured courses, learning paths, and certification preparation.",
    icon: PlayCircle,
    href: "#self-paced-courses",
    examples: "Udemy • Coursera • Pluralsight • CBT Nuggets",
    accent: "bg-violet-50 text-violet-700",
  },
  {
    title: "Instructor-Led Training",
    description:
      "Live virtual or classroom-based instruction with scheduled sessions and direct access to instructors.",
    icon: Users,
    href: "#instructor-led-training",
    examples:
      "Global Knowledge • New Horizons • Learning Tree • Fast Lane",
    accent: "bg-blue-50 text-blue-700",
  },
  {
    title: "Bootcamps",
    description:
      "Intensive training programs designed to build certification or technical skills over a concentrated period.",
    icon: Target,
    href: "#bootcamps",
    examples:
      "Certification Camps • Infosec • Training Camp • Firebrand",
    accent: "bg-orange-50 text-orange-700",
  },
  {
    title: "Official Vendor Training",
    description:
      "Courses and learning paths provided directly by the organizations behind the technologies and certifications.",
    icon: Building2,
    href: "#official-vendor-training",
    examples:
      "Microsoft Learn • Cisco U. • AWS Skill Builder • Red Hat",
    accent: "bg-emerald-50 text-emerald-700",
  },
  {
    title: "Free Courses",
    description:
      "No-cost courses, learning modules, tutorials, and training resources for building IT skills.",
    icon: GraduationCap,
    href: "#free-courses",
    examples:
      "Microsoft Learn • Cisco Networking Academy • AWS • IBM SkillsBuild",
    accent: "bg-cyan-50 text-cyan-700",
  },
];

const selfPacedSources = [
  {
    name: "Udemy",
    label: "Course marketplace",
    mark: "U",
    description:
      "A large marketplace of self-paced IT certification courses from independent instructors across entry-level and advanced technology topics.",
    bestFor: "CompTIA • AWS • Azure • Cisco • Linux • IT skills",
    href: "https://www.udemy.com/courses/it-and-software/it-certification/",
    accent: "from-violet-700 to-purple-500",
    button: "Browse IT certification courses",
  },
  {
    name: "Coursera",
    label: "Structured online learning",
    mark: "C",
    description:
      "Flexible online courses, professional certificates, specializations, and technology programs from universities and industry organizations.",
    bestFor: "IT Support • Cybersecurity • Cloud • Data • AI",
    href: "https://www.coursera.org/browse/information-technology",
    accent: "from-blue-700 to-sky-500",
    button: "Browse IT courses",
  },
  {
    name: "Pluralsight",
    label: "Technology learning paths",
    mark: "PS",
    description:
      "Technology-focused certification paths combining expert-led courses with labs, assessments, and practice-exam resources.",
    bestFor: "AWS • Microsoft • CompTIA • ISC2 • Cloud • IT Ops",
    href: "https://www.pluralsight.com/product/cert-prep",
    accent: "from-fuchsia-700 to-pink-500",
    button: "Explore certification prep",
  },
  {
    name: "CBT Nuggets",
    label: "Certification video training",
    mark: "CBT",
    description:
      "On-demand technology training focused heavily on IT certifications, practical skills, and structured technical learning.",
    bestFor: "Cisco • CompTIA • Microsoft • AWS • Linux • Security",
    href: "https://www.cbtnuggets.com/",
    accent: "from-orange-600 to-amber-400",
    button: "Explore CBT Nuggets",
  },
];

const instructorLedSources = [
  {
    name: "Global Knowledge",
    label: "Live IT training",
    mark: "GK",
    description:
      "Live instructor-led IT training delivered through virtual classrooms and physical classroom locations, with certification-focused courses and hands-on learning.",
    bestFor: "AWS • Cisco • Microsoft • CompTIA • ITSM • Enterprise IT",
    href:
      "https://www.globalknowledge.com/us-en/schedule-by/delivery-format/classroom-live/",
    accent: "from-blue-800 to-sky-500",
    button: "Browse live training",
  },
  {
    name: "New Horizons",
    label: "Virtual instructor-led training",
    mark: "NH",
    description:
      "Scheduled instructor-led certification and technology training with live virtual delivery across a wide range of major IT vendors.",
    bestFor: "CompTIA • Microsoft • AWS • Cisco • Red Hat • ITIL",
    href: "https://www.newhorizons.com/certifications",
    accent: "from-indigo-700 to-blue-500",
    button: "Browse certification training",
  },
  {
    name: "Learning Tree International",
    label: "Live online & classroom",
    mark: "LT",
    description:
      "Instructor-led technology and professional training available through live online classrooms and in-person education centers.",
    bestFor: "Cloud • Cybersecurity • ITIL • Agile • Microsoft • IT skills",
    href: "https://www.learningtree.com/delivery/",
    accent: "from-emerald-700 to-teal-500",
    button: "Explore live training",
  },
  {
    name: "Fast Lane",
    label: "Instructor-led technical training",
    mark: "FL",
    description:
      "Technical training delivered through instructor-led online and classroom formats with courses covering major enterprise technology vendors.",
    bestFor: "Cisco • AWS • Microsoft • CompTIA • Cloud • Networking",
    href: "https://www.fastlaneus.com/",
    accent: "from-cyan-700 to-blue-500",
    button: "Browse Fast Lane training",
  },
];

const bootcampSources = [
  {
    name: "Certification Camps",
    label: "Accelerated certification bootcamps",
    mark: "CC",
    description:
      "Accelerated live instructor-led certification bootcamps designed to combine focused training, hands-on preparation, and certification testing.",
    bestFor: "Microsoft • AWS • Cisco • CompTIA • ISC2 • VMware",
    href: "https://www.certificationcamps.com/bootcamps/",
    accent: "from-orange-700 to-amber-500",
    button: "Browse certification bootcamps",
  },
  {
    name: "Infosec",
    label: "Cybersecurity bootcamps",
    mark: "IS",
    description:
      "Condensed live cybersecurity certification training with online, in-person, and team-onsite options plus hands-on learning resources.",
    bestFor:
      "CISSP • Security+ • CISM • CCNA • AWS • Azure • Cybersecurity",
    href: "https://www.infosecinstitute.com/skills/boot-camps/",
    accent: "from-emerald-700 to-green-500",
    button: "Browse Infosec bootcamps",
  },
  {
    name: "Training Camp",
    label: "IT certification bootcamps",
    mark: "TC",
    description:
      "Accelerated certification training with scheduled virtual and in-person bootcamps covering a broad range of technology and security vendors.",
    bestFor:
      "CompTIA • Cisco • Microsoft • AWS • ISC2 • ISACA • EC-Council",
    href: "https://trainingcamp.com/schedule-2/",
    accent: "from-slate-800 to-blue-600",
    button: "Browse bootcamp schedules",
  },
  {
    name: "Firebrand Training",
    label: "Accelerated IT training",
    mark: "FB",
    description:
      "Accelerated technology and certification training designed for intensive learning across cybersecurity, cloud, networking, data, and related IT fields.",
    bestFor:
      "Cybersecurity • Cloud • Cisco • CompTIA • ISC2 • ISACA",
    href: "https://www.firebrand.training/en",
    accent: "from-red-700 to-orange-500",
    button: "Explore accelerated training",
  },
];

const officialVendorSources = [
  {
    name: "Microsoft Learn",
    label: "Official Microsoft training",
    mark: "MS",
    description:
      "Microsoft's official learning platform provides structured modules, learning paths, certification preparation, and training for Microsoft technologies.",
    bestFor:
      "Azure • Microsoft 365 • Security • Data • AI • Power Platform",
    href: "https://learn.microsoft.com/en-us/training/",
    accent: "from-blue-700 to-indigo-500",
    button: "Explore Microsoft Learn",
  },
  {
    name: "Cisco U.",
    label: "Official Cisco training",
    mark: "CU",
    description:
      "Cisco's official learning platform provides certification preparation, learning paths, technical courses, tutorials, and hands-on lab experiences.",
    bestFor:
      "CCNA • CCNP • CyberOps • DevNet • Cisco Specialist",
    href: "https://u.cisco.com/learn",
    accent: "from-sky-700 to-cyan-500",
    button: "Explore Cisco U.",
  },
  {
    name: "AWS Skill Builder",
    label: "Official AWS training",
    mark: "AWS",
    description:
      "AWS's official digital learning platform provides cloud courses, certification exam preparation, hands-on learning, and role-based training.",
    bestFor:
      "Cloud Practitioner • Solutions Architect • Developer • Security • AWS skills",
    href: "https://aws.amazon.com/training/digital/",
    accent: "from-orange-600 to-amber-400",
    button: "Explore AWS Skill Builder",
  },
  {
    name: "Red Hat Training",
    label: "Official Red Hat training",
    mark: "RH",
    description:
      "Official Red Hat training provides instructor-led and self-paced technical education, hands-on labs, certification preparation, and enterprise Linux learning.",
    bestFor:
      "RHCSA • RHCE • OpenShift • Ansible • Linux • Enterprise IT",
    href: "https://www.redhat.com/en/services/training-and-certification",
    accent: "from-red-800 to-rose-600",
    button: "Explore Red Hat training",
  },
];

const freeCourseSources = [
  {
    name: "Microsoft Learn",
    label: "Free Microsoft learning",
    mark: "MS",
    description:
      "Self-directed Microsoft learning paths and interactive modules covering cloud, security, data, AI, Microsoft 365, Power Platform, and other technologies.",
    bestFor:
      "Azure • Microsoft 365 • Security • AI • Data • Power Platform",
    href: "https://learn.microsoft.com/en-us/training/",
    accent: "from-blue-700 to-indigo-500",
    button: "Browse Microsoft Learn",
  },
  {
    name: "Cisco Networking Academy",
    label: "Free Cisco learning",
    mark: "CNA",
    description:
      "Free beginner-friendly and career-focused technology courses covering networking, cybersecurity, programming, data science, and foundational digital skills.",
    bestFor:
      "Networking • Cybersecurity • Python • Data Science • Entry-level IT",
    href:
      "https://www.cisco.com/site/us/en/learn/training-certifications/training/netacad/index.html",
    accent: "from-sky-700 to-cyan-500",
    button: "Explore Networking Academy",
  },
  {
    name: "AWS Skill Builder",
    label: "Free AWS digital training",
    mark: "AWS",
    description:
      "A large collection of free AWS digital learning resources for building cloud, AI, security, architecture, and role-based technology skills.",
    bestFor:
      "AWS Cloud • Cloud Practitioner • AI • Security • Architecture",
    href: "https://aws.amazon.com/training/digital/",
    accent: "from-orange-600 to-amber-400",
    button: "Start free AWS training",
  },
  {
    name: "IBM SkillsBuild",
    label: "Free technology learning",
    mark: "IBM",
    description:
      "Free online technology learning from IBM with courses and pathways focused on AI, cybersecurity, data, professional skills, and career development.",
    bestFor:
      "AI • Cybersecurity • Data • Cloud fundamentals • Career skills",
    href: "https://skillsbuild.org/",
    accent: "from-slate-800 to-blue-600",
    button: "Explore IBM SkillsBuild",
  },
];

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
    bestFor:
      "AWS Cloud Practitioner, Solutions Architect, Security and specialty certifications",
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
  const spotlight = courseProviders.find(
    (provider) => provider.name === "AWS Skill Builder",
  )!;

  return (
    <main>
      <MarketingHero
        aside={
          <HeroPanel>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-300">
                Browse training
              </p>

              <h2 className="mt-2 text-xl font-bold text-white">
                Choose the way you want to learn.
              </h2>
            </div>

            <div className="mt-5 space-y-3">
              {courseCategories.slice(0, 3).map((category, index) => {
                const Icon = category.icon;

                return (
                  <a
                    key={category.title}
                    href={category.href}
                    className="block"
                  >
                    <HeroOption className="flex items-center gap-4">
                      <span
                        className={`flex size-11 shrink-0 items-center justify-center rounded-2xl text-white ${
                          index === 0
                            ? "bg-violet-600"
                            : index === 1
                              ? "bg-blue-600"
                              : "bg-orange-600"
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

            <div className="mt-5 border-t border-white/10 pt-5">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-300">
                Provider spotlight
              </p>

              <a
                href={spotlight.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 flex items-center gap-4 rounded-2xl bg-white/[0.055] p-4 transition hover:bg-blue-500/10"
              >
                <span className="flex size-12 items-center justify-center rounded-2xl bg-slate-950 text-sm font-black text-white">
                  AWS
                </span>

                <div className="flex-1">
                  <p className="font-bold text-white">AWS Skill Builder</p>

                  <p className="mt-1 text-sm text-slate-300">
                    Free and paid official AWS digital learning.
                  </p>
                </div>

                <ExternalLink
                  className="size-4 text-blue-200"
                  aria-hidden="true"
                />
              </a>
            </div>
          </HeroPanel>
        }
      >
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-300">
          Courses
        </p>

        <h1 className="mt-5 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Find IT training
          <span className="block bg-gradient-to-r from-blue-200 via-blue-400 to-blue-600 bg-clip-text text-transparent">
            that fits how you learn.
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
          Compare self-paced courses, instructor-led training, bootcamps,
          official vendor learning, and free training resources for your
          certification goals.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href="#course-categories"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-lg shadow-blue-950/30 transition hover:bg-blue-500"
          >
            Browse training types
            <ArrowRight className="size-4" aria-hidden="true" />
          </a>

          <a
            href="#certification-courses"
            className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/25 bg-white/[0.03] px-5 py-3 font-semibold text-white transition hover:bg-white/10"
          >
            Browse by certification
          </a>
        </div>

        <div className="mt-9 flex flex-wrap gap-x-7 gap-y-3 text-sm text-slate-300">
          <span className="inline-flex items-center gap-2">
            <ShieldCheck className="size-4 text-blue-300" />
            Independent guidance
          </span>

          <span className="inline-flex items-center gap-2">
            <BadgeCheck className="size-4 text-blue-300" />
            Official options identified
          </span>

          <span className="inline-flex items-center gap-2">
            <Laptop className="size-4 text-blue-300" />
            Multiple learning formats
          </span>
        </div>
      </MarketingHero>

      <section
        id="course-categories"
        className="border-b border-slate-200 bg-slate-50"
      >
        <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-700">
              Browse by training type
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Start with the learning experience you want.
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              AimToCert organizes training by format so you can quickly
              distinguish flexible self-study from live instruction,
              accelerated bootcamps, official vendor learning, and free
              resources.
            </p>
          </div>

          <div className="mt-9 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            {courseCategories.map((category) => {
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
        id="self-paced-courses"
        className="border-b border-slate-200 bg-violet-50/40"
      >
        <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-violet-700">
              Self-Paced Courses
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Learn when your schedule allows.
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              Explore flexible training platforms where you can work through
              lessons, certification paths, and technical material at your own
              pace.
            </p>
          </div>

          <div className="mt-9 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {selfPacedSources.map((source) => (
              <Card
                key={source.name}
                className="flex h-full flex-col overflow-hidden p-0 transition hover:-translate-y-1 hover:border-violet-200 hover:shadow-xl"
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
        id="instructor-led-training"
        className="border-b border-slate-200 bg-blue-50/40"
      >
        <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-700">
              Instructor-Led Training
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Learn live with an instructor.
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              Explore scheduled virtual and classroom training where learners
              can interact with instructors, ask questions, and work through
              technical material in real time.
            </p>
          </div>

          <div className="mt-9 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {instructorLedSources.map((source) => (
              <Card
                key={source.name}
                className="flex h-full flex-col overflow-hidden p-0 transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
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
                      className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-500"
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
        id="bootcamps"
        className="border-b border-slate-200 bg-orange-50/40"
      >
        <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-orange-700">
              Bootcamps
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Accelerate your certification training.
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              Explore intensive training programs designed to cover
              certification material over a concentrated period with live
              instruction, structured preparation, and hands-on learning.
            </p>
          </div>

          <div className="mt-9 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {bootcampSources.map((source) => (
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

          <div className="mx-auto mt-7 max-w-4xl rounded-2xl border border-orange-200 bg-white p-5 text-center">
            <p className="font-semibold text-slate-950">
              Bootcamp ≠ guaranteed certification
            </p>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              Program length, exam vouchers, retakes, prerequisites, delivery
              methods, and certification guarantees vary by provider. Review
              the provider&apos;s current terms before enrolling.
            </p>
          </div>
        </div>
      </section>

      <section
        id="official-vendor-training"
        className="border-b border-slate-200 bg-emerald-50/40"
      >
        <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-700">
              Official Vendor Training
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Learn directly from the technology provider.
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              Explore official training platforms created by the organizations
              responsible for the technologies and certification programs.
              These resources can provide vendor-aligned learning paths,
              hands-on labs, exam preparation, and technical instruction.
            </p>
          </div>

          <div className="mt-9 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {officialVendorSources.map((source) => (
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
                  <div className="flex justify-center">
                    <Badge className="bg-emerald-50 text-emerald-800">
                      <BadgeCheck
                        className="mr-1 size-3.5"
                        aria-hidden="true"
                      />
                      Official
                    </Badge>
                  </div>

                  <p className="mt-4 leading-7 text-slate-600">
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

          <div className="mx-auto mt-7 max-w-4xl rounded-2xl border border-emerald-200 bg-white p-5 text-center">
            <p className="font-semibold text-slate-950">
              Official training does not always mean free training
            </p>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              Vendor learning platforms may contain a mixture of free modules,
              paid courses, subscriptions, labs, instructor-led training, and
              certification preparation. Review the provider&apos;s current
              access and pricing details before enrolling.
            </p>
          </div>
        </div>
      </section>

      <section
        id="free-courses"
        className="border-b border-slate-200 bg-cyan-50/40"
      >
        <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-700">
              Free Courses
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Start learning without paying for a course.
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              Explore legitimate no-cost technology learning from major
              technology organizations. Free access can include individual
              courses, modules, learning paths, tutorials, and foundational
              career training.
            </p>
          </div>

          <div className="mt-9 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {freeCourseSources.map((source) => (
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
                  <div className="flex justify-center">
                    <Badge className="bg-cyan-50 text-cyan-800">
                      Free learning
                    </Badge>
                  </div>

                  <p className="mt-4 leading-7 text-slate-600">
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
                      className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-cyan-600 px-4 py-3 font-semibold text-white transition hover:bg-cyan-500"
                    >
                      {source.button}
                      <ExternalLink className="size-4" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="mx-auto mt-7 max-w-4xl rounded-2xl border border-cyan-200 bg-white p-5 text-center">
            <p className="font-semibold text-slate-950">
              Free course ≠ free certification exam
            </p>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              Free training does not necessarily include certification exams,
              vouchers, labs, premium content, or instructor support. Check
              each provider&apos;s current terms before assuming the entire
              certification path is free.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-14 text-center sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-700">
            Choose how you learn
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            More than just video courses.
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            Different learners need different tools. AimToCert helps you
            identify what each learning platform actually provides.
          </p>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {courseTypes.map(({ icon: Icon, title, description }) => (
            <Card
              key={title}
              className="h-full p-5 text-center transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
            >
              <div className="mx-auto flex size-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                <Icon className="size-5" aria-hidden="true" />
              </div>

              <h3 className="mt-4 text-lg font-bold text-slate-950">
                {title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                {description}
              </p>
            </Card>
          ))}
        </div>
      </section>

      <section
        id="certification-courses"
        className="border-y border-slate-200 bg-slate-50"
      >
        <div className="mx-auto w-full max-w-7xl px-4 py-14 text-center sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-700">
              Browse by certification
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Start with what you want to earn.
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              Review learning platforms that cover the certification or
              technical area you are working toward.
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {certificationTracks.map((track) => (
              <Card
                key={track.title}
                className="flex h-full flex-col items-center p-5 text-center transition hover:border-blue-200 hover:shadow-md"
              >
                <div className="flex size-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                  <GraduationCap className="size-5" aria-hidden="true" />
                </div>

                <h3 className="mt-4 text-xl font-bold text-slate-950">
                  {track.title}
                </h3>

                <p className="mt-2 leading-6 text-slate-600">
                  {track.description}
                </p>

                <div className="mt-3 w-full rounded-xl bg-slate-50 p-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                    Platforms to review
                  </p>

                  <p className="mt-1 text-sm font-semibold leading-5 text-slate-800">
                    {track.providers}
                  </p>
                </div>

                <a
                  href="#providers"
                  className="mt-3 inline-flex items-center justify-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-600"
                >
                  Browse course providers
                  <ArrowRight className="size-4" aria-hidden="true" />
                </a>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section
        id="providers"
        className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-700">
            Course marketplace
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Top IT training providers.
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            AimToCert helps you discover the platform. Enrollment, pricing,
            subscriptions, refunds, and access remain with the external
            training provider.
          </p>
        </div>

        <div className="mt-9 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {courseProviders.map((provider) => (
            <Card
              key={provider.name}
              className="group flex h-full flex-col items-center overflow-hidden p-0 text-center transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
            >
              <div
                className={`flex w-full items-center justify-center bg-gradient-to-br ${provider.accent} px-5 py-7 text-white`}
              >
                <div className="flex size-16 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-xl font-black shadow-lg backdrop-blur">
                  {provider.mark}
                </div>
              </div>

              <div className="flex h-full w-full flex-col items-center p-5">
                <div className="flex flex-wrap justify-center gap-2">
                  <Badge className="bg-slate-100 text-slate-700">
                    {provider.type}
                  </Badge>

                  {provider.official ? (
                    <Badge className="bg-emerald-50 text-emerald-800">
                      <BadgeCheck
                        className="mr-1 size-3.5"
                        aria-hidden="true"
                      />
                      Official
                    </Badge>
                  ) : (
                    <Badge className="bg-blue-50 text-blue-700">
                      Third-party
                    </Badge>
                  )}

                  {provider.affiliate ? (
                    <Badge className="bg-amber-50 text-amber-800">
                      <Sparkles
                        className="mr-1 size-3.5"
                        aria-hidden="true"
                      />
                      Affiliate
                    </Badge>
                  ) : null}
                </div>

                <h3 className="mt-4 text-xl font-bold text-slate-950">
                  {provider.name}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {provider.summary}
                </p>

                <div className="mt-4 w-full rounded-xl bg-slate-50 p-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                    Best for
                  </p>

                  <p className="mt-1 text-sm font-medium leading-5 text-slate-800">
                    {provider.bestFor}
                  </p>
                </div>

                <div className="mt-3 flex flex-wrap justify-center gap-2">
                  {provider.features.map((feature) => (
                    <span
                      key={feature}
                      className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                <a
                  href={provider.href}
                  target="_blank"
                  rel={
                    provider.affiliate
                      ? "sponsored noopener noreferrer"
                      : "noopener noreferrer"
                  }
                  className="mt-auto inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-600"
                >
                  Visit {provider.name}
                  <ExternalLink className="size-4" aria-hidden="true" />
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

          <h2 className="mt-4 text-2xl font-bold text-slate-950">
            Independent recommendations
          </h2>

          <p className="mx-auto mt-3 max-w-3xl leading-7 text-slate-600">
            AimToCert is independent from the course providers listed here.
            Course availability, pricing, subscriptions, and certification
            alignment may change, so always verify details with the training
            provider before enrolling.
          </p>

          <div className="mx-auto mt-5 max-w-3xl rounded-2xl border border-amber-200 bg-amber-50 p-4">
            <div className="flex items-center justify-center gap-2 font-semibold text-amber-900">
              <Sparkles className="size-4" aria-hidden="true" />
              Affiliate disclosure
            </div>

            <p className="mt-2 text-sm leading-6 text-amber-800">
              Some links on this page are affiliate links. If you use one of
              these links to make a qualifying purchase, AimToCert may earn a
              commission at no additional cost to you.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}