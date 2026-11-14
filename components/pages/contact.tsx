/* eslint-disable react/no-unescaped-entities, @next/next/no-img-element */
import { hoursGroups, phoneDigits, whatsappHref, zonesText, type SiteInfo } from '@/lib/site-content';

export function ContactContent({ info }: { info: SiteInfo }) {
  const zones = zonesText(info);
  return (
    <>
      <section className="hero section-pad">
        <div className="hero-bg"></div>
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">
              Contact
            </p>
            <h1>
              Nous contacter rapidement
            </h1>
            <p className="hero-text">
              Réponse immédiate par téléphone, WhatsApp ou formulaire. Devis sans engagement en {info.delaiReponse}.
            </p>
            <div className="cta-row cta-row-large">
              <a className="btn btn-primary btn-large" href={`tel:${phoneDigits(info)}`} aria-label={`Appeler Fast Detailing au ${info.telephone}`}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"></path>
                </svg>
                {' '}Appeler maintenant{' '}
              </a>
              {' '}
              <a className="btn btn-secondary btn-large" href={whatsappHref(info, "Bonjour Fast Detailing, je souhaite un devis.")} target="_blank" rel="noopener noreferrer" aria-label="Envoyer un message WhatsApp">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21.75 15.02c0 4.17-3.42 7.55-7.64 7.55-1.3 0-2.53-.31-3.6-.87L2.75 22l1.37-4.37c-.56-1.07-.87-2.3-.87-3.6C2.25 9.85 5.67 6.47 9.89 6.47c2.02 0 3.93.73 5.35 2.06.95.88 1.75 2.01 2.27 3.28.52 1.27.81 2.66.81 4.21z"></path>
                </svg>
                {' '}WhatsApp{' '}
              </a>
              {' '}
              <a className="btn btn-outline btn-large" href="#formulaire-devis" aria-label="Accéder au formulaire de devis">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"></path>
                  <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
                {' '}Devis{' '}
              </a>
            </div>
          </div>
          <div className="hero-visual">
            <figure className="hero-card">
              <img src="assets/Garage_Interieur/WhatsApp Image 2026-05-09 at 19.58.41.jpeg" alt="Atelier Fast Detailing" loading="eager" decoding="async" data-fallback="garage" />
              <figcaption>
                Réponse rapide par téléphone, WhatsApp ou email.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>
      <section className="section-pad section-soft">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">
              Contact Direct
            </p>
            <h2>
              3 façons de nous joindre
            </h2>
            <p>
              Choisissez le canal qui vous convient le plus.
            </p>
          </div>
          <div className="contact-cards-grid">
            <div className="contact-card">
              <div className="contact-card-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"></path>
                </svg>
              </div>
              <h3>
                Appel téléphone
              </h3>
              <p className="contact-card-value">
                {info.telephone}
              </p>
              <p className="contact-card-desc">
                Rapide et direct. Disponible {hoursGroups(info).map((group) => `${group.days.toLowerCase()} ${group.hours}`).join(', ')}.
              </p>
              <a href={`tel:${phoneDigits(info)}`} className="btn btn-primary btn-small">
                Appeler
              </a>
            </div>
            <div className="contact-card">
              <div className="contact-card-icon contact-card-icon-whatsapp">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21.75 15.02c0 4.17-3.42 7.55-7.64 7.55-1.3 0-2.53-.31-3.6-.87L2.75 22l1.37-4.37c-.56-1.07-.87-2.3-.87-3.6C2.25 9.85 5.67 6.47 9.89 6.47c2.02 0 3.93.73 5.35 2.06.95.88 1.75 2.01 2.27 3.28.52 1.27.81 2.66.81 4.21z"></path>
                </svg>
              </div>
              <h3>
                WhatsApp
              </h3>
              <p className="contact-card-value">
                +33 6 54 14 99 76
              </p>
              <p className="contact-card-desc">
                Message instantané avec photo de votre véhicule.
              </p>
              <a href={whatsappHref(info, "Bonjour Fast Detailing, je souhaite un devis.")} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-small">
                Envoyer un message
              </a>
            </div>
            <div className="contact-card">
              <div className="contact-card-icon contact-card-icon-email">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                  <path d="M7 10l5 3.5 5-3.5"></path>
                </svg>
              </div>
              <h3>
                Email
              </h3>
              <p className="contact-card-value">
                {info.email}
              </p>
              <p className="contact-card-desc">
                Envoyez vos photos et détails. Réponse sous {info.delaiReponse}.
              </p>
              <a href={`mailto:${info.email}`} className="btn btn-outline btn-small">
                Envoyer un email
              </a>
            </div>
          </div>
          <div className="trust-list contact-trust-list" aria-label="Points de confiance Fast Detailing">
            <article>
              <h3>
                Réponse rapide
              </h3>
              <p>
                Retour rapide par téléphone, WhatsApp ou email selon votre préférence.
              </p>
            </article>
            <article>
              <h3>
                Conseils personnalisés
              </h3>
              <p>
                Chaque demande est évaluée selon l'état réel du véhicule et votre objectif.
              </p>
            </article>
            <article>
              <h3>
                Prise en charge soignée
              </h3>
              <p>
                Processus detailing structuré pour un rendu propre, net et valorisant.
              </p>
            </article>
            <article>
              <h3>
                Véhicules traités avec attention
              </h3>
              <p>
                Intérieur, carrosserie, optiques et finitions avec méthodes professionnelles.
              </p>
            </article>
          </div>
        </div>
      </section>
      <section className="section-pad" id="formulaire-devis">
        <div className="container">
          <div className="form-container">
            <div className="form-intro">
              <h2>
                Demander un devis
              </h2>
              <p>
                Décrivez votre véhicule et la prestation souhaitée. Nous vous répondons rapidement.
              </p>
            </div>
            <form className="contact-form" id="contactForm">
              <div className="form-row">
                <label>
                  {' '}Nom{' '}
                  <input type="text" name="name" placeholder="Votre nom" required />
                </label>
                {' '}
                <label>
                  {' '}Téléphone{' '}
                  <input type="tel" name="phone" placeholder="06 54 12 34 56" required />
                </label>
              </div>
              <div className="form-row">
                <label>
                  {' '}Code postal{' '}
                  <input id="contactPostalCode" type="text" name="postalCode" inputMode="numeric" pattern="[0-9]{5}" maxLength={5} placeholder="27140" />
                </label>
                {' '}
                <label>
                  {' '}Email (facultatif){' '}
                  <input type="email" name="email" placeholder="votre@email.com" />
                </label>
              </div>
              <label>
                {' '}Type de véhicule{' '}
                <select name="vehicle" required>
                  <option value="">
                    Sélectionner...
                  </option>
                  <option value="Voiture">
                    Voiture
                  </option>
                  <option value="SUV">
                    SUV
                  </option>
                  <option value="Monospace">
                    Monospace
                  </option>
                  <option value="Moto">
                    Moto
                  </option>
                  <option value="Autre">
                    Autre
                  </option>
                </select>
              </label>
              {' '}
              <label>
                {' '}Prestation souhaitée{' '}
                <select name="service" required>
                  <option value="">
                    Sélectionner une prestation...
                  </option>
                  <option value="Nettoyage intérieur">
                    Nettoyage intérieur
                  </option>
                  <option value="Nettoyage extérieur">
                    Nettoyage extérieur
                  </option>
                  <option value="Polish / lustrage">
                    Polish / lustrage
                  </option>
                  <option value="Rénovation optiques">
                    Rénovation optiques
                  </option>
                  <option value="Vitres teintées">
                    Vitres teintées
                  </option>
                  <option value="Pare-brise / franchise offerte">
                    Pare-brise / franchise offerte
                  </option>
                  <option value="Moto detailing">
                    Moto detailing
                  </option>
                  <option value="Forfait complet">
                    Forfait complet
                  </option>
                </select>
              </label>
              {' '}
              <label>
                {' '}Message{' '}
                <textarea name="message" rows={5} placeholder="Décrivez votre véhicule et vos besoins (marque, couleur, état général...)"></textarea>
              </label>
              {' '}
              <button className="btn btn-primary btn-block" type="submit">
                Envoyer ma demande
              </button>
              <p className="form-note">
                Le formulaire ouvre votre messagerie avec le message prérempli.
              </p>
            </form>
          </div>
        </div>
      </section>
      <section className="section-pad section-soft">
        <div className="container contact-info-grid">
          <div className="contact-info-block">
            <h3>
              Horaires
            </h3>
            {hoursGroups(info).map((group) => (
              <div key={group.days}>
                <p>
                  <strong>{group.hours}</strong>
                </p>
                <p className="text-small">{group.days}</p>
              </div>
            ))}
          </div>
          <div className="contact-info-block">
            <h3>
              Zone de service
            </h3>
            <p>
              {zones.slash}
            </p>
          </div>
          <div className="contact-info-block">
            <h3>
              Localisation
            </h3>
            <a className="btn btn-secondary btn-small" href="https://www.google.com/maps/search/Fast+Detailing+Gisors" target="_blank" rel="noopener noreferrer">
              Ouvrir Google Maps
            </a>
          </div>
        </div>
      </section>
      <section className="section-pad">
        <div className="container">
          <div className="map-section">
            <h2>
              Localisation
            </h2>
            <p>
              Retrouvez-nous facilement sur Google Maps pour localiser notre atelier et découvrir nos avis clients.
            </p>
            <iframe title="Carte de localisation" src={`https://www.google.com/maps?q=${encodeURIComponent(info.adresse)}&output=embed`} width="100%" height="400" style={{ border: "0" }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </div>
      </section>
    </>
  );
}

export function ContactExtras({ info }: { info: SiteInfo }) {
  const zones = zonesText(info);
  return (
    <>
      <div className="mobile-sticky-cta">
        <a href={`tel:${phoneDigits(info)}`}>
          Appeler
        </a>
        <a href={whatsappHref(info, "Bonjour Fast Detailing, je souhaite un devis.")} target="_blank" rel="noopener noreferrer">
          WhatsApp
        </a>
        <a href="#formulaire-devis">
          Devis
        </a>
      </div>
    </>
  );
}
