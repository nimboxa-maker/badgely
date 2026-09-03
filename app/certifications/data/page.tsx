import type { Metadata } from "next";
import { CertificationCategoryPage } from "@/components/certifications/certification-category-page";
import { getCertificationCategory } from "@/lib/certification-categories";

const category = getCertificationCategory("data")!;

export const metadata: Metadata = {
  title: { absolute: category.title },
  description: category.description,
  alternates: { canonical: `/certifications/${category.slug}` },
  openGraph: {
    title: category.title,
    description: category.description,
    url: `/certifications/${category.slug}`,
    type: "website",
  },
  twitter: { card: "summary", title: category.title, description: category.description },
};

export default function DataCertificationsPage() {
  return <CertificationCategoryPage category={category} />;
}
