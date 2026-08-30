import type { Metadata } from "next";
import Link from "next/link";
import { requestPasswordReset } from "@/app/auth/actions";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Reset Password",
  description: "Request a Badgely password reset link by email.",
};

type ForgotPasswordPageProps = {
  searchParams: Promise<{ error?: string; message?: string }>;
};

export default async function ForgotPasswordPage({ searchParams }: ForgotPasswordPageProps) {
  const params = await searchParams;

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-7xl items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <div className="mb-6 space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-600">
            Account recovery
          </p>
          <h1 className="text-3xl font-bold tracking-tight">Reset your password</h1>
          <p className="text-sm leading-6 text-slate-600">
            Enter the email address connected to your Badgely account. We&apos;ll send a link you can
            use to choose a new password.
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

        {params.message ? (
          <div
            role="status"
            className="mb-5 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-700"
          >
            {params.message}
          </div>
        ) : null}

        <form action={requestPasswordReset} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-semibold text-slate-800">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="min-h-11 w-full rounded-xl border border-slate-300 px-3 py-2 text-slate-950 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <Button type="submit" className="w-full">
            Send reset link
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          Remembered your password?{" "}
          <Link href="/sign-in" className="font-semibold text-blue-600 hover:text-blue-500">
            Back to sign in
          </Link>
        </p>
      </Card>
    </main>
  );
}
