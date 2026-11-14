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

export default async function NewRealisationPage({ searchParams }: { searchParams: Promise<{ erreur?: string; type?: string }> }) {
  const { erreur, type } = await searchParams;
  if (!(await getAdminUser())) redirect('/admin');
  const back = type === 'avant_apres' ? '/admin/avant-apres' : '/admin';

  return (
    <main className="section-pad">
      <div className="admin">
        <Link className="admin-back" href={back}>← Retour</Link>
        <section className="admin-card">
          <h1>{type === 'avant_apres' ? 'Nouveau comparatif avant / après' : 'Nouvelle photo de la galerie'}</h1>
          {erreur === 'champs' ? <p className="admin-alert" role="alert">Le titre et la catégorie sont obligatoires.</p> : null}
          <RealisationForm action={createRealisationAction} defaultType={type === 'avant_apres' ? 'avant_apres' : 'galerie'} />
        </section>
      </div>
    </main>
  );
}
