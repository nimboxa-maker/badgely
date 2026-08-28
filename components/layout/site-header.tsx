import Link from "next/link";
import { Award } from "lucide-react";
import { signOut } from "@/app/auth/actions";
import { MobileNav } from "@/components/layout/mobile-nav";
import { createClient } from "@/lib/supabase/server";

const links = [
  { href: "/certifications", label: "Certifications" },
  { href: "/compare", label: "Compare" },
  { href: "/career-paths", label: "Career Paths" },
];

export async function SiteHeader() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const isAuthenticated = Boolean(user);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg font-bold tracking-tight text-white focus-visible:outline-2 focus-visible:outline-blue-400"
          aria-label="Badgely home"
        >
          <span className="flex size-9 items-center justify-center rounded-xl bg-blue-600">
            <Award className="size-5" aria-hidden="true" />
          </span>
          <span className="text-xl">Badgely</span>
        </Link>

        <nav aria-label="Primary navigation" className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-300 hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-blue-400"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          {isAuthenticated ? (
            <>
              <Link
                href="/dashboard"
                className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-200 hover:text-white"
              >
                Dashboard
              </Link>
              <form action={signOut}>
                <button
                  type="submit"
                  className="rounded-xl border border-white/15 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/10"
                >
                  Sign out
                </button>
              </form>
            </>
          ) : (
            <>
              <Link
                href="/sign-in"
                className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-200 hover:text-white"
              >
                Sign in
              </Link>
              <Link
                href="/sign-up"
                className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-500"
              >
                Get started
              </Link>
            </>
          )}
        </div>

        <MobileNav isAuthenticated={isAuthenticated} />
      </div>
    </header>
  );
}
