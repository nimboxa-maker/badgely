-- Milestone 3: public certification catalog schema and access policies.

create schema if not exists private;
revoke all on schema private from public;
grant usage on schema private to anon, authenticated;

create or replace function private.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.profiles
    where id = (select auth.uid())
      and role = 'admin'
  );
$$;

revoke all on function private.is_admin() from public;
grant execute on function private.is_admin() to authenticated;

create table public.providers (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  website_url text,
  description text,
  provider_type text check (provider_type in ('vendor-neutral', 'vendor-specific', 'professional-body')),
  accent_color text,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.certifications (
  id uuid primary key default gen_random_uuid(),
  provider_id uuid not null references public.providers(id) on delete restrict,
  name text not null,
  slug text not null unique,
  category text not null,
  level text not null,
  vendor_type text not null check (vendor_type in ('Vendor-neutral', 'Vendor-specific')),
  short_summary text not null,
  full_summary text,
  target_job_roles text[] not null default '{}',
  recommended_experience text,
  official_certification_url text,
  status text not null default 'Active' check (status in ('Active', 'Retiring Soon', 'Retired')),
  last_verified_date date,
  featured boolean not null default false,
  estimated_study_hours_min integer check (estimated_study_hours_min is null or estimated_study_hours_min >= 0),
  estimated_study_hours_max integer check (estimated_study_hours_max is null or estimated_study_hours_max >= 0),
  seo_title text,
  seo_description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (
    estimated_study_hours_min is null
    or estimated_study_hours_max is null
    or estimated_study_hours_min <= estimated_study_hours_max
  )
);

create table public.exams (
  id uuid primary key default gen_random_uuid(),
  certification_id uuid not null references public.certifications(id) on delete cascade,
  exam_name text,
  exam_code text,
  number_of_exams integer check (number_of_exams is null or number_of_exams > 0),
  duration_minutes integer check (duration_minutes is null or duration_minutes > 0),
  question_count_text text,
  delivery_method text,
  price_text text,
  registration_url text,
  notes text,
  last_verified_date date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.exam_domains (
  id uuid primary key default gen_random_uuid(),
  certification_id uuid not null references public.certifications(id) on delete cascade,
  domain_name text not null,
  domain_weight_text text,
  description text,
  display_order integer not null default 0
);

create table public.renewal_policies (
  id uuid primary key default gen_random_uuid(),
  certification_id uuid not null unique references public.certifications(id) on delete cascade,
  validity_period_text text,
  renewal_method text,
  official_renewal_url text,
  notes text,
  last_verified_date date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.resources (
  id uuid primary key default gen_random_uuid(),
  certification_id uuid not null references public.certifications(id) on delete cascade,
  title text not null,
  description text,
  resource_type text not null check (resource_type in ('Official Guide', 'Official Training', 'Practice Lab', 'Video Course', 'Book', 'Documentation', 'Community')),
  url text,
  provider_name text,
  is_official boolean not null default false,
  cost_type text check (cost_type in ('Free', 'Paid', 'Freemium')),
  featured boolean not null default false,
  last_verified_date date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.career_paths (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  short_summary text not null,
  full_summary text,
  audience_level text,
  target_role text,
  estimated_total_time_text text,
  featured boolean not null default false,
  seo_title text,
  seo_description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.career_path_steps (
  id uuid primary key default gen_random_uuid(),
  career_path_id uuid not null references public.career_paths(id) on delete cascade,
  certification_id uuid references public.certifications(id) on delete set null,
  step_number integer not null check (step_number > 0),
  title text not null,
  explanation text,
  is_optional boolean not null default false,
  practical_activity text,
  display_order integer not null default 0
);

create table public.certification_relations (
  id uuid primary key default gen_random_uuid(),
  source_certification_id uuid not null references public.certifications(id) on delete cascade,
  target_certification_id uuid not null references public.certifications(id) on delete cascade,
  relation_type text not null check (relation_type in ('Recommended Before', 'Recommended After', 'Alternative', 'Specialization')),
  explanation text,
  unique (source_certification_id, target_certification_id, relation_type)
);

-- Reuse the Milestone 2 updated_at trigger function for catalog tables.
create trigger providers_set_updated_at
before update on public.providers
for each row execute function public.set_updated_at();

create trigger certifications_set_updated_at
before update on public.certifications
for each row execute function public.set_updated_at();

create trigger exams_set_updated_at
before update on public.exams
for each row execute function public.set_updated_at();

create trigger renewal_policies_set_updated_at
before update on public.renewal_policies
for each row execute function public.set_updated_at();

create trigger resources_set_updated_at
before update on public.resources
for each row execute function public.set_updated_at();

create trigger career_paths_set_updated_at
before update on public.career_paths
for each row execute function public.set_updated_at();

-- Indexes for directory filtering, joins, and future catalog management.
create index certifications_provider_id_idx on public.certifications(provider_id);
create index certifications_category_idx on public.certifications(category);
create index certifications_level_idx on public.certifications(level);
create index certifications_status_idx on public.certifications(status);
create index certifications_featured_idx on public.certifications(featured) where featured = true;
create index exams_certification_id_idx on public.exams(certification_id);
create index exam_domains_certification_id_idx on public.exam_domains(certification_id);
create index resources_certification_id_idx on public.resources(certification_id);
create index career_path_steps_career_path_id_idx on public.career_path_steps(career_path_id);
create index career_path_steps_certification_id_idx on public.career_path_steps(certification_id);
create index certification_relations_source_idx on public.certification_relations(source_certification_id);
create index certification_relations_target_idx on public.certification_relations(target_certification_id);

-- Slug columns already receive indexes from their UNIQUE constraints.

alter table public.providers enable row level security;
alter table public.certifications enable row level security;
alter table public.exams enable row level security;
alter table public.exam_domains enable row level security;
alter table public.renewal_policies enable row level security;
alter table public.resources enable row level security;
alter table public.career_paths enable row level security;
alter table public.career_path_steps enable row level security;
alter table public.certification_relations enable row level security;

-- Public catalog read access.
create policy "Public can view active providers"
on public.providers
for select
to anon, authenticated
using (active = true);

create policy "Public can view certifications from active providers"
on public.certifications
for select
to anon, authenticated
using (
  exists (
    select 1
    from public.providers
    where providers.id = certifications.provider_id
      and providers.active = true
  )
);

create policy "Public can view exams for visible certifications"
on public.exams
for select
to anon, authenticated
using (
  exists (
    select 1
    from public.certifications
    join public.providers on providers.id = certifications.provider_id
    where certifications.id = exams.certification_id
      and providers.active = true
  )
);

create policy "Public can view domains for visible certifications"
on public.exam_domains
for select
to anon, authenticated
using (
  exists (
    select 1
    from public.certifications
    join public.providers on providers.id = certifications.provider_id
    where certifications.id = exam_domains.certification_id
      and providers.active = true
  )
);

create policy "Public can view renewal policies for visible certifications"
on public.renewal_policies
for select
to anon, authenticated
using (
  exists (
    select 1
    from public.certifications
    join public.providers on providers.id = certifications.provider_id
    where certifications.id = renewal_policies.certification_id
      and providers.active = true
  )
);

create policy "Public can view resources for visible certifications"
on public.resources
for select
to anon, authenticated
using (
  exists (
    select 1
    from public.certifications
    join public.providers on providers.id = certifications.provider_id
    where certifications.id = resources.certification_id
      and providers.active = true
  )
);

create policy "Public can view career paths"
on public.career_paths
for select
to anon, authenticated
using (true);

create policy "Public can view career path steps"
on public.career_path_steps
for select
to anon, authenticated
using (true);

create policy "Public can view certification relations"
on public.certification_relations
for select
to anon, authenticated
using (
  exists (
    select 1
    from public.certifications source_certification
    join public.providers source_provider on source_provider.id = source_certification.provider_id
    where source_certification.id = certification_relations.source_certification_id
      and source_provider.active = true
  )
  and exists (
    select 1
    from public.certifications target_certification
    join public.providers target_provider on target_provider.id = target_certification.provider_id
    where target_certification.id = certification_relations.target_certification_id
      and target_provider.active = true
  )
);

-- Admins can read hidden catalog records and manage catalog content.
create policy "Admins can manage providers"
on public.providers
for all
to authenticated
using ((select private.is_admin()))
with check ((select private.is_admin()));

create policy "Admins can manage certifications"
on public.certifications
for all
to authenticated
using ((select private.is_admin()))
with check ((select private.is_admin()));

create policy "Admins can manage exams"
on public.exams
for all
to authenticated
using ((select private.is_admin()))
with check ((select private.is_admin()));

create policy "Admins can manage exam domains"
on public.exam_domains
for all
to authenticated
using ((select private.is_admin()))
with check ((select private.is_admin()));

create policy "Admins can manage renewal policies"
on public.renewal_policies
for all
to authenticated
using ((select private.is_admin()))
with check ((select private.is_admin()));

create policy "Admins can manage resources"
on public.resources
for all
to authenticated
using ((select private.is_admin()))
with check ((select private.is_admin()));

create policy "Admins can manage career paths"
on public.career_paths
for all
to authenticated
using ((select private.is_admin()))
with check ((select private.is_admin()));

create policy "Admins can manage career path steps"
on public.career_path_steps
for all
to authenticated
using ((select private.is_admin()))
with check ((select private.is_admin()));

create policy "Admins can manage certification relations"
on public.certification_relations
for all
to authenticated
using ((select private.is_admin()))
with check ((select private.is_admin()));

-- Keep table privileges aligned with the RLS policies above.
grant select on table public.providers to anon, authenticated;
grant select on table public.certifications to anon, authenticated;
grant select on table public.exams to anon, authenticated;
grant select on table public.exam_domains to anon, authenticated;
grant select on table public.renewal_policies to anon, authenticated;
grant select on table public.resources to anon, authenticated;
grant select on table public.career_paths to anon, authenticated;
grant select on table public.career_path_steps to anon, authenticated;
grant select on table public.certification_relations to anon, authenticated;

grant insert, update, delete on table public.providers to authenticated;
grant insert, update, delete on table public.certifications to authenticated;
grant insert, update, delete on table public.exams to authenticated;
grant insert, update, delete on table public.exam_domains to authenticated;
grant insert, update, delete on table public.renewal_policies to authenticated;
grant insert, update, delete on table public.resources to authenticated;
grant insert, update, delete on table public.career_paths to authenticated;
grant insert, update, delete on table public.career_path_steps to authenticated;
grant insert, update, delete on table public.certification_relations to authenticated;

grant all on table public.providers to service_role;
grant all on table public.certifications to service_role;
grant all on table public.exams to service_role;
grant all on table public.exam_domains to service_role;
grant all on table public.renewal_policies to service_role;
grant all on table public.resources to service_role;
grant all on table public.career_paths to service_role;
grant all on table public.career_path_steps to service_role;
grant all on table public.certification_relations to service_role;
