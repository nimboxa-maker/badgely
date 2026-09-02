import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpenCheck,
  Compass,
  ExternalLink,
  GraduationCap,
  Library,
  Route,
  ShieldCheck,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  HeroOption,
  HeroPanel,
  MarketingHero,
} from "@/components/layout/marketing-hero";
import { createClient } from "@/lib/supabase/server";

const certificationIcons: Record<string, string> = {
  "comptia-a-plus": "/certifications/comptia-a-plus.png",
  "comptia-cloud-plus": "/certifications/comptia-cloud-plus.png",
  "comptia-cloudnetx": "/certifications/comptia-cloudnetx.png",
  "comptia-cysa-plus": "/certifications/comptia-cysa-plus.png",
  "comptia-data-plus": "/certifications/comptia-data-plus.png",
  "comptia-datasys-plus": "/certifications/comptia-datasys-plus.png",
  "comptia-linux-plus": "/certifications/comptia-linux-plus.png",
  "comptia-network-plus": "/certifications/comptia-network-plus.png",
  "comptia-pentest-plus": "/certifications/comptia-pentest-plus.png",
  "comptia-project-plus": "/certifications/comptia-project-plus.png",
  "comptia-security-plus": "/certifications/comptia-security-plus.png",
  "comptia-securityx": "/certifications/comptia-securityx.png",
  "comptia-server-plus": "/certifications/comptia-server-plus.png",
  "comptia-tech-plus": "/certifications/comptia-tech-plus.png",
  "aws-certified-solutions-architect-associate":
    "/certifications/aws-certified-solutions-architect-associate.png",
  "cisco-ccna": "/certifications/cisco-ccna.png",
  "google-cloud-professional-cloud-architect":
    "/certifications/google-cloud-professional-cloud-architect.png",
  "microsoft-certified-azure-solutions-architect-expert":
    "/certifications/microsoft-certified-azure-solutions-architect-expert.png",
  "isc2-cissp": "/certifications/isc2-cissp.png",
  "isaca-cism": "/certifications/isaca-cism.png",
  "project-management-professional-pmp":
    "/certifications/project-management-professional-pmp.png",
  "ec-council-ceh": "/certifications/ec-council-ceh.png",
};

const featuredOrder = [
  "comptia-security-plus",
  "aws-certified-solutions-architect-associate",
  "cisco-ccna",
  "google-cloud-professional-cloud-architect",
  "microsoft-certified-azure-solutions-architect-expert",
  "isc2-cissp",
  "isaca-cism",
  "project-management-professional-pmp",
  "ec-council-ceh",
];

const foundations = [
  {
    icon: Compass,
    eyebrow: "Explore",
    title: "Explore with direction",
    description:
      "Find the certification path that fits where you are today and where you want your IT career to go.",
    href: "/certifications",
    cardClass:
      "border-blue-300 bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-400 text-white shadow-lg shadow-blue-100",
    iconClass: "bg-white/20 text-white ring-1 ring-white/30",
    eyebrowClass: "text-blue-100",
  },
  {
    icon: ShieldCheck,
    eyebrow: "Verify",
    title: "Review trustworthy details",
    description:
      "Understand certifications using clear educational information, official sources, and verification details.",
    href: "/certifications?sort=verified",
    cardClass:
      "border-emerald-300 bg-gradient-to-br from-emerald-600 via-teal-500 to-cyan-400 text-white shadow-lg shadow-emerald-100",
    iconClass: "bg-white/20 text-white ring-1 ring-white/30",
    eyebrowClass: "text-emerald-100",
  },
  {
    icon: BookOpenCheck,
    eyebrow: "Plan",
    title: "Build a realistic plan",
    description:
      "Turn your certification goal into an achievable study roadmap that fits your time and experience.",
    href: "/career-paths",
    cardClass:
      "border-violet-300 bg-gradient-to-br from-violet-600 via-purple-500 to-fuchsia-400 text-white shadow-lg shadow-violet-100",
    iconClass: "bg-white/20 text-white ring-1 ring-white/30",
    eyebrowClass: "text-violet-100",
  },
];

