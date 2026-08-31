import type { Metadata } from "next";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Globe2,
  Monitor,
  Network,
  ShoppingCart,
} from "lucide-react";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "IT Proctoring Services | Badgely",
  description:
    "Find the testing and proctoring providers used by major IT certification programs, including Pearson VUE, PSI, Kryterion, PeopleCert, Certiport, Red Hat, and Prometric.",
};

type DeliveryMode = "Test center" | "Remote" | "Program dependent" | "Vendor testing station";

type CertificationMapping = {
  owner: string;
  exams: string;
  provider: string;
  delivery: DeliveryMode[];
  note?: string;
};

const certificationMappings: CertificationMapping[] = [
  {
    owner: "CompTIA",
    exams: "A+, Network+, Security+, Linux+, Cloud+, CySA+, PenTest+, Data+ and other CompTIA certifications",
    provider: "Pearson VUE / OnVUE",
    delivery: ["Test center", "Remote"],
  },
  {
    owner: "Cisco",
    exams: "CCNA, CCNP written/core/concentration, DevNet, CyberOps and most written Cisco certification exams",
    provider: "Pearson VUE / OnVUE",
    delivery: ["Test center", "Remote"],
    note: "Cisco lab and practical exams follow separate delivery and scheduling rules.",
  },
  {
    owner: "Microsoft",
    exams: "Azure, Microsoft 365, Security, Power Platform and role-based Microsoft certification exams",
    provider: "Pearson VUE / OnVUE",
    delivery: ["Test center", "Remote"],
    note: "Microsoft Office Specialist and some academic/student exam scenarios use Certiport instead.",
  },
  {
    owner: "Amazon Web Services (AWS)",
    exams: "AWS Foundational, Associate, Professional and Specialty certification exams",
    provider: "Pearson VUE / OnVUE",
    delivery: ["Test center", "Remote"],
  },
  {
    owner: "Google Cloud",
    exams: "Cloud Digital Leader, Associate and Professional Google Cloud certifications",
    provider: "Pearson VUE",
    delivery: ["Test center", "Remote"],
  },
  {
    owner: "ISC2",
    exams: "CISSP, CC, CCSP, SSCP, CSSLP, CGRC and ISC2 concentration exams",
    provider: "Pearson VUE",
    delivery: ["Test center"],
    note: "ISC2 currently directs candidates to Pearson VUE testing centers for certification exams.",
  },
  {
    owner: "Salesforce",
    exams: "Salesforce Administrator, Architect, Consultant, Developer, Data, Tableau, Slack and other proctored certifications",
    provider: "Pearson VUE / OnVUE",
    delivery: ["Test center", "Remote"],
  },
  {
    owner: "ServiceNow",
    exams: "ServiceNow University certification exams",
    provider: "Pearson VUE",
    delivery: ["Test center", "Remote"],
    note: "ServiceNow moved certification exam delivery from Kryterion/Webassessor to Pearson VUE.",
  },
  {
    owner: "Splunk",
    exams: "Splunk Core, Enterprise, Security and IT Service Intelligence certification exams",
    provider: "Pearson VUE / OnVUE",
    delivery: ["Test center", "Remote"],
  },
  {
    owner: "IBM",
    exams: "IBM Professional Certification exams",
    provider: "Pearson VUE / OnVUE",
    delivery: ["Program dependent"],
    note: "Most IBM exams support online proctoring, while some remain test-center only.",
  },
  {
    owner: "Snowflake",
    exams: "SnowPro certification exams",
    provider: "Pearson VUE",
    delivery: ["Test center", "Remote"],
  },
  {
    owner: "Check Point",
    exams: "CCSA, CCSE and other Check Point certification exams",
    provider: "Pearson VUE",
    delivery: ["Program dependent"],
  },
  {
    owner: "Apple",
    exams: "Apple IT certification exams",
    provider: "Pearson VUE / OnVUE",
    delivery: ["Remote"],
  },
  {
    owner: "ISACA",
    exams: "CISA, CISM, CRISC, CGEIT, CDPSE, CCOA, CCA, CCP and other ISACA credentialing exams",
    provider: "PSI",
    delivery: ["Test center", "Remote"],
  },
  {
    owner: "Linux Foundation / CNCF",
    exams: "CKA, CKAD, CKS, LFCS, CNPE and other Linux Foundation performance-based certification exams",
    provider: "PSI",
    delivery: ["Remote"],
  },
  {
    owner: "Databricks",
    exams: "Databricks Data Engineer, Data Analyst, Machine Learning and other certification exams",
    provider: "Kryterion / Webassessor",
    delivery: ["Remote"],
  },
  {
    owner: "Mandiant Academy",
    exams: "Mandiant Incident Response and other applicable Mandiant Academy certification exams",
    provider: "Kryterion / Webassessor",
    delivery: ["Remote"],
  },
  {
    owner: "PeopleCert / ITIL",
    exams: "ITIL 4 and other PeopleCert-managed certification exams",
    provider: "PeopleCert Online Proctoring / ExamShield",
    delivery: ["Remote", "Program dependent"],
    note: "Selected PeopleCert exams may also be available through approved delivery partners such as Prometric.",
  },
  {
    owner: "Microsoft Office Specialist",
    exams: "MOS Microsoft 365 Apps and supported Office certification exams",
    provider: "Certiport",
    delivery: ["Test center", "Program dependent"],
  },
  {
    owner: "Adobe Certified Professional",
    exams: "Photoshop, Illustrator, Premiere Pro, Acrobat Pro and other supported Adobe certification exams",
    provider: "Certiport",
    delivery: ["Test center", "Program dependent"],
  },
  {
    owner: "Red Hat",
    exams: "RHCSA, RHCE and Red Hat specialist/performance-based certification exams",
    provider: "Red Hat",
    delivery: ["Remote", "Vendor testing station", "Program dependent"],
    note: "Red Hat delivers its own performance-based exams remotely and through Red Hat or partner testing locations.",
  },
  {
    owner: "CIW and selected technology programs",
    exams: "CIW and other technology certification programs delivered through Prometric",
    provider: "Prometric / ProProctor",
    delivery: ["Test center", "Program dependent"],
  },
];

