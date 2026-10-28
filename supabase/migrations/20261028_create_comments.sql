-- Public comments are readable and insertable through the anonymous API.
-- Moderation remains available to the project owner through Supabase Dashboard;
-- anonymous API clients cannot update or delete comments.
create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  page text not null,
  block_id text not null,
  quote text not null check (char_length(btrim(quote)) between 1 and 200),
  author_name text not null check (char_length(btrim(author_name)) between 1 and 60),
  body text not null check (char_length(btrim(body)) between 1 and 2000),
  parent_id uuid references public.comments(id) on delete cascade,
  resolved boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists comments_page_block_created_at_idx
  on public.comments (page, block_id, created_at);

create index if not exists comments_parent_id_idx
  on public.comments (parent_id);

alter table public.comments enable row level security;

revoke all on table public.comments from anon, authenticated;
grant usage on schema public to anon;
grant select on table public.comments to anon;
grant insert (page, block_id, quote, author_name, body, parent_id)
  on table public.comments to anon;

drop policy if exists comments_public_read on public.comments;
create policy comments_public_read
  on public.comments for select to anon
  using (true);

drop policy if exists comments_public_insert on public.comments;
create policy comments_public_insert
  on public.comments for insert to anon
  with check (true);
