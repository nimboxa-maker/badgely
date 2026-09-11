import type { Metadata } from "next";

const description =
  "Explore IT career paths for cloud, cybersecurity, networking, DevOps, support, GRC, and more with recommended certifications and practical next steps.";

export const metadata: Metadata = {
  title: "IT Career Paths & Certification Roadmaps | AimToCert",
  description,
  alternates: {
    canonical: "/career-paths",
  },
  openGraph: {
    title: "IT Career Paths & Certification Roadmaps | AimToCert",
    description,
    url: "/career-paths",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "IT Career Paths & Certification Roadmaps | AimToCert",
    description,
  },
};

export default function CareerPathsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}