const services = [
  {
    name: "Pearson VUE",
    platform: "Pearson VUE test centers + OnVUE online proctoring",
    summary:
      "The largest delivery provider in the mainstream IT certification ecosystem. It administers exams for many major cloud, cybersecurity, networking, software and platform vendors.",
    examples:
      "CompTIA, Cisco, Microsoft, AWS, Google Cloud, ISC2, Salesforce, ServiceNow, Splunk, IBM, Snowflake, Check Point, Apple and many others.",
    modes: "In-person testing centers and OnVUE remote proctoring where the certification program permits it.",
    href: "https://www.pearsonvue.com/us/en/test-takers/onvue-online-proctoring.html",
  },
  {
    name: "PSI",
    platform: "PSI test centers + PSI remote proctoring",
    summary:
      "A major high-stakes exam delivery provider used by certification organizations that manage their own exam registration but send candidates into PSI for scheduling and delivery.",
    examples: "ISACA certifications and Linux Foundation/CNCF certification exams.",
    modes: "Test-center and remote delivery depend on the certification program.",
    href: "https://www.psiexams.com/test-takers/",
  },
  {
    name: "Kryterion / Webassessor",
    platform: "Webassessor + Kryterion online proctoring",
    summary:
      "A certification testing platform used by several technology vendors for registration, scheduling and online proctored exams.",
    examples: "Databricks and Mandiant Academy are current IT examples.",
    modes: "Commonly remote online proctoring; test-center availability depends on the program.",
    href: "https://www.kryterion.com/test-taker/",
  },
  {
    name: "PeopleCert",
    platform: "PeopleCert Online Proctoring + ExamShield",
    summary:
      "PeopleCert owns and delivers major professional certification programs and operates its own online proctoring experience.",
    examples: "ITIL 4 and other PeopleCert-managed credentials.",
    modes: "Primarily online proctoring, with selected delivery-partner arrangements depending on the program.",
    href: "https://www.peoplecert.org/Partners/digital-services/peoplecert-online-proctoring",
  },
  {
    name: "Certiport",
    platform: "Certiport Authorized Testing Centers and supported remote options",
    summary:
      "Pearson's education-focused certification delivery business, commonly used for classroom, academic and entry-level technology credentials.",
    examples: "Microsoft Office Specialist and Adobe Certified Professional.",
    modes: "Authorized testing centers and program-specific remote delivery.",
    href: "https://certiport.pearsonvue.com/",
  },
  {
    name: "Red Hat",
    platform: "Red Hat Remote Exams + Red Hat testing stations",
    summary:
      "Red Hat directly delivers its hands-on certification exams instead of routing the core program through a general-purpose testing vendor.",
    examples: "RHCSA, RHCE and Red Hat specialist exams.",
    modes: "Remote exams, individual testing stations, classroom and selected onsite delivery.",
    href: "https://www.redhat.com/en/services/certification/ways-to-test",
  },
  {
    name: "Prometric",
    platform: "Prometric test centers + ProProctor remote delivery",
    summary:
      "A global test-delivery company used by professional and technology programs. Its role varies by certification owner and exam.",
    examples: "CIW and selected PeopleCert/ITIL and other technology exam programs.",
    modes: "Test centers and ProProctor remote delivery where the program supports it.",
    href: "https://www.prometric.com/exams/",
  },
];

