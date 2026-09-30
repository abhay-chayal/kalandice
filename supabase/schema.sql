-- ============================================================================
-- Encouraging Poetics — Supabase schema
--
-- Run this once in Supabase → SQL Editor → New query → Run.
-- It is safe to re-run: every statement is idempotent.
--
-- Security model
--   * Visitors (anon role) can only READ rows where published = true.
--   * Only users listed in public.admin_users can create/edit/delete content,
--     read form submissions, and upload images.
--   * Form submissions (contact, prayer, speaking, newsletter) are inserted by
--     the Next.js server using the service_role key, so there are deliberately
--     NO insert policies for anon on those tables.
-- ============================================================================

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Admins
-- ---------------------------------------------------------------------------
create table if not exists public.admin_users (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.admin_users enable row level security;

-- security definer so policies can call it without granting read on admin_users
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.admin_users where user_id = auth.uid());
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to anon, authenticated;

drop policy if exists "admins read own row" on public.admin_users;
create policy "admins read own row" on public.admin_users
  for select to authenticated using (user_id = auth.uid());

-- ---------------------------------------------------------------------------
-- updated_at helper
-- ---------------------------------------------------------------------------
create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- Blog posts
-- ---------------------------------------------------------------------------
create table if not exists public.posts (
  id           uuid primary key default gen_random_uuid(),
  slug         text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  title        text not null,
  category     text not null default 'Encouragement',
  excerpt      text not null default '',
  scripture    text not null default '',
  content      text not null default '',
  cover_image  text,
  published    boolean not null default false,
  published_at timestamptz,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create index if not exists posts_published_idx on public.posts (published, published_at desc);

drop trigger if exists posts_touch on public.posts;
create trigger posts_touch before update on public.posts
  for each row execute function public.touch_updated_at();

-- ---------------------------------------------------------------------------
-- Events
-- ---------------------------------------------------------------------------
create table if not exists public.events (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  category    text not null default 'Gathering',
  location    text not null default '',
  date_label  text not null default '',   -- free text shown to visitors, e.g. "Autumn 2026"
  time_label  text not null default '',   -- e.g. "6:30 PM – 8:30 PM CST"
  event_date  date,                       -- optional; used for ordering and hiding past events
  description text not null default '',
  link_url    text,                       -- optional RSVP / ticket / details link
  image_url   text,
  sort_order  integer not null default 0,
  published   boolean not null default false,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

drop trigger if exists events_touch on public.events;
create trigger events_touch before update on public.events
  for each row execute function public.touch_updated_at();

-- ---------------------------------------------------------------------------
-- Books
-- ---------------------------------------------------------------------------
create table if not exists public.books (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  subtitle    text not null default '',
  description text not null default '',
  scripture   text not null default '',
  cover_image text,
  buy_url     text,
  buy_label   text not null default 'Buy on Amazon',
  themes      text[] not null default '{}',
  status      text not null default 'available' check (status in ('available', 'coming_soon')),
  featured    boolean not null default false,   -- the featured book is shown on the home page and /book
  sort_order  integer not null default 0,
  published   boolean not null default false,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

drop trigger if exists books_touch on public.books;
create trigger books_touch before update on public.books
  for each row execute function public.touch_updated_at();

-- ---------------------------------------------------------------------------
-- Resources (Spotify playlists, mental health, faith)
-- ---------------------------------------------------------------------------
create table if not exists public.resources (
  id          uuid primary key default gen_random_uuid(),
  kind        text not null check (kind in ('playlist', 'mental_health', 'faith')),
  title       text not null,
  description text not null default '',
  url         text not null,
  tag         text not null default '',
  sort_order  integer not null default 0,
  published   boolean not null default false,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

drop trigger if exists resources_touch on public.resources;
create trigger resources_touch before update on public.resources
  for each row execute function public.touch_updated_at();

-- ---------------------------------------------------------------------------
-- Testimonials (real reader quotes, added by Kalandice in the dashboard)
-- ---------------------------------------------------------------------------
create table if not exists public.testimonials (
  id         uuid primary key default gen_random_uuid(),
  quote      text not null,
  author     text not null default '',
  location   text not null default '',
  rating     integer not null default 5 check (rating between 0 and 5),
  sort_order integer not null default 0,
  published  boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists testimonials_touch on public.testimonials;
create trigger testimonials_touch before update on public.testimonials
  for each row execute function public.touch_updated_at();

-- ---------------------------------------------------------------------------
-- Form submissions
-- ---------------------------------------------------------------------------
create table if not exists public.messages (
  id           uuid primary key default gen_random_uuid(),
  kind         text not null check (kind in ('general', 'prayer', 'speaking')),
  name         text not null default '',
  email        text not null,
  organization text not null default '',
  location     text not null default '',
  event_date   text not null default '',
  message      text not null,
  is_read      boolean not null default false,
  created_at   timestamptz not null default now()
);

create index if not exists messages_created_idx on public.messages (created_at desc);

create table if not exists public.subscribers (
  id         uuid primary key default gen_random_uuid(),
  email      text not null unique,
  source     text not null default 'website',
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------
alter table public.posts       enable row level security;
alter table public.events      enable row level security;
alter table public.books       enable row level security;
alter table public.resources   enable row level security;
alter table public.testimonials enable row level security;
alter table public.messages    enable row level security;
alter table public.subscribers enable row level security;

-- Content tables: public reads published rows, admins do everything.
do $$
declare t text;
begin
  foreach t in array array['posts', 'events', 'books', 'resources', 'testimonials'] loop
    execute format('drop policy if exists "public read published" on public.%I', t);
    execute format(
      'create policy "public read published" on public.%I for select to anon, authenticated using (published = true)', t);

    execute format('drop policy if exists "admin full access" on public.%I', t);
    execute format(
      'create policy "admin full access" on public.%I for all to authenticated using (public.is_admin()) with check (public.is_admin())', t);
  end loop;
end $$;

-- Submissions: admins only (inserts come from the server with service_role, which bypasses RLS).
do $$
declare t text;
begin
  foreach t in array array['messages', 'subscribers'] loop
    execute format('drop policy if exists "admin full access" on public.%I', t);
    execute format(
      'create policy "admin full access" on public.%I for all to authenticated using (public.is_admin()) with check (public.is_admin())', t);
  end loop;
end $$;

-- ---------------------------------------------------------------------------
-- Storage: public "media" bucket for images, admin-only writes
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('media', 'media', true, 10485760, array['image/jpeg', 'image/png', 'image/webp', 'image/gif'])
on conflict (id) do update
  set public = excluded.public,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "media admin insert" on storage.objects;
create policy "media admin insert" on storage.objects
  for insert to authenticated with check (bucket_id = 'media' and public.is_admin());

drop policy if exists "media admin update" on storage.objects;
create policy "media admin update" on storage.objects
  for update to authenticated using (bucket_id = 'media' and public.is_admin());

drop policy if exists "media admin delete" on storage.objects;
create policy "media admin delete" on storage.objects
  for delete to authenticated using (bucket_id = 'media' and public.is_admin());

drop policy if exists "media admin list" on storage.objects;
create policy "media admin list" on storage.objects
  for select to authenticated using (bucket_id = 'media' and public.is_admin());
