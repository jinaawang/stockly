-- Stockly · Supabase schema
-- Run in the SQL editor (or `supabase db push`). Mirrors the local data model used by the prototype
-- (localStorage key `restock.v1`): users, households, menus, list items, stock, notifications.

create extension if not exists "pgcrypto";

-- ---------- profiles (1:1 with auth.users) ----------
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null,
  email text not null unique,
  tone text not null default 'lavender' check (tone in ('lavender','sage','apricot','tangerine','dusk')),
  created_at timestamptz not null default now()
);

-- Auto-create a profile on sign-up (name comes from signUp options.data.name)
create or replace function public.handle_new_user() returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, name, email, tone)
  values (new.id, coalesce(new.raw_user_meta_data->>'name', split_part(new.email,'@',1)), new.email,
          (array['lavender','sage','apricot','tangerine','dusk'])[1 + floor(random()*5)::int]);
  return new;
end $$;
create trigger on_auth_user_created after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ---------- households ----------
create table public.households (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  budget_monthly integer not null default 12000,          -- THB, whole baht
  week_starts_on smallint not null default 1,             -- 1 = Monday
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now()
);

create table public.household_members (
  household_id uuid references public.households(id) on delete cascade,
  user_id uuid references public.profiles(id) on delete cascade,
  joined_at timestamptz not null default now(),
  primary key (household_id, user_id)
);
-- A user belongs to one household at a time (prototype behaviour). Drop this index to allow several.
create unique index one_household_per_user on public.household_members(user_id);

-- Invites must be accepted; nobody is added automatically.
create table public.household_invites (
  id uuid primary key default gen_random_uuid(),
  household_id uuid not null references public.households(id) on delete cascade,
  email text not null,
  invited_by uuid references public.profiles(id),
  status text not null default 'pending' check (status in ('pending','accepted','declined')),
  created_at timestamptz not null default now(),
  responded_at timestamptz,
  unique (household_id, email)
);

-- ---------- categories (5 defaults seeded per household + user-defined) ----------
create table public.categories (
  id uuid primary key default gen_random_uuid(),
  household_id uuid not null references public.households(id) on delete cascade,
  key text,                                 -- 'veg','meat','dairy','pantry','house' for defaults, null for custom
  name text not null,
  icon text not null default 'shopping-basket',   -- lucide icon name
  tone text not null default 'dusk',
  sort smallint not null default 100,
  is_default boolean not null default false
);

create or replace function public.seed_household_defaults() returns trigger language plpgsql as $$
begin
  insert into public.categories (household_id, key, name, icon, tone, sort, is_default) values
    (new.id,'veg','Vegetables','carrot','sage',1,true),
    (new.id,'meat','Meats','beef','tangerine',2,true),
    (new.id,'dairy','Dairy & eggs','milk','lavender',3,true),
    (new.id,'pantry','Pantry','wheat','apricot',4,true),
    (new.id,'house','Household','spray-can','dusk',5,true);
  return new;
end $$;
create trigger on_household_created after insert on public.households
  for each row execute procedure public.seed_household_defaults();

-- ---------- menus ----------
create table public.menus (
  id uuid primary key default gen_random_uuid(),
  household_id uuid not null references public.households(id) on delete cascade,
  name text not null,                      -- English or Thai, free text
  name_th text,
  portions smallint not null default 2,    -- what the recipe makes
  photo_path text,                         -- storage object path in bucket `menu-photos`
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index menus_household_search on public.menus using gin (to_tsvector('simple', coalesce(name,'')||' '||coalesce(name_th,'')));

create table public.menu_ingredients (
  id uuid primary key default gen_random_uuid(),
  menu_id uuid not null references public.menus(id) on delete cascade,
  name text not null,
  qty numeric(10,2),                       -- null = "to taste"
  unit text not null default 'pcs',        -- pcs,g,kg,ml,L,pack,bunch,tbsp,cup
  category_id uuid references public.categories(id) on delete set null,
  staple boolean not null default false,   -- true = usually in the pantry, NOT auto-added to the list
  sort smallint not null default 0
);

-- Which menus are planned for a given week (week_start = Monday 00:00 local, stored as date)
create table public.week_plans (
  id uuid primary key default gen_random_uuid(),
  household_id uuid not null references public.households(id) on delete cascade,
  week_start date not null,
  menu_id uuid not null references public.menus(id) on delete cascade,
  portions smallint not null,
  added_by uuid references public.profiles(id),
  unique (household_id, week_start, menu_id)
);

-- ---------- shopping list ----------
create table public.list_items (
  id uuid primary key default gen_random_uuid(),
  household_id uuid not null references public.households(id) on delete cascade,
  week_start date not null,
  name text not null,
  category_id uuid references public.categories(id) on delete set null,
  qty_needed numeric(10,2) not null,
  qty_bought numeric(10,2) not null default 0,     -- partial buys: 3 of 5 → qty_bought = 3
  unit text not null default 'pcs',
  price integer,                                   -- THB total paid for this item, optional, can be added later
  source text not null default 'manual' check (source in ('manual','menu','stock')),
  menu_id uuid references public.menus(id) on delete set null,
  added_by uuid references public.profiles(id),
  bought_by uuid references public.profiles(id),
  bought_at timestamptz,
  rolled_over boolean not null default false,      -- carried from a previous week
  created_at timestamptz not null default now()
);
create index list_items_week on public.list_items(household_id, week_start);

-- Out-of-stock items at home (each one creates a list_item with source = 'stock')
create table public.stock_items (
  id uuid primary key default gen_random_uuid(),
  household_id uuid not null references public.households(id) on delete cascade,
  name text not null,
  category_id uuid references public.categories(id) on delete set null,
  qty numeric(10,2) not null default 1,
  unit text not null default 'pcs',
  added_by uuid references public.profiles(id),
  list_item_id uuid references public.list_items(id) on delete set null,
  created_at timestamptz not null default now()
);

-- ---------- notifications ----------
create table public.notifications (
  id uuid primary key default gen_random_uuid(),
  household_id uuid not null references public.households(id) on delete cascade,
  actor_id uuid references public.profiles(id),    -- null = system (rollover, recap)
  kind text not null check (kind in ('added','bought','recap','invite','menu','system')),
  text text not null,
  created_at timestamptz not null default now()
);
create table public.notification_reads (
  notification_id uuid references public.notifications(id) on delete cascade,
  user_id uuid references public.profiles(id) on delete cascade,
  read_at timestamptz not null default now(),
  primary key (notification_id, user_id)
);

-- Web Push subscriptions (one per device). Preferences mirror the checkboxes in Household → Notifications.
create table public.push_subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  endpoint text not null unique,
  p256dh text not null,
  auth text not null,
  notify_added boolean not null default true,
  notify_bought boolean not null default true,
  notify_recap boolean not null default true,
  created_at timestamptz not null default now()
);

