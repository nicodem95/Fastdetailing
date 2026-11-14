/* eslint-disable react/no-unescaped-entities, @next/next/no-img-element */
import type { LegalInfo } from '@/lib/extra-content';
import { phoneHref, type SiteInfo } from '@/lib/site-content';

export function MentionsLegalesContent({ info, legal }: { info: SiteInfo; legal: LegalInfo }) {
  return (
    <>
      <div className="container legal-container">
        <div className="legal-heading">
          <p className="eyebrow">
            Informations juridiques
          </p>
          <h1>
            Mentions légales
          </h1>
          <p>
            Les informations relatives à l’éditeur et à l’hébergement du site fastdetailing.fr.
          </p>
        </div>
        <section className="legal-section legal-publisher" aria-labelledby="editeur-title">
          <div className="legal-section-heading">
            <span className="legal-index" aria-hidden="true">
              01
            </span>
            <div>
              <p className="eyebrow">
                L’entreprise
              </p>
              <h2 id="editeur-title">
                Éditeur du site
              </h2>
            </div>
          </div>
          <dl className="legal-details">
            <div>
              <dt>
                Dénomination sociale
              </dt>
              <dd>
                {legal.denomination}
              </dd>
            </div>
            <div>
              <dt>
                Forme juridique
              </dt>
              <dd>
                {legal.forme}
              </dd>
            </div>
            <div>
              <dt>
                Siège social
              </dt>
              <dd>
                {info.adresse}
              </dd>
            </div>
            <div>
              <dt>
                SIREN
              </dt>
              <dd>
                {legal.siren}
              </dd>
            </div>
            <div>
              <dt>
                SIRET du siège
              </dt>
              <dd>
                {legal.siret}
              </dd>
            </div>
            <div>
              <dt>
                TVA intracommunautaire
              </dt>
              <dd>
                {legal.tva}
              </dd>
            </div>
            <div>
              <dt>
                Activité
              </dt>
              <dd>
                {legal.activite}
              </dd>
            </div>
            <div>
              <dt>
                Dirigeant
              </dt>
              <dd>
                {legal.dirigeant}
              </dd>
            </div>
            <div>
              <dt>
                Téléphone
              </dt>
              <dd>
                <a href={phoneHref(info)}>
                  {info.telephone}
                </a>
              </dd>
            </div>
            <div>
              <dt>
                E-mail
              </dt>
              <dd>
                <a href={`mailto:${info.email}`}>
                  {info.email}
                </a>
              </dd>
            </div>
            <div>
              <dt>
                Capital social
              </dt>
              <dd>
                {legal.capital}
              </dd>
            </div>
            <div>
              <dt>
                Immatriculation au RCS
              </dt>
              <dd>
                {legal.rcs}
              </dd>
            </div>
          </dl>
        </section>
        <div className="legal-secondary-grid">
          <section className="legal-section" aria-labelledby="publication-title">
            <div className="legal-section-heading">
              <span className="legal-index" aria-hidden="true">
                02
              </span>
              <div>
                <p className="eyebrow">
                  Responsabilité éditoriale
                </p>
                <h2 id="publication-title">
                  Direction de la publication
                </h2>
              </div>
            </div>
            <dl className="legal-details legal-details-single">
              <div>
                <dt>
                  Directeur de la publication
                </dt>
                <dd>
                  {legal.directeurPublication}
                </dd>
              </div>
            </dl>
          </section>
          <section className="legal-section" aria-labelledby="hebergement-title">
            <div className="legal-section-heading">
              <span className="legal-index" aria-hidden="true">
                03
              </span>
              <div>
                <p className="eyebrow">
                  Infrastructure du site
                </p>
                <h2 id="hebergement-title">
                  Hébergement
                </h2>
              </div>
            </div>
            <dl className="legal-details legal-details-single">
              <div>
                <dt>
                  Hébergeur
                </dt>
                <dd>
                  Vercel Inc.
                </dd>
              </div>
              <div>
                <dt>
                  Adresse de notification publiée dans ses conditions d’utilisation
                </dt>
                <dd>
                  440 N Barranca Ave #4133, Covina, CA 91723, États-Unis
                </dd>
              </div>
            </dl>
            <a className="legal-source-link" href="https://vercel.com/legal/terms" target="_blank" rel="noopener noreferrer">
              Consulter les conditions d’utilisation de Vercel{' '}
              <span aria-hidden="true">
                ↗
              </span>
            </a>
          </section>
        </div>
        <section className="legal-section legal-intellectual" aria-labelledby="propriete-title">
          <div className="legal-section-heading">
            <span className="legal-index" aria-hidden="true">
              04
            </span>
            <div>
              <p className="eyebrow">
                Contenus du site
              </p>
              <h2 id="propriete-title">
                Propriété intellectuelle
              </h2>
            </div>
          </div>
          <p>
            Les contenus présents sur ce site, notamment les textes et les photographies, sont protégés par les règles applicables en matière de propriété intellectuelle. Toute reproduction ou réutilisation sans autorisation préalable est interdite, sauf exception légale.
          </p>
        </section>
      </div>
    </>
  );
}

export function MentionsLegalesExtras({ info }: { info: SiteInfo }) {
  return (
    <>
    </>
  );
}
