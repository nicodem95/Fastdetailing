import type { Metadata } from 'next';
import Link from 'next/link';
import { getAdminUser } from '@/lib/auth/server';
import { listRealisations } from '@/lib/services/realisations';
import { SignOutButton } from './sign-out-button';
import { deleteRealisationAction, togglePublishAction } from './actions';
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

  const realisations = await listRealisations();

  return (
    <main className="section-pad">
      <div className="admin">
        <div className="admin-header">
          <h1>Réalisations</h1>
          <div className="admin-user">{user.email} <SignOutButton /></div>
        </div>

        <div className="admin-toolbar">
          <p>{realisations.length} réalisation(s). Les entrées <strong>publiées</strong> sont visibles sur le site.</p>
          <Link className="btn btn-primary" href="/admin/nouvelle">+ Nouvelle réalisation</Link>
        </div>

        {ok === 'cree' ? <p className="admin-success" role="status">Réalisation enregistrée ✓</p> : null}

        {realisations.length === 0 ? (
          <section className="admin-card admin-empty">
            <p>Aucune réalisation pour le moment.</p>
            <Link className="btn btn-primary" href="/admin/nouvelle">Ajouter la première</Link>
          </section>
        ) : (
          <ul className="admin-list">
            {realisations.map((item) => (
              <li className="admin-item" key={item.id}>
                <div className="admin-thumbs">
                  {item.images.slice(0, 2).map((image) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img key={image.url} src={image.url} alt="" />
                  ))}
                </div>
                <div className="admin-item-info">
                  <strong>{item.titre}</strong>
                  <span>
                    {item.type === 'avant_apres' ? 'Avant / Après' : 'Galerie'} · {item.categorie}
                  </span>
                  <span className={item.publie ? 'badge-on' : 'badge-off'}>{item.publie ? 'Publié' : 'Brouillon'}</span>
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
        )}
      </div>
    </main>
  );
}
