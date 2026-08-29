-- Milestone 6: user-owned study plans, study tasks, progress automation, and RLS.

create table public.user_study_plans (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  certification_id uuid not null references public.certifications(id) on delete cascade,
  target_exam_date date,
  weekly_study_hours integer not null check (weekly_study_hours > 0),
  study_weeks integer not null check (study_weeks > 0),
  include_labs boolean not null default false,
  generated_plan_text text,
  progress_percent integer not null default 0 check (progress_percent between 0 and 100),
  status text not null default 'Active'
    check (status in ('Active', 'Completed', 'Paused')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.user_study_plans is
  'User-owned certification study plans.';

create index user_study_plans_user_id_idx
  on public.user_study_plans (user_id);

create index user_study_plans_certification_id_idx
  on public.user_study_plans (certification_id);

create table public.study_tasks (
  id uuid primary key default gen_random_uuid(),
  user_study_plan_id uuid not null references public.user_study_plans(id) on delete cascade,
  title text not null,
  description text,
  week_number integer not null check (week_number > 0),
  estimated_hours numeric(5,2),
  task_type text not null
    check (task_type in ('Read', 'Lab', 'Video', 'Practice Questions', 'Review', 'Exam Booking')),
  completed boolean not null default false,
  completed_at timestamptz,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.study_tasks is
  'Editable weekly tasks belonging to user study plans.';

create index study_tasks_user_study_plan_id_idx
  on public.study_tasks (user_study_plan_id);

create index study_tasks_plan_week_order_idx
  on public.study_tasks (user_study_plan_id, week_number, display_order);

create trigger user_study_plans_set_updated_at
before update on public.user_study_plans
for each row
execute function public.set_updated_at();

create trigger study_tasks_set_updated_at
before update on public.study_tasks
for each row
execute function public.set_updated_at();

create or replace function public.refresh_study_plan_progress()
returns trigger
language plpgsql
set search_path = public
as $$
declare
  target_plan_id uuid;
  task_count integer;
  completed_count integer;
begin
  target_plan_id := coalesce(new.user_study_plan_id, old.user_study_plan_id);

  select count(*), count(*) filter (where completed)
  into task_count, completed_count
  from public.study_tasks
  where user_study_plan_id = target_plan_id;

  update public.user_study_plans
  set progress_percent = case
    when task_count = 0 then 0
    else round((completed_count::numeric / task_count::numeric) * 100)::integer
  end
  where id = target_plan_id;

  return coalesce(new, old);
end;
$$;

create trigger study_tasks_refresh_plan_progress
after insert or update of completed or delete on public.study_tasks
for each row
execute function public.refresh_study_plan_progress();

alter table public.user_study_plans enable row level security;
alter table public.study_tasks enable row level security;

create policy "Users can view their own study plans"
on public.user_study_plans
for select
to authenticated
using ((select auth.uid()) = user_id);

create policy "Users can create their own study plans"
on public.user_study_plans
for insert
to authenticated
with check ((select auth.uid()) = user_id);

create policy "Users can update their own study plans"
on public.user_study_plans
for update
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

create policy "Users can delete their own study plans"
on public.user_study_plans
for delete
to authenticated
using ((select auth.uid()) = user_id);

create policy "Users can view tasks from their own study plans"
on public.study_tasks
for select
to authenticated
using (
  exists (
    select 1
    from public.user_study_plans plans
    where plans.id = study_tasks.user_study_plan_id
      and plans.user_id = (select auth.uid())
  )
);

create policy "Users can create tasks for their own study plans"
on public.study_tasks
for insert
to authenticated
with check (
  exists (
    select 1
    from public.user_study_plans plans
    where plans.id = study_tasks.user_study_plan_id
      and plans.user_id = (select auth.uid())
  )
);

create policy "Users can update tasks from their own study plans"
on public.study_tasks
for update
to authenticated
using (
  exists (
    select 1
    from public.user_study_plans plans
    where plans.id = study_tasks.user_study_plan_id
      and plans.user_id = (select auth.uid())
  )
)
with check (
  exists (
    select 1
    from public.user_study_plans plans
    where plans.id = study_tasks.user_study_plan_id
      and plans.user_id = (select auth.uid())
  )
);

create policy "Users can delete tasks from their own study plans"
on public.study_tasks
for delete
to authenticated
using (
  exists (
    select 1
    from public.user_study_plans plans
    where plans.id = study_tasks.user_study_plan_id
      and plans.user_id = (select auth.uid())
  )
);

revoke all on table public.user_study_plans from anon;
revoke all on table public.user_study_plans from authenticated;
grant select, insert, update, delete on table public.user_study_plans to authenticated;

revoke all on table public.study_tasks from anon;
revoke all on table public.study_tasks from authenticated;
grant select, insert, update, delete on table public.study_tasks to authenticated;
