/* eslint-disable react/no-unescaped-entities, @next/next/no-img-element */
import { assuranceText } from '@/lib/assurance-content';
import { phoneDigits, whatsappHref, type SiteInfo } from '@/lib/site-content';

export function AdministratifAssuranceContent({ info, assurance }: { info: SiteInfo; assurance: Record<string, string> }) {
  const t = (key: string) => assuranceText(assurance, key);
  const range = (n: number) => Array.from({ length: n }, (_, i) => i);
  return (
    <>
      <section className="hero section-pad admin-hero">
        <div className="hero-bg"></div>
        <div className="container hero-grid">
          <div className="hero-copy reveal reveal-delay-1">
            <p className="eyebrow">Administratif & Assurance</p>
            <h1>{t('hero.titre')}</h1>
            <p className="hero-text">{t('hero.texte')}</p>
            <div className="cta-row admin-hero-cta">
              <a className="btn btn-primary" href="contact.html#formulaire-devis">Nous contacter</a>
              {' '}
              <a className="btn btn-outline admin-whatsapp-btn" href={whatsappHref(info, "Bonjour Fast Detailing, je souhaite des informations sur la prise en charge administrative et assurance.")} target="_blank" rel="noopener noreferrer">WhatsApp</a>
            </div>
          </div>
          <div className="hero-visual reveal reveal-delay-2">
            <figure className="hero-card admin-hero-media">
              <img src="assets/bureau/bureau1.jpeg" alt="Espace accueil client Fast Detailing" loading="eager" decoding="async" data-fallback="garage" />
              <figcaption>{t('hero.legende')}</figcaption>
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
            <p className="eyebrow">Accueil client</p>
            <h2>{t('accueil.titre')}</h2>
            <p>{t('accueil.texte')}</p>
            <ul className="admin-badges" aria-label="Services accueil client">
              {range(4).map((i) => <li key={i}>{t(`accueil.pastille.${i}`)}</li>)}
            </ul>
          </div>
        </div>
      </section>
      <section className="section-pad section-soft admin-services" id="demarches-assurance">
        <div className="container">
          <div className="section-heading reveal">
            <p className="eyebrow">Démarches</p>
            <h2>{t('demarches.titre')}</h2>
            <p>{t('demarches.texte')}</p>
          </div>
          <div className="admin-services-grid reveal reveal-delay-1">
            <figure className="admin-featured-photo">
              <img src="assets/bureau/bureau2.jpeg" alt="Bureau administratif Fast Detailing" loading="lazy" decoding="async" data-fallback="garage" />
            </figure>
            <div className="admin-cards-grid" aria-label="Accompagnement administratif et assurance">
              {range(6).map((i) => (
                <article className="admin-service-card" key={i}>
                  <span className="admin-icon" aria-hidden="true">✓</span>
                  <h3>{t(`demarches.carte.${i}.titre`)}</h3>
                  <p>{t(`demarches.carte.${i}.texte`)}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="section-pad admin-steps" id="comment-ca-marche">
        <div className="container">
          <div className="section-heading reveal">
            <p className="eyebrow">Étapes</p>
            <h2>{t('etapes.titre')}</h2>
            <p>{t('etapes.texte')}</p>
          </div>
          <ol className="admin-timeline reveal reveal-delay-1" aria-label="Parcours client">
            {range(4).map((i) => (
              <li key={i}>
                <span className="admin-step-number">{i + 1}</span>
                <h3>{t(`etapes.etape.${i}.titre`)}</h3>
                <p>{t(`etapes.etape.${i}.texte`)}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="section-pad section-soft admin-trust" id="confiance">
        <div className="container reveal">
          <div className="admin-trust-card">
            <p className="eyebrow">Confiance locale</p>
            <h2>{t('confiance.titre')}</h2>
            <p>{t('confiance.texte')}</p>
            <ul className="admin-trust-points" aria-label="Valeurs Fast Detailing">
              {range(4).map((i) => <li key={i}>{t(`confiance.valeur.${i}`)}</li>)}
            </ul>
          </div>
        </div>
      </section>
      <section className="section-pad admin-seo-local" id="seo-local">
        <div className="container reveal">
          <div className="section-heading">
            <p className="eyebrow">Info locale</p>
            <h2>{t('local.titre')}</h2>
            <p>{t('local.texte')}</p>
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
