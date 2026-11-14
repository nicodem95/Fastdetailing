'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Icon, type IconName } from './icons';

const links: { href: string; label: string; icon: IconName }[] = [
  { href: '/admin', label: 'Réalisations', icon: 'images' },
  { href: '/admin/tarifs', label: 'Tarifs', icon: 'tag' },
  { href: '/admin/infos', label: 'Infos du site', icon: 'info' },
  { href: '/admin/prestations', label: 'Prestations', icon: 'sparkle' },
  { href: '/admin/pare-brise', label: 'Pare-brise', icon: 'info' },
  { href: '/admin/assurance', label: 'Assurance', icon: 'draft' },
  { href: '/admin/textes', label: 'Textes', icon: 'text' },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="admin-nav" aria-label="Administration">
      {links.map((link) => {
        const active = link.href === '/admin' ? pathname === '/admin' || pathname.startsWith('/admin/nouvelle') || /^\/admin\/[0-9a-f-]{36}\//i.test(pathname) : pathname.startsWith(link.href);
        return (
          <Link key={link.href} href={link.href} className={active ? 'active' : undefined}><Icon name={link.icon} />{link.label}</Link>
        );
      })}
      <a href="/" target="_blank" rel="noopener noreferrer" className="admin-nav-site">Voir le site <Icon name="external" size={15} /></a>
    </nav>
  );
}
