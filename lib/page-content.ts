import 'server-only';
import { getSetting } from '@/lib/services/settings';
import type { AssuranceField, AssuranceSection } from '@/lib/assurance-content';

export type ContentSection = AssuranceSection;
export type ContentField = AssuranceField;

export interface EditablePage {
  slug: 'pare-brise' | 'prestations' | 'realisations' | 'avant-apres';
  settingKey: string;
  adminPath: string;
  title: string;
  hint: string;
  sections: ContentSection[];
  fields: ContentField[];
}

const line = (key: string, label: string, defaultValue: string): ContentField => ({ key, label, defaultValue });
const text = (key: string, label: string, defaultValue: string): ContentField => ({ key, label, defaultValue, multiline: true });

function build(page: Omit<EditablePage, 'fields'>): EditablePage {
  return { ...page, fields: page.sections.flatMap((section) => section.groups.flatMap((group) => group.fields)) };
}

const pareBriseCards = [
  ['Franchise', 'Franchise / assurance selon conditions', "Vérifions ensemble votre contrat pour profiter de la franchise. Détails à l'atelier."],
  ['Offres', 'Cadeaux et tarifs spéciaux', 'Nous proposons des tarifs avantageux et des cadeaux client selon la saison. À confirmer lors de votre appel.'],
  ['Rapidité', 'Dépannage du jour au lendemain', 'Contactez-nous pour connaître les délais. Nous faisons notre possible pour vous dépanner vite.'],
];

export const pareBrisePage = build({
  slug: 'pare-brise',
  settingKey: 'page-pare-brise',
  adminPath: '/admin/pare-brise',
  title: 'Page Pare-brise',
  hint: 'Les blocs suivent l’ordre de la page Pare-brise. Pour revenir au texte d’origine, remettez-le tel quel.',
  sections: [
    {
      id: 'haut',
      title: 'En-tête de la page',
      hint: 'Titre, introduction et légende de la photo, tout en haut de la page.',
      icon: 'info',
      groups: [{
        fields: [
          line('hero.titre', 'Titre', 'Remplacement pare-brise à Gisors'),
          text('hero.texte', 'Texte', 'Remplacement pare-brise rapide et efficace. Franchise possible selon votre assurance. Appelez-nous pour les tarifs et détails.'),
          text('hero.legende', 'Légende de la photo', 'Bloc commercial clair, sans promesse floue.'),
        ],
      }],
    },
    {
      id: 'offre',
      title: 'Offre',
      hint: 'Introduction puis trois cartes.',
      icon: 'check',
      groups: [
        {
          fields: [
            line('offre.titre', 'Titre', 'Ce que nous vous proposons'),
            text('offre.texte', 'Texte', "Remplacement rapide, transparent et sans surprise. Appelez pour connaître vos options d'assurance et les conditions précises."),
          ],
        },
        ...pareBriseCards.map(([tag, cardTitle, cardText], index) => ({
          title: `Carte ${index + 1}`,
          fields: [line(`carte.${index}.tag`, 'Étiquette', tag), line(`carte.${index}.titre`, 'Titre', cardTitle), text(`carte.${index}.texte`, 'Texte', cardText)],
        })),
      ],
    },
  ],
});

const prestationIntro = [
  ['Des prestations pensées pour valoriser votre véhicule', 'Chaque intervention est réalisée avec une approche soignée pour améliorer l’apparence, le confort et la perception du véhicule.'],
  ['Un résultat visible et durable', 'Des finitions propres et adaptées à un usage quotidien, une revente ou simplement le plaisir de retrouver un véhicule impeccable.'],
];

const prestationCards = [
  ['Intérieur', 'Nettoyage intérieur', "Habitacle propre, sain et valorisant pour l'usage quotidien ou la revente.", 'Découvrir la prestation'],
  ['Extérieur', 'Nettoyage extérieur', 'Lavage manuel, jantes et finitions pour une carrosserie nette et brillante dès la sortie atelier.', 'Voir les réalisations'],
  ['Premium', 'Polish / lustrage', 'Correction visuelle des micro-défauts et brillance renforcée pour un effet showroom durable.', 'Découvrir le rendu'],
  ['Optiques', 'Rénovation optiques', "Optiques éclaircies et look rajeuni pour améliorer l'esthétique et la sécurité de conduite.", 'Voir un exemple'],
  ['Protection', 'Vitres teintées', 'Confort thermique, intimité et style premium avec une pose soignée conforme à vos besoins.', 'En savoir plus'],
  ['Pare-brise', 'Franchise offerte', 'Solution pare-brise avec accompagnement assurance et franchise offerte selon conditions.', 'En savoir plus'],
  ['Deux-roues', 'Moto detailing', 'Nettoyage précis et finitions adaptées pour redonner un rendu propre et net à votre moto.', 'Demander un devis'],
];

