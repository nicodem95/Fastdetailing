/* eslint-disable react/no-unescaped-entities, @next/next/no-img-element */
import { phoneHref, whatsappHref, type SiteInfo } from '@/lib/site-content';

export function PareBriseContent({ info }: { info: SiteInfo }) {
  return (
    <>
      <section className="hero section-pad">
        <div className="hero-bg"></div>
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">
              Pare-brise
            </p>
            <h1>
              Remplacement pare-brise à Gisors
            </h1>
            <p className="hero-text">
              Remplacement pare-brise rapide et efficace. Franchise possible selon votre assurance. Appelez-nous pour les tarifs et détails.
            </p>
            <div className="cta-row">
              <a className="btn btn-primary" href={phoneHref(info)}>
                Appeler maintenant
              </a>
              <a className="btn btn-secondary" href="contact.html">
                Demander les conditions
              </a>
            </div>
          </div>
          <div className="hero-visual">
            <figure className="hero-card">
              <img src="assets/Garage_exterieur/WhatsApp Image 2026-05-09 at 19.58.48.jpeg" alt="Pare-brise et services auto à Gisors" loading="eager" decoding="async" data-fallback="garage" />
              <figcaption>
                Bloc commercial clair, sans promesse floue.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>
      <section className="section-pad section-soft">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">
              Offre
            </p>
            <h2>
              Ce que nous vous proposons
            </h2>
            <p>
              Remplacement rapide, transparent et sans surprise. Appelez pour connaître vos options d'assurance et les conditions précises.
            </p>
          </div>
          <div className="service-grid">
            <article className="service-card">
              <span className="service-tag">
                Franchise
              </span>
              <h3>
                Franchise / assurance selon conditions
              </h3>
              <p>
                Vérifions ensemble votre contrat pour profiter de la franchise. Détails à l'atelier.
              </p>
            </article>
            <article className="service-card">
              <span className="service-tag">
                Offres
              </span>
              <h3>
                Cadeaux et tarifs spéciaux
              </h3>
              <p>
                Nous proposons des tarifs avantageux et des cadeaux client selon la saison. À confirmer lors de votre appel.
              </p>
            </article>
            <article className="service-card">
              <span className="service-tag">
                Rapidité
              </span>
              <h3>
                Dépannage du jour au lendemain
              </h3>
              <p>
                Contactez-nous pour connaître les délais. Nous faisons notre possible pour vous dépanner vite.
              </p>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}

export function PareBriseExtras({ info }: { info: SiteInfo }) {
  return (
    <>
      <div className="mobile-sticky-cta">
        <a href={phoneHref(info)}>
          Appeler
        </a>
        <a href={whatsappHref(info, "Bonjour Fast Detailing, je souhaite un devis.")} target="_blank" rel="noopener noreferrer">
          WhatsApp
        </a>
        <a href="contact.html">
          Devis
        </a>
      </div>
    </>
  );
}
