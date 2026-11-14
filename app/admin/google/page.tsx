import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getAdminUser } from '@/lib/auth/server';
import { getAllSeo, seoPages } from '@/lib/extra-content';
import { saveSeoAction } from '../content-actions';
import { Icon, PageTitle } from '../icons';

export const metadata: Metadata = { title: 'Référencement Google', robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';

export default async function GooglePage({ searchParams }: { searchParams: Promise<{ ok?: string; erreur?: string }> }) {
  const { ok, erreur } = await searchParams;
  if (!(await getAdminUser())) redirect('/admin');
  const seo = await getAllSeo();

  return (
    <main className="section-pad">
      <div className="admin">
        <div className="admin-header"><PageTitle icon="text" hint="Le titre et la description affichés dans les résultats Google pour chaque page. Citez toujours « Gisors » et le service proposé.">Référencement Google</PageTitle></div>
        {ok ? <p className="admin-success" role="status">Textes Google enregistrés ✓ (Google met quelques jours à les prendre en compte)</p> : null}
        {erreur ? <p className="admin-alert" role="alert">Chaque page doit avoir un titre et une description.</p> : null}
        <form className="admin-form" action={saveSeoAction}>
          {seoPages.map(({ slug, label }) => (
            <section className="admin-card" key={slug}>
              <h2 className="admin-section-title"><Icon name="text" />{label}</h2>
              <label className="admin-field">Titre (60 caractères environ)<input name={`title-${slug}`} defaultValue={seo[slug].title} maxLength={90} required /></label>
              <label className="admin-field">Description (150 caractères environ)<textarea name={`description-${slug}`} rows={3} defaultValue={seo[slug].description} maxLength={200} required /></label>
            </section>
          ))}
          <button className="btn btn-primary admin-btn-icon" type="submit"><Icon name="save" />Enregistrer</button>
        </form>
      </div>
    </main>
  );
}
