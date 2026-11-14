'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

import { Icon, type IconName } from './icons';

const groups: { title: string; links: { href: string; label: string; icon: IconName }[] }[] = [
  {
    title: 'Pages du site (même ordre que le site)',
    links: [
      { href: '/admin/accueil', label: 'Accueil', icon: 'text' },
      { href: '/admin/photos?page=prestations', label: 'Prestations', icon: 'images' },
      { href: '/admin/photos?page=avant-apres', label: 'Avant/Après', icon: 'images' },
      { href: '/admin', label: 'Réalisations', icon: 'images' },
      { href: '/admin/photos?page=pare-brise', label: 'Pare-brise', icon: 'images' },
      { href: '/admin/tarifs', label: 'Tarifs lavage auto', icon: 'tag' },
      { href: '/admin/photos?page=assurance', label: 'Assurance', icon: 'images' },
      { href: '/admin/photos?page=contact', label: 'Contact', icon: 'images' },
    ],
  },
  {
    title: 'Autres réglages',
    links: [
      { href: '/admin/messages', label: 'Demandes de devis', icon: 'mail' },
      { href: '/admin/annonce', label: 'Annonce', icon: 'info' },
      { href: '/admin/avis', label: 'Avis clients', icon: 'text' },
      { href: '/admin/infos', label: 'Infos du site', icon: 'info' },
      { href: '/admin/photos?page=logo', label: 'Logo & partage', icon: 'images' },
      { href: '/admin/google', label: 'Google (SEO)', icon: 'text' },
      { href: '/admin/mentions-legales', label: 'Mentions légales', icon: 'text' },
    ],
  },
];
export function AdminNav({ unread = 0 }: { unread?: number }) {
  const pathname = usePathname();
  const page = useSearchParams().get('page');

  function isActive(href: string) {
    if (href === '/admin') return pathname === '/admin' || pathname.startsWith('/admin/nouvelle') || /^\/admin\/[0-9a-f-]{36}\//i.test(pathname);
    if (href.includes('?page=')) return pathname === '/admin/photos' && href.endsWith(`=${page}`);
    return pathname.startsWith(href);
  }

  return (
    <nav className="admin-nav" aria-label="Administration">
      {groups.map((group) => (
        <div className="admin-nav-group" key={group.title}>
          <span className="admin-nav-title">{group.title}</span>
          <div className="admin-nav-links">
            {group.links.map((link) => (
              <Link key={link.href} href={link.href} className={isActive(link.href) ? 'active' : undefined}>
                <Icon name={link.icon} />{link.label}
                {link.href === '/admin/messages' && unread > 0 ? <b className="admin-nav-badge">{unread}</b> : null}
              </Link>
            ))}
          </div>
        </div>
      ))}
      <a href="/" target="_blank" rel="noopener noreferrer" className="admin-nav-site">Voir le site <Icon name="external" size={15} /></a>
    </nav>
  );
}