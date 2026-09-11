import type { Metadata } from "next";
import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BookOpen,
  Boxes,
  CheckCircle2,
  Cloud,
  Code2,
  ExternalLink,
  FileQuestion,
  FlaskConical,
  GraduationCap,
  Library,
  MessageCircle,
  Network,
  Server,
  Shield,
  ShieldCheck,
  Terminal,
  Users,
  Video,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  HeroOption,
  HeroPanel,
  MarketingHero,
} from "@/components/layout/marketing-hero";

const description =
  "Find free IT certification training, official vendor learning, practice tests, labs, study tools, videos, and certification communities.";

export const metadata: Metadata = {
  title: "Free IT Certification Resources | AimToCert",
  description,
  alternates: {
    canonical: "/free-resources",
  },
  openGraph: {
    title: "Free IT Certification Resources | AimToCert",
    description,
    url: "/free-resources",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free IT Certification Resources | AimToCert",
    description,
  },
};

type Resource = {
  name: string;
  description: string;
  bestFor?: string;
  href: string;
  image?: string;
  icon?: LucideIcon;
  theme?: "blue" | "violet" | "emerald" | "amber";
};

const officialResources: Resource[] = [
  {
    name: "Microsoft Learn",
    description:
      "Official Microsoft learning paths, modules, practice assessments, and hands-on learning for Azure, Microsoft 365, security, data, and related certifications.",
    bestFor: "Microsoft Certifications",
    href: "https://learn.microsoft.com/training/",
    image: "/vendors/microsoft.png",
  },
  {
    name: "AWS Skill Builder",
    description:
      "Official AWS digital training with free learning content covering cloud fundamentals, architecture, operations, security, and certification preparation.",
    bestFor: "AWS Certifications",
    href: "https://skillbuilder.aws/",
    image: "/vendors/aws.png",
  },
  {
    name: "Google Cloud Skills Boost",
    description:
      "Official Google Cloud learning with courses, skill paths, and hands-on cloud training.",
    bestFor: "Google Cloud Certifications",
    href: "https://www.cloudskillsboost.google/",
    image: "/vendors/google-cloud.png",
  },
  {
    name: "CompTIA Exam Objectives",
    description:
      "Use the official CompTIA exam objectives as a certification study checklist for exams such as A+, Network+, Security+, and others.",
    bestFor: "CompTIA Certifications",
    href: "https://www.comptia.org/training/resources/exam-objectives",
    image: "/vendors/comptia.png",
  },
  {
    name: "Cisco Networking Academy",
    description:
      "Official Cisco networking, cybersecurity, and Packet Tracer learning resources for foundational and certification-focused study.",
    bestFor: "Cisco Certifications",
    href: "https://www.netacad.com/",
    image: "/vendors/cisco.png",
  },
  {
    name: "Linux Foundation Training",
    description:
      "Linux and open-source learning resources, including introductory material useful before Linux and cloud-native certifications.",
    bestFor: "Linux & Cloud-Native",
    href: "https://training.linuxfoundation.org/",
    icon: Terminal,
    theme: "blue",
  },
];

const videoResources: Resource[] = [
  {
    name: "Professor Messer",
    description:
      "Free video courses aligned to major CompTIA exam objectives, especially A+, Network+, and Security+.",
    bestFor: "CompTIA",
    href: "https://www.professormesser.com/",
    icon: Video,
    theme: "blue",
  },
  {
    name: "Jeremy's IT Lab",
    description:
      "Free CCNA-focused video lessons and Packet Tracer labs designed around Cisco networking concepts.",
    bestFor: "CCNA",
    href: "https://www.youtube.com/@JeremysITLab",
    icon: Network,
    theme: "violet",
  },
  {
    name: "NetworkChuck",
    description:
      "Beginner-friendly videos covering networking, Linux, cybersecurity, cloud, and general IT skills.",
    bestFor: "General IT Learning",
    href: "https://www.youtube.com/@NetworkChuck",
    icon: Server,
    theme: "emerald",
  },
  {
    name: "TCM Security",
    description:
      "Cybersecurity and ethical-hacking learning with practical security content and introductory training.",
    bestFor: "Cybersecurity",
    href: "https://academy.tcm-sec.com/",
    icon: Shield,
    theme: "amber",
  },
];

