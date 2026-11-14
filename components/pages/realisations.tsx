/* eslint-disable react/no-unescaped-entities, @next/next/no-img-element */
import { pageContentText, realisationsPage } from '@/lib/page-content';
import { phoneHref, whatsappHref, type SiteInfo } from '@/lib/site-content';

export function RealisationsContent({ info, content }: { info: SiteInfo; content: Record<string, string> }) {
  const t = (key: string) => pageContentText(realisationsPage, content, key);
  return (
    <>
      <section className="hero section-pad">
        <div className="hero-bg"></div>
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">
              Réalisations
            </p>
            <h1>{t('hero.titre')}</h1>
            <p className="hero-text">{t('hero.texte')}</p>
            <div className="cta-row">
              <a className="btn btn-primary" href="contact.html">
                Demander un devis
              </a>
              <a className="btn btn-secondary" href={whatsappHref(info, "Bonjour Fast Detailing, je souhaite un devis.")} target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
            </div>
          </div>
          <div className="hero-visual">
            <figure className="hero-card">
              <img src="assets/Garage_exterieur/WhatsApp Image 2026-05-09 at 19.58.49 (2).jpeg" alt="Réalisations Fast Detailing" loading="eager" decoding="async" data-fallback="garage" />
              <figcaption>{t('hero.legende')}</figcaption>
            </figure>
          </div>
        </div>
      </section>
      <section className="section-pad section-soft">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">
              Galerie
            </p>
            <h2>{t('section.titre')}</h2>
            <p>{t('section.texte')}</p>
          </div>
          <div className="filter-bar" role="tablist" aria-label="Filtres des réalisations">
            <button className="filter-btn is-active" type="button" data-filter="all">
              Tout
            </button>
            <button className="filter-btn" type="button" data-filter="interieur">
              Intérieur
            </button>
            <button className="filter-btn" type="button" data-filter="exterieur">
              Extérieur
            </button>
            <button className="filter-btn" type="button" data-filter="polish">
              Polish
            </button>
            <button className="filter-btn" type="button" data-filter="phares">
              Phares
            </button>
            <button className="filter-btn" type="button" data-filter="moto">
              Moto
            </button>
          </div>
          <div className="gallery-grid gallery-grid-premium gallery-masonry" id="galleryGrid">
            <figure className="gallery-card" data-category="interieur">
              <img src="assets/Interieur_Voiture/WhatsApp Image 2026-05-09 at 19.50.35.jpeg" alt="Nettoyage intérieur voiture à Gisors" loading="lazy" decoding="async" data-fallback="interieur" />
              <figcaption>
                Intérieur
              </figcaption>
            </figure>
            <figure className="gallery-card" data-category="interieur">
              <img src="assets/Sieges/apres.jpeg" alt="Rénovation des sièges véhicule" loading="lazy" decoding="async" data-fallback="sieges" />
              <figcaption>
                Sièges
              </figcaption>
            </figure>
            <figure className="gallery-card" data-category="exterieur">
              <img src="assets/Garage_exterieur/WhatsApp Image 2026-05-09 at 19.58.49 (2).jpeg" alt="Nettoyage extérieur véhicule" loading="lazy" decoding="async" data-fallback="exterieur" />
              <figcaption>
                Extérieur
              </figcaption>
            </figure>
            <figure className="gallery-card" data-category="polish">
              <img src="assets/Avant_Apres/10/WhatsApp Image 2026-05-09 at 19.42.21.jpeg" alt="Polish et lustrage de carrosserie" loading="lazy" decoding="async" data-fallback="exterieur" />
              <figcaption>
                Polish
              </figcaption>
            </figure>
            <figure className="gallery-card" data-category="phares">
              <img src="assets/Phares/WhatsApp Image 2026-05-09 at 19.41.11.jpeg" alt="Rénovation optiques et phares" loading="lazy" decoding="async" data-fallback="phares" />
              <figcaption>
                Phares
              </figcaption>
            </figure>
            <figure className="gallery-card" data-category="moto">
              <img src="assets/Moto/moto-renovee.jpg" alt="Nettoyage moto detailing" loading="lazy" decoding="async" data-fallback="moto" />
              <figcaption>
                Moto
              </figcaption>
            </figure>
            <figure className="gallery-card" data-category="phares">
              <img src="assets/Phares/WhatsApp Image 2026-05-09 at 19.41.13.jpeg" alt="Phare rénové en détail" loading="lazy" decoding="async" data-fallback="phares" />
              <figcaption>
                Phares
              </figcaption>
            </figure>
            <figure className="gallery-card" data-category="phares">
              <img src="assets/Phares/WhatsApp Image 2026-05-09 at 19.42.14.jpeg" alt="Rénovation optique avant après" loading="lazy" decoding="async" data-fallback="phares" />
              <figcaption>
                Optiques
              </figcaption>
            </figure>
            <figure className="gallery-card" data-category="phares">
              <img src="assets/Phares/WhatsApp Image 2026-05-09 at 19.42.14 (1).jpeg" alt="Phares rénovés Fast Detailing" loading="lazy" decoding="async" data-fallback="phares" />
              <figcaption>
                Phares
              </figcaption>
            </figure>
            <figure className="gallery-card" data-category="phares">
              <img src="assets/Phares/WhatsApp Image 2026-05-09 at 19.50.40 (1).jpeg" alt="Photo de phare rénové" loading="lazy" decoding="async" data-fallback="phares" />
              <figcaption>
                Phares
              </figcaption>
            </figure>
            <figure className="gallery-card" data-category="phares">
              <img src="assets/Phares/WhatsApp Image 2026-05-09 at 19.50.40 (2).jpeg" alt="Rénovation phare voiture" loading="lazy" decoding="async" data-fallback="phares" />
              <figcaption>
                Phares
              </figcaption>
            </figure>
            <figure className="gallery-card" data-category="phares">
              <img src="assets/Phares/WhatsApp Image 2026-05-09 at 19.50.40 (3).jpeg" alt="Phare rénové et brillant" loading="lazy" decoding="async" data-fallback="phares" />
              <figcaption>
                Phares
              </figcaption>
            </figure>
            <figure className="gallery-card" data-category="phares">
              <img src="assets/Phares/WhatsApp Image 2026-05-09 at 19.50.40 (4).jpeg" alt="Rénovation optique finale" loading="lazy" decoding="async" data-fallback="phares" />
              <figcaption>
                Phares
              </figcaption>
            </figure>
            <figure className="gallery-card" data-category="exterieur">
              <img src="assets/Garage_exterieur/WhatsApp Image 2026-05-09 at 19.41.03.jpeg" alt="Préparation véhicule extérieur" loading="lazy" decoding="async" data-fallback="exterieur" />
              <figcaption>
                Préparation
              </figcaption>
            </figure>
          </div>
        </div>
      </section>
    </>
  );
}

export function RealisationsExtras({ info }: { info: SiteInfo }) {
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
      <div className="lightbox" id="galleryLightbox" aria-hidden="true">
        <button className="lightbox-close" type="button" aria-label="Fermer">
          Fermer
        </button>
        <img className="lightbox-image" src="" alt="Agrandissement photo réalisation" />
      </div>
    </>
  );
}
