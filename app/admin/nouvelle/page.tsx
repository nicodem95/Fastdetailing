import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getAdminUser } from '@/lib/auth/server';
import { RealisationForm } from '../realisation-form';
import { createRealisationAction } from '../actions';
import '../admin.css';

export const metadata: Metadata = {
  title: 'Nouvelle réalisation',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

export default async function NewRealisationPage({ searchParams }: { searchParams: Promise<{ erreur?: string }> }) {
  const { erreur } = await searchParams;
  if (!(await getAdminUser())) redirect('/admin');

  return (
    <main className="section-pad">
      <div className="admin">
        <Link className="admin-back" href="/admin">← Retour aux réalisations</Link>
        <section className="admin-card">
          <h1>Nouvelle réalisation</h1>
          {erreur === 'champs' ? <p className="admin-alert" role="alert">Le titre et la catégorie sont obligatoires.</p> : null}
          <RealisationForm action={createRealisationAction} />
        </section>
      </div>
    </main>
  );
}