export default async function HomePage() {
  const supabase = await createClient();

  const [featuredResult, countResult] = await Promise.all([
    supabase
      .from("certifications")
      .select(
        "id, name, slug, category, level, short_summary, status, official_certification_url, provider:providers(name)",
      )
      .eq("featured", true)
      .limit(9),
    supabase
      .from("certifications")
      .select("id", { count: "exact", head: true })
      .eq("status", "Active"),
  ]);

  const orderedFeaturedCertifications = [
    ...(featuredResult.data ?? []),
  ].sort(
    (a, b) =>
      featuredOrder.indexOf(a.slug) -
      featuredOrder.indexOf(b.slug),
  );

  const certificationCount = countResult.count ?? 0;

  return (
    <>
      <MarketingHero
        aside={
          <HeroPanel>
            <div className="flex items-center gap-3">
              <span className="flex size-11 items-center justify-center rounded-2xl bg-blue-500/15 text-blue-200 ring-1 ring-inset ring-blue-300/25">
                <Compass className="size-5" aria-hidden="true" />
              </span>
              <div>
                <h2 className="text-xl font-bold text-white">Your journey, simplified</h2>
                <p className="mt-1 text-sm text-slate-300">Choose the place that matches what you need next.</p>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              <Link href="/certifications" className="block">
                <HeroOption className="flex items-center gap-4">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white">
                    <GraduationCap className="size-5" aria-hidden="true" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-white">Explore certifications</p>
                    <p className="mt-1 text-sm text-slate-300">Browse verified certification details, exams, and career fit.</p>
                  </div>
                  <ArrowRight className="size-5 text-blue-200" aria-hidden="true" />
                </HeroOption>
              </Link>

              <Link href="/career-paths" className="block">
                <HeroOption className="flex items-center gap-4">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-violet-600 text-white">
                    <Route className="size-5" aria-hidden="true" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-white">Map a career path</p>
                    <p className="mt-1 text-sm text-slate-300">See role-focused roadmaps and recommended next steps.</p>
                  </div>
                  <ArrowRight className="size-5 text-blue-200" aria-hidden="true" />
                </HeroOption>
              </Link>

              <Link href="/study-store" className="block">
                <HeroOption className="flex items-center gap-4">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-600 text-white">
                    <Library className="size-5" aria-hidden="true" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-white">Find study resources</p>
                    <p className="mt-1 text-sm text-slate-300">Discover books, guides, and learning providers.</p>
                  </div>
                  <ArrowRight className="size-5 text-blue-200" aria-hidden="true" />
                </HeroOption>
              </Link>
            </div>

            <div className="mt-5 border-t border-white/10 pt-5">
              <p className="text-sm text-slate-300">
                <span className="mr-2 text-3xl font-black text-blue-300">{certificationCount}</span>
                active certifications researched and organized.
              </p>
            </div>
          </HeroPanel>
        }
      >
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-300">
          Independent IT certification guidance
        </p>

        <h1 className="mt-5 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Find the right
          <span className="block bg-gradient-to-r from-blue-200 via-blue-400 to-blue-600 bg-clip-text text-transparent">
            IT certification path.
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
          Explore trusted certifications, map career roadmaps, and build a practical plan for your next IT role with clear, independent guidance.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/certifications"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-lg shadow-blue-950/30 transition hover:bg-blue-500"
          >
            Explore certifications <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
          <Link
            href="/career-paths"
            className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/25 bg-white/[0.03] px-5 py-3 font-semibold text-white transition hover:bg-white/10"
          >
            Explore career paths
          </Link>
        </div>

        <div className="mt-9 flex flex-wrap gap-x-7 gap-y-3 text-sm text-slate-300">
          <span className="inline-flex items-center gap-2"><ShieldCheck className="size-4 text-blue-300" /> Independent guidance</span>
          <span className="inline-flex items-center gap-2"><BookOpenCheck className="size-4 text-blue-300" /> Verified details</span>
          <span className="inline-flex items-center gap-2"><Compass className="size-4 text-blue-300" /> Career-focused direction</span>
        </div>
      </MarketingHero>

      <section className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">
            Built for clarity
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            One place to make your next certification decision.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-600">
            Explore your options, understand the details, and turn your next certification goal into a clear plan.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {foundations.map(
            ({ icon: Icon, eyebrow, title, description, href, cardClass, iconClass, eyebrowClass }) => (
              <div
                key={title}
                className={`group relative overflow-hidden rounded-3xl border p-7 text-center transition duration-300 hover:-translate-y-2 hover:shadow-xl ${cardClass}`}
              >
                <div className="absolute -right-10 -top-10 size-32 rounded-full bg-white/10" />
                <div className="absolute -bottom-12 -left-10 size-36 rounded-full bg-white/10" />
                <div className="relative flex h-full flex-col items-center">
                  <div className={`flex size-14 items-center justify-center rounded-2xl backdrop-blur ${iconClass}`}>
                    <Icon className="size-7" aria-hidden="true" />
                  </div>
                  <p className={`mt-7 text-xs font-bold uppercase tracking-[0.22em] ${eyebrowClass}`}>
                    {eyebrow}
                  </p>
                  <h3 className="mt-2 text-2xl font-bold tracking-tight">{title}</h3>
                  <p className="mt-4 leading-7 text-white/90">{description}</p>
                  <Link
                    href={href}
                    className="mt-7 inline-flex w-fit items-center justify-center gap-2 rounded-xl border border-white/70 bg-white/10 px-4 py-2 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white/20"
                  >
                    {eyebrow}
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            ),
          )}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-3xl flex-col items-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-700">Featured certifications</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">Popular certifications across IT.</h2>
            <p className="mt-3 max-w-2xl leading-7 text-slate-600">
              Explore widely recognized certifications across cybersecurity, cloud, networking, architecture, and project management.
            </p>
            <Link href="/certifications" className="mt-5 inline-flex items-center justify-center gap-2 font-semibold text-blue-700 hover:text-blue-600">
              Browse all certifications <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>

          {orderedFeaturedCertifications.length > 0 ? (
            <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {orderedFeaturedCertifications.map((certification) => {
                const iconPath = certificationIcons[certification.slug];

                return (
                  <Card key={certification.id} className="flex h-full flex-col items-center text-center transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg">
                    {iconPath ? (
                      <div className="mb-5 flex min-h-28 w-full items-center justify-center rounded-xl border border-slate-100 bg-white p-3">
                        <Image
                          src={iconPath}
                          alt={`${certification.name} certification logo`}
                          width={120}
                          height={120}
                          className="max-h-24 w-auto object-contain"
                        />
                      </div>
                    ) : null}

                    <div className="flex flex-wrap items-center justify-center gap-2">
                      <Badge>{certification.level}</Badge>
                      <span className="text-sm font-medium text-slate-500">{certification.category}</span>
                    </div>

                    <h3 className="mt-4 text-xl font-semibold text-slate-950">{certification.name}</h3>
                    <p className="mt-1 text-sm font-medium text-slate-500">
                      {certification.provider?.name ?? "Certification provider"}
                    </p>
                    <p className="mt-4 line-clamp-3 leading-7 text-slate-600">{certification.short_summary}</p>

                    <div className="mt-auto flex flex-wrap justify-center gap-3 pt-7">
                      <Link
                        href={`/certifications/${certification.slug}`}
                        className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-600"
                      >
                        View details <ArrowRight className="size-4" aria-hidden="true" />
                      </Link>
                      {certification.official_certification_url ? (
                        <a
                          href={certification.official_certification_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-blue-200 bg-white px-4 py-2.5 text-sm font-semibold text-blue-700 transition hover:bg-blue-50"
                        >
                          Official <ExternalLink className="size-4" aria-hidden="true" />
                        </a>
                      ) : null}
                    </div>
                  </Card>
                );
              })}
            </div>
          ) : (
            <Card className="mt-8 text-center">
              <p className="text-slate-600">Featured certifications will appear here as the catalog is published.</p>
            </Card>
          )}
        </div>
      </section>
    </>
  );
}
