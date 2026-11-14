import Link from 'next/link';
import type { RealisationType } from '@/db/schema';
import { buildPhotoGroups, getSitePhotos } from '@/lib/site-photos';
import { listRealisations } from '@/lib/services/realisations';
import { deleteRealisationAction, moveRealisationAction, togglePublishAction } from './actions';
import { Icon } from './icons';
import { PhotosForm } from './photos-form';

const labels = {
  avant_apres: { single: 'comparatif avant / après', add: 'Nouveau comparatif', list: 'Comparatifs avant / après', empty: 'Aucun comparatif pour le moment.', photoPage: 'avant-apres' },
  galerie: { single: 'photo de la galerie', add: 'Nouvelle photo', list: 'Galerie de photos', empty: 'Aucune photo pour le moment.', photoPage: 'realisations' },
} as const;

export async function RealisationSection({ type, ok }: { type: RealisationType; ok?: string }) {
  const text = labels[type];
  const [all, saved] = await Promise.all([listRealisations(), getSitePhotos()]);
  const items = all.filter((item) => item.type === type);
  const published = items.filter((item) => item.publie).length;
  const groups = buildPhotoGroups(text.photoPage, saved);

  return (
    <>
      {ok === 'photos' ? <p className="admin-success" role="status">Photo d’en-tête enregistrée ✓ (visible sur le site sous environ 1 minute)</p> : null}
      <PhotosForm page={text.photoPage} groups={groups} />

      <h2 className="admin-section-title admin-list-title"><Icon name="images" />{text.list}</h2>
      <div className="admin-toolbar">
        <p>{items.length} au total, {published} publié{published > 1 ? 's' : ''}. Seuls les éléments <strong>publiés</strong> sont visibles sur le site, dans l’ordre de cette liste (flèches ↑ ↓).</p>
        <Link className="btn btn-primary admin-btn-icon" href={`/admin/nouvelle?type=${type}`}><Icon name="plus" />{text.add}</Link>
      </div>

      {ok === 'cree' || ok === 'modifie' ? <p className="admin-success" role="status">Élément {ok === 'cree' ? 'enregistré' : 'modifié'} ✓</p> : null}

      {items.length === 0 ? (
        <section className="admin-card admin-empty"><p>{text.empty}</p></section>
      ) : (
        <ul className="admin-list">
          {items.map((item, position) => (
            <li className="admin-item" key={item.id}>
              <div className="admin-thumbs">
                {item.images.slice(0, 2).map((image) => (
                  <figure key={image.url}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={image.url} alt="" />
                    {type === 'avant_apres' ? <figcaption>{image.typeImage === 'avant' ? 'Avant' : 'Après'}</figcaption> : null}
                  </figure>
                ))}
              </div>
              <div className="admin-item-info">
                <strong>{item.titre}</strong>
                <span>{item.categorie}</span>
                <span className={`admin-pill ${item.publie ? 'on' : 'off'}`}>{item.publie ? 'Publié' : 'Brouillon'}</span>
              </div>
              <div className="admin-actions">
                <form action={moveRealisationAction} className="admin-move">
                  <input type="hidden" name="id" value={item.id} />
                  <button className="admin-small-btn" type="submit" name="direction" value="up" disabled={position === 0} title="Monter" aria-label={`Monter ${item.titre}`}>↑</button>
                  <button className="admin-small-btn" type="submit" name="direction" value="down" disabled={position === items.length - 1} title="Descendre" aria-label={`Descendre ${item.titre}`}>↓</button>
                </form>
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
    </>
  );
}
