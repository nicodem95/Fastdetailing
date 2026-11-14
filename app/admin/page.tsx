import type { Metadata } from 'next';
import Link from 'next/link';
import { getAdminUser } from '@/lib/auth/server';
import { listRealisations } from '@/lib/services/realisations';
import { SignOutButton } from './sign-out-button';
import { Icon, PageTitle } from './icons';
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
  const published = realisations.filter((item) => item.publie).length;
  const beforeAfter = realisations.filter((item) => item.type === 'avant_apres').length;

  return (
    <main className="section-pad">
      <div className="admin">
        <div className="admin-header">
          <PageTitle icon="images" hint="Ce que vos clients voient sur le site">Réalisations</PageTitle>
          <div className="admin-user">{user.email} <SignOutButton /></div>
        </div>

        <div className="admin-stats">
          <div className="admin-stat"><span className="admin-stat-icon"><Icon name="images" /></span><strong>{realisations.length}</strong><span>Réalisations</span></div>
          <div className="admin-stat"><span className="admin-stat-icon ok"><Icon name="eye" /></span><strong>{published}</strong><span>Publiées</span></div>
          <div className="admin-stat"><span className="admin-stat-icon warn"><Icon name="draft" /></span><strong>{realisations.length - published}</strong><span>Brouillons</span></div>
          <div className="admin-stat"><span className="admin-stat-icon"><Icon name="sparkle" /></span><strong>{beforeAfter}</strong><span>Avant / Après</span></div>
        </div>

        <div className="admin-toolbar">
          <p>Les entrées <strong>publiées</strong> sont visibles sur le site.</p>
          <Link className="btn btn-primary admin-btn-icon" href="/admin/nouvelle"><Icon name="plus" />Nouvelle réalisation</Link>
        </div>

        {ok === 'cree' || ok === 'modifie' ? <p className="admin-success" role="status">Réalisation {ok === 'cree' ? 'enregistrée' : 'modifiée'} ✓</p> : null}

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
                    <figure key={image.url}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={image.url} alt="" />
                      {item.type === 'avant_apres' ? <figcaption>{image.typeImage === 'avant' ? 'Avant' : 'Après'}</figcaption> : null}
                    </figure>
                  ))}
                </div>
                <div className="admin-item-info">
                  <strong>{item.titre}</strong>
                  <span>
                    {item.type === 'avant_apres' ? 'Avant / Après' : 'Galerie'} · {item.categorie}
                  </span>
                  <span className={`admin-pill ${item.publie ? 'on' : 'off'}`}>{item.publie ? 'Publié' : 'Brouillon'}</span>
                </div>
                <div className="admin-actions">
                  <Link className="admin-small-btn" href={`/admin/${item.id}/modifier`} title="Modifier"><Icon name="edit" size={15} />Modifier</Link>
                  <form action={togglePublishAction}>
                    <input type="hidden" name="id" value={item.id} />
                    <input type="hidden" name="publie" value={String(item.publie)} />
                    <button className="admin-small-btn" type="submit"><Icon name={item.publie ? 'eyeOff' : 'eye'} size={15} />{item.publie ? 'Dépublier' : 'Publier'}</button>
                  </form>
                  <form action={deleteRealisationAction}>
                    <input type="hidden" name="id" value={item.id} />
                    <button className="admin-small-btn danger" type="submit" title="Supprimer" aria-label={`Supprimer ${item.titre}`}><Icon name="trash" size={15} /></button>
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
