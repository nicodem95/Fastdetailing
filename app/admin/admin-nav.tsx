'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { SignOutButton } from './sign-out-button';


const pages: { href: string; label: string }[] = [
  { href: '/admin/accueil', label: 'Accueil' },
  { href: '/admin/photos?page=prestations', label: 'Prestations' },
  { href: '/admin/avant-apres', label: 'Avant/Après' },
  { href: '/admin', label: 'Réalisations' },
  { href: '/admin/photos?page=pare-brise', label: 'Pare-brise' },
  { href: '/admin/tarifs', label: 'Tarifs Lavage Auto' },
  { href: '/admin/photos?page=assurance', label: 'Assurance' },
  { href: '/admin/photos?page=contact', label: 'Contact' },
];

const settings: { href: string; label: string }[] = [
  { href: '/admin/messages', label: 'Demandes de devis' },
  { href: '/admin/annonce', label: 'Annonce' },
  { href: '/admin/avis', label: 'Avis clients' },
  { href: '/admin/infos', label: 'Infos du site' },
  { href: '/admin/photos?page=logo', label: 'Logo & partage' },
  { href: '/admin/google', label: 'Google (SEO)' },
  { href: '/admin/mentions-legales', label: 'Mentions légales' },
];

export function AdminNav({ unread = 0, logo }: { unread?: number; logo: string }) {
  const pathname = usePathname();
  const page = useSearchParams().get('page');
  const type = useSearchParams().get('type');

  function isActive(href: string) {
    if (href === '/admin/avant-apres') return pathname.startsWith(href) || (pathname.startsWith('/admin/nouvelle') && type === 'avant_apres');
    if (href === '/admin') return pathname === '/admin' || (pathname.startsWith('/admin/nouvelle') && type !== 'avant_apres') || /^\/admin\/[0-9a-f-]{36}\//i.test(pathname);
    if (href.includes('?page=')) return pathname === '/admin/photos' && href.endsWith(`=${page}`);
    return pathname.startsWith(href);
  }

  return (
    <>
      <header className="site-header admin-top">
        <div className="container header-inner">
          <Link className="brand" href="/admin" aria-label="Administration Fast Detailing">
            <img src={logo} alt="" className="brand-mark" />
            <span className="brand-copy"><strong>Fast Detailing</strong><span>Gisors</span></span>
          </Link>
          <nav className="admin-top-nav" aria-label="Pages du site">
            {pages.map((link) => (
              <Link key={link.href} href={link.href} aria-current={isActive(link.href) ? 'page' : undefined}>{link.label}</Link>
            ))}
          </nav>
          <SignOutButton />
        </div>
      </header>
      <div className="admin-subbar">
        <div className="container admin-subbar-inner">
          <span>Réglages</span>
          {settings.map((link) => (
            <Link key={link.href} href={link.href} aria-current={isActive(link.href) ? 'page' : undefined}>
              {link.label}
              {link.href === '/admin/messages' && unread > 0 ? <b className="admin-nav-badge">{unread}</b> : null}
            </Link>
          ))}
          <a href="/" target="_blank" rel="noopener noreferrer">Voir le site ↗</a>
        </div>
      </div>
    </>
  );
}