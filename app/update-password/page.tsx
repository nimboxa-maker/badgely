import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { updatePassword } from "@/app/auth/actions";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Choose New Password",
  description: "Choose a new password for your Badgely account.",
};

type UpdatePasswordPageProps = {
  searchParams: Promise<{ error?: string }>;
};

export default async function UpdatePasswordPage({ searchParams }: UpdatePasswordPageProps) {
  const params = await searchParams;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/sign-in?error=Your+password+reset+link+has+expired+or+is+invalid.");
  }

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-7xl items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <div className="mb-6 space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-600">
            Account recovery
          </p>
          <h1 className="text-3xl font-bold tracking-tight">Choose a new password</h1>
          <p className="text-sm leading-6 text-slate-600">
            Enter a new password for your Badgely account. It must be at least 8 characters long.
          </p>
        </div>

        {params.error ? (
          <div
            role="alert"
            className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {params.error}
          </div>
        ) : null}

        <form action={updatePassword} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-semibold text-slate-800">
              New password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              minLength={8}
              required
              className="min-h-11 w-full rounded-xl border border-slate-300 px-3 py-2 text-slate-950 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="text-sm font-semibold text-slate-800">
              Confirm new password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              minLength={8}
              required
              className="min-h-11 w-full rounded-xl border border-slate-300 px-3 py-2 text-slate-950 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <Button type="submit" className="w-full">
            Update password
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          Need a new reset email?{" "}
          <Link href="/forgot-password" className="font-semibold text-blue-600 hover:text-blue-500">
            Request another link
          </Link>
        </p>
      </Card>
    </main>
  );
}
