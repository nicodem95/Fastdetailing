import 'server-only';
import { getSetting } from '@/lib/services/settings';

export interface SiteInfo {
  telephone: string;
  email: string;
  instagram: string;
  joursOuverture: string;
  heures: string;
  zones: string[];
}

export interface PriceRow {
  vehicule: string;
  interieur: number;
  exterieur: number;
  complet: number;
}

export interface TextField {
  key: string;
  label: string;
  page: string;
  defaultValue: string;
  multiline?: boolean;
}

// Values currently written in the static pages: they are what gets replaced.
export const defaultSiteInfo: SiteInfo = {
  telephone: '06 66 08 44 67',
  email: 'fastdetailing27140@gmail.com',
  instagram: 'https://www.instagram.com/fastdetailing27140/',
  joursOuverture: 'Mardi au samedi',
  heures: '09h00 - 19h00',
  zones: ['Gisors', 'Étrépagny', 'Trie-Château', 'Magny-en-Vexin'],
};

export const defaultPrices: PriceRow[] = [
  { vehicule: 'Citadine', interieur: 30, exterieur: 30, complet: 50 },
  { vehicule: 'Berline', interieur: 35, exterieur: 35, complet: 60 },
  { vehicule: 'Monospace', interieur: 40, exterieur: 40, complet: 70 },
  { vehicule: 'SUV', interieur: 45, exterieur: 45, complet: 80 },
  { vehicule: 'Van / Utilitaire', interieur: 55, exterieur: 55, complet: 100 },
];

export const textFields: TextField[] = [
  { key: 'accueil-titre', label: 'Titre principal', page: 'index', defaultValue: 'Remplacement & réparation de pare-brise à Gisors' },
  { key: 'accueil-texte', label: 'Texte sous le titre', page: 'index', defaultValue: 'Fast Detailing vous accompagne également dans les démarches assurance et bris de glace.', multiline: true },
  { key: 'accueil-contact', label: 'Texte de la section « Contact rapide »', page: 'index', defaultValue: 'Une fois votre besoin défini, choisissez le canal de contact adapté. Réponse claire, locale et sur rendez-vous.', multiline: true },
];

const SETTINGS_KEYS = { info: 'site-info', prices: 'tarifs', texts: 'textes' } as const;

export async function getSiteInfo(): Promise<SiteInfo> {
  const saved = await getSetting<Partial<SiteInfo>>(SETTINGS_KEYS.info);
  return { ...defaultSiteInfo, ...saved };
}

export async function getPrices(): Promise<PriceRow[]> {
  const saved = await getSetting<PriceRow[]>(SETTINGS_KEYS.prices);
  return Array.isArray(saved) && saved.length === defaultPrices.length ? saved : defaultPrices;
}

export async function getTexts(): Promise<Record<string, string>> {
  return (await getSetting<Record<string, string>>(SETTINGS_KEYS.texts)) ?? {};
}

export { SETTINGS_KEYS };

export function phoneDigits(info: SiteInfo) {
  return phoneVariants(info.telephone).national;
}

export function phoneHref(info: SiteInfo) {
  return `tel:+${phoneVariants(info.telephone).international}`;
}

export function whatsappHref(info: SiteInfo, message: string) {
  return `https://wa.me/${phoneVariants(info.telephone).international}?text=${encodeURIComponent(message)}`;
}

export function zonesText(info: SiteInfo) {
  return zoneVariants(info.zones.length ? info.zones : defaultSiteInfo.zones);
}

function escapeHtml(value: string) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function phoneVariants(phone: string) {
  const digits = phone.replace(/\D/g, '');
  return { display: phone, national: digits, international: `33${digits.slice(1)}` };
}

function zoneVariants(zones: string[]) {
  const last = zones.length > 1 ? `${zones.slice(0, -1).join(', ')} et ${zones.at(-1)}` : zones.join('');
  return {
    comma: zones.join(', '),
    slash: zones.join(' / '),
    and: last,
    json: zones.map((zone) => `"${zone}"`).join(', '),
  };
}

// Replaces the static values with the configured ones (HTML or JSON-LD text).
export function applySiteInfo(html: string, info: SiteInfo) {
  const from = phoneVariants(defaultSiteInfo.telephone);
  const to = phoneVariants(info.telephone);
  const fromZones = zoneVariants(defaultSiteInfo.zones);
  const toZones = zoneVariants(info.zones.length ? info.zones : defaultSiteInfo.zones);

  const hoursChanged = info.joursOuverture !== defaultSiteInfo.joursOuverture;
  const timeChanged = info.heures !== defaultSiteInfo.heures;

  let result = html
    .replaceAll(from.international, to.international)
    .replaceAll(from.national, to.national)
    .replaceAll(from.display, to.display)
    .replaceAll(defaultSiteInfo.email, info.email)
    .replaceAll(defaultSiteInfo.instagram, info.instagram)
    .replaceAll(`${defaultSiteInfo.joursOuverture}<br>${defaultSiteInfo.heures}`, `${escapeHtml(info.joursOuverture)}<br>${escapeHtml(info.heures)}`)
    .replaceAll(fromZones.comma, escapeHtml(toZones.comma))
    .replaceAll(fromZones.slash, escapeHtml(toZones.slash))
    .replaceAll(fromZones.and, escapeHtml(toZones.and))
    .replaceAll(fromZones.json, toZones.json);

  // The contact page words its hours differently: only touch them once they were edited.
  if (timeChanged) result = result.replaceAll('<strong>09h00 – 19h00</strong>', `<strong>${escapeHtml(info.heures)}</strong>`);
  if (hoursChanged) result = result.replaceAll('Lundi à dimanche', escapeHtml(info.joursOuverture));
  return result;
}
