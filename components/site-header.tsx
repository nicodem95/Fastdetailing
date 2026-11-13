export function SiteHeader() {
  return (
    <>
      <a className="skip-link" href="#contenu">Aller au contenu</a>
      <header className="site-header" id="top">
        <div className="container header-inner">
          <a className="brand" href="index.html" aria-label="Fast Detailing, accueil">
            <img src="assets/Hero/hero.jpeg" alt="Logo Fast Detailing" className="brand-mark" />
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
          <a className="header-call" href="tel:+33666084467">06 66 08 44 67</a>
        </div>
      </header>
    </>
  );
}