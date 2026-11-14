import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getAdminUser } from '@/lib/auth/server';
import { getLegal, legalFields } from '@/lib/extra-content';
import { saveLegalAction } from '../content-actions';
import { Icon, PageTitle } from '../icons';

export const metadata: Metadata = { title: 'Mentions légales', robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';

export default async function LegalPage({ searchParams }: { searchParams: Promise<{ ok?: string; erreur?: string }> }) {
  const { ok, erreur } = await searchParams;
  if (!(await getAdminUser())) redirect('/admin');
  const legal = await getLegal();

  return (
    <main className="section-pad">
      <div className="admin">
        <div className="admin-header"><PageTitle icon="text" hint="Les informations de l’entreprise affichées sur la page « Mentions légales ».">Mentions légales</PageTitle></div>
        {ok ? <p className="admin-success" role="status">Mentions légales enregistrées ✓ (visibles sur le site sous environ 1 minute)</p> : null}
        {erreur ? <p className="admin-alert" role="alert">Tous les champs doivent être remplis.</p> : null}
        <form className="admin-form" action={saveLegalAction}>
          <section className="admin-card">
            <h2 className="admin-section-title"><Icon name="info" />L’entreprise</h2>
            <div className="admin-form">
              {legalFields.map((field) => (
                <label className="admin-field" key={field.key}>{field.label}<input name={field.key} defaultValue={legal[field.key]} maxLength={120} required /></label>
              ))}
            </div>
            <p className="admin-help">L’adresse, le téléphone et l’e-mail viennent de « Infos du site ».</p>
          </section>
          <button className="btn btn-primary admin-btn-icon" type="submit"><Icon name="save" />Enregistrer</button>
        </form>
      </div>
    </main>
  );
}