-- ---------- weekly rollover (run Monday 00:05 via pg_cron, or lazily on app open) ----------
create or replace function public.rollover_week(p_household uuid, p_week date) returns integer language plpgsql security definer as $$
declare moved integer;
begin
  with m as (
    update public.list_items set week_start = p_week, rolled_over = true
    where household_id = p_household and week_start < p_week and qty_bought < qty_needed
    returning 1)
  select count(*) into moved from m;
  if moved > 0 then
    insert into public.notifications (household_id, actor_id, kind, text)
    values (p_household, null, 'system', moved || ' things rolled over from last week.');
  end if;
  return moved;
end $$;

-- ---------- row level security ----------
create or replace function public.is_member(h uuid) returns boolean language sql stable security definer as $$
  select exists (select 1 from public.household_members where household_id = h and user_id = auth.uid());
$$;

alter table public.profiles enable row level security;
alter table public.households enable row level security;
alter table public.household_members enable row level security;
alter table public.household_invites enable row level security;
alter table public.categories enable row level security;
alter table public.menus enable row level security;
alter table public.menu_ingredients enable row level security;
alter table public.week_plans enable row level security;
alter table public.list_items enable row level security;
alter table public.stock_items enable row level security;
alter table public.notifications enable row level security;
alter table public.notification_reads enable row level security;
alter table public.push_subscriptions enable row level security;

create policy "profiles: read housemates, edit self" on public.profiles for select using (
  id = auth.uid() or exists (select 1 from public.household_members a join public.household_members b on a.household_id = b.household_id where a.user_id = auth.uid() and b.user_id = profiles.id));
create policy "profiles: update self" on public.profiles for update using (id = auth.uid());

create policy "households: members read" on public.households for select using (public.is_member(id));
create policy "households: anyone creates" on public.households for insert with check (auth.uid() = created_by);
create policy "households: members update" on public.households for update using (public.is_member(id));

create policy "members: read own household" on public.household_members for select using (public.is_member(household_id));
create policy "members: join self (creator or accepted invite)" on public.household_members for insert with check (
  user_id = auth.uid() and (
    exists (select 1 from public.households h where h.id = household_id and h.created_by = auth.uid())
    or exists (select 1 from public.household_invites i join public.profiles p on p.email = i.email
               where i.household_id = household_members.household_id and p.id = auth.uid() and i.status = 'accepted')));
create policy "members: leave self" on public.household_members for delete using (user_id = auth.uid());

create policy "invites: members manage" on public.household_invites for all using (public.is_member(household_id)) with check (public.is_member(household_id));
create policy "invites: invitee sees own" on public.household_invites for select using (email = (select email from public.profiles where id = auth.uid()));
create policy "invites: invitee responds" on public.household_invites for update using (email = (select email from public.profiles where id = auth.uid()));

create policy "categories" on public.categories for all using (public.is_member(household_id)) with check (public.is_member(household_id));
create policy "menus" on public.menus for all using (public.is_member(household_id)) with check (public.is_member(household_id));
create policy "menu_ingredients" on public.menu_ingredients for all using (exists (select 1 from public.menus m where m.id = menu_id and public.is_member(m.household_id)));
create policy "week_plans" on public.week_plans for all using (public.is_member(household_id)) with check (public.is_member(household_id));
create policy "list_items" on public.list_items for all using (public.is_member(household_id)) with check (public.is_member(household_id));
create policy "stock_items" on public.stock_items for all using (public.is_member(household_id)) with check (public.is_member(household_id));
create policy "notifications: members read" on public.notifications for select using (public.is_member(household_id));
create policy "notifications: members insert" on public.notifications for insert with check (public.is_member(household_id));
create policy "notification_reads" on public.notification_reads for all using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "push_subscriptions" on public.push_subscriptions for all using (user_id = auth.uid()) with check (user_id = auth.uid());

-- ---------- storage ----------
-- Create a bucket `menu-photos` (public read is fine; photos are resized client-side to ≤640px JPEG).
-- insert into storage.buckets (id, name, public) values ('menu-photos','menu-photos', true);

-- ---------- realtime ----------
-- Dashboard → Database → Replication: enable list_items, stock_items, week_plans, notifications, household_invites
-- so housemates' phones update live.
