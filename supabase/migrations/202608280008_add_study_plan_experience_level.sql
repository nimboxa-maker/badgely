-- Milestone 6: store the experience level selected in the study-plan creator.

alter table public.user_study_plans
add column current_experience_level text not null default 'Beginner'
  check (current_experience_level in ('Beginner', 'Intermediate', 'Advanced'));

comment on column public.user_study_plans.current_experience_level is
  'User-selected experience level used when generating the study plan.';
