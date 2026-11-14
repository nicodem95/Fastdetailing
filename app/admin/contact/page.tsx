import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getAdminUser } from '@/lib/auth/server';
import { PageTitle } from '../icons';
import { TextBlocks, type TextBlock } from '../text-blocks';

export const metadata: Metadata = { title: 'Page Contact', robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';

const blocks: TextBlock[] = [
  { title: 'En-tête de la page', icon: 'mail', hint: 'Titre principal de la page Contact. Téléphone, e-mail et horaires se règlent dans « Infos du site ».', keys: ['contact-titre'] },
];

export default async function ContactAdminPage({ searchParams }: { searchParams: Promise<{ ok?: string }> }) {
  const { ok } = await searchParams;
  if (!(await getAdminUser())) redirect('/admin');

  return (
    <main className="section-pad">
      <div className="admin">
        <div className="admin-header"><PageTitle icon="mail" hint="Pour revenir au texte d’origine, remettez-le tel quel.">Page Contact</PageTitle></div>
        <TextBlocks blocks={blocks} back="/admin/contact" ok={ok} />
      </div>
    </main>
  );
}
