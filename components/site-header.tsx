import type { Banner } from '@/lib/extra-content';
import type { SiteInfo } from '@/lib/site-content';

export function SiteHeader({ info, banner, logo }: { info: SiteInfo; banner: Banner; logo: string }) {
  const phone = info.telephone;
  const tel = `+33${phone.replace(/\D/g, '').slice(1)}`;
  return (
    <>
      <a className="skip-link" href="#contenu">Aller au contenu</a>
      {banner.actif && banner.texte ? <p className="site-announcement" role="status">{banner.texte}</p> : null}
      <header className="site-header" id="top">
        <div className="container header-inner">
          <a className="brand" href="index.html" aria-label="Fast Detailing, accueil">
            <img src={logo} alt="Logo Fast Detailing" className="brand-mark" />
            <span className="brand-copy"><strong>Fast Detailing</strong><span>Gisors</span></span>
          </a>
          <button className="menu-toggle" type="button" aria-expanded="false" aria-controls="nav-principal">Menu</button>
          <nav className="site-nav" id="nav-principal">
            <a href="index.html">Accueil</a>
            <a href="prestations.html">Prestations</a>
            <a href="avant-apres.html">Avant/Après</a>
            <a href="realisations.html">Réalisations</a>
            <a href="pare-brise.html">Pare-brise</a>
            <a href="tarifs-lavage-auto.html">Tarifs Lavage Auto</a>
            <a href="administratif-assurance.html">Assurance</a>
            <a href="contact.html">Contact</a>
          </nav>
          <a className="header-call" href={`tel:${tel}`}>{phone}</a>
        </div>
      </header>
    </>
  );
}