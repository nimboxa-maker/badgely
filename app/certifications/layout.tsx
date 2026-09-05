import type { Metadata } from "next";
import { CertificationCategoryNav } from "@/components/certifications/certification-category-nav";

const description =
  "Explore IT certifications across cybersecurity, cloud, networking, Linux, data, project management, and more with verified exam and career guidance.";

export const metadata: Metadata = {
  title: "IT Certifications Directory | ThirdBadge",
  description,
  alternates: {
    canonical: "/certifications",
  },
  openGraph: {
    title: "IT Certifications Directory | ThirdBadge",
    description,
    url: "/certifications",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "IT Certifications Directory | ThirdBadge",
    description,
  },
};

export default function CertificationsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      {children}
      <CertificationCategoryNav />
    </>
  );
}