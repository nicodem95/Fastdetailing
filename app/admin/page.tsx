import type { Metadata } from 'next';
import { getAdminUser } from '@/lib/auth/server';
import { listRealisations } from '@/lib/services/realisations';
import { SignOutButton } from './sign-out-button';
import { ImageUpload } from './image-upload';
import './admin.css';
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
      <div className="admin">
        <div className="admin-header">
          <h1>Administration</h1>
          <div className="admin-user">{user.email} <SignOutButton /></div>
        </div>
        <section className="admin-card">
        <h2>Ajouter une réalisation</h2>
        {erreur === 'champs' ? <p className="admin-alert" role="alert">Le titre et la catégorie sont obligatoires.</p> : null}
        <form className="admin-form" action={createRealisationAction}>
          <input name="titre" placeholder="Titre" required />
          <input name="categorie" placeholder="Catégorie (ex. intérieur, phares…)" required />
          <textarea name="description" placeholder="Description" rows={3} />
          <select name="type" defaultValue="avant_apres">
            <option value="avant_apres">Avant/Après</option>
            <option value="galerie">Galerie</option>
          </select>
          <ImageUpload name="avant" label="Image avant (Avant/Après)" />
          <ImageUpload name="apres" label="Image après (Avant/Après)" />
          <ImageUpload name="galerie" label="Image (Galerie)" />
          <label className="admin-check"><input name="publie" type="checkbox" /> Publier immédiatement</label>
          <button className="btn btn-primary" type="submit">Enregistrer</button>
        </form>
        </section>
        <section className="admin-card">
        <h2>Réalisations ({realisations.length})</h2>
        <ul className="admin-list">
          {realisations.map((item) => (
            <li className="admin-item" key={item.id}>
              <div>
                <strong>{item.titre}</strong>
                <span>{item.type === 'avant_apres' ? 'Avant/Après' : 'Galerie'} · {item.images.length} image(s) · {item.publie ? 'publié' : 'brouillon'}</span>
              </div>
              <div className="admin-actions">
                <form action={togglePublishAction}>
                  <input type="hidden" name="id" value={item.id} />
                  <input type="hidden" name="publie" value={String(item.publie)} />
                  <button className="admin-small-btn" type="submit">{item.publie ? 'Dépublier' : 'Publier'}</button>
                </form>
                <form action={deleteRealisationAction}>
                  <input type="hidden" name="id" value={item.id} />
                  <button className="admin-small-btn danger" type="submit">Supprimer</button>
                </form>
              </div>
            </li>
          ))}
        </ul>
        </section>
      </div>
    </main>
  );
}
