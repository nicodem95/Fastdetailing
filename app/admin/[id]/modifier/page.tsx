import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { getAdminUser } from '@/lib/auth/server';
import { getRealisationById } from '@/lib/services/realisations';
import { RealisationForm } from '../../realisation-form';
import { updateRealisationAction } from '../../actions';
import '../../admin.css';

export const metadata: Metadata = {
  title: 'Modifier la réalisation',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

export default async function EditRealisationPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ erreur?: string }>;
}) {
  const { id } = await params;
  const { erreur } = await searchParams;
  if (!(await getAdminUser())) redirect('/admin');

  const item = /^[0-9a-f-]{36}$/i.test(id) ? await getRealisationById(id) : null;
  if (!item) notFound();

  const images: Record<string, string> = {};
  for (const image of item.images) images[image.typeImage] = image.url;

  return (
    <main className="section-pad">
      <div className="admin">
        <Link className="admin-back" href={item.type === 'avant_apres' ? '/admin/avant-apres' : '/admin'}>← Retour</Link>
        <section className="admin-card">
          <h1>Modifier la réalisation</h1>
          {erreur === 'champs' ? <p className="admin-alert" role="alert">Le titre et la catégorie sont obligatoires.</p> : null}
          <RealisationForm
            action={updateRealisationAction}
            initial={{
              id: item.id,
              titre: item.titre,
              categorie: item.categorie,
              description: item.description,
              type: item.type,
              publie: item.publie,
              images,
            }}
          />
        </section>
      </div>
    </main>
  );
}
