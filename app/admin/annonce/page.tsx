import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getAdminUser } from '@/lib/auth/server';
import { getBanner } from '@/lib/extra-content';
import { saveBannerAction } from '../content-actions';
import { Icon, PageTitle } from '../icons';

export const metadata: Metadata = { title: 'Annonce', robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';

export default async function AnnouncePage({ searchParams }: { searchParams: Promise<{ ok?: string; erreur?: string }> }) {
  const { ok, erreur } = await searchParams;
  if (!(await getAdminUser())) redirect('/admin');
  const banner = await getBanner();

  return (
    <main className="section-pad">
      <div className="admin">
        <div className="admin-header"><PageTitle icon="info" hint="Un bandeau affiché tout en haut de chaque page : fermeture exceptionnelle, congés, promotion…">Annonce</PageTitle></div>
        {ok ? <p className="admin-success" role="status">Annonce enregistrée ✓ (visible sur le site sous environ 1 minute)</p> : null}
        {erreur ? <p className="admin-alert" role="alert">Écrivez le texte de l’annonce avant de l’activer.</p> : null}
        <form className="admin-form" action={saveBannerAction}>
          <section className="admin-card">
            <h2 className="admin-section-title"><Icon name="info" />Bandeau en haut du site</h2>
            <label className="admin-field">Texte de l’annonce<input name="texte" defaultValue={banner.texte} maxLength={200} placeholder="Atelier fermé du 4 au 18 août. Réouverture le 19 août." /></label>
            <label><input type="checkbox" name="actif" defaultChecked={banner.actif} /> Afficher l’annonce sur le site</label>
            <p className="admin-help">Décochez la case pour retirer le bandeau : le texte est conservé pour la prochaine fois.</p>
          </section>
          <button className="btn btn-primary admin-btn-icon" type="submit"><Icon name="save" />Enregistrer</button>
        </form>
      </div>
    </main>
  );
}
