import type { Metadata } from "next";

const description =
  "Compare IT certification courses, training platforms, labs, and official learning resources from trusted providers.";

export const metadata: Metadata = {
  title: "IT Certification Courses & Training Providers | AimToCert",
  description,
  alternates: {
    canonical: "/courses",
  },
  openGraph: {
    title: "IT Certification Courses & Training Providers | AimToCert",
    description,
    url: "/courses",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "IT Certification Courses & Training Providers | AimToCert",
    description,
  },
};

export default function CoursesLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}