const practiceResources: Resource[] = [
  {
    name: "Microsoft Practice Assessments",
    description:
      "Free official practice assessments for supported Microsoft certification exams.",
    bestFor: "Microsoft",
    href: "https://learn.microsoft.com/credentials/certifications/practice-assessments-for-microsoft-certifications",
    image: "/vendors/microsoft.png",
  },
  {
    name: "OpenExamPrep",
    description:
      "Free certification practice questions covering several CompTIA and other technology certifications.",
    bestFor: "CompTIA Practice",
    href: "https://open-exam-prep.com/exams/technology",
    icon: FileQuestion,
    theme: "blue",
  },
  {
    name: "CertSafari",
    description:
      "Free certification practice material across cloud, networking, and other IT certification areas.",
    bestFor: "Multi-Vendor Practice",
    href: "https://www.certsafari.com/",
    icon: CheckCircle2,
    theme: "emerald",
  },
  {
    name: "ExamCompass",
    description:
      "Free practice quizzes commonly used for CompTIA A+, Network+, and Security+ review.",
    bestFor: "CompTIA Fundamentals",
    href: "https://www.examcompass.com/",
    icon: FileQuestion,
    theme: "violet",
  },
  {
    name: "Tutorials Dojo",
    description:
      "Cloud certification training and free sample practice material for AWS, Azure, and Google Cloud.",
    bestFor: "Cloud Certifications",
    href: "https://tutorialsdojo.com/",
    icon: Cloud,
    theme: "blue",
  },
  {
    name: "Anki",
    description:
      "Free spaced-repetition flashcard software useful for commands, ports, terminology, acronyms, and exam facts.",
    bestFor: "Flashcards",
    href: "https://apps.ankiweb.net/",
    icon: BookOpen,
    theme: "amber",
  },
];

const labResources: Resource[] = [
  {
    name: "Cisco Packet Tracer",
    description:
      "Cisco network simulation software commonly used for CCNA and networking practice.",
    bestFor: "Networking Labs",
    href: "https://www.netacad.com/courses/packet-tracer",
    image: "/vendors/cisco.png",
  },
  {
    name: "GNS3",
    description:
      "Free network emulation platform for building more advanced multi-vendor networking labs.",
    bestFor: "Advanced Networking",
    href: "https://www.gns3.com/",
    icon: Network,
    theme: "blue",
  },
  {
    name: "VirtualBox",
    description:
      "Free virtualization software for building Linux, Windows, networking, and server home labs.",
    bestFor: "Home Labs",
    href: "https://www.virtualbox.org/",
    icon: Server,
    theme: "violet",
  },
  {
    name: "Docker",
    description:
      "Container tooling useful for DevOps, cloud-native, Linux, Kubernetes, and application-platform learning.",
    bestFor: "DevOps & Containers",
    href: "https://www.docker.com/",
    icon: Boxes,
    theme: "blue",
  },
  {
    name: "TryHackMe",
    description:
      "Browser-based cybersecurity learning with free rooms covering security fundamentals, SOC topics, Linux, and offensive-security skills.",
    bestFor: "Cybersecurity Labs",
    href: "https://tryhackme.com/",
    icon: Shield,
    theme: "emerald",
  },
  {
    name: "Hack The Box Academy",
    description:
      "Hands-on cybersecurity learning covering Linux, enumeration, web security, penetration testing, and defensive skills.",
    bestFor: "Security Skills",
    href: "https://academy.hackthebox.com/",
    icon: Code2,
    theme: "emerald",
  },
  {
    name: "Linux Journey",
    description:
      "Free Linux learning covering command-line fundamentals, filesystems, processes, networking, and system concepts.",
    bestFor: "Linux",
    href: "https://linuxjourney.com/",
    icon: Terminal,
    theme: "amber",
  },
  {
    name: "MITRE ATT&CK",
    description:
      "Free cybersecurity knowledge base for adversary tactics and techniques used heavily in defensive-security study.",
    bestFor: "Security Operations",
    href: "https://attack.mitre.org/",
    icon: ShieldCheck,
    theme: "violet",
  },
];

