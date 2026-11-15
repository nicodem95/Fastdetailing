/* eslint-disable react/no-unescaped-entities, @next/next/no-img-element */
import { loadGalleryItems, type GalleryItem } from '@/lib/gallery';
import { phoneHref, whatsappHref, type SiteInfo } from '@/lib/site-content';
import { sitePhoto } from '@/lib/site-photos';

const fallbackKind: Record<string, string> = { interieur: 'interieur', exterieur: 'exterieur', polish: 'exterieur', phares: 'phares', moto: 'moto' };

const defaultGallery: GalleryItem[] = [
  { category: 'interieur', src: 'assets/Interieur_Voiture/WhatsApp Image 2026-05-09 at 19.50.35.jpeg', alt: 'Nettoyage intérieur voiture à Gisors', caption: 'Intérieur' },
  { category: 'interieur', src: 'assets/Sieges/apres.jpeg', alt: 'Rénovation des sièges véhicule', caption: 'Sièges' },
  { category: 'exterieur', src: 'assets/Garage_exterieur/WhatsApp Image 2026-05-09 at 19.58.49 (2).jpeg', alt: 'Nettoyage extérieur véhicule', caption: 'Extérieur' },
  { category: 'polish', src: 'assets/Avant_Apres/10/WhatsApp Image 2026-05-09 at 19.42.21.jpeg', alt: 'Polish et lustrage de carrosserie', caption: 'Polish' },
  { category: 'phares', src: 'assets/Phares/WhatsApp Image 2026-05-09 at 19.41.11.jpeg', alt: 'Rénovation optiques et phares', caption: 'Phares' },
  { category: 'moto', src: 'assets/Moto/moto-renovee.jpg', alt: 'Nettoyage moto detailing', caption: 'Moto' },
  { category: 'phares', src: 'assets/Phares/WhatsApp Image 2026-05-09 at 19.41.13.jpeg', alt: 'Phare rénové en détail', caption: 'Phares' },
  { category: 'phares', src: 'assets/Phares/WhatsApp Image 2026-05-09 at 19.42.14.jpeg', alt: 'Rénovation optique avant après', caption: 'Optiques' },
  { category: 'phares', src: 'assets/Phares/WhatsApp Image 2026-05-09 at 19.42.14 (1).jpeg', alt: 'Phares rénovés Fast Detailing', caption: 'Phares' },
  { category: 'phares', src: 'assets/Phares/WhatsApp Image 2026-05-09 at 19.50.40 (1).jpeg', alt: 'Photo de phare rénové', caption: 'Phares' },
  { category: 'phares', src: 'assets/Phares/WhatsApp Image 2026-05-09 at 19.50.40 (2).jpeg', alt: 'Rénovation phare voiture', caption: 'Phares' },
  { category: 'phares', src: 'assets/Phares/WhatsApp Image 2026-05-09 at 19.50.40 (3).jpeg', alt: 'Phare rénové et brillant', caption: 'Phares' },
  { category: 'phares', src: 'assets/Phares/WhatsApp Image 2026-05-09 at 19.50.40 (4).jpeg', alt: 'Rénovation optique finale', caption: 'Phares' },
  { category: 'exterieur', src: 'assets/Garage_exterieur/WhatsApp Image 2026-05-09 at 19.41.03.jpeg', alt: 'Préparation véhicule extérieur', caption: 'Préparation' },
];

export async function RealisationsContent({ info, photos }: { info: SiteInfo; photos: Record<string, string> }) {
  const fromDatabase = await loadGalleryItems();
  const gallery = fromDatabase.length ? fromDatabase : defaultGallery;

  return (
    <>
      <section className="hero section-pad">
        <div className="hero-bg"></div>
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">
              Réalisations
            </p>
            <h1>
              Résultats réels de detailing à Gisors
            </h1>
            <p className="hero-text">
              Avant de demander un devis, regardez les finitions réelles sur intérieur, carrosserie, polish et rénovation phare. Chaque photo provient de l'atelier Fast Detailing.
            </p>
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
              <img src={sitePhoto(photos, 'realisations.hero')} alt="Réalisations Fast Detailing" loading="eager" decoding="async" data-fallback="garage" />
              <figcaption>
                Des résultats visibles, triés par type d’intervention.
              </figcaption>
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
            <h2>
              Photos classées par catégorie
            </h2>
            <p>
              Filtrez rapidement les travaux qui vous intéressent pour évaluer le niveau de finition avant votre prise de contact.
            </p>
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
          <div className="gallery-grid gallery-grid-premium" id="galleryGrid">
            {gallery.map((item, index) => (
              <figure className="gallery-card" data-category={item.category} key={`${item.src}-${index}`}>
                <img src={item.src} alt={item.alt} loading="lazy" decoding="async" data-fallback={fallbackKind[item.category] ?? 'exterieur'} />
                <figcaption>
                  {item.caption}
                </figcaption>
              </figure>
            ))}
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
