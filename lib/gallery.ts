import 'server-only';
import { listPublishedRealisations } from '@/lib/services/realisations';

export interface GalleryItem {
  category: string;
  src: string;
  alt: string;
  caption: string;
}

const filters = ['interieur', 'exterieur', 'polish', 'phares', 'moto'];

function normalizeCategory(value: string) {
  const slug = value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
  return filters.includes(slug) ? slug : 'exterieur';
}

// Published gallery entries from the database; the page keeps its static photos as a fallback when there are none.
export async function loadGalleryItems(): Promise<GalleryItem[]> {
  try {
    const items = await listPublishedRealisations();
    return items
      .filter((item) => item.type === 'galerie')
      .flatMap((item) => {
        const image = item.images.find((entry) => entry.typeImage === 'galerie');
        return image
          ? [{ category: normalizeCategory(item.categorie), src: image.url, alt: item.description || item.titre, caption: item.titre }]
          : [];
      });
  } catch {
    return [];
  }
}
