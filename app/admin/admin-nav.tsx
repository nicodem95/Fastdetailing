'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

import { Icon, type IconName } from './icons';

const pages: { href: string; label: string }[] = [
  { href: '/admin/accueil', label: 'Accueil' },
  { href: '/admin/photos?page=prestations', label: 'Prestations' },
  { href: '/admin/photos?page=avant-apres', label: 'Avant/Après' },
  { href: '/admin', label: 'Réalisations' },
  { href: '/admin/photos?page=pare-brise', label: 'Pare-brise' },
  { href: '/admin/tarifs', label: 'Tarifs Lavage Auto' },
  { href: '/admin/photos?page=assurance', label: 'Assurance' },
  { href: '/admin/photos?page=contact', label: 'Contact' },
];

const settings: { href: string; label: string; icon: IconName }[] = [
  { href: '/admin/messages', label: 'Demandes de devis', icon: 'mail' },
  { href: '/admin/annonce', label: 'Annonce', icon: 'info' },
  { href: '/admin/avis', label: 'Avis clients', icon: 'text' },
  { href: '/admin/infos', label: 'Infos du site', icon: 'info' },
  { href: '/admin/photos?page=logo', label: 'Logo & partage', icon: 'images' },
  { href: '/admin/google', label: 'Google (SEO)', icon: 'text' },
  { href: '/admin/mentions-legales', label: 'Mentions légales', icon: 'text' },
];

export function AdminNav({ unread = 0, logo }: { unread?: number; logo: string }) {
  const pathname = usePathname();
  const page = useSearchParams().get('page');

  function isActive(href: string) {
    if (href === '/admin') return pathname === '/admin' || pathname.startsWith('/admin/nouvelle') || /^\/admin\/[0-9a-f-]{36}\//i.test(pathname);
    if (href.includes('?page=')) return pathname === '/admin/photos' && href.endsWith(`=${page}`);
    return pathname.startsWith(href);
  }

  const settingsActive = settings.some((link) => isActive(link.href));

  return (
    <header className="site-header admin-top">
      <div className="container header-inner">
        <Link className="brand" href="/admin" aria-label="Administration Fast Detailing">
          <img src={logo} alt="" className="brand-mark" />
          <span className="brand-copy"><strong>Fast Detailing</strong><span>Administration</span></span>
        </Link>
        <nav className="admin-top-nav" aria-label="Pages du site">
          {pages.map((link) => (
            <Link key={link.href} href={link.href} aria-current={isActive(link.href) ? 'page' : undefined}>{link.label}</Link>
          ))}
          <details className="admin-top-more">
            <summary className={settingsActive ? 'active' : undefined}>Réglages{unread > 0 ? <b className="admin-nav-badge">{unread}</b> : null}</summary>
            <div className="admin-top-menu">
              {settings.map((link) => (
                <Link key={link.href} href={link.href} aria-current={isActive(link.href) ? 'page' : undefined}>
                  <Icon name={link.icon} size={16} />{link.label}
                  {link.href === '/admin/messages' && unread > 0 ? <b className="admin-nav-badge">{unread}</b> : null}
                </Link>
              ))}
            </div>
          </details>
        </nav>
        <a className="header-call" href="/" target="_blank" rel="noopener noreferrer">Voir le site</a>
      </div>
    </header>
  );
}