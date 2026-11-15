import 'server-only';
import { asc, desc, eq } from 'drizzle-orm';
import { getDatabase } from '@/db';
import { reviews, type NewReview } from '@/db/schema';

type ReviewFields = Pick<NewReview, 'nom' | 'ville' | 'note' | 'texte'>;

export async function listReviews() {
  return getDatabase().select().from(reviews).orderBy(asc(reviews.ordre), asc(reviews.createdAt));
}

export async function createReview(item: ReviewFields) {
  const db = getDatabase();
  const [lastReview] = await db
    .select({ ordre: reviews.ordre })
    .from(reviews)
    .orderBy(desc(reviews.ordre))
    .limit(1);

  await db.insert(reviews).values({ ...item, ordre: (lastReview?.ordre ?? -1) + 1 });
}

export async function updateReview(id: string, item: ReviewFields) {
  const [updated] = await getDatabase()
    .update(reviews)
    .set(item)
    .where(eq(reviews.id, id))
    .returning({ id: reviews.id });

  return Boolean(updated);
}

export async function deleteReview(id: string) {
  const [deleted] = await getDatabase()
    .delete(reviews)
    .where(eq(reviews.id, id))
    .returning({ id: reviews.id });

  return Boolean(deleted);
}
