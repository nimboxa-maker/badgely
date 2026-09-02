import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  ExternalLink,
  Route,
  Search,
  ShieldCheck,
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
import { createClient } from "@/lib/supabase/server";

type CertificationRow = {
  id: string;
  name: string;
  slug: string;
  category: string;
  level: string;
  vendor_type: string;
  short_summary: string;
  status: string;
  featured: boolean;
  target_job_roles: string[];
  estimated_study_hours_min: number | null;
  estimated_study_hours_max: number | null;
  last_verified_date: string | null;
  official_certification_url: string | null;
  providers: { name: string; slug: string } | null;
};

type SearchParams = Record<string, string | string[] | undefined>;

interface CertificationsPageProps {
  searchParams: Promise<SearchParams>;
}

const certificationIcons: Record<string, string> = {
  "aws-certified-security-specialty": "/certifications/aws-certified-security-specialty.png",
  "aws-certified-solutions-architect-associate": "/certifications/aws-certified-solutions-architect-associate.png",
  "certified-kubernetes-administrator": "/certifications/certified-kubernetes-administrator.png",
  "cisco-ccna": "/certifications/cisco-ccna.png",
  "cisco-ccst-cybersecurity": "/certifications/cisco-ccst-cybersecurity.png",
  "cisco-ccst-networking": "/certifications/cisco-ccst-networking.png",
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
  "ec-council-ceh": "/certifications/ec-council-ceh.png",
  "elearnsecurity-junior-penetration-tester": "/certifications/elearnsecurity-junior-penetration-tester.png",
  "google-cloud-associate-cloud-engineer": "/certifications/google-cloud-associate-cloud-engineer.png",
  "google-cloud-digital-leader": "/certifications/google-cloud-digital-leader.png",
  "google-cloud-professional-cloud-architect": "/certifications/google-cloud-professional-cloud-architect.png",
  "google-cloud-professional-cloud-security-engineer": "/certifications/google-cloud-professional-cloud-security-engineer.png",
  "hashicorp-certified-terraform-associate": "/certifications/hashicorp-certified-terraform-associate.png",
  "isaca-cisa": "/certifications/isaca-cisa.png",
  "isaca-cism": "/certifications/isaca-cism.png",
  "isaca-crisc": "/certifications/isaca-crisc.png",
  "isc2-certified-in-cybersecurity": "/certifications/isc2-certified-in-cybersecurity.png",
  "isc2-cissp": "/certifications/isc2-cissp.png",
  "isc2-sscp": "/certifications/isc2-sscp.png",
  "linux-foundation-certified-system-administrator": "/certifications/linux-foundation-certified-system-administrator.png",
  "microsoft-azure-fundamentals": "/certifications/microsoft-azure-fundamentals.png",
  "microsoft-certified-azure-solutions-architect-expert": "/certifications/microsoft-certified-azure-solutions-architect-expert.png",
  "microsoft-security-compliance-identity-fundamentals": "/certifications/microsoft-security-compliance-identity-fundamentals.png",
  "microsoft-security-operations-analyst": "/certifications/microsoft-security-operations-analyst.png",
  "offensive-security-certified-professional": "/certifications/offensive-security-certified-professional.png",
  "project-management-professional-pmp": "/certifications/project-management-professional-pmp.png",
  "red-hat-certified-system-administrator": "/certifications/red-hat-certified-system-administrator.png",
  "splunk-core-certified-user": "/certifications/splunk-core-certified-user.png",
};

function firstParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? (value[0] ?? "") : (value ?? "");
}

const levelRank: Record<string, number> = {
  Foundational: 0,
  Associate: 1,
  Intermediate: 2,
  Advanced: 3,
};

