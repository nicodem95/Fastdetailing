'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/admin', label: 'Réalisations' },
  { href: '/admin/tarifs', label: 'Tarifs' },
  { href: '/admin/infos', label: 'Infos du site' },
  { href: '/admin/textes', label: 'Textes' },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="admin-nav" aria-label="Administration">
      {links.map((link) => {
        const active = link.href === '/admin' ? pathname === '/admin' || pathname.startsWith('/admin/nouvelle') || /^\/admin\/[0-9a-f-]{36}\//i.test(pathname) : pathname.startsWith(link.href);
        return (
          <Link key={link.href} href={link.href} className={active ? 'active' : undefined}>{link.label}</Link>
        );
      })}
      <a href="/" target="_blank" rel="noopener noreferrer" className="admin-nav-site">Voir le site ↗</a>
    </nav>
  );
}
