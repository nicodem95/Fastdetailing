import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getAdminUser } from '@/lib/auth/server';
import { getReviews } from '@/lib/extra-content';
import { saveReviewsAction } from '../content-actions';
import { Icon, PageTitle } from '../icons';

export const metadata: Metadata = { title: 'Avis clients', robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';

const emptyRows = 2;

export default async function ReviewsPage({ searchParams }: { searchParams: Promise<{ ok?: string }> }) {
  const { ok } = await searchParams;
  if (!(await getAdminUser())) redirect('/admin');
  const reviews = await getReviews();
  const rows = [...reviews, ...Array.from({ length: emptyRows }, () => ({ name: '', location: '', rating: 5, fullText: '' }))];

  return (
    <main className="section-pad">
      <div className="admin">
        <div className="admin-header"><PageTitle icon="text" hint="Les avis affichés sur la page d’accueil. Recopiez ici de vrais avis Google de vos clients.">Avis clients</PageTitle></div>
        {ok ? <p className="admin-success" role="status">Avis enregistrés ✓ (visibles sur le site sous environ 1 minute)</p> : null}
        <form className="admin-form" action={saveReviewsAction}>
          <input type="hidden" name="count" value={rows.length} />
          {rows.map((review, index) => (
            <section className="admin-card" key={index}>
              <h2 className="admin-section-title"><Icon name="text" />{review.name || 'Nouvel avis (laisser vide pour ignorer)'}</h2>
              <div className="admin-form">
                <label className="admin-field">Prénom du client<input name={`name-${index}`} defaultValue={review.name} maxLength={60} /></label>
                <label className="admin-field">Ville<input name={`location-${index}`} defaultValue={review.location} maxLength={60} placeholder="Gisors" /></label>
                <label className="admin-field">Note (1 à 5)<input name={`rating-${index}`} type="number" min={1} max={5} defaultValue={review.rating} /></label>
                <label className="admin-field">Avis<textarea name={`text-${index}`} rows={4} defaultValue={review.fullText} maxLength={1200} /></label>
                {index < reviews.length ? <label><input type="checkbox" name={`delete-${index}`} /> Supprimer cet avis</label> : null}
              </div>
            </section>
          ))}
          <button className="btn btn-primary admin-btn-icon" type="submit"><Icon name="save" />Enregistrer</button>
        </form>
      </div>
    </main>
  );
}
