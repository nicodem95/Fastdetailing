'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

import { Icon, type IconName } from './icons';

const links: { href: string; label: string; icon: IconName }[] = [
  { href: '/admin', label: 'Réalisations', icon: 'images' },
  { href: '/admin/tarifs', label: 'Tarifs', icon: 'tag' },
  { href: '/admin/infos', label: 'Infos du site', icon: 'info' },
  { href: '/admin/accueil', label: 'Accueil', icon: 'text' },
  { href: '/admin/photos?page=accueil', label: 'Photos accueil', icon: 'images' },
  { href: '/admin/photos?page=prestations', label: 'Prestations', icon: 'images' },
  { href: '/admin/photos?page=pare-brise', label: 'Pare-brise', icon: 'images' },
  { href: '/admin/photos?page=avant-apres', label: 'Avant / Après', icon: 'images' },
  { href: '/admin/photos?page=contact', label: 'Contact', icon: 'images' },
  { href: '/admin/photos?page=assurance', label: 'Assurance', icon: 'images' },
];

export function AdminNav() {
  const pathname = usePathname();
  const page = useSearchParams().get('page');

  return (
    <nav className="admin-nav" aria-label="Administration">
      {links.map((link) => {
        const active = link.href === '/admin' ? pathname === '/admin' || pathname.startsWith('/admin/nouvelle') || /^\/admin\/[0-9a-f-]{36}\//i.test(pathname) : link.href.includes('?page=') ? pathname === '/admin/photos' && link.href.endsWith(`=${page}`) : pathname.startsWith(link.href);
        return (
          <Link key={link.href} href={link.href} className={active ? 'active' : undefined}><Icon name={link.icon} />{link.label}</Link>
        );
      })}
      <a href="/" target="_blank" rel="noopener noreferrer" className="admin-nav-site">Voir le site <Icon name="external" size={15} /></a>
    </nav>
  );
}
