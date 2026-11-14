import 'server-only';
import { getSetting } from '@/lib/services/settings';

export interface DayHours {
  ouvert: boolean;
  de: string;
  a: string;
}

export interface SiteInfo {
  telephone: string;
  email: string;
  instagram: string;
  adresse: string;
  delaiReponse: string;
  horaires: DayHours[];
  zones: string[];
}

export interface OptionRow {
  titre: string;
  prix: string;
  texte: string;
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
  adresse: '10 B route de Rouen, 27140 Gisors, France',
  delaiReponse: '24h',
  horaires: [
    { ouvert: false, de: '09:00', a: '19:00' },
    { ouvert: true, de: '09:00', a: '19:00' },
    { ouvert: true, de: '09:00', a: '19:00' },
    { ouvert: true, de: '09:00', a: '19:00' },
    { ouvert: true, de: '09:00', a: '19:00' },
    { ouvert: true, de: '09:00', a: '19:00' },
    { ouvert: false, de: '09:00', a: '19:00' },
  ],
  zones: ['Gisors', 'Étrépagny', 'Trie-Château', 'Magny-en-Vexin'],
};

export const defaultPrices: PriceRow[] = [
  { vehicule: 'Citadine', interieur: 30, exterieur: 30, complet: 50 },
  { vehicule: 'Berline', interieur: 35, exterieur: 35, complet: 60 },
  { vehicule: 'Monospace', interieur: 40, exterieur: 40, complet: 70 },
  { vehicule: 'SUV', interieur: 45, exterieur: 45, complet: 80 },
  { vehicule: 'Van / Utilitaire', interieur: 55, exterieur: 55, complet: 100 },
];

export const defaultOptions: OptionRow[] = [
  { titre: 'Shampoing siège', prix: '20€', texte: 'Détache, assainit et ravive les tissus en profondeur pour retrouver une assise propre et plus agréable.' },
  { titre: 'Rénovation optique', prix: '50€', texte: 'Redonnez de la clarté à vos phares pour un rendu visuel plus propre et une meilleure visibilité la nuit.' },
  { titre: 'Vitres teintées', prix: 'sur devis', texte: 'Améliorez le confort thermique et le style du véhicule avec une teinte propre, homogène et durable.' },
];

export const textFields: TextField[] = [
  { key: 'accueil-titre', label: 'Titre principal', page: 'index', defaultValue: 'Remplacement & réparation de pare-brise à Gisors' },
  { key: 'accueil-texte', label: 'Texte sous le titre', page: 'index', defaultValue: 'Fast Detailing vous accompagne également dans les démarches assurance et bris de glace.', multiline: true },
  { key: 'accueil-contact', label: 'Texte de la section « Contact rapide »', page: 'index', defaultValue: 'Une fois votre besoin défini, choisissez le canal de contact adapté. Réponse claire, locale et sur rendez-vous.', multiline: true },
    { key: 'offre-etiquette', label: 'Bandeau offre : étiquette', page: 'index', defaultValue: 'Offre client' },
    { key: 'offre-ligne1', label: 'Bandeau offre : première ligne', page: 'index', defaultValue: 'FRANCHISE OFFERTE' },
    { key: 'offre-ligne2', label: 'Bandeau offre : deuxième ligne', page: 'index', defaultValue: '100 € À 350 € OFFERTS*' },
    { key: 'offre-note', label: 'Bandeau offre : mention sous l’offre', page: 'index', defaultValue: 'Selon contrat d\'assurance et éligibilité du dossier.' },
    { key: 'offre-titre', label: 'Bandeau offre : titre', page: 'index', defaultValue: 'Assurance & démarches simplifiées' },
    { key: 'offre-texte', label: 'Bandeau offre : texte', page: 'index', defaultValue: 'Nous vous accompagnons dans la gestion administrative liée à votre bris de glace.', multiline: true },
    { key: 'offre-bouton', label: 'Bandeau offre : bouton', page: 'index', defaultValue: 'Vérifier mon éligibilité' },
    { key: 'prestations-titre', label: 'Titre principal', page: 'prestations', defaultValue: 'Prestations de detailing auto à Gisors' },
    { key: 'prestations-texte', label: 'Texte d’introduction', page: 'prestations', defaultValue: 'Prestations de detailing à Gisors conçues pour un résultat visuel immédiat: intérieur soigné, carrosserie brillante, phares rénovés et vitres teintées premium.', multiline: true },
    { key: 'parebrise-titre', label: 'Titre principal', page: 'pare-brise', defaultValue: 'Remplacement pare-brise à Gisors' },
    { key: 'parebrise-texte', label: 'Texte d’introduction', page: 'pare-brise', defaultValue: 'Remplacement pare-brise rapide et efficace. Franchise possible selon votre assurance. Appelez-nous pour les tarifs et détails.', multiline: true },
    { key: 'contact-titre', label: 'Titre principal', page: 'contact', defaultValue: 'Nous contacter rapidement' },
    { key: 'tarifs-titre', label: 'Titre principal', page: 'tarifs-lavage-auto', defaultValue: 'Tarifs Lavage Auto à Gisors' },
    { key: 'tarifs-texte', label: 'Texte d’introduction', page: 'tarifs-lavage-auto', defaultValue: 'Nettoyage intérieur, extérieur ou complet pour tous types de véhicules.', multiline: true },
];