const roles = [
  {
    icon: Building2,
    title: "Exam owner / certification vendor",
    description:
      "Creates and governs the certification, exam objectives, eligibility rules, scoring policy and credential requirements.",
    example: "Example: CompTIA owns Security+; Cisco owns CCNA; ISACA owns CISA.",
  },
  {
    icon: Monitor,
    title: "Testing / proctoring provider",
    description:
      "Actually delivers the exam in a test center or through an approved remote-proctoring platform.",
    example: "Example: Pearson VUE delivers Security+ and CCNA; PSI delivers CISA.",
  },
  {
    icon: ShoppingCart,
    title: "Voucher seller / marketplace",
    description:
      "May sell an exam voucher or list an exam in a catalog without being the organization that administers the test.",
    example: "A voucher listing does not by itself identify the actual proctoring provider.",
  },
];

function deliveryIcon(mode: DeliveryMode) {
  if (mode === "Remote") {
    return Globe2;
  }

  if (mode === "Vendor testing station") {
    return Network;
  }

  return Building2;
}

export default function ProctoringServicesPage() {
  return (
    <main>
      <section className="border-b border-slate-200 bg-slate-950 text-white">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-8 lg:py-20">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-300">
              IT exam delivery directory
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Find who actually delivers your IT certification exam.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              Badgely maps certification owners to the testing and proctoring services candidates
              actually use. Compare Pearson VUE, PSI, Kryterion, PeopleCert, Certiport, Red Hat,
              Prometric and vendor-specific delivery without confusing the exam owner with the exam
              platform.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl">
            <p className="text-sm font-semibold text-blue-300">Examples</p>
            <div className="mt-5 grid gap-3 text-sm sm:text-base">
              <div className="rounded-2xl bg-white/10 p-4">
                <span className="font-semibold text-white">CompTIA Security+</span>
                <span className="mx-2 text-slate-500">→</span>
                <span className="text-slate-300">Pearson VUE / OnVUE</span>
              </div>
              <div className="rounded-2xl bg-white/10 p-4">
                <span className="font-semibold text-white">Cisco CCNA</span>
                <span className="mx-2 text-slate-500">→</span>
                <span className="text-slate-300">Pearson VUE / OnVUE</span>
              </div>
              <div className="rounded-2xl bg-white/10 p-4">
                <span className="font-semibold text-white">ISACA CISA</span>
                <span className="mx-2 text-slate-500">→</span>
                <span className="text-slate-300">PSI</span>
              </div>
              <div className="rounded-2xl bg-blue-600 p-4 font-semibold text-white">
                Exam owner ≠ voucher seller ≠ testing provider
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-700">
            Proctoring platforms
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Major IT testing and proctoring services
          </h2>
          <p className="mt-4 leading-7 text-slate-600">
            These are the major delivery platforms you are likely to encounter while scheduling IT
            certification exams. The exact options can still vary by exam, country and program.
          </p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <Card key={service.name} className="flex h-full flex-col items-center text-center">
              <div className="flex flex-col items-center">
                <span className="flex size-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                  <Monitor className="size-5" aria-hidden="true" />
                </span>
                <p className="mt-4 text-sm font-semibold uppercase tracking-[0.12em] text-blue-700">
                  Testing service
                </p>
                <h3 className="mt-2 text-2xl font-bold text-slate-950">{service.name}</h3>
              </div>
              <p className="mt-3 text-sm font-semibold text-slate-700">{service.platform}</p>
              <p className="mt-4 leading-7 text-slate-600">{service.summary}</p>

              <div className="mt-5 w-full rounded-xl bg-slate-50 p-4 text-center">
                <p className="text-sm font-semibold text-slate-900">IT programs</p>
                <p className="mt-1 text-sm leading-6 text-slate-600">{service.examples}</p>
              </div>

              <p className="mt-4 text-sm leading-6 text-slate-600">{service.modes}</p>

              <div className="mt-auto flex w-full justify-center pt-5">
                <a
                  href={service.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
                >
                  Official testing information
                  <ArrowRight className="size-4" aria-hidden="true" />
                </a>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-700">
              Certification mapping
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              IT certification owner → actual testing provider
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              Use this directory to identify the exam-delivery platform before you buy a voucher,
              schedule an appointment or prepare a computer for remote testing.
            </p>
          </div>

          <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[920px] border-collapse text-left">
                <thead className="bg-slate-950 text-white">
                  <tr>
                    <th className="px-5 py-4 text-sm font-semibold">Certification owner</th>
                    <th className="px-5 py-4 text-sm font-semibold">Examples</th>
                    <th className="px-5 py-4 text-sm font-semibold">Testing provider</th>
                    <th className="px-5 py-4 text-sm font-semibold">Delivery</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {certificationMappings.map((mapping) => (
                    <tr key={`${mapping.owner}-${mapping.provider}`} className="align-top">
                      <td className="px-5 py-5 font-bold text-slate-950">{mapping.owner}</td>
                      <td className="max-w-md px-5 py-5 text-sm leading-6 text-slate-600">
                        {mapping.exams}
                        {mapping.note ? (
                          <p className="mt-2 text-xs font-medium leading-5 text-amber-800">
                            {mapping.note}
                          </p>
                        ) : null}
                      </td>
                      <td className="px-5 py-5 font-semibold text-blue-700">{mapping.provider}</td>
                      <td className="px-5 py-5">
                        <div className="flex max-w-xs flex-wrap gap-2">
                          {mapping.delivery.map((mode) => {
                            const Icon = deliveryIcon(mode);
                            return (
                              <span
                                key={mode}
                                className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700"
                              >
                                <Icon className="size-3.5" aria-hidden="true" />
                                {mode}
                              </span>
                            );
                          })}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <p className="mt-4 text-sm leading-6 text-slate-500">
            This directory focuses on mainstream IT and technology certification programs. Testing
            relationships change, and individual exams within the same vendor may use different
            delivery rules.
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-700">
            How to read the ecosystem
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Three roles that are easy to confuse
          </h2>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {roles.map(({ icon: Icon, title, description, example }) => (
            <Card key={title} className="flex h-full flex-col items-center text-center">
              <span className="flex size-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-xl font-bold text-slate-950">{title}</h3>
              <p className="mt-3 leading-7 text-slate-600">{description}</p>
              <p className="mt-4 w-full border-t border-slate-100 pt-4 text-sm font-medium text-slate-700">
                {example}
              </p>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-t border-slate-200 bg-blue-50">
        <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <Card className="border-blue-200">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-blue-700">
                  Before exam day
                </p>
                <h2 className="mt-2 text-2xl font-bold text-slate-950">
                  Confirm the provider on the certification owner&apos;s official scheduling page.
                </h2>
                <p className="mt-3 max-w-3xl leading-7 text-slate-600">
                  Badgely shows the latest verified relationship we have, but testing providers,
                  online availability, exam security rules and regional options can change. Always
                  verify the final delivery method before purchasing or scheduling.
                </p>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-800">
                <CheckCircle2 className="size-4" aria-hidden="true" />
                Directory updated for 2026
              </span>
            </div>
          </Card>
        </div>
      </section>
    </main>
  );
}
