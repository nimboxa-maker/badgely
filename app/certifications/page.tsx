import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
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
  providers: {
    name: string;
    slug: string;
  } | null;
};

export default async function CertificationsPage() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("certifications")
    .select(
      "id, name, slug, category, level, vendor_type, short_summary, status, providers(name, slug)",
    )
    .order("name", { ascending: true });

  if (error) {
    throw new Error("Unable to load certifications.");
  }

  const certifications = (data ?? []) as CertificationRow[];

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-700">
          Certification directory
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
          Explore IT certifications
        </h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          Browse certifications across cloud, cybersecurity, networking, Linux, data, and other IT career areas.
        </p>
      </div>

      <div className="mt-8 flex items-center justify-between gap-4 border-y border-slate-200 py-4">
        <p className="text-sm text-slate-600">
          <span className="font-semibold text-slate-950">{certifications.length}</span> certifications
        </p>
        <p className="text-sm text-slate-500">Search, filters, and comparison arrive in the next milestone.</p>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {certifications.map((certification) => (
          <Card key={certification.id} className="flex h-full flex-col">
            <div className="flex flex-wrap gap-2">
              <Badge>{certification.category}</Badge>
              <Badge className="bg-slate-100 text-slate-700">{certification.level}</Badge>
              {certification.status !== "Active" ? (
                <Badge className="bg-amber-50 text-amber-800">{certification.status}</Badge>
              ) : null}
            </div>

            <p className="mt-5 text-sm font-semibold text-blue-700">
              {certification.providers?.name ?? "Certification provider"}
            </p>
            <h2 className="mt-1 text-xl font-bold tracking-tight text-slate-950">
              {certification.name}
            </h2>
            <p className="mt-3 flex-1 leading-7 text-slate-600">{certification.short_summary}</p>

            <div className="mt-5 border-t border-slate-100 pt-4">
              <div className="mb-4 flex flex-wrap gap-x-5 gap-y-1 text-sm text-slate-500">
                <span>{certification.vendor_type}</span>
                <span>{certification.level}</span>
              </div>
              <Link
                href={`/certifications/${certification.slug}`}
                className="inline-flex items-center gap-2 font-semibold text-blue-700 hover:text-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                View certification
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </main>
  );
}
