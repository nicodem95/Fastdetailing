/* eslint-disable react/no-unescaped-entities, @next/next/no-img-element */
import { phoneDigits, whatsappHref, type SiteInfo } from '@/lib/site-content';

export function AdministratifAssuranceContent({ info }: { info: SiteInfo }) {
  return (
    <>
      <section className="hero section-pad admin-hero">
        <div className="hero-bg"></div>
        <div className="container hero-grid">
          <div className="hero-copy reveal reveal-delay-1">
            <p className="eyebrow">
              Administratif & Assurance
            </p>
            <h1>
              Prise en charge administrative simplifiée
            </h1>
            <p className="hero-text">
              Fast Detailing vous accompagne dans les démarches d'assurance et la gestion de votre dossier bris de glace.
            </p>
            <div className="cta-row admin-hero-cta">
              <a className="btn btn-primary" href="contact.html#formulaire-devis">
                Nous contacter
              </a>
              {' '}
              <a className="btn btn-outline admin-whatsapp-btn" href={whatsappHref(info, "Bonjour Fast Detailing, je souhaite des informations sur la prise en charge administrative et assurance.")} target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
            </div>
          </div>
          <div className="hero-visual reveal reveal-delay-2">
            <figure className="hero-card admin-hero-media">
              <img src="assets/bureau/bureau1.jpeg" alt="Espace accueil client Fast Detailing" loading="eager" decoding="async" data-fallback="garage" />
              <figcaption>
                Un accueil clair et un accompagnement du dossier selon votre contrat d'assurance.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>
      <section className="section-pad admin-welcome" id="accueil-client">
        <div className="container admin-split reveal">
          <figure className="admin-photo-card">
            <img src="assets/bureau/bureau3.jpeg" alt="Salle d'attente avec canapé rouge" loading="lazy" decoding="async" data-fallback="garage" />
          </figure>
          <div className="admin-copy">
            <p className="eyebrow">
              Accueil client
            </p>
            <h2>
              Un accueil pensé pour votre confort
            </h2>
            <p>
              Pendant l'intervention sur votre véhicule, profitez d'un espace d'accueil confortable et d'un accompagnement personnalisé.
            </p>
            <ul className="admin-badges" aria-label="Services accueil client">
              <li>
                Wi-Fi
              </li>
              <li>
                Espace attente
              </li>
              <li>
                Conseils personnalisés
              </li>
              <li>
                Accompagnement dossier
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="section-pad section-soft admin-services" id="demarches-assurance">
        <div className="container">
          <div className="section-heading reveal">
            <p className="eyebrow">
              Démarches
            </p>
            <h2>
              Nous gérons les démarches pour vous
            </h2>
            <p>
              Notre équipe vous accompagne à chaque étape pour votre assurance bris de glace, avec une approche claire et transparente.
            </p>
          </div>
          <div className="admin-services-grid reveal reveal-delay-1">
            <figure className="admin-featured-photo">
              <img src="assets/bureau/bureau2.jpeg" alt="Bureau administratif Fast Detailing" loading="lazy" decoding="async" data-fallback="garage" />
            </figure>
            <div className="admin-cards-grid" aria-label="Accompagnement administratif et assurance">
              <article className="admin-service-card">
                <span className="admin-icon" aria-hidden="true">
                  ✓
                </span>
                <h3>
                  Vérification de votre assurance
                </h3>
                <p>
                  Analyse de votre dossier et de votre couverture selon votre contrat d'assurance.
                </p>
              </article>
              <article className="admin-service-card">
                <span className="admin-icon" aria-hidden="true">
                  ✓
                </span>
                <h3>
                  Gestion du dossier bris de glace
                </h3>
                <p>
                  Préparation des informations utiles et suivi de la demande de prise en charge assurance.
                </p>
              </article>
              <article className="admin-service-card">
                <span className="admin-icon" aria-hidden="true">
                  ✓
                </span>
                <h3>
                  Aide administrative
                </h3>
                <p>
                  Explications simples des étapes à prévoir et des documents utiles.
                </p>
              </article>
              <article className="admin-service-card">
                <span className="admin-icon" aria-hidden="true">
                  ✓
                </span>
                <h3>
                  Accompagnement franchise
                </h3>
                <p>
                  Lecture des conditions de franchise pare-brise et solutions possibles selon contrat.
                </p>
              </article>
              <article className="admin-service-card">
                <span className="admin-icon" aria-hidden="true">
                  ✓
                </span>
                <h3>
                  Suivi personnalisé
                </h3>
                <p>
                  Un interlocuteur local pour vous tenir informé avant, pendant et après intervention.
                </p>
              </article>
              <article className="admin-service-card">
                <span className="admin-icon" aria-hidden="true">
                  ✓
                </span>
                <h3>
                  Transparence des démarches
                </h3>
                <p>
                  Détail clair des étapes, prise en charge possible et rappel des conditions.
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>
      <section className="section-pad admin-steps" id="comment-ca-marche">
        <div className="container">
          <div className="section-heading reveal">
            <p className="eyebrow">
              Étapes
            </p>
            <h2>
              Comment ça fonctionne
            </h2>
            <p>
              Un parcours simple pour votre remplacement pare-brise et votre prise en charge assurance.
            </p>
          </div>
          <ol className="admin-timeline reveal reveal-delay-1" aria-label="Parcours client">
            <li>
              <span className="admin-step-number">
                1
              </span>
              <h3>
                Vous nous contactez
              </h3>
              <p>
                Téléphone, formulaire ou WhatsApp selon votre préférence.
              </p>
            </li>
            <li>
              <span className="admin-step-number">
                2
              </span>
              <h3>
                Nous vérifions votre assurance
              </h3>
              <p>
                Vérification des modalités de votre assurance bris de glace et de la franchise pare-brise.
              </p>
            </li>
            <li>
              <span className="admin-step-number">
                3
              </span>
              <h3>
                Intervention rapide
              </h3>
              <p>
                Réparation ou remplacement pare-brise planifié selon disponibilités et état du vitrage.
              </p>
            </li>
            <li>
              <span className="admin-step-number">
                4
              </span>
              <h3>
                Vous reprenez la route
              </h3>
              <p>
                Dossier suivi et conseils de fin d'intervention pour repartir sereinement.
              </p>
            </li>
          </ol>
        </div>
      </section>
      <section className="section-pad section-soft admin-trust" id="confiance">
        <div className="container reveal">
          <div className="admin-trust-card">
            <p className="eyebrow">
              Confiance locale
            </p>
            <h2>
              Un accompagnement humain et professionnel
            </h2>
            <p>
              Notre équipe vous accompagne avant, pendant et après l'intervention afin de simplifier vos démarches et vous faire gagner du temps.
            </p>
            <ul className="admin-trust-points" aria-label="Valeurs Fast Detailing">
              <li>
                Ambiance professionnelle
              </li>
              <li>
                Proximité
              </li>
              <li>
                Confiance
              </li>
              <li>
                Service local à Gisors
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="section-pad admin-seo-local" id="seo-local">
        <div className="container reveal">
          <div className="section-heading">
            <p className="eyebrow">
              Info locale
            </p>
            <h2>
              Assurance pare-brise et service local à Gisors
            </h2>
            <p>
              Fast Detailing à Gisors accompagne ses clients pour le remplacement et la réparation de pare-brise ainsi que les démarches administratives liées au bris de glace et aux assurances. Notre équipe vous renseigne sur la prise en charge assurance, la franchise pare-brise et les options possibles selon votre dossier pour un remplacement pare-brise à Gisors réalisé en toute clarté.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export function AdministratifAssuranceExtras({ info }: { info: SiteInfo }) {
  return (
    <>
      <div className="mobile-sticky-cta">
        <a href={`tel:${phoneDigits(info)}`}>
          Appeler
        </a>
        {' '}
        <a href={whatsappHref(info, "Bonjour Fast Detailing, je souhaite des informations sur l'assurance bris de glace.")} target="_blank" rel="noopener noreferrer">
          WhatsApp
        </a>
        {' '}
        <a href="contact.html#formulaire-devis">
          Devis
        </a>
      </div>
    </>
  );
}
