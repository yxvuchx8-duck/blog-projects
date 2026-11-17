create table if not exists public.site_settings (
  id text primary key default 'global' check (id = 'global'),
  "isProjectsLocked" boolean not null default false,
  "isBlogLocked" boolean not null default false
);

insert into public.site_settings (id)
values ('global')
on conflict (id) do nothing;

alter table public.site_settings enable row level security;

drop policy if exists "Public can read section lock settings" on public.site_settings;
create policy "Public can read section lock settings"
  on public.site_settings
  for select
  to anon, authenticated
  using (id = 'global');

revoke all on public.site_settings from anon, authenticated;
grant select on public.site_settings to anon, authenticated;
grant all on public.site_settings to service_role;
