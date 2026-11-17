# This is the repository for my personal blog and project website:
https://amar2008.vercel.app/
This repository is connected and deployed through vercel

## Public section locks

The Projects and Blog visibility switches use the `site_settings` row in Supabase. Apply both SQL files in `supabase/migrations/` in order before deploying.

No additional Vercel environment variables are needed. The feature uses the existing `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` client configuration. The visitor unlock code (`15081769`) and Editing Suite code (`1769`) are checked in the client.

The second migration grants the existing anonymous Supabase client permission to update these two flags. This keeps the switches simple, but the password and flags are not security controls against someone inspecting or calling the public client directly.
