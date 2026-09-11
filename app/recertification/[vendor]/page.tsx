import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  ExternalLink,
  GraduationCap,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";
import { Card } from "@/components/ui/card";

type VendorInfo = {
  name: string;
  logo: string;
  focus: string;
  overview: string;
  renewalSummary: string;
  keyPoints: string[];
  officialUrl: string;
  officialLabel: string;
};

const vendors: Record<string, VendorInfo> = {
  comptia: {
    name: "CompTIA",
    logo: "/vendors/comptia.png",
    focus: "Continuing Education & Renewal",
    overview:
      "CompTIA provides multiple renewal paths for eligible certifications through its Continuing Education program.",
    renewalSummary:
      "Your renewal path can depend on the certification you hold. Options may include qualifying continuing education activities, approved training, higher-level certifications, or other CompTIA renewal methods.",
    keyPoints: [
      "Check the expiration date of your specific CompTIA certification.",
      "Review the Continuing Education requirements for your credential.",
      "Confirm which activities and training qualify for CE credit.",
      "Verify any applicable renewal or maintenance fees directly with CompTIA.",
    ],
    officialUrl:
      "https://www.comptia.org/continuing-education/learn/how-to-renew",
    officialLabel: "CompTIA Continuing Education",
  },

  cisco: {
    name: "Cisco",
    logo: "/vendors/cisco.png",
    focus: "Recertification & Continuing Education",
    overview:
      "Cisco provides several ways to keep eligible certifications active, including exams and Continuing Education credits.",
    renewalSummary:
      "Most Cisco certifications are active for three years. Depending on certification level, candidates may recertify by taking qualifying exams, earning Continuing Education credits, or using an eligible combination of activities.",
    keyPoints: [
      "Most Cisco certifications use a three-year certification cycle.",
      "Eligible certifications can often be renewed through exams or Continuing Education credits.",
      "Requirements vary according to certification level.",
      "All applicable recertification requirements must be completed before expiration.",
    ],
    officialUrl:
      "https://www.cisco.com/site/us/en/learn/training-certifications/certifications/recertification/index.html",
    officialLabel: "Cisco Recertification",
  },

  microsoft: {
    name: "Microsoft",
    logo: "/vendors/microsoft.png",
    focus: "Certification Renewal",
    overview:
      "Microsoft uses an online renewal assessment for eligible role-based and specialty certifications.",
    renewalSummary:
      "Eligible Microsoft associate, expert, and specialty certifications can generally be renewed through a free online Microsoft Learn assessment during the renewal eligibility window. Fundamentals certifications do not currently expire.",
    keyPoints: [
      "Eligible certifications are renewed through Microsoft Learn.",
      "Microsoft currently provides the renewal assessment at no cost.",
      "The renewal window generally opens six months before expiration.",
      "Fundamentals certifications currently do not require renewal.",
    ],
    officialUrl:
      "https://learn.microsoft.com/en-us/credentials/certifications/renew-your-microsoft-certification",
    officialLabel: "Microsoft Certification Renewal",
  },

  aws: {
    name: "AWS",
    logo: "/vendors/aws.png",
    focus: "Recertification",
    overview:
      "AWS certifications remain active for a defined period and must be recertified to maintain active status.",
    renewalSummary:
      "AWS certifications are currently valid for three years. AWS generally requires candidates to satisfy the current recertification requirements before their certification expires.",
    keyPoints: [
      "AWS certifications are currently valid for three years.",
      "Recertification requirements depend on the certification level and credential.",
      "Some lower-level certifications may be renewed by earning eligible higher-level certifications.",
      "Check the current AWS policy before scheduling your recertification.",
    ],
    officialUrl:
      "https://aws.amazon.com/certification/policies/recertification/",
    officialLabel: "AWS Recertification Policy",
  },

  isc2: {
    name: "ISC2",
    logo: "/vendors/isc2.png",
    focus: "CPE & Certification Maintenance",
    overview:
      "ISC2 certification maintenance generally combines Continuing Professional Education requirements with ongoing certification maintenance obligations.",
    renewalSummary:
      "ISC2 members must maintain the requirements associated with their certification cycle, including applicable CPE credits and annual maintenance requirements.",
    keyPoints: [
      "CPE requirements vary by ISC2 certification.",
      "CPE credits are tracked across the applicable certification cycle.",
      "Annual maintenance requirements may also apply.",
      "Use the official ISC2 handbook for your exact certification requirements.",
    ],
    officialUrl:
      "https://www.isc2.org/members/cpe-opportunities",
    officialLabel: "ISC2 CPE & Maintenance Resources",
  },

  isaca: {
    name: "ISACA",
    logo: "/vendors/isaca.png",
    focus: "CPE & Certification Maintenance",
    overview:
      "ISACA uses Continuing Professional Education and ongoing maintenance requirements to keep eligible certifications active.",
    renewalSummary:
      "Requirements vary by credential. Many established ISACA certifications use annual and multi-year CPE requirements along with annual maintenance obligations.",
    keyPoints: [
      "CPE requirements depend on the ISACA certification you hold.",
      "Many credentials require both annual and multi-year CPE totals.",
      "Annual certification maintenance requirements may apply.",
      "ISACA has announced CPE policy changes taking effect in 2027, so verify the current policy.",
    ],
    officialUrl:
      "https://www.isaca.org/credentialing/how-to-earn-cpe",
    officialLabel: "ISACA CPE Information",
  },

  pmi: {
    name: "PMI",
    logo: "/vendors/pmi.png",
    focus: "PDU & Certification Renewal",
    overview:
      "PMI uses Professional Development Units through its Continuing Certification Requirements program.",
    renewalSummary:
      "PMI certification holders generally earn the required PDUs for their credential, report them through PMI, and complete the applicable renewal process.",
    keyPoints: [
      "PDU requirements vary by PMI certification.",
      "Qualifying professional development activities can earn PDUs.",
      "PDUs are reported through PMI's certification system.",
      "An applicable certification renewal fee may be required.",
    ],
    officialUrl:
      "https://www.pmi.org/certifications/renew-your-pmi-certification",
    officialLabel: "PMI Certification Renewal",
  },

  giac: {
    name: "GIAC",
    logo: "/vendors/giac.png",
    focus: "Certification Renewal & CPE",
    overview:
      "GIAC certifications use a recurring renewal cycle and allow certification holders to demonstrate continued professional development through qualifying activities.",
    renewalSummary:
      "GIAC certifications currently require renewal every four years. GIAC recommends accumulating qualifying CPE credits during the active certification period.",
    keyPoints: [
      "GIAC certifications currently use a four-year renewal cycle.",
      "Qualifying CPE activities can contribute toward renewal.",
      "CPE documentation and renewal are managed through the GIAC account dashboard.",
      "A certification maintenance fee applies under the current GIAC policy.",
    ],
    officialUrl: "https://www.giac.org/renewal",
    officialLabel: "GIAC Certification Renewal",
  },

  "red-hat": {
    name: "Red Hat",
    logo: "/vendors/red-hat.png",
    focus: "Certification Currency",
    overview:
      "Red Hat describes certifications as current or non-current rather than simply expired.",
    renewalSummary:
      "Red Hat certifications are generally considered current for three years. Depending on the credential, candidates may keep a certification current by retaking an exam or earning another qualifying Red Hat certification.",
    keyPoints: [
      "Red Hat certifications are generally current for three years.",
      "Retaking the applicable exam is one renewal option.",
      "Some credentials can also be kept current by earning eligible higher-level certifications.",
      "Requirements vary by individual Red Hat certification.",
    ],
    officialUrl:
      "https://www.redhat.com/en/services/certification/renewal",
    officialLabel: "Red Hat Certification Renewal",
  },

  "google-cloud": {
    name: "Google Cloud",
    logo: "/vendors/google-cloud.png",
    focus: "Certification Renewal",
    overview:
      "Google Cloud certification renewal depends on the certification level and current renewal policy.",
    renewalSummary:
      "Google Cloud provides renewal windows for active certifications. Renewal methods and validity periods can differ between foundational, associate, and professional credentials.",
    keyPoints: [
      "Certification validity depends on the certification level.",
      "Renewal eligibility opens before the credential expires.",
      "Renewal options may include the applicable exam or other approved renewal methods for supported certifications.",
      "Always check the individual certification page for its current renewal method.",
    ],
    officialUrl:
      "https://cloud.google.com/learn/certification",
    officialLabel: "Google Cloud Certifications",
  },
};

