# ThirdBadge

ThirdBadge is an independent IT certification discovery, comparison, career-roadmap, and study-planning platform. It helps learners research certifications, compare options, save career paths, and build realistic study plans without implying provider endorsement.

## Stack

- Next.js App Router
- React + TypeScript in strict mode
- Tailwind CSS
- Accessible reusable React components
- Supabase Postgres, Auth, and Row Level Security
- Zod validation
- React Hook Form where useful
- Lucide icons
- GitHub Actions CI
- Vercel deployment target

Server Components are the default. Client Components are limited to interactions that require browser state or event handlers.

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

On Windows PowerShell, use this instead of `cp`:

```powershell
Copy-Item .env.example .env.local
```

Open `http://localhost:3000`.

## Environment variables

ThirdBadge currently requires only these application environment variables:

```text
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
NEXT_PUBLIC_SITE_URL=
```

For local development, set `NEXT_PUBLIC_SITE_URL=http://localhost:3000`.

`NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` are intentionally public browser configuration. Do not place secrets or privileged credentials in any `NEXT_PUBLIC_` variable. ThirdBadge does not require a Supabase service-role key for normal application operation.

Never commit `.env.local` or any real credential.

## Project structure

```text
app/          App Router pages, server actions, layouts, metadata, sitemap, and robots
components/   Shared layout and accessible UI components
features/     Feature-owned UI, validation, tests, and domain logic
lib/          Shared utilities, authorization, and Supabase clients
types/        Shared TypeScript types
supabase/     SQL migrations and seed data
public/       Static public assets
.github/      GitHub Actions workflows
```

## Supabase setup

1. Create or select the Supabase project.
2. Add the project URL and publishable key to `.env.local`.
3. Apply the SQL migrations in `supabase/migrations` in order.
4. Apply the seed files as needed; they are designed to avoid duplicate catalog data.
5. Confirm Row Level Security is enabled for user-owned and protected data.
6. Configure Supabase Auth URL settings for the site URL used by the environment.

Admin access is intentionally not self-service. Assign the `admin` role only through a trusted database/admin workflow. There is no public route or action that promotes a user to admin.

## Quality commands

Run these before major changes and before deployment:

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

Optional formatting check:

```bash
npm run format:check
```

The automated test suite covers study-plan scheduling, user ownership boundaries, admin authorization boundaries, and certification search/filter query parsing.

## Manual test checklist

Complete this checklist before a production release:

- [ ] Unauthenticated visitors can browse public certification and career-path pages.
- [ ] Sign up, sign in, and sign out work correctly.
- [ ] One user cannot view or mutate another user's saved data or study plans.
- [ ] Saving and removing a certification works.
- [ ] Creating, viewing, updating, and deleting a study plan works for its owner.
- [ ] Mobile navigation opens, closes, and navigates correctly.
- [ ] Keyboard users can reach and use the `Skip to main content` link.
- [ ] A normal authenticated user is denied access to `/admin`.
- [ ] An admin can use the catalog content-management flows.
- [ ] The admin review queue filters and links to edit pages correctly.
- [ ] `/sitemap.xml` loads and contains public routes.
- [ ] `/robots.txt` loads and blocks private application areas.
- [ ] An invalid URL shows the custom Not Found page.

## GitHub Actions CI

`.github/workflows/ci.yml` runs on pushes to `main` and pull requests. It executes:

```text
npm ci
npm run lint
npm run typecheck
npm test
npm run build
```

No deployment secrets are stored in the workflow or repository.

## Vercel deployment

ThirdBadge is structured for Vercel's Next.js deployment flow.

1. In Vercel, create a new project and import `nimboxa-maker/badgely` from GitHub.
2. Keep the detected framework as Next.js and use the repository root as the project root.
3. In Vercel Project Settings, add these environment variables for Production and any Preview environments that should connect to Supabase:

```text
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
NEXT_PUBLIC_SITE_URL
```

4. Set `NEXT_PUBLIC_SITE_URL` to the final HTTPS production origin, for example `https://your-domain.example`, with no path suffix.
5. In Supabase Auth URL configuration, set the production site URL to the same production origin and allow the application's auth callback URL for that domain.
6. Do not add a service-role key or other privileged secret to a `NEXT_PUBLIC_` variable.
7. Deploy from the `main` branch.
8. After deployment, verify the home page, authentication, dashboard, admin authorization, `sitemap.xml`, and `robots.txt` using the production URL.
9. If a custom domain is added later, update `NEXT_PUBLIC_SITE_URL` and the matching Supabase Auth URL configuration, then redeploy.

## SEO and error handling

ThirdBadge includes:

- site-wide metadata defaults
- metadata for public directory, comparison, certification, and career-path pages
- dynamic `sitemap.xml`
- `robots.txt`
- custom Not Found handling
- a reusable application error boundary
- semantic navigation landmarks and keyboard skip navigation

## Content and legal guardrails

ThirdBadge uses original educational wording. Do not copy provider training materials, exam objectives, paid content, real exam questions, leaked questions, or exam dumps. Unknown or unverified official facts should display `Verify with official provider.`

Global disclaimer:

> ThirdBadge is an independent educational resource and is not affiliated with, endorsed by, or sponsored by any certification provider. Certification names and logos may be trademarks of their respective owners.

## Architecture and security notes

- Public catalog content uses server-rendered data access where practical.
- Secure mutations use server actions with server-side authorization and validation.
- Supabase browser and server clients are separate.
- UI visibility is never treated as an authorization boundary.
- User-owned data is protected by ownership checks and Row Level Security.
- Admin mutations call the shared server-side admin authorization helper and are backed by database policies.
- Private/admin routes are excluded from search-engine crawling.