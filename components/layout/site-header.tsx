import Link from "next/link";
import { Award } from "lucide-react";
import { MobileNav } from "@/components/layout/mobile-nav";

const links = [
  { href: "/certifications", label: "Certifications" },
  { href: "/career-paths", label: "Career Paths" },
  { href: "/proctoring-services", label: "Proctoring Services" },
  { href: "/study-store", label: "Study Store" },
  { href: "/courses", label: "Courses" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[linear-gradient(90deg,#123fb8_0%,#153d9d_48%,#0b2d77_100%)] text-white shadow-lg shadow-blue-950/20">
      <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg font-bold tracking-tight text-white focus-visible:outline-2 focus-visible:outline-white"
          aria-label="Badgely home"
        >
          <span className="flex size-9 items-center justify-center rounded-xl bg-white/15 ring-1 ring-inset ring-white/10">
            <Award className="size-5" aria-hidden="true" />
          </span>

          <span className="text-xl">Badgely</span>
        </Link>

        <nav
          aria-label="Primary navigation"
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex"
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-blue-100 transition hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <MobileNav />
      </div>
    </header>
  );
}
