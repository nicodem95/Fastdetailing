import 'server-only';
import { eq } from 'drizzle-orm';
import { getDatabase } from '@/db';
import {
  realisationImages,
  realisations,
  type RealisationImageType,
  type RealisationType,
} from '@/db/schema';

export interface RealisationImageInput {
  url: string;
  typeImage: RealisationImageType;
  ordre?: number;
}

export interface CreateRealisationInput {
  titre: string;
  description?: string | null;
  categorie: string;
  type: RealisationType;
  publie?: boolean;
  ordre?: number;
  images?: RealisationImageInput[];
}

export interface UpdateRealisationInput {
  titre?: string;
  description?: string | null;
  categorie?: string;
  type?: RealisationType;
  publie?: boolean;
  ordre?: number;
  images?: RealisationImageInput[];
}

export interface RealisationWithImages {
  id: string;
  titre: string;
  description: string | null;
  categorie: string;
  type: RealisationType;
  publie: boolean;
  ordre: number;
  createdAt: Date;
  updatedAt: Date;
  images: {
    id: string;
    url: string;
    typeImage: RealisationImageType;
    ordre: number;
  }[];
}

async function selectRealisationRows(realisationId?: string, publishedOnly = false) {
  const query = getDatabase()
    .select({
      id: realisations.id,
      titre: realisations.titre,
      description: realisations.description,
      categorie: realisations.categorie,
      type: realisations.type,
      publie: realisations.publie,
      ordre: realisations.ordre,
      createdAt: realisations.createdAt,
      updatedAt: realisations.updatedAt,
      imageId: realisationImages.id,
      imageUrl: realisationImages.url,
      imageType: realisationImages.typeImage,
      imageOrder: realisationImages.ordre,
    })
    .from(realisations)
    .leftJoin(realisationImages, eq(realisationImages.realisationId, realisations.id))
    .orderBy(realisations.ordre, realisationImages.ordre);

  if (realisationId) return query.where(eq(realisations.id, realisationId));
  if (publishedOnly) return query.where(eq(realisations.publie, true));
  return query;
}

function groupRealisationRows(rows: Awaited<ReturnType<typeof selectRealisationRows>>) {
  const grouped = new Map<string, RealisationWithImages>();

  for (const row of rows) {
    let realisation = grouped.get(row.id);
    if (!realisation) {
      realisation = {
        id: row.id,
        titre: row.titre,
        description: row.description,
        categorie: row.categorie,
        type: row.type,
        publie: row.publie,
        ordre: row.ordre,
        createdAt: row.createdAt,
        updatedAt: row.updatedAt,
        images: [],
      };
      grouped.set(row.id, realisation);
    }

    if (row.imageId && row.imageUrl && row.imageType) {
      realisation.images.push({
        id: row.imageId,
        url: row.imageUrl,
        typeImage: row.imageType,
        ordre: row.imageOrder ?? 0,
      });
    }
  }

  return [...grouped.values()];
}

export async function listRealisations() {
  return groupRealisationRows(await selectRealisationRows());
}

export async function listPublishedRealisations() {
  return groupRealisationRows(await selectRealisationRows(undefined, true));
}

export async function getRealisationById(id: string) {
  const [realisation] = groupRealisationRows(await selectRealisationRows(id));
  return realisation ?? null;
}

export async function createRealisation(input: CreateRealisationInput) {
  const database = getDatabase();
  const id = await database.transaction(async (transaction) => {
    const [realisation] = await transaction.insert(realisations).values({
      titre: input.titre,
      description: input.description ?? null,
      categorie: input.categorie,
      type: input.type,
      publie: input.publie ?? false,
      ordre: input.ordre ?? 0,
    }).returning({ id: realisations.id });

    if (input.images?.length) {
      await transaction.insert(realisationImages).values(input.images.map((image, index) => ({
        realisationId: realisation.id,
        url: image.url,
        typeImage: image.typeImage,
        ordre: image.ordre ?? index,
      })));
    }

    return realisation.id;
  });

  return getRealisationById(id);
}

export async function updateRealisation(id: string, input: UpdateRealisationInput) {
  const database = getDatabase();
  const updated = await database.transaction(async (transaction) => {
    const { images, ...fields } = input;
    const [realisation] = await transaction.update(realisations)
      .set({ ...fields, updatedAt: new Date() })
      .where(eq(realisations.id, id))
      .returning({ id: realisations.id });

    if (!realisation) return false;

    if (images !== undefined) {
      await transaction.delete(realisationImages).where(eq(realisationImages.realisationId, id));
      if (images.length) {
        await transaction.insert(realisationImages).values(images.map((image, index) => ({
          realisationId: id,
          url: image.url,
          typeImage: image.typeImage,
          ordre: image.ordre ?? index,
        })));
      }
    }

    return true;
  });

  return updated ? getRealisationById(id) : null;
}

export async function deleteRealisation(id: string) {
  const [deleted] = await getDatabase().delete(realisations)
    .where(eq(realisations.id, id))
    .returning({ id: realisations.id });

  return Boolean(deleted);
}
// Rewrites `ordre` as consecutive values following the given id order.
export async function reorderRealisations(ids: string[]) {
  await getDatabase().transaction(async (transaction) => {
    for (const [index, id] of ids.entries()) {
      await transaction.update(realisations).set({ ordre: index }).where(eq(realisations.id, id));
    }
  });
}
