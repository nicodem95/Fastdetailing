import 'server-only';
import { asc } from 'drizzle-orm';
import { getDatabase } from '@/db';
import { reviews, type NewReview } from '@/db/schema';

export async function listReviews() {
  return getDatabase().select().from(reviews).orderBy(asc(reviews.ordre), asc(reviews.createdAt));
}

// The admin form submits the whole list, so it is replaced in one transaction, keeping the submitted order.
export async function replaceReviews(items: Omit<NewReview, 'ordre'>[]) {
  await getDatabase().transaction(async (tx) => {
    await tx.delete(reviews);
    if (items.length) await tx.insert(reviews).values(items.map((item, ordre) => ({ ...item, ordre })));
  });
}
