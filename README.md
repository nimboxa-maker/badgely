# Badgely

Badgely is an independent IT certification discovery, comparison, career-roadmap, and study-planning platform. It is designed to help learners understand certification options and build realistic learning plans without implying provider endorsement.

## Milestone 1 status

This repository currently contains the production foundation: Next.js App Router, strict TypeScript, Tailwind CSS, reusable UI primitives, responsive navigation/footer, project-wide styling, environment-variable template, and setup documentation.

Database, authentication, catalog data, and protected application features intentionally begin in later milestones.

## Stack

- Next.js App Router
- React + TypeScript (strict mode)
- Tailwind CSS
- Accessible reusable React components
- Supabase (Postgres, Auth, RLS) — configured in later milestones
- Vercel deployment
- GitHub source control
- Zod and React Hook Form for validated forms
- Lucide icons

## Local development

Requirements:

- Node.js 22 or newer
- npm
- Git

Clone and install:

```bash
git clone https://github.com/nimboxa-maker/badgely.git
cd badgely
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## Quality commands

```bash
npm run lint
npm run typecheck
npm run format:check
npm run build
```

Run these before merging major changes.

## Environment variables

Copy `.env.example` to `.env.local`. Never commit `.env.local` or real credentials.

```text
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_SITE_URL=
```

`NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` are intentionally public browser configuration. `SUPABASE_SERVICE_ROLE_KEY` is privileged and must never be exposed to browser code or placed in a `NEXT_PUBLIC_` variable.

## Project structure

```text
app/          App Router pages and layouts
components/   Shared layout and accessible UI components
features/     Feature-owned UI, validation, and domain logic
lib/          Shared utilities and service clients
types/        Shared TypeScript types
supabase/     SQL migrations, seed data, and Supabase configuration
public/       Static public assets
```

Server Components are the default. Client Components should be limited to interactive behavior that requires browser state or event handlers.

## Supabase setup

Supabase integration begins in Milestone 2. When configured:

1. Create a Supabase project.
2. Add the project URL and publishable key to `.env.local`.
3. Keep the service-role key server-only.
4. Apply migrations from `supabase/migrations`.
5. Enable and verify Row Level Security for all private/user-owned tables.

## Vercel deployment

1. Import this GitHub repository into Vercel.
2. Use the detected Next.js framework settings.
3. Add the environment variables from `.env.example` in Vercel Project Settings.
4. Never commit deployment secrets to GitHub.
5. Set `NEXT_PUBLIC_SITE_URL` to the production URL after the domain is assigned.

## GitHub workflow

Use small, reviewable commits with conventional messages such as:

```text
feat: add certification directory
fix: enforce study plan ownership
chore: configure Supabase clients
```

GitHub Actions CI is scheduled for the final quality/deployment milestone after the application test suite is established.

## Content and legal guardrails

Badgely must use original educational wording. Do not copy provider training materials, exam objectives, paid content, real exam questions, leaked questions, or exam dumps. Unknown or unverified official facts should be displayed as `Verify with official provider.`

Global disclaimer:

> Badgely is an independent educational resource and is not affiliated with, endorsed by, or sponsored by any certification provider. Certification names and logos may be trademarks of their respective owners.

## Architecture notes

- Public catalog content will use server-rendered data access where possible.
- Secure mutations will use server actions or route handlers with Zod validation.
- Supabase browser and server clients will be separate.
- Authorization will always be checked server-side; UI visibility is not a security boundary.
- User-owned and private tables will use Row Level Security.
- The admin role model and role-assignment process will be documented when implemented in the admin/auth milestones.
