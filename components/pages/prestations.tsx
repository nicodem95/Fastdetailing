/* eslint-disable react/no-unescaped-entities, @next/next/no-img-element */
import { pageContentText, prestationsPage } from '@/lib/page-content';
import { phoneHref, whatsappHref, type SiteInfo } from '@/lib/site-content';
import { sitePhoto } from '@/lib/site-photos';

const cardMeta = [
  { href: 'contact.html', highlight: false },
  { href: 'realisations.html', highlight: false },
  { href: 'avant-apres.html', highlight: true },
  { href: 'avant-apres.html', highlight: true },
  { href: 'contact.html', highlight: true },
  { href: 'pare-brise.html', highlight: true },
  { href: 'contact.html', highlight: false },
];

export function PrestationsContent({ info, content, photos }: { info: SiteInfo; content: Record<string, string>; photos: Record<string, string> }) {
  const t = (key: string) => pageContentText(prestationsPage, content, key);
  return (
    <>
      <section className="hero section-pad">
        <div className="hero-bg"></div>
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Prestations</p>
            <h1>{t('hero.titre')}</h1>
            <p className="hero-text">{t('hero.texte')}</p>
            <div className="cta-row">
              <a className="btn btn-primary" href="realisations.html">Voir les réalisations</a>
              {' '}
              <a className="btn btn-secondary" href="contact.html">Demander un devis</a>
            </div>
          </div>
          <div className="hero-visual">
            <figure className="hero-card">
              <img src={sitePhoto(photos, 'prestations.hero')} alt="Prestations Fast Detailing" loading="eager" decoding="async" data-fallback="garage" />
              <figcaption>{t('hero.legende')}</figcaption>
            </figure>
          </div>
        </div>
      </section>
      <section className="section-pad section-soft">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Services</p>
            <h2>{t('services.titre')}</h2>
            <p>{t('services.texte')}</p>
          </div>
          <div className="prestation-marketing-grid">
            {[0, 1].map((i) => (
              <article className="prestation-intro-card" key={i}>
                <h3>{t(`intro.${i}.titre`)}</h3>
                <p>{t(`intro.${i}.texte`)}</p>
              </article>
            ))}
          </div>
          <div className="service-grid">
            {cardMeta.map((meta, i) => (
              <article className={`service-card${meta.highlight ? ' service-highlight' : ''} prestation-card`} key={i}>
                <span className="service-tag">{t(`carte.${i}.tag`)}</span>
                <h3>
                  <span className="service-icon" aria-hidden="true">•</span>
                  {' '}{t(`carte.${i}.titre`)}
                </h3>
                <p>{t(`carte.${i}.texte`)}</p>
                <div className="service-footer">
                  <a className="btn btn-secondary" href={meta.href}>{t(`carte.${i}.bouton`)}</a>
                </div>
              </article>
            ))}
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
