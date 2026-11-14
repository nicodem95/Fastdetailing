import 'server-only';
import { getSetting } from '@/lib/services/settings';

export interface AssuranceField {
  key: string;
  label: string;
  defaultValue: string;
  multiline?: boolean;
}

export interface AssuranceSection {
  id: string;
  title: string;
  hint: string;
  icon: 'sparkle' | 'info' | 'check' | 'clock' | 'phone' | 'pin';
  groups: { title?: string; fields: AssuranceField[] }[];
}

const title = (key: string, defaultValue: string): AssuranceField => ({ key, label: 'Titre', defaultValue });
const text = (key: string, defaultValue: string, label = 'Texte'): AssuranceField => ({ key, label, defaultValue, multiline: true });
const line = (key: string, label: string, defaultValue: string): AssuranceField => ({ key, label, defaultValue });

const cards = [
  ['Vérification de votre assurance', "Analyse de votre dossier et de votre couverture selon votre contrat d'assurance."],
  ['Gestion du dossier bris de glace', 'Préparation des informations utiles et suivi de la demande de prise en charge assurance.'],
  ['Aide administrative', 'Explications simples des étapes à prévoir et des documents utiles.'],
  ['Accompagnement franchise', 'Lecture des conditions de franchise pare-brise et solutions possibles selon contrat.'],
  ['Suivi personnalisé', 'Un interlocuteur local pour vous tenir informé avant, pendant et après intervention.'],
  ['Transparence des démarches', 'Détail clair des étapes, prise en charge possible et rappel des conditions.'],
];

const steps = [
  ['Vous nous contactez', 'Téléphone, formulaire ou WhatsApp selon votre préférence.'],
  ['Nous vérifions votre assurance', 'Vérification des modalités de votre assurance bris de glace et de la franchise pare-brise.'],
  ['Intervention rapide', 'Réparation ou remplacement pare-brise planifié selon disponibilités et état du vitrage.'],
  ['Vous reprenez la route', "Dossier suivi et conseils de fin d'intervention pour repartir sereinement."],
];

export const assuranceSections: AssuranceSection[] = [
  {
    id: 'haut',
    title: 'En-tête de la page',
    hint: 'Titre, introduction et légende de la photo, tout en haut de la page.',
    icon: 'info',
    groups: [{
      fields: [
        title('hero.titre', 'Prise en charge administrative simplifiée'),
        text('hero.texte', "Fast Detailing vous accompagne dans les démarches d'assurance et la gestion de votre dossier bris de glace."),
        text('hero.legende', "Un accueil clair et un accompagnement du dossier selon votre contrat d'assurance.", 'Légende de la photo'),
      ],
    }],
  },
  {
    id: 'accueil',
    title: 'Accueil client',
    hint: 'Bloc avec la photo de la salle d’attente et les quatre pastilles de services.',
    icon: 'sparkle',
    groups: [
      {
        fields: [
          title('accueil.titre', 'Un accueil pensé pour votre confort'),
          text('accueil.texte', "Pendant l'intervention sur votre véhicule, profitez d'un espace d'accueil confortable et d'un accompagnement personnalisé."),
        ],
      },
      {
        title: 'Pastilles de services',
        fields: ['Wi-Fi', 'Espace attente', 'Conseils personnalisés', 'Accompagnement dossier'].map((value, index) => line(`accueil.pastille.${index}`, `Pastille ${index + 1}`, value)),
      },
    ],
  },
  {
    id: 'demarches',
    title: 'Démarches',
    hint: 'Introduction puis six cartes décrivant l’accompagnement.',
    icon: 'check',
    groups: [
      {
        fields: [
          title('demarches.titre', 'Nous gérons les démarches pour vous'),
          text('demarches.texte', 'Notre équipe vous accompagne à chaque étape pour votre assurance bris de glace, avec une approche claire et transparente.'),
        ],
      },
      ...cards.map(([cardTitle, cardText], index) => ({
        title: `Carte ${index + 1}`,
        fields: [line(`demarches.carte.${index}.titre`, 'Titre', cardTitle), text(`demarches.carte.${index}.texte`, cardText)],
      })),
    ],
  },
  {
    id: 'etapes',
    title: 'Étapes',
    hint: 'Le parcours client en quatre étapes numérotées.',
    icon: 'clock',
    groups: [
      {
        fields: [
          title('etapes.titre', 'Comment ça fonctionne'),
          text('etapes.texte', 'Un parcours simple pour votre remplacement pare-brise et votre prise en charge assurance.'),
        ],
      },
      ...steps.map(([stepTitle, stepText], index) => ({
        title: `Étape ${index + 1}`,
        fields: [line(`etapes.etape.${index}.titre`, 'Titre', stepTitle), text(`etapes.etape.${index}.texte`, stepText)],
      })),
    ],
  },
  {
    id: 'confiance',
    title: 'Confiance locale',
    hint: 'Encadré de réassurance avec quatre valeurs.',
    icon: 'phone',
    groups: [
      {
        fields: [
          title('confiance.titre', 'Un accompagnement humain et professionnel'),
          text('confiance.texte', "Notre équipe vous accompagne avant, pendant et après l'intervention afin de simplifier vos démarches et vous faire gagner du temps."),
        ],
      },
      {
        title: 'Valeurs',
        fields: ['Ambiance professionnelle', 'Proximité', 'Confiance', 'Service local à Gisors'].map((value, index) => line(`confiance.valeur.${index}`, `Valeur ${index + 1}`, value)),
      },
    ],
  },
  {
    id: 'local',
    title: 'Info locale',
    hint: 'Paragraphe de fin de page, utile pour le référencement local.',
    icon: 'pin',
    groups: [{
      fields: [
        title('local.titre', 'Assurance pare-brise et service local à Gisors'),
        text('local.texte', 'Fast Detailing à Gisors accompagne ses clients pour le remplacement et la réparation de pare-brise ainsi que les démarches administratives liées au bris de glace et aux assurances. Notre équipe vous renseigne sur la prise en charge assurance, la franchise pare-brise et les options possibles selon votre dossier pour un remplacement pare-brise à Gisors réalisé en toute clarté.'),
      ],
    }],
  },
];

export const assuranceFields = assuranceSections.flatMap((section) => section.groups.flatMap((group) => group.fields));
export const ASSURANCE_SETTING_KEY = 'assurance';

export async function getAssurance(): Promise<Record<string, string>> {
  return (await getSetting<Record<string, string>>(ASSURANCE_SETTING_KEY)) ?? {};
}

export function assuranceText(saved: Record<string, string>, key: string) {
  return saved[key] || assuranceFields.find((field) => field.key === key)?.defaultValue || '';
}
