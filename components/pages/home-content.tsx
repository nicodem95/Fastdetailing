/* eslint-disable react/no-unescaped-entities, @next/next/no-img-element */
import { hoursGroups, phoneHref, textFields, whatsappHref, zonesText, type SiteInfo } from '@/lib/site-content';
import { sitePhoto } from '@/lib/site-photos';

const icon = { viewBox: '0 0 24 24', role: 'presentation', focusable: 'false' } as const;
const line = { fill: 'none', stroke: 'currentColor', strokeWidth: 2 } as const;

function text(texts: Record<string, string>, key: string) {
  return texts[key] || textFields.find((field) => field.key === key)?.defaultValue || '';
}

export function HomeContent({ info, texts, photos }: { info: SiteInfo; texts: Record<string, string>; photos: Record<string, string> }) {
  const zones = zonesText(info);
  const whatsappRdv = whatsappHref(info, 'Bonjour Fast Detailing, je souhaite prendre rendez-vous pour mon pare-brise.');

  return (
    <>
      <section className="hero hero-cinematic hero-editorial hero-windshield hero-windshield-slim section-pad">
        <div className="hero-bg"></div>
        <div className="container hero-grid">
          <div className="hero-copy reveal reveal-delay-1">
            <p className="eyebrow">Pare-brise et vitrage auto Gisors</p>
            <h1>{text(texts, 'accueil-titre')}</h1>
            <p className="hero-text">{text(texts, 'accueil-texte')}</p>
            <div className="cta-row hero-slim-cta">
              <a className="btn btn-primary" href="contact.html#formulaire-devis">Prendre rendez-vous</a>
              <a className="btn btn-outline" href={whatsappRdv} target="_blank" rel="noopener noreferrer">Nous contacter sur WhatsApp</a>
            </div>
          </div>

          <div className="hero-visual reveal reveal-delay-2">
            <figure className="hero-card">
              <img src={sitePhoto(photos, 'accueil.hero')} alt="Remplacement pare-brise a Gisors" loading="eager" decoding="async" data-fallback="garage" />
              <figcaption>Intervention soignée, accompagnement assurance et suivi clair.</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="section-pad home-assurance-compact" id="assurance-simplifiee">
        <div className="container reveal">
          <article className="home-assurance-panel">
            <div className="home-assurance-content">
              <p className="home-assurance-kicker">{text(texts, 'offre-etiquette')}</p>
              <p className="home-assurance-offer">
                <span className="home-assurance-offer-line">{text(texts, 'offre-ligne1')}</span>
                <span className="home-assurance-offer-plus" aria-hidden="true">+</span>
                <span className="home-assurance-offer-line home-assurance-offer-line-plus">{text(texts, 'offre-ligne2')}</span>
              </p>
              <p className="home-assurance-note">{text(texts, 'offre-note')}</p>
              <h2>{text(texts, 'offre-titre')}</h2>
              <p className="home-assurance-support">{text(texts, 'offre-texte')}</p>
            </div>
            <a className="btn btn-secondary home-assurance-cta" href="administratif.html">{text(texts, 'offre-bouton')}</a>
          </article>
        </div>
      </section>

      <section className="section-pad section-soft home-reassurance" id="reassurance-rapide">
        <div className="container">
          <div className="section-heading reveal">
            <p className="eyebrow">Réassurance rapide</p>
            <h2>L'essentiel, tout de suite</h2>
          </div>
          <div className="home-reassurance-grid reveal reveal-delay-1">
            <article className="home-reassurance-card">
              <span className="home-reassurance-icon" aria-hidden="true">
                <svg {...icon}><path d="M12 7v5l3 2" {...line} strokeLinecap="round" strokeLinejoin="round" /><circle cx="12" cy="12" r="9" {...line} /></svg>
              </span>
              <h3>Intervention rapide</h3>
              <p>Créneaux planifiés au plus vite selon disponibilités.</p>
            </article>
            <article className="home-reassurance-card">
              <span className="home-reassurance-icon" aria-hidden="true">
                <svg {...icon}><path d="M12 3 5 6v5c0 4.2 2.8 7.9 7 9 4.2-1.1 7-4.8 7-9V6Z" {...line} strokeLinejoin="round" /></svg>
              </span>
              <h3>Accompagnement assurance</h3>
              <p>Aide claire sur les démarches bris de glace.</p>
            </article>
            <article className="home-reassurance-card">
              <span className="home-reassurance-icon" aria-hidden="true">
                <svg {...icon}><path d="M12 21c4-4.2 6-7 6-10a6 6 0 1 0-12 0c0 3 2 5.8 6 10Z" {...line} strokeLinejoin="round" /><circle cx="12" cy="11" r="2" {...line} /></svg>
              </span>
              <h3>Service local à Gisors</h3>
              <p>Intervention à Gisors et aux alentours.</p>
            </article>
            <article className="home-reassurance-card">
              <span className="home-reassurance-icon" aria-hidden="true">
                <svg {...icon}>
                  <path d="M8 11a2 2 0 1 1 0-4 2 2 0 0 1 0 4Zm8 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z" {...line} />
                  <path d="M4 17c1.4-2 3.1-3 5-3s3.6 1 5 3M10 17c1.4-2 3.1-3 5-3s3.6 1 5 3" {...line} strokeLinecap="round" />
                </svg>
              </span>
              <h3>Accueil professionnel</h3>
              <p>Conseils humains et suivi personnalisé.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section-pad section-soft section-windshield-intro" id="vitrage-gisors">
        <div className="container">
          <div className="section-heading reveal">
            <p className="eyebrow">Comment ça fonctionne</p>
            <h2>4 étapes simples</h2>
            <p>Un parcours rapide pour votre remplacement pare-brise à Gisors et la vérification assurance.</p>
          </div>
          <ol className="home-steps-timeline reveal reveal-delay-1" aria-label="Étapes de prise en charge">
            <li className="home-step-card"><span>1</span><h3>Vous nous contactez</h3><p>Téléphone, formulaire ou WhatsApp.</p></li>
            <li className="home-step-card"><span>2</span><h3>Vérification assurance</h3><p>Analyse des modalités selon contrat.</p></li>
            <li className="home-step-card"><span>3</span><h3>Intervention rapide</h3><p>Réparation ou remplacement pare-brise.</p></li>
            <li className="home-step-card"><span>4</span><h3>Vous reprenez la route</h3><p>Véhicule prêt et dossier clarifié.</p></li>
          </ol>
        </div>
      </section>

      <section id="avis" className="reviews-section section-pad section-soft" aria-labelledby="reviews-title">
        <div className="reviews-container container">
          <div className="reviews-header reveal">
            <p className="reviews-badge">⭐ 5/5 sur Google · Avis clients vérifiés</p>
            <h2 id="reviews-title">Ils nous font confiance</h2>
            <p className="reviews-subtitle">Des clients satisfaits à Gisors et aux alentours. Avis clients Fast Detailing Gisors autour du detailing automobile Gisors et de la rénovation automobile Gisors.</p>
          </div>

          <div id="reviews-list" className="reviews-grid reveal reveal-delay-1" aria-live="polite"></div>

          <noscript>
            <p>Activez JavaScript pour afficher les avis clients Google.</p>
          </noscript>

          <div className="cta-row reveal reveal-delay-2">
            <a className="btn btn-secondary" href="https://www.google.com/maps/search/Fast+Detailing+Gisors" target="_blank" rel="noopener noreferrer">Voir les avis Google</a>
          </div>
        </div>
      </section>

      <section className="section-pad" id="contact-rapide">
        <div className="container">
          <div className="section-heading reveal">
            <p className="eyebrow">Contact</p>
            <h2>Contact rapide</h2>
            <p>{text(texts, 'accueil-contact')}</p>
          </div>
          <div className="quick-contact-grid reveal reveal-delay-1">
            <article className="quick-contact-card">
              <h3>Téléphone</h3>
              <p><a href={phoneHref(info)}>{info.telephone}</a></p>
            </article>
            <article className="quick-contact-card">
              <h3>WhatsApp</h3>
              <p><a href={whatsappHref(info, 'Bonjour Fast Detailing, je souhaite un devis.')} target="_blank" rel="noopener noreferrer">Envoyer un message</a></p>
            </article>
            <article className="quick-contact-card">
              <h3>Horaires</h3>
              {hoursGroups(info).map((group) => <p key={group.days}>{group.days}<br />{group.hours}</p>)}
            </article>
            <article className="quick-contact-card">
              <h3>Zone d'intervention</h3>
              <p>{zones.comma}</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section-pad section-soft home-secondary" id="preuves">
        <div className="container">
          <div className="section-heading reveal">
            <p className="eyebrow">Plus d'infos</p>
            <h2>Nos autres prestations auto</h2>
            <p>Le pare-brise reste la priorité. Retrouvez ici nos autres prestations complémentaires.</p>
          </div>

          <div className="service-grid service-grid-premium reveal reveal-delay-1">
            <article className="service-card">
              <span className="service-tag">Prestations</span>
              <h3>Voir toutes les prestations</h3>
              <p>Nettoyage intérieur, extérieur, polish, optiques, vitres teintées et moto.</p>
              <div className="service-footer">
                <a className="btn btn-secondary" href="prestations.html">Ouvrir la page</a>
              </div>
            </article>
            <article className="service-card">
              <span className="service-tag">Réalisations</span>
              <h3>Galerie filtrable</h3>
              <p>Toutes les photos classées par type d’intervention pour une consultation rapide.</p>
              <div className="service-footer">
                <a className="btn btn-secondary" href="realisations.html">Ouvrir la page</a>
              </div>
            </article>
            <article className="service-card">
              <span className="service-tag">Avant / Après</span>
              <h3>Comparatifs interactifs</h3>
              <p>Glissez le curseur sur des interventions réelles pour juger la qualité des finitions.</p>
              <div className="service-footer">
                <a className="btn btn-secondary" href="avant-apres.html">Ouvrir la page</a>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="section-pad home-secondary">
        <div className="container">
          <div className="section-heading reveal">
            <p className="eyebrow">Photos réelles</p>
            <h2>Un aperçu de nos finitions detailing</h2>
            <p>Une sélection courte de photos authentiques pour montrer la qualité du travail.</p>
          </div>

          <div className="gallery-grid gallery-grid-featured reveal reveal-delay-1">
            <figure className="gallery-card"><img src={sitePhoto(photos, 'accueil.galerie.0')} alt="Reflets sur carrosserie après detailing à Gisors" loading="lazy" decoding="async" data-fallback="garage" /><figcaption>Reflets après detailing</figcaption></figure>
            <figure className="gallery-card"><img src={sitePhoto(photos, 'accueil.galerie.1')} alt="Véhicule premium dans l'atelier Fast Detailing" loading="lazy" decoding="async" data-fallback="garage" /><figcaption>Atelier & véhicule premium</figcaption></figure>
            <figure className="gallery-card"><img src={sitePhoto(photos, 'accueil.galerie.2')} alt="Voiture rénovée avec finition brillante" loading="lazy" decoding="async" data-fallback="exterieur" /><figcaption>Voiture rénovée</figcaption></figure>
            <figure className="gallery-card"><img src={sitePhoto(photos, 'accueil.galerie.3')} alt="Detailing extérieur premium sur véhicule" loading="lazy" decoding="async" data-fallback="exterieur" /><figcaption>Detailing extérieur</figcaption></figure>
            <figure className="gallery-card"><img src={sitePhoto(photos, 'accueil.galerie.4')} alt="BMW préparée et sublimée par Fast Detailing" loading="lazy" decoding="async" data-fallback="garage" /><figcaption>BMW préparée</figcaption></figure>
          </div>
        </div>
      </section>

      <section className="section-pad section-soft home-secondary" id="pourquoi-nous">
        <div className="container">
          <div className="section-heading reveal">
            <p className="eyebrow">Pourquoi nous choisir</p>
            <h2>Un atelier local sérieux à Gisors</h2>
            <p>Une approche artisanale, des standards premium et une exécution précise pour chaque véhicule confié.</p>
          </div>
          <div className="why-grid reveal reveal-delay-1">
            <article className="why-card"><h3>Travail soigné</h3><p>Préparation minutieuse, contrôle visuel et finitions propres sur chaque zone.</p></article>
            <article className="why-card"><h3>Produits professionnels</h3><p>Gamme adaptée aux surfaces intérieures et extérieures pour un rendu durable.</p></article>
            <article className="why-card"><h3>Basé à Gisors</h3><p>Interventions locales à {zones.and}.</p></article>
            <article className="why-card"><h3>Devis gratuit</h3><p>Conseil clair selon l'état réel du véhicule et vos objectifs esthétiques.</p></article>
            <article className="why-card"><h3>Expertise detailing</h3><p>Rénovation automobile, polish, intérieur premium et optiques avec méthode.</p></article>
            <article className="why-card"><h3>Satisfaction client</h3><p>Résultat lisible, progression visible et accompagnement humain du début à la fin.</p></article>
          </div>
        </div>
      </section>
    </>
  );
}
