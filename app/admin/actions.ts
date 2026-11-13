'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { getAdminUser } from '@/lib/auth/server';
import { createRealisation, deleteRealisation, updateRealisation } from '@/lib/services/realisations';
import { createImageObjectKey, uploadImageObject } from '@/lib/storage/images';
import type { RealisationImageType, RealisationType } from '@/db/schema';

const MAX_IMAGE_BYTES = 8 * 1024 * 1024;

async function requireAdmin() {
  if (!(await getAdminUser())) throw new Error('Unauthorized');
}

function refreshPublicPages() {
  revalidatePath('/admin');
  revalidatePath('/avant-apres');
  revalidatePath('/realisations');
}

async function uploadFile(file: FormDataEntryValue | null, typeImage: RealisationImageType) {
  if (!(file instanceof File) || file.size === 0) return null;
  if (file.size > MAX_IMAGE_BYTES) throw new Error('Image trop lourde (8 Mo maximum).');

  const key = createImageObjectKey(file.type);
  const { url } = await uploadImageObject({
    key,
    body: new Uint8Array(await file.arrayBuffer()),
    contentType: file.type,
  });
  return { url, typeImage };
}

export async function createRealisationAction(formData: FormData) {
  await requireAdmin();

  const titre = String(formData.get('titre') ?? '').trim();
  const categorie = String(formData.get('categorie') ?? '').trim();
  const type = formData.get('type') === 'avant_apres' ? 'avant_apres' : 'galerie';
  if (!titre || !categorie) redirect('/admin?erreur=champs');

  let images: { url: string; typeImage: RealisationImageType }[] = [];
  try {
    const uploads = type === 'avant_apres'
      ? [await uploadFile(formData.get('avant'), 'avant'), await uploadFile(formData.get('apres'), 'apres')]
      : [await uploadFile(formData.get('galerie'), 'galerie')];
    images = uploads.filter((image) => image !== null);
  } catch {
    redirect('/admin?erreur=image');
  }

  await createRealisation({
    titre,
    categorie,
    type: type as RealisationType,
    description: String(formData.get('description') ?? '').trim() || null,
    publie: formData.get('publie') === 'on',
    images,
  });

  refreshPublicPages();
  redirect('/admin');
}

export async function togglePublishAction(formData: FormData) {
  await requireAdmin();
  await updateRealisation(String(formData.get('id')), { publie: formData.get('publie') !== 'true' });
  refreshPublicPages();
}

export async function deleteRealisationAction(formData: FormData) {
  await requireAdmin();
  await deleteRealisation(String(formData.get('id')));
  refreshPublicPages();
}
