import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getAdminUser } from '@/lib/auth/server';
import { PageTitle } from '../icons';
import { TextBlocks, type TextBlock } from '../text-blocks';

export const metadata: Metadata = { title: 'Page Accueil', robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';

const blocks: TextBlock[] = [
  { title: 'En-tête (hero)', icon: 'text', hint: 'Titre principal et accroche affichés en tête de la page d’accueil.', keys: ['accueil-titre', 'accueil-texte'] },
  { title: 'Bandeau « Offre client »', icon: 'sparkle', hint: 'Encadré promotionnel : offre franchise, mention légale, titre assurance et bouton.', keys: ['offre-etiquette', 'offre-ligne1', 'offre-ligne2', 'offre-note', 'offre-titre', 'offre-texte', 'offre-bouton'] },
  { title: 'Section « Contact rapide »', icon: 'phone', hint: 'Texte d’introduction de la section contact, en bas de l’accueil.', keys: ['accueil-contact'] },
];

export default async function AccueilAdminPage({ searchParams }: { searchParams: Promise<{ ok?: string }> }) {
  const { ok } = await searchParams;
  if (!(await getAdminUser())) redirect('/admin');

  return (
    <main className="section-pad">
      <div className="admin">
        <div className="admin-header"><PageTitle icon="text" hint="Les blocs suivent l’ordre de la page d’accueil. Pour revenir au texte d’origine, remettez-le tel quel.">Page Accueil</PageTitle></div>
        <TextBlocks blocks={blocks} back="/admin/accueil" ok={ok} />
      </div>
    </main>
  );
}
