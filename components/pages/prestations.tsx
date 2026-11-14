/* eslint-disable react/no-unescaped-entities, @next/next/no-img-element */
import { phoneHref, whatsappHref, type SiteInfo } from '@/lib/site-content';

export function PrestationsContent({ info }: { info: SiteInfo }) {
  return (
    <>
      <section className="hero section-pad">
        <div className="hero-bg"></div>
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">
              Prestations
            </p>
            <h1>
              Prestations de detailing auto à Gisors
            </h1>
            <p className="hero-text">
              Prestations de detailing à Gisors conçues pour un résultat visuel immédiat: intérieur soigné, carrosserie brillante, phares rénovés et vitres teintées premium.
            </p>
            <div className="cta-row">
              <a className="btn btn-primary" href="realisations.html">
                Voir les réalisations
              </a>
              {' '}
              <a className="btn btn-secondary" href="contact.html">
                Demander un devis
              </a>
            </div>
          </div>
          <div className="hero-visual">
            <figure className="hero-card">
              <img src="assets/Avant_Apres/10/BMW.jpeg" alt="Prestations Fast Detailing" loading="eager" decoding="async" data-fallback="garage" />
              <figcaption>
                Intervention propre, rapide et orientée résultat.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>
      <section className="section-pad section-soft">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">
              Services
            </p>
            <h2>
              Vos prestations principales
            </h2>
            <p>
              Une grille claire, compacte et premium pour identifier rapidement la bonne intervention.
            </p>
          </div>
          <div className="prestation-marketing-grid">
            <article className="prestation-intro-card">
              <h3>
                Des prestations pensées pour valoriser votre véhicule
              </h3>
              <p>
                Chaque intervention est réalisée avec une approche soignée pour améliorer l’apparence, le confort et la perception du véhicule.
              </p>
            </article>
            <article className="prestation-intro-card">
              <h3>
                Un résultat visible et durable
              </h3>
              <p>
                Des finitions propres et adaptées à un usage quotidien, une revente ou simplement le plaisir de retrouver un véhicule impeccable.
              </p>
            </article>
          </div>
          <div className="service-grid">
            <article className="service-card prestation-card">
              <span className="service-tag">
                Intérieur
              </span>
              <h3>
                <span className="service-icon" aria-hidden="true">
                  •
                </span>
                {' '}Nettoyage intérieur
              </h3>
              <p>
                Habitacle propre, sain et valorisant pour l'usage quotidien ou la revente.
              </p>
              <div className="service-footer">
                <a className="btn btn-secondary" href="contact.html">
                  Découvrir la prestation
                </a>
              </div>
            </article>
            <article className="service-card prestation-card">
              <span className="service-tag">
                Extérieur
              </span>
              <h3>
                <span className="service-icon" aria-hidden="true">
                  •
                </span>
                {' '}Nettoyage extérieur
              </h3>
              <p>
                Lavage manuel, jantes et finitions pour une carrosserie nette et brillante dès la sortie atelier.
              </p>
              <div className="service-footer">
                <a className="btn btn-secondary" href="realisations.html">
                  Voir les réalisations
                </a>
              </div>
            </article>
            <article className="service-card service-highlight prestation-card">
              <span className="service-tag">
                Premium
              </span>
              <h3>
                <span className="service-icon" aria-hidden="true">
                  •
                </span>
                {' '}Polish / lustrage
              </h3>
              <p>
                Correction visuelle des micro-défauts et brillance renforcée pour un effet showroom durable.
              </p>
              <div className="service-footer">
                <a className="btn btn-secondary" href="avant-apres.html">
                  Découvrir le rendu
                </a>
              </div>
            </article>
            <article className="service-card service-highlight prestation-card">
              <span className="service-tag">
                Optiques
              </span>
              <h3>
                <span className="service-icon" aria-hidden="true">
                  •
                </span>
                {' '}Rénovation optiques
              </h3>
              <p>
                Optiques éclaircies et look rajeuni pour améliorer l'esthétique et la sécurité de conduite.
              </p>
              <div className="service-footer">
                <a className="btn btn-secondary" href="avant-apres.html">
                  Voir un exemple
                </a>
              </div>
            </article>
            <article className="service-card service-highlight prestation-card">
              <span className="service-tag">
                Protection
              </span>
              <h3>
                <span className="service-icon" aria-hidden="true">
                  •
                </span>
                {' '}Vitres teintées
              </h3>
              <p>
                Confort thermique, intimité et style premium avec une pose soignée conforme à vos besoins.
              </p>
              <div className="service-footer">
                <a className="btn btn-secondary" href="contact.html">
                  En savoir plus
                </a>
              </div>
            </article>
            <article className="service-card service-highlight prestation-card">
              <span className="service-tag">
                Pare-brise
              </span>
              <h3>
                <span className="service-icon" aria-hidden="true">
                  •
                </span>
                {' '}Franchise offerte
              </h3>
              <p>
                Solution pare-brise avec accompagnement assurance et franchise offerte selon conditions.
              </p>
              <div className="service-footer">
                <a className="btn btn-secondary" href="pare-brise.html">
                  En savoir plus
                </a>
              </div>
            </article>
            <article className="service-card prestation-card">
              <span className="service-tag">
                Deux-roues
              </span>
              <h3>
                <span className="service-icon" aria-hidden="true">
                  •
                </span>
                {' '}Moto detailing
              </h3>
              <p>
                Nettoyage précis et finitions adaptées pour redonner un rendu propre et net à votre moto.
              </p>
              <div className="service-footer">
                <a className="btn btn-secondary" href="contact.html">
                  Demander un devis
                </a>
              </div>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}

export function PrestationsExtras({ info }: { info: SiteInfo }) {
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
