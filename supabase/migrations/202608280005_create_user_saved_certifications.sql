-- Milestone 4: user-owned saved certifications and RLS.

create table public.user_saved_certifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  certification_id uuid not null references public.certifications(id) on delete cascade,
  status text not null default 'Interested'
    check (status in ('Interested', 'Studying', 'Completed', 'Paused')),
  target_exam_date date,
  personal_notes text,
  saved_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, certification_id)
);

comment on table public.user_saved_certifications is
  'User-owned certification saves and learning status.';

create index user_saved_certifications_user_id_idx
  on public.user_saved_certifications (user_id);

create index user_saved_certifications_certification_id_idx
  on public.user_saved_certifications (certification_id);

create trigger user_saved_certifications_set_updated_at
before update on public.user_saved_certifications
for each row
execute function public.set_updated_at();

alter table public.user_saved_certifications enable row level security;

create policy "Users can view their own saved certifications"
on public.user_saved_certifications
for select
to authenticated
using ((select auth.uid()) = user_id);

create policy "Users can save certifications for themselves"
on public.user_saved_certifications
for insert
to authenticated
with check ((select auth.uid()) = user_id);

create policy "Users can update their own saved certifications"
on public.user_saved_certifications
for update
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

create policy "Users can delete their own saved certifications"
on public.user_saved_certifications
for delete
to authenticated
using ((select auth.uid()) = user_id);

revoke all on table public.user_saved_certifications from anon;
revoke all on table public.user_saved_certifications from authenticated;
grant select, insert, update, delete on table public.user_saved_certifications to authenticated;
