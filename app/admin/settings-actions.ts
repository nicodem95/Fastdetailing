'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { getAdminUser } from '@/lib/auth/server';
import { ASSURANCE_SETTING_KEY, assuranceFields } from '@/lib/assurance-content';
import { setSetting } from '@/lib/services/settings';
import { SETTINGS_KEYS, defaultOptions, defaultPrices, textFields, type OptionRow, type PriceRow, type SiteInfo } from '@/lib/site-content';

async function requireAdmin() {
  if (!(await getAdminUser())) throw new Error('Unauthorized');
}

function refreshSite() {
  revalidatePath('/', 'layout');
}

// Removes characters that could break the HTML or JSON-LD the value is injected into.
function plain(value: FormDataEntryValue | null, max = 120) {
  return String(value ?? '').replace(/[<>"\\&]/g, '').replace(/\s+/g, ' ').trim().slice(0, max);
}

export async function saveSiteInfoAction(formData: FormData) {
  await requireAdmin();

  const telephone = plain(formData.get('telephone'), 20);
  const email = plain(formData.get('email'), 120);
  const instagram = String(formData.get('instagram') ?? '').trim();
  const adresse = plain(formData.get('adresse'), 160);
  const delaiReponse = plain(formData.get('delaiReponse'), 30);
  const timePattern = /^([01]\d|2[0-3]):[0-5]\d$/;
  const horaires = Array.from({ length: 7 }, (_, index) => ({
    ouvert: formData.get(`ouvert-${index}`) === 'on',
    de: String(formData.get(`de-${index}`) ?? ''),
    a: String(formData.get(`a-${index}`) ?? ''),
  }));
  const zones = String(formData.get('zones') ?? '')
    .split(/[\n,]/)
    .map((zone) => plain(zone, 60))
    .filter(Boolean)
    .slice(0, 12);

  const valid =
    /^0\d( ?\d\d){4}$/.test(telephone) &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
    /^https:\/\/(www\.)?instagram\.com\/[\w./-]+$/.test(instagram) &&
    horaires.every((day) => timePattern.test(day.de) && timePattern.test(day.a) && (!day.ouvert || day.de < day.a)) &&
    horaires.some((day) => day.ouvert) && zones.length > 0 && adresse.length > 5 && delaiReponse.length > 0;
  if (!valid) redirect('/admin/infos?erreur=1');

  const info: SiteInfo = { telephone: telephone.replace(/^(\d\d)\s?(\d\d)\s?(\d\d)\s?(\d\d)\s?(\d\d)$/, '$1 $2 $3 $4 $5'), email, instagram, adresse, delaiReponse, horaires, zones };
  await setSetting(SETTINGS_KEYS.info, info);
  refreshSite();
  redirect('/admin/infos?ok=1');
}

export async function savePricesAction(formData: FormData) {
  await requireAdmin();

  const prices: PriceRow[] = [];
  for (let index = 0; index < defaultPrices.length; index += 1) {
    const read = (field: string) => Number(formData.get(`${field}-${index}`));
    const row = {
      vehicule: defaultPrices[index].vehicule,
      interieur: read('interieur'),
      exterieur: read('exterieur'),
      complet: read('complet'),
    };
    const numbers = [row.interieur, row.exterieur, row.complet];
    if (numbers.some((value) => !Number.isInteger(value) || value < 0 || value > 9999)) redirect('/admin/tarifs?erreur=1');
    prices.push(row);
  }

  await setSetting(SETTINGS_KEYS.prices, prices);

  const options: OptionRow[] = defaultOptions.map((_, index) => ({
    titre: plain(formData.get(`option-titre-${index}`), 60),
    prix: plain(formData.get(`option-prix-${index}`), 30),
    texte: plain(formData.get(`option-texte-${index}`), 240),
  }));
  if (options.some((option) => !option.titre || !option.prix || !option.texte)) redirect('/admin/tarifs?erreur=1');
  await setSetting(SETTINGS_KEYS.options, options);
  refreshSite();
  redirect('/admin/tarifs?ok=1');
}

export async function saveTextsAction(formData: FormData) {
  await requireAdmin();

  const texts: Record<string, string> = {};
  for (const field of textFields) {
    const value = String(formData.get(field.key) ?? '').replace(/\s+/g, ' ').trim().slice(0, 400);
    if (value && value !== field.defaultValue) texts[field.key] = value;
  }

  await setSetting(SETTINGS_KEYS.texts, texts);
  refreshSite();
  redirect('/admin/textes?ok=1');
}

export async function saveAssuranceAction(formData: FormData) {
  await requireAdmin();

  const saved: Record<string, string> = {};
  for (const field of assuranceFields) {
    const value = String(formData.get(field.key) ?? '').replace(/[<>]/g, '').replace(/\s+/g, ' ').trim().slice(0, 800);
    if (value && value !== field.defaultValue) saved[field.key] = value;
  }

  await setSetting(ASSURANCE_SETTING_KEY, saved);
  refreshSite();
  redirect('/admin/assurance?ok=1');
}
