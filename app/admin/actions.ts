'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { getAdminUser } from '@/lib/auth/server';
import { createRealisation, deleteRealisation, getRealisationById, listRealisations, reorderRealisations, updateRealisation } from '@/lib/services/realisations';
import { deleteImageObjects, isStoredImageUrl } from '@/lib/storage/images';
import type { RealisationImageType, RealisationType } from '@/db/schema';

async function requireAdmin() {
  if (!(await getAdminUser())) throw new Error('Unauthorized');
}

function refreshPublicPages() {
  revalidatePath('/admin');
  revalidatePath('/admin/avant-apres');
  revalidatePath('/avant-apres');
  revalidatePath('/realisations');
}

function listPath(type: RealisationType) {
  return type === 'avant_apres' ? '/admin/avant-apres' : '/admin';
}

function imageFromField(formData: FormData, field: string, typeImage: RealisationImageType) {
  const url = String(formData.get(field) ?? '');
  return isStoredImageUrl(url) ? { url, typeImage } : null;
}

export async function createRealisationAction(formData: FormData) {
  await requireAdmin();

  const titre = String(formData.get('titre') ?? '').trim();
  const categorie = String(formData.get('categorie') ?? '').trim();
  const type: RealisationType = formData.get('type') === 'avant_apres' ? 'avant_apres' : 'galerie';
  if (!titre || !categorie) redirect(`/admin/nouvelle?erreur=champs&type=${type}`);

  const images = (type === 'avant_apres'
    ? [imageFromField(formData, 'avant', 'avant'), imageFromField(formData, 'apres', 'apres')]
    : [imageFromField(formData, 'galerie', 'galerie')]
  ).filter((image) => image !== null);

  await createRealisation({
    titre,
    categorie,
    type,
    description: String(formData.get('description') ?? '').trim() || null,
    publie: formData.get('publie') === 'on',
    images,
  });

  refreshPublicPages();
  redirect(`${listPath(type)}?ok=cree`);
}

export async function updateRealisationAction(formData: FormData) {
  await requireAdmin();

  const id = String(formData.get('id') ?? '');
  const existing = await getRealisationById(id);
  if (!existing) redirect('/admin');

  const titre = String(formData.get('titre') ?? '').trim();
  const categorie = String(formData.get('categorie') ?? '').trim();
  if (!titre || !categorie) redirect(`/admin/${id}/modifier?erreur=champs`);

  const fields: RealisationImageType[] = existing.type === 'avant_apres' ? ['avant', 'apres'] : ['galerie'];
  // A field left empty (no new upload) keeps the current image.
  const images = fields.flatMap((typeImage) => {
    const fresh = imageFromField(formData, typeImage, typeImage);
    const current = existing.images.find((image) => image.typeImage === typeImage);
    const chosen = fresh ?? (current ? { url: current.url, typeImage } : null);
    return chosen ? [chosen] : [];
  });

  await updateRealisation(id, {
    titre,
    categorie,
    description: String(formData.get('description') ?? '').trim() || null,
    images,
  });

  const kept = new Set(images.map((image) => image.url));
  const removed = existing.images.map((image) => image.url).filter((url) => !kept.has(url));
  await deleteImageObjects(removed).catch(() => undefined);

  refreshPublicPages();
  redirect(`${listPath(existing.type)}?ok=modifie`);
}

export async function togglePublishAction(formData: FormData) {
  await requireAdmin();
  await updateRealisation(String(formData.get('id')), { publie: formData.get('publie') !== 'true' });
  refreshPublicPages();
}

export async function deleteRealisationAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get('id'));
  const realisation = await getRealisationById(id);
  if (!realisation) return;

  await deleteRealisation(id);
  await deleteImageObjects(realisation.images.map((image) => image.url)).catch(() => undefined);
  refreshPublicPages();
}

export async function moveRealisationAction(formData: FormData) {
  await requireAdmin();

  const id = String(formData.get('id') ?? '');
  const offset = formData.get('direction') === 'up' ? -1 : 1;
  const all = await listRealisations();
  const current = all.find((item) => item.id === id);
  if (!current) redirect('/admin');

  // Neighbours are looked up among entries of the same type, as each type has its own admin page.
  const ids = all.filter((item) => item.type === current.type).map((item) => item.id);
  const from = ids.indexOf(id);
  const to = from + offset;
  if (to >= 0 && to < ids.length) {
    [ids[from], ids[to]] = [ids[to], ids[from]];
    const queue = [...ids];
    // Keep the other type's slots where they were and refill this type's slots in the new order.
    await reorderRealisations(all.map((item) => (item.type === current.type ? queue.shift()! : item.id)));
    refreshPublicPages();
  }
  redirect(listPath(current.type));
}
