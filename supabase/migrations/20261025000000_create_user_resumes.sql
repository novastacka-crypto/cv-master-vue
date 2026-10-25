create table if not exists public.user_resumes (
  user_id uuid primary key references auth.users (id) on delete cascade,
  resume_data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.user_resumes enable row level security;

revoke all on public.user_resumes from anon;
grant select, insert, update on public.user_resumes to authenticated;

create policy "Users can read their own resume"
  on public.user_resumes
  for select
  to authenticated
  using ((select auth.uid()) = user_id);

create policy "Users can insert their own resume"
  on public.user_resumes
  for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

create policy "Users can update their own resume"
  on public.user_resumes
  for update
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);