export default async function CertificationsPage({ searchParams }: CertificationsPageProps) {
  const params = await searchParams;
  const query = firstParam(params.q).trim();
  const category = firstParam(params.category);
  const provider = firstParam(params.provider);
  const level = firstParam(params.level);
  const vendorType = firstParam(params.vendorType);
  const status = firstParam(params.status);
  const targetRole = firstParam(params.targetRole);
  const sort = firstParam(params.sort) || "featured";

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("certifications")
    .select("id, name, slug, category, level, vendor_type, short_summary, status, featured, target_job_roles, estimated_study_hours_min, estimated_study_hours_max, last_verified_date, official_certification_url, providers(name, slug)")
    .order("name", { ascending: true });

  if (error) throw new Error("Unable to load certifications.");

  const allCertifications = (data ?? []) as CertificationRow[];
  const categories = [...new Set(allCertifications.map((item) => item.category))].sort();
  const providers = [
    ...new Map(
      allCertifications.filter((item) => item.providers).map((item) => [item.providers!.slug, item.providers!.name]),
    ).entries(),
  ].sort((a, b) => a[1].localeCompare(b[1]));
  const levels = [...new Set(allCertifications.map((item) => item.level))].sort(
    (a, b) => (levelRank[a] ?? 99) - (levelRank[b] ?? 99) || a.localeCompare(b),
  );
  const vendorTypes = [...new Set(allCertifications.map((item) => item.vendor_type))].sort();
  const statuses = [...new Set(allCertifications.map((item) => item.status))].sort();
  const targetRoles = [...new Set(allCertifications.flatMap((item) => item.target_job_roles))].sort();
  const normalizedQuery = query.toLowerCase();

  const certifications = allCertifications
    .filter((item) => {
      const matchesSearch =
        !normalizedQuery ||
        [item.name, item.providers?.name ?? "", item.category, item.short_summary, ...item.target_job_roles]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);

      return (
        matchesSearch &&
        (!category || item.category === category) &&
        (!provider || item.providers?.slug === provider) &&
        (!level || item.level === level) &&
        (!vendorType || item.vendor_type === vendorType) &&
        (!status || item.status === status) &&
        (!targetRole || item.target_job_roles.includes(targetRole))
      );
    })
    .sort((a, b) => {
      if (sort === "beginner") {
        return (levelRank[a.level] ?? 99) - (levelRank[b.level] ?? 99) || a.name.localeCompare(b.name);
      }
      if (sort === "verified") {
        return (b.last_verified_date ? Date.parse(b.last_verified_date) : 0) - (a.last_verified_date ? Date.parse(a.last_verified_date) : 0) || a.name.localeCompare(b.name);
      }
      if (sort === "study") {
        return (a.estimated_study_hours_min ?? Number.MAX_SAFE_INTEGER) - (b.estimated_study_hours_min ?? Number.MAX_SAFE_INTEGER) || a.name.localeCompare(b.name);
      }
      return Number(b.featured) - Number(a.featured) || a.name.localeCompare(b.name);
    });

  const hasFilters = Boolean(query || category || provider || level || vendorType || status || targetRole || sort !== "featured");

  return (
    <main>
      <MarketingHero
        aside={
          <HeroPanel>
            <h2 className="text-xl font-bold text-white">Find what&apos;s right for you</h2>
            <p className="mt-1 text-sm text-slate-300">Start exploring with these useful shortcuts.</p>

            <div className="mt-5 space-y-3">
              <Link href="/certifications?sort=featured" className="block">
                <HeroOption className="flex items-center gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white"><Star className="size-5" aria-hidden="true" /></span>
                  <div className="flex-1"><p className="font-bold text-white">Most popular certifications</p><p className="mt-1 text-sm text-slate-300">Start with the featured catalog.</p></div>
                  <ArrowRight className="size-5 text-blue-200" aria-hidden="true" />
                </HeroOption>
              </Link>

              <Link href="/career-paths" className="block">
                <HeroOption className="flex items-center gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-violet-600 text-white"><Route className="size-5" aria-hidden="true" /></span>
                  <div className="flex-1"><p className="font-bold text-white">Certifications by career path</p><p className="mt-1 text-sm text-slate-300">Find credentials that support a target role.</p></div>
                  <ArrowRight className="size-5 text-blue-200" aria-hidden="true" />
                </HeroOption>
              </Link>

              <Link href="/certifications?vendorType=Vendor-specific" className="block">
                <HeroOption className="flex items-center gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-600 text-white"><Building2 className="size-5" aria-hidden="true" /></span>
                  <div className="flex-1"><p className="font-bold text-white">Vendor certifications</p><p className="mt-1 text-sm text-slate-300">Explore credentials tied to leading technology ecosystems.</p></div>
                  <ArrowRight className="size-5 text-blue-200" aria-hidden="true" />
                </HeroOption>
              </Link>

              <Link href="/certifications?sort=verified" className="block">
                <HeroOption className="flex items-center gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-orange-500 text-white"><Sparkles className="size-5" aria-hidden="true" /></span>
                  <div className="flex-1"><p className="font-bold text-white">Recently verified</p><p className="mt-1 text-sm text-slate-300">See records sorted by verification date.</p></div>
                  <ArrowRight className="size-5 text-blue-200" aria-hidden="true" />
                </HeroOption>
              </Link>
            </div>
          </HeroPanel>
        }
      >
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-300">Independent IT certification guidance</p>
        <h1 className="mt-5 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Explore trusted
          <span className="block bg-gradient-to-r from-blue-200 via-blue-400 to-blue-600 bg-clip-text text-transparent">IT certifications.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">Search certifications that align with your goals, filter by provider and level, and review verified details before you make your next move.</p>

        <form method="get" action="/certifications" className="mt-8 max-w-3xl">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-blue-200" aria-hidden="true" />
            <input id="q" name="q" type="search" defaultValue={query} placeholder="Search certifications, keywords, providers, or roles…" className="min-h-12 w-full rounded-xl border border-blue-300/25 bg-slate-950/45 py-3 pl-12 pr-4 text-white outline-none placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/25" />
          </div>

          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <select name="provider" defaultValue={provider} aria-label="Provider" className="min-h-11 rounded-xl border border-white/15 bg-slate-950/55 px-3 text-sm font-semibold text-slate-100 outline-none">
              <option value="">All providers</option>{providers.map(([slug, name]) => <option key={slug} value={slug}>{name}</option>)}
            </select>
            <select name="level" defaultValue={level} aria-label="Level" className="min-h-11 rounded-xl border border-white/15 bg-slate-950/55 px-3 text-sm font-semibold text-slate-100 outline-none">
              <option value="">All levels</option>{levels.map((value) => <option key={value} value={value}>{value}</option>)}
            </select>
            <select name="category" defaultValue={category} aria-label="Category" className="min-h-11 rounded-xl border border-white/15 bg-slate-950/55 px-3 text-sm font-semibold text-slate-100 outline-none">
              <option value="">All categories</option>{categories.map((value) => <option key={value} value={value}>{value}</option>)}
            </select>
            <select name="vendorType" defaultValue={vendorType} aria-label="Vendor type" className="min-h-11 rounded-xl border border-white/15 bg-slate-950/55 px-3 text-sm font-semibold text-slate-100 outline-none">
              <option value="">All vendor types</option>{vendorTypes.map((value) => <option key={value} value={value}>{value}</option>)}
            </select>
          </div>

          <div className="mt-4 flex gap-3">
            <button type="submit" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 font-semibold text-white hover:bg-blue-500">Search certifications <ArrowRight className="size-4" aria-hidden="true" /></button>
            {hasFilters ? <Link href="/certifications" className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/20 px-4 py-2.5 font-semibold text-white hover:bg-white/10">Clear</Link> : null}
          </div>
        </form>

        <div className="mt-8 flex flex-wrap gap-x-7 gap-y-3 text-sm text-slate-300">
          <span className="inline-flex items-center gap-2"><ShieldCheck className="size-4 text-blue-300" /> Independent guidance</span>
          <span className="inline-flex items-center gap-2"><Sparkles className="size-4 text-blue-300" /> Verification dates included</span>
          <span className="inline-flex items-center gap-2"><Building2 className="size-4 text-blue-300" /> Vendor-neutral and vendor-specific</span>
        </div>
      </MarketingHero>

      <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <form method="get" action="/certifications" className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <input type="hidden" name="q" value={query} />
          <input type="hidden" name="provider" value={provider} />
          <input type="hidden" name="level" value={level} />
          <input type="hidden" name="category" value={category} />
          <input type="hidden" name="vendorType" value={vendorType} />

          <div className="grid gap-4 md:grid-cols-3">
            <label className="text-sm font-semibold text-slate-900">Active status
              <select name="status" defaultValue={status} className="mt-2 min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 font-normal">
                <option value="">All statuses</option>{statuses.map((value) => <option key={value} value={value}>{value}</option>)}
              </select>
            </label>
            <label className="text-sm font-semibold text-slate-900">Target job role
              <select name="targetRole" defaultValue={targetRole} className="mt-2 min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 font-normal">
                <option value="">All job roles</option>{targetRoles.map((value) => <option key={value} value={value}>{value}</option>)}
              </select>
            </label>
            <label className="text-sm font-semibold text-slate-900">Sort
              <select name="sort" defaultValue={sort} className="mt-2 min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 font-normal">
                <option value="featured">Featured / Popular</option>
                <option value="beginner">Beginner friendly</option>
                <option value="verified">Recently verified</option>
                <option value="study">Shortest estimated study time</option>
              </select>
            </label>
          </div>
          <div className="mt-4 flex justify-center"><button type="submit" className="rounded-xl bg-slate-950 px-5 py-2.5 font-semibold text-white hover:bg-slate-800">Refine results</button></div>
        </form>

        <div className="mt-8 flex flex-col items-center justify-center gap-1 border-y border-slate-200 py-4 text-center">
          <p className="text-sm text-slate-600"><span className="font-semibold text-slate-950">{certifications.length}</span> {certifications.length === 1 ? "certification" : "certifications"}</p>
          <p className="text-sm text-slate-500">Search and filter state is preserved in the page URL.</p>
        </div>

        {certifications.length ? (
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {certifications.map((certification) => {
              const iconPath = certificationIcons[certification.slug];
              return (
                <Card key={certification.id} className="group flex h-full flex-col items-center text-center transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg">
                  {iconPath ? <div className="mb-5 flex min-h-28 w-full items-center justify-center rounded-xl border border-slate-100 bg-white p-3"><Image src={iconPath} alt={`${certification.name} certification logo`} width={120} height={120} className="max-h-24 w-auto object-contain" /></div> : null}
                  <div className="flex flex-wrap justify-center gap-2">
                    {certification.providers ? <Badge>{certification.providers.name}</Badge> : null}
                    <Badge className="bg-slate-100 text-slate-700">{certification.category}</Badge>
                    <Badge className="bg-slate-100 text-slate-700">{certification.level}</Badge>
                    {certification.status !== "Active" ? <Badge className="bg-amber-50 text-amber-800">{certification.status}</Badge> : null}
                  </div>
                  <h2 className="mt-5 text-xl font-bold tracking-tight text-slate-950">{certification.name}</h2>
                  <p className="mt-3 leading-7 text-slate-600">{certification.short_summary}</p>
                  <div className="mt-auto flex flex-wrap justify-center gap-3 pt-7">
                    <Link href={`/certifications/${certification.slug}`} className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-600">View details <ArrowRight className="size-4" aria-hidden="true" /></Link>
                    {certification.official_certification_url ? <a href={certification.official_certification_url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-blue-200 bg-white px-4 py-2.5 text-sm font-semibold text-blue-700 transition hover:bg-blue-50">Official <ExternalLink className="size-4" aria-hidden="true" /></a> : null}
                  </div>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card className="mt-8 text-center">
            <h2 className="text-xl font-semibold text-slate-950">No certifications match those filters.</h2>
            <p className="mt-2 text-slate-600">Try a broader search or clear one or more filters.</p>
            <Link href="/certifications" className="mt-5 inline-flex font-semibold text-blue-700 hover:text-blue-600">Clear all filters</Link>
          </Card>
        )}
      </section>
    </main>
  );
}
