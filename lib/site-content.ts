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

const WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const WEEK_FR = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'];

function parseDays(text: string) {
  const lower = text.toLowerCase();
  const range = lower.match(/(lundi|mardi|mercredi|jeudi|vendredi|samedi|dimanche)\s+(?:au|à|a|-)\s+(lundi|mardi|mercredi|jeudi|vendredi|samedi|dimanche)/);
  if (range) {
    const start = WEEK_FR.indexOf(range[1]);
    const end = WEEK_FR.indexOf(range[2]);
    const days: string[] = [];
    for (let i = start; ; i = (i + 1) % 7) {
      days.push(WEEK[i]);
      if (i === end) break;
    }
    return days;
  }
  return WEEK.filter((_, index) => lower.includes(WEEK_FR[index]));
}

function parseHours(text: string) {
  const match = text.match(/(\d{1,2})\s*h\s*(\d{2})?\D+(\d{1,2})\s*h\s*(\d{2})?/i);
  if (!match) return null;
  const format = (hour: string, minutes?: string) => `${hour.padStart(2, '0')}:${minutes ?? '00'}`;
  return { opens: format(match[1], match[2]), closes: format(match[3], match[4]) };
}

// Fills the JSON-LD contact data (phone, e-mail, zones, social link, opening hours) from the site settings.
export function applySiteInfo(jsonLd: string, info: SiteInfo) {
  const days = parseDays(info.joursOuverture);
  const hours = parseHours(info.heures);
  const zones = info.zones.length ? info.zones : defaultSiteInfo.zones;

  const fill = (node: unknown): unknown => {
    if (Array.isArray(node)) return node.map(fill);
    if (!node || typeof node !== 'object') return node;
    const result: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(node)) {
      if (key === 'telephone') result[key] = `+${phoneVariants(info.telephone).international}`;
      else if (key === 'email') result[key] = info.email;
      else if (key === 'areaServed') result[key] = zones;
      else if (key === 'sameAs') result[key] = [info.instagram];
      else if (key === 'openingHoursSpecification') {
        if (days.length && hours) result[key] = [{ '@type': 'OpeningHoursSpecification', dayOfWeek: days, ...hours }];
      } else result[key] = fill(value);
    }
    return result;
  };

  return JSON.stringify(fill(JSON.parse(jsonLd)));
}

