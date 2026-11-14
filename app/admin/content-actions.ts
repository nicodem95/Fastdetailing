'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { getAdminUser } from '@/lib/auth/server';
import { defaultLegal, defaultSeo, legalFields, seoPages, type SeoEntry } from '@/lib/extra-content';
import type { NewReview } from '@/db/schema';
import { replaceReviews } from '@/lib/services/reviews';
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

export async function saveReviewsAction(formData: FormData) {
  await requireAdmin();

  const count = Math.min(Number(formData.get('count')) || 0, 60);
  const items: Omit<NewReview, 'ordre'>[] = [];
  for (let index = 0; index < count; index += 1) {
    if (formData.get(`delete-${index}`) === 'on') continue;
    const nom = text(formData.get(`name-${index}`), 60);
    const texte = text(formData.get(`text-${index}`), 1200);
    if (!nom || !texte) continue;
    items.push({
      nom,
      texte,
      note: Math.min(5, Math.max(1, Number(formData.get(`rating-${index}`)) || 5)),
      ville: text(formData.get(`location-${index}`), 60) || 'Gisors',
    });
  }
  await replaceReviews(items);
  refreshSite();
  redirect('/admin/avis?ok=1');
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
