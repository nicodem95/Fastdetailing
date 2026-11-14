'use client';

import { useState } from 'react';
import { ImageUpload } from './image-upload';

export interface RealisationFormInitial {
  id: string;
  titre: string;
  categorie: string;
  description: string | null;
  type: 'avant_apres' | 'galerie';
  publie: boolean;
  images: Partial<Record<'avant' | 'apres' | 'galerie', string>>;
}

export function RealisationForm({
  action,
  initial,
}: {
  action: (formData: FormData) => Promise<void>;
  initial?: RealisationFormInitial;
}) {
  const [type, setType] = useState(initial?.type ?? 'avant_apres');
  const [uploads, setUploads] = useState(0);

  const onBusyChange = (busy: boolean) => setUploads((count) => count + (busy ? 1 : -1));

  return (
    <form className="admin-form" action={action}>
      {initial ? <input type="hidden" name="id" value={initial.id} /> : null}
      <input name="titre" placeholder="Titre" defaultValue={initial?.titre} required />
      <input name="categorie" list="categories-galerie" placeholder="Catégorie galerie : interieur, exterieur, polish, phares ou moto" defaultValue={initial?.categorie} required />
      <datalist id="categories-galerie">
        <option value="interieur" />
        <option value="exterieur" />
        <option value="polish" />
        <option value="phares" />
        <option value="moto" />
      </datalist>
      <textarea name="description" placeholder="Description (facultatif)" rows={3} defaultValue={initial?.description ?? ''} />
      {initial ? (
        <input type="hidden" name="type" value={initial.type} />
      ) : (
        <select name="type" value={type} onChange={(event) => setType(event.target.value as typeof type)}>
          <option value="avant_apres">Avant / Après</option>
          <option value="galerie">Galerie</option>
        </select>
      )}
      {type === 'avant_apres' ? (
        <div className="admin-grid-2">
          <ImageUpload name="avant" label="Image avant" initialUrl={initial?.images.avant} onBusyChange={onBusyChange} />
          <ImageUpload name="apres" label="Image après" initialUrl={initial?.images.apres} onBusyChange={onBusyChange} />
        </div>
      ) : (
        <ImageUpload name="galerie" label="Image" initialUrl={initial?.images.galerie} onBusyChange={onBusyChange} />
      )}
      {initial ? null : <label className="admin-check"><input name="publie" type="checkbox" /> Publier immédiatement</label>}
      <button className="btn btn-primary" type="submit" disabled={uploads > 0}>
        {uploads > 0 ? 'Envoi des images…' : 'Enregistrer'}
      </button>
    </form>
  );
}
