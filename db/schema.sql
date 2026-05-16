create extension if not exists "pgcrypto";

create table if not exists games (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  category text not null,
  description text not null,
  image_url text not null,
  accent text not null default '#67f8c4',
  is_featured boolean not null default true,
  popularity_rank integer not null default 999,
  updated_at timestamptz not null default now()
);

create table if not exists codes (
  id uuid primary key default gen_random_uuid(),
  game_slug text not null references games(slug) on delete cascade,
  code text not null,
  reward text not null,
  status text not null check (status in ('active', 'expired')),
  source_url text,
  first_seen_at timestamptz not null default now(),
  last_checked_at timestamptz not null default now(),
  expires_at timestamptz,
  unique (game_slug, code)
);

create table if not exists update_logs (
  id uuid primary key default gen_random_uuid(),
  source text not null,
  status text not null check (status in ('success', 'failed')),
  message text not null,
  created_at timestamptz not null default now()
);

alter table games enable row level security;
alter table codes enable row level security;
alter table update_logs enable row level security;

create policy "Public games read" on games for select using (true);
create policy "Public codes read" on codes for select using (true);
create policy "Public update logs read" on update_logs for select using (true);

create index if not exists idx_games_rank on games(popularity_rank);
create index if not exists idx_codes_game_status on codes(game_slug, status);
create index if not exists idx_update_logs_created_at on update_logs(created_at desc);
