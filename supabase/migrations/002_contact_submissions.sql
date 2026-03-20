-- =============================================
-- Contact Form Submissions
-- =============================================

create table if not exists public.contact_submissions (
  id          uuid primary key default gen_random_uuid(),
  first_name  text not null,
  last_name   text not null,
  email       text not null,
  subject     text not null,
  message     text not null,
  read        boolean default false,
  created_at  timestamptz default now()
);

-- Allow inserts from anon (public contact form)
alter table public.contact_submissions enable row level security;

create policy "Anyone can submit contact form"
  on public.contact_submissions for insert
  with check (true);

-- Only service_role can read submissions (admin only)
create policy "Service role can read submissions"
  on public.contact_submissions for select
  using (auth.role() = 'service_role');
