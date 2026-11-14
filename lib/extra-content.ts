import 'server-only';
import { pageData, type PageSlug } from '@/lib/page-data';
import { getSetting } from '@/lib/services/settings';
import defaultReviews from './default-reviews.json';

export interface LegalInfo {
  denomination: string;
  forme: string;
  siren: string;
  siret: string;
  tva: string;
  activite: string;
  dirigeant: string;
  capital: string;
  rcs: string;
  directeurPublication: string;
}

export const defaultLegal: LegalInfo = {
  denomination: 'FAST DETAILLING',
  forme: 'Société par actions simplifiée (SAS)',
  siren: '944 278 068',
  siret: '944 278 068 00019',
  tva: 'FR44944278068',
  activite: 'Entretien et réparation de véhicules automobiles',
  dirigeant: 'Farid BENKHALED',
  capital: '1 000 €',
  rcs: '944 278 068 R.C.S. Évreux',
  directeurPublication: 'Nicolas Millon',
};

export const legalFields: { key: keyof LegalInfo; label: string }[] = [
  { key: 'denomination', label: 'Dénomination sociale' },
  { key: 'forme', label: 'Forme juridique' },
  { key: 'dirigeant', label: 'Dirigeant' },
  { key: 'directeurPublication', label: 'Directeur de la publication' },
  { key: 'activite', label: 'Activité' },
  { key: 'capital', label: 'Capital social' },
  { key: 'siren', label: 'SIREN' },
  { key: 'siret', label: 'SIRET du siège' },
  { key: 'tva', label: 'TVA intracommunautaire' },
  { key: 'rcs', label: 'Immatriculation au RCS' },
];

export async function getLegal(): Promise<LegalInfo> {
  return { ...defaultLegal, ...(await getSetting<Partial<LegalInfo>>('legal')) };
}

export interface SeoEntry {
  title: string;
  description: string;
}

export const seoPages: { slug: PageSlug; label: string }[] = [
  { slug: 'index', label: 'Accueil' },
  { slug: 'prestations', label: 'Prestations' },
  { slug: 'avant-apres', label: 'Avant / Après' },
  { slug: 'realisations', label: 'Réalisations' },
  { slug: 'pare-brise', label: 'Pare-brise' },
  { slug: 'tarifs-lavage-auto', label: 'Tarifs Lavage Auto' },
  { slug: 'administratif-assurance', label: 'Assurance' },
  { slug: 'contact', label: 'Contact' },
];

export function defaultSeo(slug: PageSlug): SeoEntry {
  const page: { title: string; description?: string } = pageData[slug];
  return { title: page.title, description: page.description ?? '' };
}

export async function getAllSeo() {
  const saved = (await getSetting<Record<string, Partial<SeoEntry>>>('seo')) ?? {};
  return Object.fromEntries(
    seoPages.map(({ slug }) => {
      const base = defaultSeo(slug);
      return [slug, { title: saved[slug]?.title || base.title, description: saved[slug]?.description || base.description }];
    }),
  ) as Record<string, SeoEntry>;
}

export async function getSeo(slug: PageSlug): Promise<SeoEntry> {
  return (await getAllSeo())[slug] ?? defaultSeo(slug);
}

export interface Banner {
  actif: boolean;
  texte: string;
}

export async function getBanner(): Promise<Banner> {
  const saved = await getSetting<Partial<Banner>>('banner');
  return { actif: Boolean(saved?.actif), texte: saved?.texte ?? '' };
}

export interface Review {
  name: string;
  rating: number;
  source: string;
  location: string;
  shortText: string;
  fullText: string;
}

export const defaultReviewList = defaultReviews as Review[];

export async function getReviews(): Promise<Review[]> {
  const saved = await getSetting<Review[]>('reviews');
  return Array.isArray(saved) ? saved : defaultReviewList;
}
