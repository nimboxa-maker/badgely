"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { signOut } from "@/app/auth/actions";

const links = [
  { href: "/certifications", label: "Certifications" },
  { href: "/compare", label: "Compare" },
  { href: "/career-paths", label: "Career Paths" },
  { href: "/proctoring-services", label: "Proctoring Services" },
  { href: "/study-store", label: "Study Store" },
];

type MobileNavProps = {
  isAuthenticated: boolean;
};

export function MobileNav({ isAuthenticated }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl text-slate-100 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={open}
        aria-controls="mobile-navigation"
        onClick={() => setOpen((current) => !current)}
      >
        {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
      </button>

      {open ? (
        <div
          id="mobile-navigation"
          className="absolute inset-x-4 top-20 z-50 rounded-2xl border border-white/10 bg-slate-950 p-4 shadow-2xl"
        >
          <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-xl px-4 py-3 font-medium text-slate-100 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-blue-400"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="my-2 border-t border-white/10" />
            {isAuthenticated ? (
              <>
                <Link
                  href="/dashboard"
                  className="rounded-xl px-4 py-3 font-medium text-slate-100 hover:bg-white/10"
                  onClick={() => setOpen(false)}
                >
                  Dashboard
                </Link>
                <form action={signOut}>
                  <button
                    type="submit"
                    className="mt-1 w-full rounded-xl border border-white/15 px-4 py-3 text-center font-semibold text-white hover:bg-white/10"
                  >
                    Sign out
                  </button>
                </form>
              </>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  className="rounded-xl px-4 py-3 font-medium text-slate-100 hover:bg-white/10"
                  onClick={() => setOpen(false)}
                >
                  Sign in
                </Link>
                <Link
                  href="/sign-up"
                  className="mt-1 rounded-xl bg-blue-600 px-4 py-3 text-center font-semibold text-white hover:bg-blue-500"
                  onClick={() => setOpen(false)}
                >
                  Get started
                </Link>
              </>
            )}
          </nav>
        </div>
      ) : null}
    </div>
  );
}
