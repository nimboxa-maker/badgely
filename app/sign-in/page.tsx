import { signIn } from "@/app/auth/actions";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type SignInPageProps = {
  searchParams: Promise<{ error?: string; message?: string }>;
};

export default async function SignInPage({ searchParams }: SignInPageProps) {
  const params = await searchParams;

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-7xl items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md text-center">
        <div className="mb-6 space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-600">
            Administration
          </p>

          <h1 className="text-3xl font-bold tracking-tight">
            Badgely Admin Sign In
          </h1>

          <p className="text-sm leading-6 text-slate-600">
            Authorized administrators only.
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
          <div className="mb-5 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-700">
            {params.message}
          </div>
        ) : null}

        <form action={signIn} className="space-y-4 text-left">
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-semibold text-slate-800"
            >
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
            <label
              htmlFor="password"
              className="text-sm font-semibold text-slate-800"
            >
              Password
            </label>

            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="min-h-11 w-full rounded-xl border border-slate-300 px-3 py-2 text-slate-950 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <Button type="submit" className="w-full">
            Sign in to Admin
          </Button>
        </form>
      </Card>
    </main>
  );
}