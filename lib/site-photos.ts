import 'server-only';
import { getSetting } from '@/lib/services/settings';

export interface PhotoSlot {
  key: string;
  label: string;
  defaultSrc: string;
}

export interface PhotoGroup {
  page: string;
  title: string;
  hint: string;
  slots: PhotoSlot[];
}

export const photoGroups: PhotoGroup[] = [
  {
    page: 'logo',
    title: 'Logo et photo de partage',
    hint: 'Le logo s’affiche en haut à gauche de toutes les pages. La photo de partage apparaît quand le lien du site est envoyé par message ou publié sur les réseaux (si vous n’en mettez pas, chaque page garde sa photo habituelle).',
    slots: [
      { key: 'site.logo', label: 'Logo', defaultSrc: 'assets/Hero/hero.jpeg' },
      { key: 'site.share', label: 'Photo de partage', defaultSrc: 'assets/Garage_exterieur/WhatsApp Image 2026-05-09 at 19.58.48.jpeg' },
    ],
  },
  {
    page: 'accueil',
    title: 'Page d’accueil',
    hint: 'Photo d’en-tête puis galerie « Nos réalisations » en bas de la page.',
    slots: [
      { key: 'accueil.hero', label: 'Photo d’en-tête', defaultSrc: 'assets/Pare-Brise/pare_brise.jpeg' },
      { key: 'accueil.galerie.0', label: 'Galerie : photo 1', defaultSrc: 'assets/Garage_exterieur/reflet-apres-detailing.jpg' },
      { key: 'accueil.galerie.1', label: 'Galerie : photo 2', defaultSrc: 'assets/Garage_exterieur/atelier-vehicule-premium.jpg' },
      { key: 'accueil.galerie.2', label: 'Galerie : photo 3', defaultSrc: 'assets/Avant_Apres/7/voiture.jpeg' },
      { key: 'accueil.galerie.3', label: 'Galerie : photo 4', defaultSrc: 'assets/Avant_Apres/8/voiture.jpeg' },
      { key: 'accueil.galerie.4', label: 'Galerie : photo 5', defaultSrc: 'assets/Avant_Apres/10/BMW.jpeg' },
    ],
  },
  {
    page: 'prestations',
    title: 'Page Prestations',
    hint: 'La grande photo affichée à droite du titre, en haut de la page.',
    slots: [{ key: 'prestations.hero', label: 'Photo d’en-tête', defaultSrc: 'assets/Avant_Apres/10/BMW.jpeg' }],
  },
  {
    page: 'pare-brise',
    title: 'Page Pare-brise',
    hint: 'La grande photo affichée à droite du titre, en haut de la page.',
    slots: [{ key: 'parebrise.hero', label: 'Photo d’en-tête', defaultSrc: 'assets/Garage_exterieur/WhatsApp Image 2026-05-09 at 19.58.48.jpeg' }],
  },
  {
    page: 'avant-apres',
    title: 'Page Réalisations',
    hint: 'La grande photo affichée en haut de la page. Les cartes avant/après se gèrent dans « Réalisations ».',
    slots: [{ key: 'realisations.hero', label: 'Photo d’en-tête', defaultSrc: 'assets/Garage_exterieur/WhatsApp Image 2026-05-09 at 19.58.49 (2).jpeg' }],
  },
  {
    page: 'avant-apres',
    title: 'Page Avant / Après',
    hint: 'La grande photo affichée en haut de la page. Les cartes se gèrent dans « Réalisations ».',
    slots: [{ key: 'avantapres.hero', label: 'Photo d’en-tête', defaultSrc: 'assets/Avant_Apres/8/WhatsApp Image 2026-05-09 at 19.58.49.jpeg' }],
  },
  {
    page: 'contact',
    title: 'Page Contact',
    hint: 'La grande photo affichée à droite du titre, en haut de la page.',
    slots: [{ key: 'contact.hero', label: 'Photo d’en-tête', defaultSrc: 'assets/Garage_Interieur/WhatsApp Image 2026-05-09 at 19.58.41.jpeg' }],
  },
  {
    page: 'assurance',
    title: 'Page Administratif & Assurance',
    hint: 'Les trois photos du bureau et de l’accueil client.',
    slots: [
      { key: 'assurance.hero', label: 'Photo d’en-tête', defaultSrc: 'assets/bureau/bureau1.jpeg' },
      { key: 'assurance.accueil', label: 'Salle d’attente', defaultSrc: 'assets/bureau/bureau3.jpeg' },
      { key: 'assurance.bureau', label: 'Bureau', defaultSrc: 'assets/bureau/bureau2.jpeg' },
    ],
  },
];

export const photoSlots = photoGroups.flatMap((group) => group.slots);
export const photoPages = [...new Set(photoGroups.map((group) => group.page))];
export const PHOTOS_SETTING_KEY = 'photos';

export async function getSitePhotos(): Promise<Record<string, string>> {
  return (await getSetting<Record<string, string>>(PHOTOS_SETTING_KEY)) ?? {};
}

export function sitePhoto(saved: Record<string, string>, key: string) {
  return saved[key] || photoSlots.find((slot) => slot.key === key)?.defaultSrc || '';
}
