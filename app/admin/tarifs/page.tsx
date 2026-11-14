import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getAdminUser } from '@/lib/auth/server';
import { getPrices } from '@/lib/site-content';
import { savePricesAction } from '../settings-actions';

export const metadata: Metadata = { title: 'Tarifs', robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';

export default async function TarifsPage({ searchParams }: { searchParams: Promise<{ ok?: string; erreur?: string }> }) {
  const { ok, erreur } = await searchParams;
  if (!(await getAdminUser())) redirect('/admin');
  const prices = await getPrices();

  return (
    <main className="section-pad">
      <div className="admin">
        <div className="admin-header"><h1>Tarifs lavage auto</h1></div>
        <section className="admin-card">
          <p className="admin-help">Prix en euros, affichés sur la page « Tarifs Lavage Auto ».</p>
          {ok ? <p className="admin-success" role="status">Tarifs enregistrés ✓ (visibles sur le site sous environ 1 minute)</p> : null}
          {erreur ? <p className="admin-alert" role="alert">Chaque prix doit être un nombre entier.</p> : null}
          <form className="admin-form" action={savePricesAction}>
            <div className="admin-price-grid">
              <div className="admin-price-row admin-price-head">
                <span />
                <strong>Intérieur</strong>
                <strong>Extérieur</strong>
                <strong>Complet</strong>
              </div>
              {prices.map((price, index) => (
                <div className="admin-price-row" key={price.vehicule}>
                  <span>{price.vehicule}</span>
                  <input name={`interieur-${index}`} type="number" min={0} max={9999} step={1} defaultValue={price.interieur} required aria-label={`${price.vehicule} intérieur`} />
                  <input name={`exterieur-${index}`} type="number" min={0} max={9999} step={1} defaultValue={price.exterieur} required aria-label={`${price.vehicule} extérieur`} />
                  <input name={`complet-${index}`} type="number" min={0} max={9999} step={1} defaultValue={price.complet} required aria-label={`${price.vehicule} complet`} />
                </div>
              ))}
            </div>
            <button className="btn btn-primary" type="submit">Enregistrer les tarifs</button>
          </form>
        </section>
      </div>
    </main>
  );
}
