"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { certificationCategories } from "@/lib/certification-categories";

export function CertificationCategoryNav() {
  const pathname = usePathname();
  const isCategoryPage = certificationCategories.some(
    (category) => pathname === `/certifications/${category.slug}`,
  );

  if (isCategoryPage) {
    return null;
  }

  return (
    <section className="border-t border-slate-200 bg-white" aria-labelledby="certification-categories-heading">
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <h2
          id="certification-categories-heading"
          className="text-2xl font-bold tracking-tight text-slate-950"
        >
          Explore certification categories
        </h2>
        <p className="mt-2 text-slate-600">
          Browse focused certification guides by technology and career domain.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          {certificationCategories.map((category) => (
            <Link
              key={category.slug}
              href={`/certifications/${category.slug}`}
              className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