const communities: Resource[] = [
  {
    name: "Cisco Learning Network",
    description:
      "Cisco certification discussions, learning resources, technical communities, and certification guidance.",
    bestFor: "Cisco Community",
    href: "https://learningnetwork.cisco.com/",
    image: "/vendors/cisco.png",
  },
  {
    name: "Reddit IT Certification Communities",
    description:
      "Certification communities can provide study experiences, exam discussions, resource recommendations, and peer support.",
    bestFor: "Community Discussion",
    href: "https://www.reddit.com/",
    icon: Users,
    theme: "amber",
  },
  {
    name: "TechExams",
    description:
      "Long-running certification and IT-career discussion community covering networking, cybersecurity, cloud, and professional development.",
    bestFor: "IT Certification Community",
    href: "https://community.infosecinstitute.com/",
    icon: MessageCircle,
    theme: "blue",
  },
];

function getThemeClasses(theme: Resource["theme"]) {
  switch (theme) {
    case "violet":
      return "bg-violet-100 text-violet-700";
    case "emerald":
      return "bg-emerald-100 text-emerald-700";
    case "amber":
      return "bg-amber-100 text-amber-700";
    default:
      return "bg-blue-100 text-blue-700";
  }
}

function ResourceCard({
  name,
  description,
  bestFor,
  href,
  image,
  icon: Icon,
  theme = "blue",
}: Resource) {
  return (
    <Card className="group flex h-full flex-col items-center text-center transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl">
      <div className="flex min-h-32 w-full items-center justify-center rounded-2xl border border-slate-100 bg-white p-5">
        {image ? (
          <Image
            src={image}
            alt={`${name} logo`}
            width={160}
            height={90}
            className="max-h-20 max-w-[180px] object-contain"
          />
        ) : Icon ? (
          <span
            className={`flex size-20 items-center justify-center rounded-3xl ${getThemeClasses(
              theme,
            )}`}
          >
            <Icon className="size-9" aria-hidden="true" />
          </span>
        ) : null}
      </div>

      {bestFor ? (
        <p className="mt-5 text-sm font-semibold uppercase tracking-[0.12em] text-blue-700">
          {bestFor}
        </p>
      ) : null}

      <h3 className="mt-2 text-xl font-bold text-slate-950">{name}</h3>

      <p className="mt-4 leading-7 text-slate-600">{description}</p>

      <div className="mt-auto pt-6">
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-semibold text-blue-700 transition group-hover:text-blue-900"
        >
          Visit resource
          <ExternalLink
            className="size-4 transition group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </a>
      </div>
    </Card>
  );
}

