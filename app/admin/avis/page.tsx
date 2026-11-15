import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getAdminUser } from '@/lib/auth/server';
import { listReviews } from '@/lib/services/reviews';
import { deleteReviewAction, saveReviewAction } from '../content-actions';
import { ConfirmForm } from '../confirm-form';
import { Icon, PageTitle } from '../icons';

export const metadata: Metadata = { title: 'Avis clients', robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';

export default async function ReviewsPage({ searchParams }: { searchParams: Promise<{ ok?: string; erreur?: string }> }) {
  const { ok, erreur } = await searchParams;
  if (!(await getAdminUser())) redirect('/admin');
  const reviews = (await listReviews()).filter((review) => review.publie);

  return (
    <main className="section-pad">
      <div className="admin">
        <div className="admin-header"><PageTitle icon="text" hint="Les avis affichés sur la page d’accueil. Recopiez ici de vrais avis Google de vos clients.">Avis clients</PageTitle></div>
        {ok === 'deleted' ? <p className="admin-success" role="status">Avis supprimé ✓ (mise à jour du site sous environ 1 minute)</p> : null}
        {ok === 'updated' ? <p className="admin-success" role="status">Avis modifié ✓ (mise à jour du site sous environ 1 minute)</p> : null}
        {ok === 'created' ? <p className="admin-success" role="status">Avis ajouté ✓ (mise à jour du site sous environ 1 minute)</p> : null}
        {erreur === 'champs' ? <p className="admin-alert" role="alert">Le prénom et le texte de l’avis sont obligatoires.</p> : null}
        {erreur === 'id' || erreur === 'introuvable' ? <p className="admin-alert" role="alert">Cet avis n’a pas pu être retrouvé. Actualisez la page puis réessayez.</p> : null}
        {reviews.map((review) => (
            <details className="admin-card admin-review" key={review.id}>
              <summary>
                <strong>{review.nom}</strong>
                <span className="admin-review-meta">{review.ville} · {'★'.repeat(review.note)}</span>
                <span className="admin-review-excerpt">{review.texte}</span>
              </summary>
              <div className="admin-review-body">
                <form className="admin-form" action={saveReviewAction}>
                  <input type="hidden" name="id" value={review.id} />
                  <div className="admin-review-row">
                    <label className="admin-field">Prénom<input name="name" defaultValue={review.nom} maxLength={60} /></label>
                    <label className="admin-field">Ville<input name="location" defaultValue={review.ville} maxLength={60} placeholder="Gisors" /></label>
                    <label className="admin-field">Note /5<input name="rating" type="number" min={1} max={5} defaultValue={review.note} /></label>
                  </div>
                  <label className="admin-field">Avis<textarea name="text" rows={5} defaultValue={review.texte} maxLength={1200} /></label>
                  <button className="btn btn-primary admin-btn-icon" type="submit"><Icon name="save" />Enregistrer</button>
                </form>
                <ConfirmForm
                  action={deleteReviewAction}
                  title="Supprimer cet avis ?"
                  message={`L’avis de ${review.nom} sera supprimé définitivement du site.`}
                  confirmLabel="Supprimer"
                  destructive
                >
                  <input type="hidden" name="id" value={review.id} />
                  <button className="admin-small-btn danger" type="submit" title="Supprimer" aria-label={`Supprimer l’avis de ${review.nom}`}><Icon name="trash" size={15} /></button>
                </ConfirmForm>
              </div>
            </details>
        ))}
        {reviews.length === 0 ? <section className="admin-card admin-empty"><p>Aucun avis client enregistré.</p></section> : null}
        <details className="admin-card admin-review" open>
          <summary><strong>Ajouter un avis client</strong></summary>
          <form className="admin-form" action={saveReviewAction}>
            <div className="admin-review-row">
              <label className="admin-field">Prénom<input name="name" maxLength={60} /></label>
              <label className="admin-field">Ville<input name="location" maxLength={60} placeholder="Gisors" /></label>
              <label className="admin-field">Note /5<input name="rating" type="number" min={1} max={5} defaultValue={5} /></label>
            </div>
            <label className="admin-field">Avis<textarea name="text" rows={5} maxLength={1200} /></label>
            <button className="btn btn-primary admin-btn-icon" type="submit"><Icon name="save" />Ajouter l’avis</button>
          </form>
        </details>
      </div>
    </main>
  );
}