export const prestationsPage = build({
  slug: 'prestations',
  settingKey: 'page-prestations',
  adminPath: '/admin/prestations',
  title: 'Page Prestations',
  hint: 'Les blocs suivent l’ordre de la page Prestations. Pour revenir au texte d’origine, remettez-le tel quel.',
  sections: [
    {
      id: 'haut',
      title: 'En-tête de la page',
      hint: 'Titre, introduction et légende de la photo, tout en haut de la page.',
      icon: 'info',
      groups: [{
        fields: [
          line('hero.titre', 'Titre', 'Prestations de detailing auto à Gisors'),
          text('hero.texte', 'Texte', 'Prestations de detailing à Gisors conçues pour un résultat visuel immédiat: intérieur soigné, carrosserie brillante, phares rénovés et vitres teintées premium.'),
          text('hero.legende', 'Légende de la photo', 'Intervention propre, rapide et orientée résultat.'),
        ],
      }],
    },
    {
      id: 'services',
      title: 'Introduction des services',
      hint: 'Titre de la section et deux encadrés de présentation.',
      icon: 'sparkle',
      groups: [
        {
          fields: [
            line('services.titre', 'Titre', 'Vos prestations principales'),
            text('services.texte', 'Texte', 'Une grille claire, compacte et premium pour identifier rapidement la bonne intervention.'),
          ],
        },
        ...prestationIntro.map(([introTitle, introText], index) => ({
          title: `Encadré ${index + 1}`,
          fields: [line(`intro.${index}.titre`, 'Titre', introTitle), text(`intro.${index}.texte`, 'Texte', introText)],
        })),
      ],
    },
    {
      id: 'cartes',
      title: 'Prestations',
      hint: 'Les sept cartes de prestations. Les liens des boutons restent fixes, seul leur libellé change.',
      icon: 'check',
      groups: prestationCards.map(([tag, cardTitle, cardText, button], index) => ({
        title: `Prestation ${index + 1}`,
        fields: [
          line(`carte.${index}.tag`, 'Étiquette', tag),
          line(`carte.${index}.titre`, 'Titre', cardTitle),
          text(`carte.${index}.texte`, 'Texte', cardText),
          line(`carte.${index}.bouton`, 'Bouton', button),
        ],
      })),
    },
  ],
});

function introPage(slug: EditablePage['slug'], title: string, d: { titre: string; texte: string; legende: string; sectionTitre: string; sectionTexte: string }, sectionName: string, sectionHint: string) {
  return build({
    slug,
    settingKey: `page-${slug}`,
    adminPath: `/admin/${slug}`,
    title,
    hint: 'Titres et introductions de la page. Les photos et les fiches se gèrent dans Réalisations. Pour revenir au texte d’origine, remettez-le tel quel.',
    sections: [
      {
        id: 'haut',
        title: 'En-tête de la page',
        hint: 'Titre, introduction et légende de la photo, tout en haut de la page.',
        icon: 'info',
        groups: [{ fields: [line('hero.titre', 'Titre', d.titre), text('hero.texte', 'Texte', d.texte), text('hero.legende', 'Légende de la photo', d.legende)] }],
      },
      {
        id: 'section',
        title: sectionName,
        hint: sectionHint,
        icon: 'sparkle',
        groups: [{ fields: [line('section.titre', 'Titre', d.sectionTitre), text('section.texte', 'Texte', d.sectionTexte)] }],
      },
    ],
  });
}

export const realisationsPage = introPage('realisations', 'Page Réalisations', {
  titre: 'Résultats réels de detailing à Gisors',
  texte: "Avant de demander un devis, regardez les finitions réelles sur intérieur, carrosserie, polish et rénovation phare. Chaque photo provient de l'atelier Fast Detailing.",
  legende: 'Des résultats visibles, triés par type d’intervention.',
  sectionTitre: 'Photos classées par catégorie',
  sectionTexte: 'Filtrez rapidement les travaux qui vous intéressent pour évaluer le niveau de finition avant votre prise de contact.',
}, 'Galerie', 'Titre et introduction au-dessus de la galerie de photos.');

export const avantApresPage = introPage('avant-apres', 'Page Avant / Après', {
  titre: 'Des transformations visibles, sans flou ni distraction',
  texte: 'Le comparatif avant/après est la meilleure preuve de qualité pour le detailing. Cette page sert à montrer les résultats sur l’intérieur, les phares, l’extérieur et la moto.',
  legende: 'Slider interactif et lecture immédiate du résultat.',
  sectionTitre: 'Exemples de transformations',
  sectionTexte: 'Affichage avant/après en côte à côte pour lire clairement le résultat, même quand les cadrages ne sont pas strictement identiques.',
}, 'Comparatifs', 'Titre et introduction au-dessus des comparatifs.');

export const editablePages = [pareBrisePage, prestationsPage, realisationsPage, avantApresPage];

export async function getPageContent(page: EditablePage): Promise<Record<string, string>> {
  return (await getSetting<Record<string, string>>(page.settingKey)) ?? {};
}

export function pageContentText(page: EditablePage, saved: Record<string, string>, key: string) {
  return saved[key] || page.fields.find((field) => field.key === key)?.defaultValue || '';
}
