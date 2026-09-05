import type { Metadata } from "next";

const description =
  "Compare IT certification courses, training platforms, labs, and official learning resources from trusted providers.";

export const metadata: Metadata = {
  alternates: {
    canonical: "/courses",
  },
  openGraph: {
    title: "IT Certification Courses & Training Providers | ThirdBadge",
    description,
    url: "/courses",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "IT Certification Courses & Training Providers | ThirdBadge",
    description,
  },
};

export default function CoursesLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}