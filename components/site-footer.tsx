import type { SiteInfo } from '@/lib/site-content';

export function SiteFooter({ info }: { info: SiteInfo }) {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <p>Fast Detailing - Gisors</p>
        <p><a href="index.html">Accueil</a></p>
        <p><a href="contact.html">Contact</a></p>
        <p><a href="mentions-legales.html">Mentions légales</a></p>
        <p>
          <a href={info.instagram} target="_blank" rel="noopener noreferrer" aria-label="Suivre sur Instagram" title="Instagram">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <circle cx="17.5" cy="6.5" r="1.5" />
            </svg>
          </a>
        </p>
      </div>
    </footer>
  );
}