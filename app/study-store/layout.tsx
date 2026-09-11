import type { Metadata } from "next";

const description =
  "Browse curated IT certification books, study guides, practice resources, and learning material from trusted publishers and training providers.";

export const metadata: Metadata = {
  title: "IT Certification Study Resources | AimToCert",
  description,
  alternates: {
    canonical: "/study-store",
  },
  openGraph: {
    title: "IT Certification Study Resources | AimToCert",
    description,
    url: "/study-store",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "IT Certification Study Resources | AimToCert",
    description,
  },
};

export default function StudyStoreLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}