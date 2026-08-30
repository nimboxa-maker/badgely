import Link from "next/link";
import { signUp } from "@/app/auth/actions";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type SignUpPageProps = {
  searchParams: Promise<{ error?: string }>;
};

export default async function SignUpPage({ searchParams }: SignUpPageProps) {
  const params = await searchParams;

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-7xl items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <div className="mb-6 space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-600">
            Get started
          </p>
          <h1 className="text-3xl font-bold tracking-tight">Create your Badgely account</h1>
          <p className="text-sm text-slate-600">
            Save certifications, career paths, and study progress in one place.
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

        <form action={signUp} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="displayName" className="text-sm font-semibold text-slate-800">
              Name
            </label>
            <input
              id="displayName"
              name="displayName"
              type="text"
              autoComplete="name"
              required
              className="min-h-11 w-full rounded-xl border border-slate-300 px-3 py-2 text-slate-950 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

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

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-semibold text-slate-800">
              Password
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
            <p className="text-xs text-slate-500">Use at least 8 characters.</p>
          </div>

          <Button type="submit" className="w-full">
            Create account
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          Already have an account?{" "}
          <Link href="/sign-in" className="font-semibold text-blue-600 hover:text-blue-500">
            Sign in
          </Link>
        </p>
      </Card>
    </main>
  );
}
