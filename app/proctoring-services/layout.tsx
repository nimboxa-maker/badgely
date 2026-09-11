import type { Metadata } from "next";

const description =
  "Find the testing and proctoring providers used by major IT certification programs, including Pearson VUE, PSI, PeopleCert, Certiport, Red Hat, and Prometric.";

export const metadata: Metadata = {
  title: "IT Certification Proctoring Services | AimToCert",
  description,
  alternates: {
    canonical: "/proctoring-services",
  },
  openGraph: {
    title: "IT Certification Proctoring Services | AimToCert",
    description,
    url: "/proctoring-services",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "IT Certification Proctoring Services | AimToCert",
    description,
  },
};

export default function ProctoringServicesLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}