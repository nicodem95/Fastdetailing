import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getAdminUser } from '@/lib/auth/server';
import { PageTitle } from '../icons';
import { RealisationSection } from '../realisation-section';
import '../admin.css';

export const metadata: Metadata = { title: 'Avant / Après', robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';

export default async function AvantApresAdminPage({ searchParams }: { searchParams: Promise<{ ok?: string }> }) {
  const { ok } = await searchParams;
  if (!(await getAdminUser())) redirect('/admin');

  return (
    <main className="section-pad">
      <div className="admin">
        <div className="admin-header"><PageTitle icon="images" hint="Tout ce qui s’affiche sur la page Avant / Après du site : la grande photo du haut, puis les comparatifs avec curseur.">Page Avant / Après</PageTitle></div>
        <RealisationSection type="avant_apres" ok={ok} />
      </div>
    </main>
  );
}
