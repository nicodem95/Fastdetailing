/* eslint-disable react/no-unescaped-entities, @next/next/no-img-element */
import { pageContentText, pareBrisePage } from '@/lib/page-content';
import { phoneHref, whatsappHref, type SiteInfo } from '@/lib/site-content';

export function PareBriseContent({ info, content }: { info: SiteInfo; content: Record<string, string> }) {
  const t = (key: string) => pageContentText(pareBrisePage, content, key);
  return (
    <>
      <section className="hero section-pad">
        <div className="hero-bg"></div>
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Pare-brise</p>
            <h1>{t('hero.titre')}</h1>
            <p className="hero-text">{t('hero.texte')}</p>
            <div className="cta-row">
              <a className="btn btn-primary" href={phoneHref(info)}>Appeler maintenant</a>
              <a className="btn btn-secondary" href="contact.html">Demander les conditions</a>
            </div>
          </div>
          <div className="hero-visual">
            <figure className="hero-card">
              <img src="assets/Garage_exterieur/WhatsApp Image 2026-05-09 at 19.58.48.jpeg" alt="Pare-brise et services auto à Gisors" loading="eager" decoding="async" data-fallback="garage" />
              <figcaption>{t('hero.legende')}</figcaption>
            </figure>
          </div>
        </div>
      </section>
      <section className="section-pad section-soft">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Offre</p>
            <h2>{t('offre.titre')}</h2>
            <p>{t('offre.texte')}</p>
          </div>
          <div className="service-grid">
            {[0, 1, 2].map((i) => (
              <article className="service-card" key={i}>
                <span className="service-tag">{t(`carte.${i}.tag`)}</span>
                <h3>{t(`carte.${i}.titre`)}</h3>
                <p>{t(`carte.${i}.texte`)}</p>
              </article>
            ))}
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
