/* eslint-disable react/no-unescaped-entities */
import { whatsappHref, type OptionRow, type PriceRow, type SiteInfo } from '@/lib/site-content';

const svg = { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.9 } as const;

const icons = {
  wash: <svg {...svg}><path d="M4 14c2.5 0 2.5 2 5 2s2.5-2 5-2 2.5 2 5 2" /><path d="M2 18h20" /><path d="M6 10c0-2 2-4 6-4s6 2 6 4" /></svg>,
  car: <svg {...svg}><path d="M3 13l2.5-5h13L21 13" /><path d="M5 13h14" /><path d="M7 17h10" /></svg>,
  bin: <svg {...svg}><path d="M3 7h18" /><path d="M5 7l1 10a2 2 0 002 2h8a2 2 0 002-2l1-10" /><path d="M9 11v5M15 11v5" /></svg>,
  light: <svg {...svg}><circle cx="12" cy="12" r="3" /><path d="M2 12h3m14 0h3M12 2v3m0 14v3" /><path d="M5 5l2 2m10 10l2 2M5 19l2-2m10-10l2-2" /></svg>,
};

const formulas = [
  { icon: icons.wash, title: 'Lavage intérieur', text: 'Aspiration complète, dépoussiérage des plastiques et nettoyage des surfaces pour un habitacle propre et agréable.' },
  { icon: icons.car, title: 'Lavage extérieur', text: 'Prélavage, nettoyage carrosserie, jantes et vitres pour rendre de la brillance et protéger votre image au quotidien.' },
  { icon: icons.bin, title: 'Lavage complet', text: 'Intérieur + extérieur en une seule prestation pour repartir avec un véhicule propre, soigné et prêt à rouler.' },
];

const optionIcons = [icons.wash, icons.light, icons.bin];

const steps = [
  { title: 'Vous choisissez votre formule', text: "Intérieur, extérieur ou complet selon l'état de votre véhicule." },
  { title: 'Vous prenez rendez-vous', text: 'Par téléphone, formulaire ou WhatsApp en quelques secondes.' },
  { title: 'Nous nettoyons votre véhicule', text: 'Intervention soignée avec une finition propre et régulière.' },
  { title: 'Vous récupérez un véhicule propre et soigné', text: "Contrôle final puis restitution d'un véhicule net et valorisé." },
];

export function TarifsContent({ info, prices, options }: { info: SiteInfo; prices: PriceRow[]; options: OptionRow[] }) {
  return (
    <>
      <section className="hero">
        <div className="container">
          <span className="kicker">Lavage auto premium à Gisors</span>

          <h1>Tarifs Lavage Auto à Gisors</h1>
          <p>Nettoyage intérieur, extérieur ou complet pour tous types de véhicules.</p>

          <div className="hero-badges" aria-label="Formules de lavage auto">
            <span className="hero-badge">Intérieur</span>
            <span className="hero-badge">Extérieur</span>
            <span className="hero-badge">Complet</span>
            <span className="hero-badge">SUV & Utilitaires</span>
          </div>

          <div className="cta-row" aria-label="Actions principales">
            <a className="btn btn-primary" href="#tarifs">Voir les tarifs</a>
            <a className="btn btn-soft mobile-hide" href="contact.html">Prendre rendez-vous</a>
          </div>
        </div>
      </section>

      <section className="section" id="tarifs">
        <div className="container" data-reveal>
          <span className="kicker">Tarifs</span>
          <h2 className="section-title">Nos Tarifs Lavage Auto</h2>
          <p className="section-subtitle">Des prestations adaptées à tous les véhicules.</p>

          <div className="pricing-wrap" aria-label="Tarifs lavage auto">
            <table className="pricing-table">
              <thead>
                <tr>
                  <th>Type véhicule</th>
                  <th>Intérieur</th>
                  <th>Extérieur</th>
                  <th>Complet <span className="price-chip">Le plus demandé</span></th>
                </tr>
              </thead>
              <tbody>
                {prices.map((price) => (
                  <tr key={price.vehicule}>
                    <td>{price.vehicule}</td>
                    <td>{price.interieur}€</td>
                    <td>{price.exterieur}€</td>
                    <td className="price-complet">{price.complet}€</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="pricing-cards">
              {prices.map((price) => (
                <article className="pricing-card" key={price.vehicule}>
                  <h3>{price.vehicule}</h3>
                  <div className="price-lines">
                    <div className="price-line"><span>Intérieur</span><strong>{price.interieur}€</strong></div>
                    <div className="price-line"><span>Extérieur</span><strong>{price.exterieur}€</strong></div>
                    <div className="badge-demand">Le plus demandé</div>
                    <div className="price-line complet"><span>Complet</span><strong>{price.complet}€</strong></div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="formules">
        <div className="container" data-reveal>
          <span className="kicker">Formules</span>
          <h2 className="section-title">Choisissez la formule adaptée à votre besoin</h2>
          <p className="section-subtitle">Des offres claires pour un entretien régulier ou un nettoyage complet avant revente.</p>

          <div className="grid-3">
            {formulas.map((item) => (
              <article className="card" key={item.title}>
                <div className="icon-bubble" aria-hidden="true">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="options">
        <div className="container" data-reveal>
          <span className="kicker">Options complémentaires</span>
          <h2 className="section-title">Complétez votre lavage auto</h2>
          <p className="section-subtitle">Ajoutez uniquement les options utiles pour entretenir votre véhicule plus durablement.</p>

          <div className="grid-3">
            {options.map((item, index) => (
              <article className="card" key={item.titre}>
                <div className="icon-bubble" aria-hidden="true">{optionIcons[index]}</div>
                <h3>{item.titre} : {item.prix}</h3>
                <p>{item.texte}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="process">
        <div className="container" data-reveal>
          <span className="kicker">Process simple</span>
          <h2 className="section-title">Un parcours rapide en 4 étapes</h2>
          <p className="section-subtitle">Un process clair pour réserver facilement et récupérer un véhicule propre et soigné.</p>

          <div className="timeline" aria-label="Étapes de prise en charge">
            {steps.map((step, index) => (
              <article className="step" data-step={index + 1} key={step.title}>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="cta-final">
        <div className="container" data-reveal>
          <div className="final-cta">
            <h2>Besoin d'un lavage auto à Gisors ?</h2>
            <div className="cta-row" aria-label="Call to action final">
              <a className="btn btn-primary" href="contact.html">Prendre rendez-vous</a>
              <a className="btn btn-soft mobile-hide" href={whatsappHref(info, 'Bonjour Fast Detailing, je souhaite prendre rendez-vous pour un lavage auto.')} target="_blank" rel="noopener noreferrer">Échanger sur WhatsApp</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
