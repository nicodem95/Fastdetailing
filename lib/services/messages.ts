import 'server-only';
import { count, desc, eq } from 'drizzle-orm';
import { getDatabase } from '@/db';
import { contactMessages } from '@/db/schema';

export type ContactMessage = typeof contactMessages.$inferSelect;
export type NewContactMessage = typeof contactMessages.$inferInsert;

export async function createContactMessage(input: NewContactMessage) {
  await getDatabase().insert(contactMessages).values(input);
}

export async function listContactMessages() {
  return getDatabase().select().from(contactMessages).orderBy(desc(contactMessages.createdAt)).limit(200);
}

export async function countUnreadMessages() {
  try {
    const [row] = await getDatabase().select({ total: count() }).from(contactMessages).where(eq(contactMessages.lu, false));
    return row?.total ?? 0;
  } catch {
    return 0;
  }
}

export async function setMessageRead(id: string, lu: boolean) {
  await getDatabase().update(contactMessages).set({ lu }).where(eq(contactMessages.id, id));
}

export async function deleteContactMessage(id: string) {
  await getDatabase().delete(contactMessages).where(eq(contactMessages.id, id));
}