export function pageText(texts: Record<string, string>, key: string) {
    return texts[key] || textFields.find((field) => field.key === key)?.defaultValue || '';
}

const SETTINGS_KEYS = { info: 'site-info', prices: 'tarifs', texts: 'textes', options: 'options' } as const;

export async function getSiteInfo(): Promise<SiteInfo> {
  const saved = await getSetting<Partial<SiteInfo>>(SETTINGS_KEYS.info);
  const info = { ...defaultSiteInfo, ...saved };
  if (!Array.isArray(info.horaires) || info.horaires.length !== 7) info.horaires = defaultSiteInfo.horaires;
  return info;
}

export async function getPrices(): Promise<PriceRow[]> {
  const saved = await getSetting<PriceRow[]>(SETTINGS_KEYS.prices);
  return Array.isArray(saved) && saved.length === defaultPrices.length ? saved : defaultPrices;
}

export async function getOptions(): Promise<OptionRow[]> {
  const saved = await getSetting<OptionRow[]>(SETTINGS_KEYS.options);
  return Array.isArray(saved) && saved.length === defaultOptions.length ? saved : defaultOptions;
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

export const dayNames = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
const WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const formatTime = (time: string) => time.replace(':', 'h');

export interface HoursGroup {
  days: string;
  hours: string;
  open: string;
  close: string;
  weekdays: string[];
}

// Groups consecutive open days sharing the same hours (e.g. "Mardi au samedi · 09h00 - 19h00").
export function hoursGroups(info: SiteInfo): HoursGroup[] {
  const groups: { indexes: number[]; de: string; a: string }[] = [];
  info.horaires.forEach((day, index) => {
    if (!day.ouvert) return;
    const last = groups.at(-1);
    if (last && last.de === day.de && last.a === day.a && last.indexes.at(-1) === index - 1) last.indexes.push(index);
    else groups.push({ indexes: [index], de: day.de, a: day.a });
  });
  return groups.map(({ indexes, de, a }) => {
    const first = dayNames[indexes[0]];
    const lastDay = dayNames[indexes.at(-1)!];
    const days = indexes.length === 1 ? first : indexes.length === 2 ? `${first} et ${lastDay.toLowerCase()}` : `${first} au ${lastDay.toLowerCase()}`;
    return { days, hours: `${formatTime(de)} - ${formatTime(a)}`, open: de, close: a, weekdays: indexes.map((index) => WEEK[index]) };
  });
}

// Fills the JSON-LD contact data (phone, e-mail, zones, social link, opening hours) from the site settings.
export function applySiteInfo(jsonLd: string, info: SiteInfo) {
  const specs = hoursGroups(info).map((group) => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: group.weekdays,
    opens: group.open,
    closes: group.close,
  }));
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
        if (specs.length) result[key] = specs;
      } else result[key] = fill(value);
    }
    return result;
  };

  return JSON.stringify(fill(JSON.parse(jsonLd)));
}

