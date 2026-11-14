import 'server-only';
import { listPublishedRealisations } from '@/lib/services/realisations';

// Published before/after entries from the database; the static cards remain a fallback when there are none.
export async function loadBeforeAfterCards() {
  try {
    const items = await listPublishedRealisations();
    return items
      .filter((item) => item.type === 'avant_apres')
      .flatMap((item) => {
        const before = item.images.find((image) => image.typeImage === 'avant');
        const after = item.images.find((image) => image.typeImage === 'apres');
        return before && after ? [{ item, before, after }] : [];
      });
  } catch {
    return [];
  }
}
