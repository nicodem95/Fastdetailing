import 'server-only';
import { getSetting } from '@/lib/services/settings';

export interface PhotoSlot {
  key: string;
  label: string;
  defaultSrc: string;
}

export interface PhotoGroup {
  title: string;
  hint: string;
  slots: PhotoSlot[];
}

export const photoGroups: PhotoGroup[] = [
  {
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
    title: 'Photos d’en-tête des autres pages',
    hint: 'La grande photo affichée à droite du titre, en haut de chaque page.',
    slots: [
      { key: 'prestations.hero', label: 'Page Prestations', defaultSrc: 'assets/Avant_Apres/10/BMW.jpeg' },
      { key: 'parebrise.hero', label: 'Page Pare-brise', defaultSrc: 'assets/Garage_exterieur/WhatsApp Image 2026-05-09 at 19.58.48.jpeg' },
      { key: 'realisations.hero', label: 'Page Réalisations', defaultSrc: 'assets/Garage_exterieur/WhatsApp Image 2026-05-09 at 19.58.49 (2).jpeg' },
      { key: 'avantapres.hero', label: 'Page Avant / Après', defaultSrc: 'assets/Avant_Apres/8/WhatsApp Image 2026-05-09 at 19.58.49.jpeg' },
      { key: 'contact.hero', label: 'Page Contact', defaultSrc: 'assets/Garage_Interieur/WhatsApp Image 2026-05-09 at 19.58.41.jpeg' },
    ],
  },
  {
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
export const PHOTOS_SETTING_KEY = 'photos';

export async function getSitePhotos(): Promise<Record<string, string>> {
  return (await getSetting<Record<string, string>>(PHOTOS_SETTING_KEY)) ?? {};
}

export function sitePhoto(saved: Record<string, string>, key: string) {
  return saved[key] || photoSlots.find((slot) => slot.key === key)?.defaultSrc || '';
}
