import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getAdminUser } from '@/lib/auth/server';
import { getSiteInfo } from '@/lib/site-content';
import { saveSiteInfoAction } from '../settings-actions';

export const metadata: Metadata = { title: 'Infos du site', robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';

export default async function InfosPage({ searchParams }: { searchParams: Promise<{ ok?: string; erreur?: string }> }) {
  const { ok, erreur } = await searchParams;
  if (!(await getAdminUser())) redirect('/admin');
  const info = await getSiteInfo();

  return (
    <main className="section-pad">
      <div className="admin">
        <div className="admin-header"><h1>Infos du site</h1></div>
        <section className="admin-card">
          <p className="admin-help">Ces informations sont affichées sur toutes les pages (en-tête, contact, pied de page…).</p>
          {ok ? <p className="admin-success" role="status">Informations enregistrées ✓ (visibles sur le site sous environ 1 minute)</p> : null}
          {erreur ? <p className="admin-alert" role="alert">Vérifiez les champs : téléphone (10 chiffres), e-mail, lien Instagram complet.</p> : null}
          <form className="admin-form" action={saveSiteInfoAction}>
            <label className="admin-field">Téléphone<input name="telephone" defaultValue={info.telephone} placeholder="06 12 34 56 78" required /></label>
            <label className="admin-field">E-mail<input name="email" type="email" defaultValue={info.email} required /></label>
            <label className="admin-field">Lien Instagram<input name="instagram" defaultValue={info.instagram} required /></label>
            <div className="admin-grid-2">
              <label className="admin-field">Jours d’ouverture<input name="joursOuverture" defaultValue={info.joursOuverture} required /></label>
              <label className="admin-field">Horaires<input name="heures" defaultValue={info.heures} required /></label>
            </div>
            <label className="admin-field">
              Zones desservies (une par ligne)
              <textarea name="zones" rows={5} defaultValue={info.zones.join('\n')} required />
            </label>
            <button className="btn btn-primary" type="submit">Enregistrer</button>
          </form>
        </section>
      </div>
    </main>
  );
}
