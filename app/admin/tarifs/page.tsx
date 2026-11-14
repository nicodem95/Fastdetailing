import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getAdminUser } from '@/lib/auth/server';
import { getOptions, getPrices } from '@/lib/site-content';
import { savePricesAction } from '../settings-actions';
import { Icon, PageTitle } from '../icons';

export const metadata: Metadata = { title: 'Tarifs', robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';

export default async function TarifsPage({ searchParams }: { searchParams: Promise<{ ok?: string; erreur?: string }> }) {
  const { ok, erreur } = await searchParams;
  if (!(await getAdminUser())) redirect('/admin');
  const prices = await getPrices();
  const options = await getOptions();

  return (
    <main className="section-pad">
      <div className="admin">
        <div className="admin-header"><PageTitle icon="tag" hint="Prix en euros, affichés sur la page « Tarifs Lavage Auto »">Tarifs lavage auto</PageTitle></div>
        <section className="admin-card">
          {ok ? <p className="admin-success" role="status">Tarifs enregistrés ✓ (visibles sur le site sous environ 1 minute)</p> : null}
          {erreur ? <p className="admin-alert" role="alert">Chaque prix doit être un nombre entier.</p> : null}
          <form className="admin-form" action={savePricesAction}>
            <div className="admin-price-grid">
              <div className="admin-price-row admin-price-head">
                <span />
                <strong><Icon name="interior" size={16} />Intérieur</strong>
                <strong><Icon name="exterior" size={16} />Extérieur</strong>
                <strong><Icon name="sparkle" size={16} />Complet</strong>
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

            <h2 className="admin-section-title"><Icon name="sparkle" />Options complémentaires</h2>
            <p className="admin-help">Affichées sous le tableau des tarifs. Le prix est un texte libre (« 20€ », « sur devis »…).</p>
            {options.map((option, index) => (
              <fieldset className="admin-option" key={index}>
                <div className="admin-grid-2">
                  <label className="admin-field">Nom<input name={`option-titre-${index}`} defaultValue={option.titre} maxLength={60} required /></label>
                  <label className="admin-field">Prix<input name={`option-prix-${index}`} defaultValue={option.prix} maxLength={30} required /></label>
                </div>
                <label className="admin-field">Description<textarea name={`option-texte-${index}`} rows={2} defaultValue={option.texte} maxLength={240} required /></label>
              </fieldset>
            ))}
            <button className="btn btn-primary admin-btn-icon" type="submit"><Icon name="save" />Enregistrer les tarifs</button>
          </form>
        </section>
      </div>
    </main>
  );
}
