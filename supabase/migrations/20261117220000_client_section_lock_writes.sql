drop policy if exists "Public can update section lock settings" on public.site_settings;
create policy "Public can update section lock settings"
  on public.site_settings
  for update
  to anon, authenticated
  using (id = 'global')
  with check (id = 'global');

grant update on public.site_settings to anon, authenticated;
