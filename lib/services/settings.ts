import 'server-only';
import { eq } from 'drizzle-orm';
import { getDatabase } from '@/db';
import { siteSettings } from '@/db/schema';

export async function getSetting<T>(key: string): Promise<T | null> {
  try {
    const [row] = await getDatabase().select({ valeur: siteSettings.valeur }).from(siteSettings).where(eq(siteSettings.cle, key));
    return (row?.valeur as T | undefined) ?? null;
  } catch {
    return null;
  }
}

export async function setSetting(key: string, valeur: unknown) {
  await getDatabase()
    .insert(siteSettings)
    .values({ cle: key, valeur, updatedAt: new Date() })
    .onConflictDoUpdate({ target: siteSettings.cle, set: { valeur, updatedAt: new Date() } });
}