type PageProps = {
  params: Promise<{
    vendor: string;
  }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { vendor } = await params;
  const info = vendors[vendor];

  if (!info) {
    return {
      title: "Recertification | AimToCert",
    };
  }

  return {
    title: `${info.name} Recertification & Renewal | AimToCert`,
    description: `Understand ${info.name} certification renewal, recertification, maintenance requirements, timelines, and official renewal resources.`,
  };
}

export function generateStaticParams() {
  return Object.keys(vendors).map((vendor) => ({
    vendor,
  }));
}

export default async function VendorRecertificationPage({
  params,
}: PageProps) {
  const { vendor } = await params;
  const info = vendors[vendor];

  if (!info) {
    notFound();
  }

  return (
    <main>
      <section className="border-b border-slate-200 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_360px] lg:px-8 lg:py-20">
          <div>
            <Link
              href="/recertification"
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-200 transition hover:text-white"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              Back to Recertification
            </Link>

            <p className="mt-8 text-sm font-semibold uppercase tracking-[0.18em] text-blue-300">
              {info.focus}
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              {info.name}
              <span className="block bg-gradient-to-r from-blue-200 via-blue-400 to-blue-600 bg-clip-text text-transparent">
                Certification Renewal
              </span>
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              {info.overview}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={info.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-500"
              >
                Visit official renewal page
                <ExternalLink className="size-4" aria-hidden="true" />
              </a>

              <Link
                href="/certifications"
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/25 px-5 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                Browse certifications
              </Link>
            </div>
          </div>

          <div className="flex items-center justify-center rounded-3xl border border-white/10 bg-white/[0.06] p-8 shadow-2xl shadow-black/20">
            <div className="flex min-h-52 w-full items-center justify-center rounded-2xl bg-white p-8">
              <Image
                src={info.logo}
                alt={`${info.name} logo`}
                width={220}
                height={130}
                priority
                className="max-h-32 w-auto max-w-full object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-700">
              Renewal overview
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">
              How {info.name} renewal works
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              {info.renewalSummary}
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {info.keyPoints.map((point) => (
                <Card
                  key={point}
                  className="flex h-full flex-col items-center text-center"
                >
                  <span className="flex size-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                    <CheckCircle2
                      className="size-5"
                      aria-hidden="true"
                    />
                  </span>

                  <p className="mt-4 leading-7 text-slate-700">
                    {point}
                  </p>
                </Card>
              ))}
            </div>
          </div>

          <aside>
            <Card className="sticky top-24">
              <div className="text-center">
                <span className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                  <RefreshCw className="size-5" aria-hidden="true" />
                </span>

                <h2 className="mt-4 text-xl font-bold text-slate-950">
                  Official {info.name} resource
                </h2>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Certification policies change. Confirm the requirements for
                  your exact certification directly with {info.name}.
                </p>

                <a
                  href={info.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-blue-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-800"
                >
                  {info.officialLabel}
                  <ExternalLink className="size-4" aria-hidden="true" />
                </a>
              </div>
            </Card>
          </aside>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-700">
              Before you renew
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">
              Check these four things first.
            </h2>
          </div>

          <div className="mt-9 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            <Card className="flex flex-col items-center text-center">
              <CalendarClock className="size-7 text-blue-700" />
              <h3 className="mt-4 font-bold text-slate-950">
                Expiration date
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Confirm exactly when your credential stops being current.
              </p>
            </Card>

            <Card className="flex flex-col items-center text-center">
              <GraduationCap className="size-7 text-blue-700" />
              <h3 className="mt-4 font-bold text-slate-950">
                Renewal method
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Determine whether you need CEs, CPEs, PDUs, an assessment, or
                another exam.
              </p>
            </Card>

            <Card className="flex flex-col items-center text-center">
              <RefreshCw className="size-7 text-blue-700" />
              <h3 className="mt-4 font-bold text-slate-950">
                Renewal window
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Know when you become eligible to start or submit renewal.
              </p>
            </Card>

            <Card className="flex flex-col items-center text-center">
              <ShieldCheck className="size-7 text-blue-700" />
              <h3 className="mt-4 font-bold text-slate-950">
                Official policy
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Verify current requirements on the provider&apos;s official
                website before taking action.
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6 sm:p-8">
          <div className="flex flex-col items-center justify-between gap-5 text-center md:flex-row md:text-left">
            <div>
              <h2 className="text-2xl font-bold text-slate-950">
                Looking for another provider?
              </h2>

              <p className="mt-2 text-slate-700">
                Return to the AimToCert Recertification directory.
              </p>
            </div>

            <Link
              href="/recertification"
              className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-3 font-semibold text-white transition hover:bg-blue-800"
            >
              View all providers
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}