export default function FreeResourcesPage() {
  return (
    <main>
      <MarketingHero
        aside={
          <HeroPanel>
            <div className="flex items-center justify-center gap-3 text-center">
              <span className="flex size-11 items-center justify-center rounded-2xl bg-blue-500/15 text-blue-200 ring-1 ring-inset ring-blue-300/25">
                <Library className="size-5" aria-hidden="true" />
              </span>

              <div>
                <h2 className="text-xl font-bold text-white">
                  Build a free study stack
                </h2>

                <p className="mt-1 text-sm text-slate-300">
                  Start with official material, then add practice.
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              <a href="#official-training" className="block">
                <HeroOption className="flex items-center gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white">
                    <GraduationCap className="size-5" aria-hidden="true" />
                  </span>

                  <div className="flex-1">
                    <p className="font-bold text-white">
                      Official free training
                    </p>

                    <p className="mt-1 text-sm text-slate-300">
                      Learn directly from major certification vendors.
                    </p>
                  </div>

                  <ArrowRight
                    className="size-5 text-blue-200"
                    aria-hidden="true"
                  />
                </HeroOption>
              </a>

              <a href="#practice" className="block">
                <HeroOption className="flex items-center gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-violet-600 text-white">
                    <CheckCircle2 className="size-5" aria-hidden="true" />
                  </span>

                  <div className="flex-1">
                    <p className="font-bold text-white">Practice and review</p>

                    <p className="mt-1 text-sm text-slate-300">
                      Test your understanding before exam day.
                    </p>
                  </div>

                  <ArrowRight
                    className="size-5 text-blue-200"
                    aria-hidden="true"
                  />
                </HeroOption>
              </a>

              <a href="#labs" className="block">
                <HeroOption className="flex items-center gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-600 text-white">
                    <FlaskConical className="size-5" aria-hidden="true" />
                  </span>

                  <div className="flex-1">
                    <p className="font-bold text-white">Labs and tools</p>

                    <p className="mt-1 text-sm text-slate-300">
                      Turn certification knowledge into practical skills.
                    </p>
                  </div>

                  <ArrowRight
                    className="size-5 text-blue-200"
                    aria-hidden="true"
                  />
                </HeroOption>
              </a>
            </div>
          </HeroPanel>
        }
      >
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-300">
          Free Resources
        </p>

        <h1 className="mt-5 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Study smarter without
          <span className="block bg-gradient-to-r from-blue-200 via-blue-400 to-blue-600 bg-clip-text text-transparent">
            paying for everything.
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
          Explore free official training, video courses, practice questions,
          labs, tools, flashcards, and certification communities in one place.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href="#official-training"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-lg shadow-blue-950/30 transition hover:bg-blue-500"
          >
            Explore free resources
            <ArrowRight className="size-4" aria-hidden="true" />
          </a>

          <a
            href="#labs"
            className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/25 bg-white/[0.03] px-5 py-3 font-semibold text-white transition hover:bg-white/10"
          >
            Browse labs and tools
          </a>
        </div>

        <div className="mt-9 flex flex-wrap gap-x-7 gap-y-3 text-sm text-slate-300">
          <span className="inline-flex items-center gap-2">
            <ShieldCheck className="size-4 text-blue-300" />
            Official resources prioritized
          </span>

          <span className="inline-flex items-center gap-2">
            <BookOpen className="size-4 text-blue-300" />
            Certification-focused
          </span>

          <span className="inline-flex items-center gap-2">
            <FlaskConical className="size-4 text-blue-300" />
            Hands-on learning
          </span>
        </div>
      </MarketingHero>

      <section
        id="official-training"
        className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-700">
            Official vendor training
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Start with the people who create the technology.
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            Official learning platforms are a strong first stop because they
            are closely connected to the technologies and certification
            objectives being studied.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {officialResources.map((resource) => (
            <ResourceCard key={resource.name} {...resource} />
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
              <Video className="size-6" aria-hidden="true" />
            </span>

            <p className="mt-5 text-sm font-semibold uppercase tracking-[0.16em] text-blue-700">
              Free video learning
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Learn from established IT instructors.
            </h2>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {videoResources.map((resource) => (
              <ResourceCard key={resource.name} {...resource} />
            ))}
          </div>
        </div>
      </section>

      <section
        id="practice"
        className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-3xl text-center">
          <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-violet-100 text-violet-700">
            <FileQuestion className="size-6" aria-hidden="true" />
          </span>

          <p className="mt-5 text-sm font-semibold uppercase tracking-[0.16em] text-blue-700">
            Practice tests and flashcards
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Study the material first. Then test yourself.
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            Practice resources work best after you understand the exam
            objectives and core material.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {practiceResources.map((resource) => (
            <ResourceCard key={resource.name} {...resource} />
          ))}
        </div>
      </section>

      <section id="labs" className="border-y border-slate-200 bg-blue-50/50">
        <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
              <FlaskConical className="size-6" aria-hidden="true" />
            </span>

            <p className="mt-5 text-sm font-semibold uppercase tracking-[0.16em] text-blue-700">
              Labs and tools
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Turn exam knowledge into hands-on skill.
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              Build networks, virtual machines, containers, Linux systems,
              cloud environments, and cybersecurity labs while you study.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {labResources.map((resource) => (
              <ResourceCard key={resource.name} {...resource} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
            <Users className="size-6" aria-hidden="true" />
          </span>

          <p className="mt-5 text-sm font-semibold uppercase tracking-[0.16em] text-blue-700">
            Communities
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Learn from people pursuing the same goals.
          </h2>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {communities.map((resource) => (
            <ResourceCard key={resource.name} {...resource} />
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <Card className="border-amber-200 bg-amber-50">
          <div className="flex flex-col items-center text-center">
            <span className="flex size-14 items-center justify-center rounded-2xl bg-amber-100 text-amber-800">
              <Boxes className="size-6" aria-hidden="true" />
            </span>

            <div className="mt-5 max-w-3xl">
              <h2 className="text-xl font-bold text-slate-950">
                Free study does not always mean a free certification exam.
              </h2>

              <p className="mt-3 leading-7 text-slate-700">
                Many certification providers offer free learning resources
                while still charging for the certification exam itself.
                AimToCert separates study resources from exam costs so you know
                what is actually free.
              </p>
            </div>
          </div>
        </Card>
      </section>
    </main>
  );
}