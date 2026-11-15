'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { getAdminUser } from '@/lib/auth/server';
import { defaultLegal, defaultSeo, legalFields, seoPages, type SeoEntry } from '@/lib/extra-content';
import type { NewReview } from '@/db/schema';
import { createReview, deleteReview, updateReview } from '@/lib/services/reviews';
import { deleteContactMessage, setMessageRead } from '@/lib/services/messages';
import { setSetting } from '@/lib/services/settings';

async function requireAdmin() {
  if (!(await getAdminUser())) throw new Error('Unauthorized');
}

function refreshSite() {
  revalidatePath('/', 'layout');
}

function text(value: FormDataEntryValue | null, max: number) {
  return String(value ?? '').replace(/\s+/g, ' ').trim().slice(0, max);
}

function reviewFields(formData: FormData): Pick<NewReview, 'nom' | 'ville' | 'note' | 'texte'> | null {
  const nom = text(formData.get('name'), 60);
  const texte = text(formData.get('text'), 1200);
  if (!nom || !texte) return null;

  return {
    nom,
    texte,
    note: Math.min(5, Math.max(1, Number(formData.get('rating')) || 5)),
    ville: text(formData.get('location'), 60) || 'Gisors',
  };
}

const reviewIdPattern = /^[\da-f]{8}-([\da-f]{4}-){3}[\da-f]{12}$/i;

export async function saveLegalAction(formData: FormData) {
  await requireAdmin();

  const legal: Record<string, string> = {};
  for (const field of legalFields) {
    const value = text(formData.get(field.key), 120);
    if (!value) redirect('/admin/mentions-legales?erreur=1');
    legal[field.key] = value;
  }
  await setSetting('legal', { ...defaultLegal, ...legal });
  refreshSite();
  redirect('/admin/mentions-legales?ok=1');
}

export async function saveSeoAction(formData: FormData) {
  await requireAdmin();

  const seo: Record<string, SeoEntry> = {};
  for (const { slug } of seoPages) {
    const base = defaultSeo(slug);
    const title = text(formData.get(`title-${slug}`), 90);
    const description = text(formData.get(`description-${slug}`), 200);
    if (!title || !description) redirect('/admin/google?erreur=1');
    if (title !== base.title || description !== base.description) seo[slug] = { title, description };
  }
  await setSetting('seo', seo);
  refreshSite();
  redirect('/admin/google?ok=1');
}

export async function saveBannerAction(formData: FormData) {
  await requireAdmin();

  const texte = text(formData.get('texte'), 200);
  const actif = formData.get('actif') === 'on';
  if (actif && !texte) redirect('/admin/annonce?erreur=1');
  await setSetting('banner', { actif, texte });
  refreshSite();
  redirect('/admin/annonce?ok=1');
}

export async function saveReviewAction(formData: FormData) {
  await requireAdmin();

  const id = text(formData.get('id'), 36);
  const fields = reviewFields(formData);
  if (id && !reviewIdPattern.test(id)) redirect('/admin/avis?erreur=id');
  if (!fields) redirect('/admin/avis?erreur=champs');

  if (id) {
    if (!(await updateReview(id, fields))) redirect('/admin/avis?erreur=introuvable');
  } else {
    await createReview(fields);
  }

  refreshSite();
  redirect(`/admin/avis?ok=${id ? 'updated' : 'created'}`);
}

export async function deleteReviewAction(formData: FormData) {
  await requireAdmin();

  const id = text(formData.get('id'), 36);
  if (!reviewIdPattern.test(id)) redirect('/admin/avis?erreur=id');
  if (!(await deleteReview(id))) redirect('/admin/avis?erreur=introuvable');

  refreshSite();
  redirect('/admin/avis?ok=deleted');
}

export async function toggleMessageReadAction(formData: FormData) {
  await requireAdmin();
  await setMessageRead(String(formData.get('id') ?? ''), formData.get('lu') !== 'true');
  revalidatePath('/admin', 'layout');
  redirect('/admin/messages');
}

export async function deleteMessageAction(formData: FormData) {
  await requireAdmin();
  await deleteContactMessage(String(formData.get('id') ?? ''));
  revalidatePath('/admin', 'layout');
  redirect('/admin/messages');
}
