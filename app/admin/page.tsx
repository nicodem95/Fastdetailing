import type { Metadata } from 'next';
import { getAdminUser } from '@/lib/auth/server';
import { listRealisations } from '@/lib/services/realisations';
import { SignOutButton } from './sign-out-button';
import { createRealisationAction, deleteRealisationAction, togglePublishAction } from './actions';

export const metadata: Metadata = {
  title: 'Administration',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

export default async function AdminPage({ searchParams }: { searchParams: Promise<{ erreur?: string }> }) {
  const { erreur } = await searchParams;
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
        <h2>Ajouter une réalisation</h2>
        {erreur === 'champs' ? <p role="alert">Le titre et la catégorie sont obligatoires.</p> : null}
        {erreur === 'image' ? <p role="alert">Envoi d’image impossible : stockage non configuré, format non supporté (JPEG, PNG, WebP) ou fichier de plus de 8 Mo.</p> : null}
        <form action={createRealisationAction} style={{ display: 'grid', gap: 10, maxWidth: 520 }}>
          <input name="titre" placeholder="Titre" required />
          <input name="categorie" placeholder="Catégorie (ex. intérieur, phares…)" required />
          <textarea name="description" placeholder="Description" rows={3} />
          <select name="type" defaultValue="avant_apres">
            <option value="avant_apres">Avant/Après</option>
            <option value="galerie">Galerie</option>
          </select>
          <label>Image avant (Avant/Après) <input name="avant" type="file" accept="image/jpeg,image/png,image/webp" /></label>
          <label>Image après (Avant/Après) <input name="apres" type="file" accept="image/jpeg,image/png,image/webp" /></label>
          <label>Image (Galerie) <input name="galerie" type="file" accept="image/jpeg,image/png,image/webp" /></label>
          <label><input name="publie" type="checkbox" /> Publier immédiatement</label>
          <button className="btn btn-primary" type="submit">Enregistrer</button>
        </form>
        <h2>Réalisations ({realisations.length})</h2>
        <ul>
          {realisations.map((item) => (
            <li key={item.id}>
              {item.titre} — {item.type === 'avant_apres' ? 'Avant/Après' : 'Galerie'} — {item.images.length} image(s) — {item.publie ? 'publié' : 'brouillon'}
              <form action={togglePublishAction} style={{ display: 'inline' }}>
                <input type="hidden" name="id" value={item.id} />
                <input type="hidden" name="publie" value={String(item.publie)} />
                <button type="submit">{item.publie ? 'Dépublier' : 'Publier'}</button>
              </form>
              <form action={deleteRealisationAction} style={{ display: 'inline' }}>
                <input type="hidden" name="id" value={item.id} />
                <button type="submit">Supprimer</button>
              </form>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
