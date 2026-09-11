import Image from "next/image";
import Link from "next/link";
import { MobileNav } from "@/components/layout/mobile-nav";

const links = [
  { href: "/certifications", label: "Certifications" },
  { href: "/recertification", label: "Recertification" },
  { href: "/free-resources", label: "Free Resources" },
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
          className="inline-flex items-center rounded-lg focus-visible:outline-2 focus-visible:outline-white"
          aria-label="AimToCert home"
        >
          <Image
            src="/brand/AimToCert-logo-v2.png"
            alt="AimToCert — Your guide to the world of certifications"
            width={260}
            height={87}
            priority
            className="h-14 w-auto rounded-md"
          />
        </Link>

        <nav
          aria-label="Primary navigation"
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-0.5 md:flex"
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="whitespace-nowrap rounded-lg px-2.5 py-2 text-sm font-medium text-blue-100 transition hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-white"
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