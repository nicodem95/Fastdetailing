import type { Metadata } from 'next';
import { getAdminUser } from '@/lib/auth/server';
import { SignOutButton } from './sign-out-button';
import { PageTitle } from './icons';
import { RealisationSection } from './realisation-section';
import './admin.css';

export const metadata: Metadata = {
  title: 'Administration',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

export default async function AdminPage({ searchParams }: { searchParams: Promise<{ ok?: string }> }) {
  const { ok } = await searchParams;
  const user = await getAdminUser();

  if (!user) {
    return (
      <main className="section-pad">
        <div className="admin-login">
          <h1>Accès refusé</h1>
          <p>Ce compte n’est pas autorisé à administrer le site.</p>
          <SignOutButton />
        </div>
      </main>
    );
  }

  return (
    <main className="section-pad">
      <div className="admin">
        <div className="admin-header">
          <PageTitle icon="images" hint="Tout ce qui s’affiche sur la page Réalisations du site : la grande photo du haut, puis la galerie.">Page Réalisations</PageTitle>
          <div className="admin-user">{user.email} <SignOutButton /></div>
        </div>
        <RealisationSection type="galerie" ok={ok} />
      </div>
    </main>
  );
}
