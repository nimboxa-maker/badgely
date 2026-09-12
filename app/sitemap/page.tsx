import type { Metadata } from "next";
import Link from "next/link";
import { certificationCategories } from "@/lib/certification-categories";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Sitemap | AimToCert",
  description:
    "Browse AimToCert certification categories, individual IT certifications, career paths, guides, resources, and company pages.",
};

type CertificationRow = {
  name: string;
  slug: string;
  category: string;
};

type CareerPathRow = {
  name: string;
  slug: string;
};

const guides = [
  {
    href: "/guides/is-security-plus-worth-it",
    label: "Is CompTIA Security+ Worth It?",
  },
  {
    href: "/guides/ccna-vs-network-plus",
    label: "CCNA vs Network+",
  },
  {
    href: "/guides/security-plus-vs-sscp",
    label: "Security+ vs SSCP",
  },
  {
    href: "/guides/security-plus-vs-cysa-plus",
    label: "Security+ vs CySA+",
  },
  {
    href: "/guides/cissp-vs-cism",
    label: "CISSP vs CISM",
  },
  {
    href: "/guides/best-cybersecurity-certifications",
    label: "Best Cybersecurity Certifications",
  },
  {
    href: "/guides/best-cloud-certifications",
    label: "Best Cloud Certifications",
  },
];

