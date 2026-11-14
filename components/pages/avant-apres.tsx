/* eslint-disable react/no-unescaped-entities, @next/next/no-img-element */
import { loadBeforeAfterCards } from '@/lib/before-after-cards';
import { phoneHref, whatsappHref, type SiteInfo } from '@/lib/site-content';
import { sitePhoto } from '@/lib/site-photos';

export async function AvantApresContent({ info, photos }: { info: SiteInfo; photos: Record<string, string> }) {
  const cards = await loadBeforeAfterCards();
  return (
    <>
      <section className="hero section-pad">
        <div className="hero-bg"></div>
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">
              Avant / Après
            </p>
            <h1>
              Des transformations visibles, sans flou ni distraction
            </h1>
            <p className="hero-text">
              Le comparatif avant/après est la meilleure preuve de qualité pour le detailing. Cette page sert à montrer les résultats sur l’intérieur, les phares, l’extérieur et la moto.
            </p>
            <div className="cta-row">
              <a className="btn btn-primary" href="contact.html">
                Demander un devis
              </a>
              <a className="btn btn-secondary" href="realisations.html">
                Voir la galerie
              </a>
            </div>
          </div>
          <div className="hero-visual">
            <figure className="hero-card">
              <img src={sitePhoto(photos, 'avantapres.hero')} alt="Exemple avant après Fast Detailing" loading="eager" decoding="async" data-fallback="exterieur" />
              <figcaption>
                Slider interactif et lecture immédiate du résultat.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>
      <section className="section-pad section-soft">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">
              Comparatifs
            </p>
            <h2>
              Exemples de transformations
            </h2>
            <p>
              Affichage avant/après en côte à côte pour lire clairement le résultat, même quand les cadrages ne sont pas strictement identiques.
            </p>
          </div>
          <div className="before-after-grid" id="beforeAfterGrid">
            {cards.length ? cards.map(({ item, before, after }) => (
              <article className="before-after-card" data-before-after="" key={item.id}>
                <div className="before-after-media">
                  <img className="media-before" src={before.url} alt={`Avant ${item.titre}`} loading="lazy" decoding="async" />
                  <img className="media-after" src={after.url} alt={`Après ${item.titre}`} loading="lazy" decoding="async" />
                  <div className="before-after-separator" aria-hidden="true"></div>
                  <div className="before-label">Avant</div>
                  <div className="after-label">Après</div>
                  <input className="before-after-range" type="range" min="0" max="100" defaultValue="50" aria-label="Ajuster la comparaison avant après" />
                </div>
                <div className="before-after-copy">
                  <h3>{item.titre}</h3>
                  {item.description ? <p>{item.description}</p> : null}
                </div>
              </article>
            )) : (
              <>
            <article className="before-after-card" data-before-after="">
              <div className="before-after-media">
                <img className="media-before" src="assets/Interieur_Voiture/avant.jpeg" alt="Avant nettoyage intérieur habitacle" loading="lazy" decoding="async" data-fallback="interieur" />
                <img className="media-after" src="assets/Interieur_Voiture/apres.jpeg" alt="Après nettoyage intérieur habitacle" loading="lazy" decoding="async" data-fallback="interieur" />
                <div className="before-after-separator" aria-hidden="true"></div>
                <div className="before-label">
                  Avant
                </div>
                <div className="after-label">
                  Après
                </div>
                <input className="before-after-range" type="range" min="0" max="100" defaultValue="56" aria-label="Ajuster la comparaison avant après" />
              </div>
              <div className="before-after-copy">
                <h3>
                  Intérieur voiture
                </h3>
                <p>
                  Habitacle complet nettoyé: tableau de bord, plastiques, sol et poste de conduite retrouvent un rendu propre et soigné.
                </p>
              </div>
            </article>
            <article className="before-after-card" data-before-after="">
              <div className="before-after-media">
                <img className="media-before" src="assets/Phares/WhatsApp Image 2026-05-09 at 19.41.13.jpeg" alt="Avant rénovation des phares avec optique très opaque" loading="lazy" decoding="async" data-fallback="phares" />
                <img className="media-after" src="assets/Phares/WhatsApp Image 2026-05-09 at 19.41.11.jpeg" alt="Après rénovation des phares avec optique clarifiée" loading="lazy" decoding="async" data-fallback="phares" />
                <div className="before-after-separator" aria-hidden="true"></div>
                <div className="before-label">
                  Avant
                </div>
                <div className="after-label">
                  Après
                </div>
                <input className="before-after-range" type="range" min="0" max="100" defaultValue="52" aria-label="Ajuster la comparaison avant après" />
              </div>
              <div className="before-after-copy">
                <h3>
                  Rénovation phares
                </h3>
                <p>
                  Phare très terni restauré avec un résultat net, plus transparent et plus valorisant visuellement.
                </p>
              </div>
            </article>
            <article className="before-after-card" data-before-after="">
              <div className="before-after-media">
                <img className="media-before" src="assets/Avant_Apres/9/avant.jpeg" alt="Avant nettoyage carrosserie extérieure" loading="lazy" decoding="async" data-fallback="exterieur" />
                <img className="media-after" src="assets/Avant_Apres/9/apres.jpeg" alt="Après nettoyage carrosserie extérieure" loading="lazy" decoding="async" data-fallback="exterieur" />
                <div className="before-after-separator" aria-hidden="true"></div>
                <div className="before-label">
                  Avant
                </div>
                <div className="after-label">
                  Après
                </div>
                <input className="before-after-range" type="range" min="0" max="100" defaultValue="48" aria-label="Ajuster la comparaison avant après" />
              </div>
              <div className="before-after-copy">
                <h3>
                  Carrosserie
                </h3>
                <p>
                  Carrosserie ravivée avec une brillance plus nette et une finition visiblement plus propre sur l'ensemble du véhicule.
                </p>
              </div>
            </article>
            <article className="before-after-card" data-before-after="">
              <div className="before-after-media">
                <img className="media-before" src="assets/Sieges/avant.jpeg" alt="Avant nettoyage des sièges" loading="lazy" decoding="async" data-fallback="sieges" />
                <img className="media-after" src="assets/Sieges/apres.jpeg" alt="Après nettoyage des sièges" loading="lazy" decoding="async" data-fallback="sieges" />
                <div className="before-after-separator" aria-hidden="true"></div>
                <div className="before-label">
                  Avant
                </div>
                <div className="after-label">
                  Après
                </div>
                <input className="before-after-range" type="range" min="0" max="100" defaultValue="58" aria-label="Ajuster la comparaison avant après" />
              </div>
              <div className="before-after-copy">
                <h3>
                  Sièges
                </h3>
                <p>
                  Rénovation textile et nettoyage en profondeur pour retrouver des assises nettes et uniformes.
                </p>
              </div>
            </article>
            <article className="before-after-card" data-before-after="">
              <div className="before-after-media">
                <img className="media-before" src="assets/Avant_Apres/6/avant.jpeg" alt="Avant nettoyage compartiment moteur" loading="lazy" decoding="async" data-fallback="exterieur" />
                <img className="media-after" src="assets/Avant_Apres/6/apres.jpeg" alt="Après nettoyage compartiment moteur" loading="lazy" decoding="async" data-fallback="exterieur" />
                <div className="before-after-separator" aria-hidden="true"></div>
                <div className="before-label">
                  Avant
                </div>
                <div className="after-label">
                  Après
                </div>
                <input className="before-after-range" type="range" min="0" max="100" defaultValue="50" aria-label="Ajuster la comparaison avant après" />
              </div>
              <div className="before-after-copy">
                <h3>
                  Compartiment moteur
                </h3>
                <p>
                  Nettoyage détaillé du compartiment moteur pour un rendu propre, net et valorisant à l'ouverture du capot.
                </p>
              </div>
            </article>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export function AvantApresExtras({ info }: { info: SiteInfo }) {
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
