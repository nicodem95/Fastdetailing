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
  defaultType = 'avant_apres',
}: {
  action: (formData: FormData) => Promise<void>;
  initial?: RealisationFormInitial;
  defaultType?: 'avant_apres' | 'galerie';
}) {
  const [type] = useState(initial?.type ?? defaultType);
  const [uploads, setUploads] = useState(0);

  const onBusyChange = (busy: boolean) => setUploads((count) => count + (busy ? 1 : -1));

  return (
    <form className="admin-form" action={action}>
      {initial ? <input type="hidden" name="id" value={initial.id} /> : null}
      <input name="titre" placeholder="Titre" defaultValue={initial?.titre} required />
      <input name="categorie" list={type === 'galerie' ? 'categories-galerie' : undefined} placeholder={type === 'galerie' ? 'Catégorie : interieur, exterieur, polish, phares ou moto' : 'Catégorie (ex. carrosserie)'} defaultValue={initial?.categorie} required />
      {type === 'galerie' ? (
        <datalist id="categories-galerie">
          <option value="interieur" />
          <option value="exterieur" />
          <option value="polish" />
          <option value="phares" />
          <option value="moto" />
        </datalist>
      ) : null}
      <textarea name="description" placeholder="Description (facultatif)" rows={3} defaultValue={initial?.description ?? ''} />
      <input type="hidden" name="type" value={type} />
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