export default async function SitemapPage() {
  const supabase = await createClient();

  const [certificationsResult, careerPathsResult] = await Promise.all([
    supabase
      .from("certifications")
      .select("name, slug, category")
      .eq("status", "Active")
      .order("name", { ascending: true }),

    supabase
      .from("career_paths")
      .select("name, slug")
      .order("name", { ascending: true }),
  ]);

  const certifications =
    (certificationsResult.data ?? []) as CertificationRow[];

  const careerPaths = (careerPathsResult.data ?? []) as CareerPathRow[];

  const groupedCertifications = certificationCategories.map((category) => ({
    category,
    certifications: certifications.filter(
      (certification) => certification.category === category.name,
    ),
  }));

  const knownCategoryNames = new Set(
    certificationCategories.map((category) => category.name),
  );

  const uncategorizedCertifications = certifications.filter(
    (certification) => !knownCategoryNames.has(certification.category),
  );

  return (
    <main className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight text-slate-950">
          Sitemap
        </h1>

        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
          Browse AimToCert certifications, career paths, guides, study
          resources, and company information.
        </p>

        <section className="mt-12">
          <h2 className="border-b border-slate-300 pb-3 text-2xl font-bold text-slate-950">
            Certification Categories
          </h2>

          <ul className="mt-5 space-y-2">
            <li>
              <Link
                href="/certifications"
                className="text-blue-700 hover:text-blue-900 hover:underline"
              >
                All IT Certifications
              </Link>
            </li>

            {certificationCategories.map((category) => (
              <li key={category.slug}>
                <Link
                  href={`/certifications/${category.slug}`}
                  className="text-blue-700 hover:text-blue-900 hover:underline"
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-14">
          <h2 className="border-b border-slate-300 pb-3 text-2xl font-bold text-slate-950">
            IT Certifications
          </h2>

          <div className="mt-8 space-y-10">
            {groupedCertifications.map(({ category, certifications }) => (
              <div key={category.slug}>
                <h3 className="text-lg font-bold text-slate-950">
                  <Link
                    href={`/certifications/${category.slug}`}
                    className="hover:text-blue-700 hover:underline"
                  >
                    {category.name}
                  </Link>
                </h3>

                {certifications.length > 0 ? (
                  <ul className="mt-4 space-y-2 pl-5">
                    {certifications.map((certification) => (
                      <li
                        key={certification.slug}
                        className="list-disc text-slate-400"
                      >
                        <Link
                          href={`/certifications/${certification.slug}`}
                          className="text-sm text-blue-700 hover:text-blue-900 hover:underline"
                        >
                          {certification.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-3 text-sm text-slate-500">
                    No certifications currently listed.
                  </p>
                )}
              </div>
            ))}

            {uncategorizedCertifications.length > 0 ? (
              <div>
                <h3 className="text-lg font-bold text-slate-950">
                  Other Certifications
                </h3>

                <ul className="mt-4 space-y-2 pl-5">
                  {uncategorizedCertifications.map((certification) => (
                    <li
                      key={certification.slug}
                      className="list-disc text-slate-400"
                    >
                      <Link
                        href={`/certifications/${certification.slug}`}
                        className="text-sm text-blue-700 hover:text-blue-900 hover:underline"
                      >
                        {certification.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </section>

        <section className="mt-14">
          <h2 className="border-b border-slate-300 pb-3 text-2xl font-bold text-slate-950">
            Career Paths
          </h2>

          <ul className="mt-5 space-y-2">
            <li>
              <Link
                href="/career-paths"
                className="text-blue-700 hover:text-blue-900 hover:underline"
              >
                All Career Paths
              </Link>
            </li>

            {careerPaths.map((path) => (
              <li key={path.slug}>
                <Link
                  href={`/career-paths/${path.slug}`}
                  className="text-blue-700 hover:text-blue-900 hover:underline"
                >
                  {path.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-14">
          <h2 className="border-b border-slate-300 pb-3 text-2xl font-bold text-slate-950">
            Guides
          </h2>

          <ul className="mt-5 space-y-2">
            {guides.map((guide) => (
              <li key={guide.href}>
                <Link
                  href={guide.href}
                  className="text-blue-700 hover:text-blue-900 hover:underline"
                >
                  {guide.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-14">
          <h2 className="border-b border-slate-300 pb-3 text-2xl font-bold text-slate-950">
            Study Resources
          </h2>

          <ul className="mt-5 space-y-2">
            <li>
              <Link
                href="/courses"
                className="text-blue-700 hover:text-blue-900 hover:underline"
              >
                Courses
              </Link>
            </li>

            <li>
              <Link
                href="/study-store"
                className="text-blue-700 hover:text-blue-900 hover:underline"
              >
                Study Store
              </Link>
            </li>

            <li>
              <Link
                href="/proctoring-services"
                className="text-blue-700 hover:text-blue-900 hover:underline"
              >
                Testing and Proctoring Services
              </Link>
            </li>
          </ul>
        </section>

        <section className="mt-14">
          <h2 className="border-b border-slate-300 pb-3 text-2xl font-bold text-slate-950">
            Company
          </h2>

          <ul className="mt-5 space-y-2">
            <li>
              <Link
                href="/about"
                className="text-blue-700 hover:text-blue-900 hover:underline"
              >
                About Us
              </Link>
            </li>

            <li>
              <a
                href="mailto:nimboxa@gmail.com"
                className="text-blue-700 hover:text-blue-900 hover:underline"
              >
                Contact Us
              </a>
            </li>
          </ul>
        </section>

        <section className="mt-14">
          <h2 className="border-b border-slate-300 pb-3 text-2xl font-bold text-slate-950">
            Legal & Privacy
          </h2>

          <ul className="mt-5 space-y-2">
            <li>
              <Link
                href="/terms"
                className="text-blue-700 hover:text-blue-900 hover:underline"
              >
                Terms and Conditions
              </Link>
            </li>

            <li>
              <Link
                href="/privacy"
                className="text-blue-700 hover:text-blue-900 hover:underline"
              >
                Privacy Policy
              </Link>
            </li>

            <li>
              <Link
                href="/cookie-settings"
                className="text-blue-700 hover:text-blue-900 hover:underline"
              >
                Cookie Settings
              </Link>
            </li>
          </ul>
        </section>

        <section className="mt-14 border-t border-slate-300 pt-8">
          <h2 className="text-xl font-bold text-slate-950">
            Search Engine Sitemap
          </h2>

          <p className="mt-3 text-sm text-slate-600">
            AimToCert also maintains an XML sitemap for search engines.
          </p>

          <Link
            href="/sitemap.xml"
            className="mt-3 inline-flex text-sm font-semibold text-blue-700 hover:text-blue-900 hover:underline"
          >
            View sitemap.xml →
          </Link>
        </section>
      </div>
    </main>
  );
}
