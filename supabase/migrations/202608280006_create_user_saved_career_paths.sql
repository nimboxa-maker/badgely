-- Milestone 5: user-owned saved career paths and RLS.

create table public.user_saved_career_paths (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  career_path_id uuid not null references public.career_paths(id) on delete cascade,
  saved_at timestamptz not null default now(),
  unique (user_id, career_path_id)
);

comment on table public.user_saved_career_paths is
  'User-owned saved career paths.';

create index user_saved_career_paths_user_id_idx
  on public.user_saved_career_paths (user_id);

create index user_saved_career_paths_career_path_id_idx
  on public.user_saved_career_paths (career_path_id);

alter table public.user_saved_career_paths enable row level security;

create policy "Users can view their own saved career paths"
on public.user_saved_career_paths
for select
to authenticated
using ((select auth.uid()) = user_id);

create policy "Users can save career paths for themselves"
on public.user_saved_career_paths
for insert
to authenticated
with check ((select auth.uid()) = user_id);

create policy "Users can delete their own saved career paths"
on public.user_saved_career_paths
for delete
to authenticated
using ((select auth.uid()) = user_id);

revoke all on table public.user_saved_career_paths from anon;
revoke all on table public.user_saved_career_paths from authenticated;
grant select, insert, delete on table public.user_saved_career_paths to authenticated;
