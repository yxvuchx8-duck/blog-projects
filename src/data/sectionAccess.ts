import { getSupabase } from '@/data/supabase';

export type Section = 'projects' | 'blog';

export type SectionLocks = {
  isProjectsLocked: boolean;
  isBlogLocked: boolean;
};

const VISITOR_UNLOCK_PASSWORD = '15081769';
const ADMIN_ACCESS_CODE = '1769';

export async function loadSectionLocks(): Promise<SectionLocks> {
  const { data: settings, error } = await getSupabase()
    .from('site_settings')
    .select('isProjectsLocked,isBlogLocked')
    .eq('id', 'global')
    .single();
  if (error) throw new Error(error.message);
  if (!settings || typeof settings.isProjectsLocked !== 'boolean' || typeof settings.isBlogLocked !== 'boolean') {
    throw new Error('Supabase returned invalid section settings.');
  }
  return settings;
}

export async function updateSectionLock(section: Section, locked: boolean): Promise<SectionLocks> {
  const patch = section === 'projects' ? { isProjectsLocked: locked } : { isBlogLocked: locked };
  const { data: settings, error } = await getSupabase()
    .from('site_settings')
    .update(patch)
    .eq('id', 'global')
    .select('isProjectsLocked,isBlogLocked')
    .single();
  if (error) throw new Error(error.message);
  if (!settings || typeof settings.isProjectsLocked !== 'boolean' || typeof settings.isBlogLocked !== 'boolean') {
    throw new Error('Supabase returned invalid section settings.');
  }
  return settings;
}

export async function verifySectionPassword(_section: Section, password: string): Promise<boolean> {
  return password === VISITOR_UNLOCK_PASSWORD;
}

export async function verifyAdminPassword(password: string): Promise<boolean> {
  return password === ADMIN_ACCESS_CODE;
}
