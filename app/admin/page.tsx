import type { Metadata } from 'next';
import { getAdminUser } from '@/lib/auth/server';
import { listRealisations } from '@/lib/services/realisations';
import { SignOutButton } from './sign-out-button';

export const metadata: Metadata = {
  title: 'Administration',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const user = await getAdminUser();

  if (!user) {
    return (
      <main className="section-pad">
        <div className="container">
          <h1>Accès refusé</h1>
          <p>Ce compte n’est pas autorisé à administrer le site.</p>
          <SignOutButton />
        </div>
      </main>
    );
  }

  const realisations = await listRealisations();

  return (
    <main className="section-pad">
      <div className="container">
        <h1>Administration</h1>
        <p>Connecté : {user.email} <SignOutButton /></p>
        <h2>Réalisations ({realisations.length})</h2>
        <ul>
          {realisations.map((item) => (
            <li key={item.id}>{item.titre} — {item.type === 'avant_apres' ? 'Avant/Après' : 'Galerie'} — {item.publie ? 'publié' : 'brouillon'}</li>
          ))}
        </ul>
      </div>
    </main>
  );
}
