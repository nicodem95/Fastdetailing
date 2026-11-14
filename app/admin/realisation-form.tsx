'use client';

import { useState } from 'react';
import { ImageUpload } from './image-upload';

export function RealisationForm({ action }: { action: (formData: FormData) => Promise<void> }) {
  const [type, setType] = useState('avant_apres');
  const [uploads, setUploads] = useState(0);

  const onBusyChange = (busy: boolean) => setUploads((count) => count + (busy ? 1 : -1));

  return (
    <form className="admin-form" action={action}>
      <input name="titre" placeholder="Titre" required />
      <input name="categorie" placeholder="Catégorie (ex. intérieur, phares…)" required />
      <textarea name="description" placeholder="Description (facultatif)" rows={3} />
      <select name="type" value={type} onChange={(event) => setType(event.target.value)}>
        <option value="avant_apres">Avant / Après</option>
        <option value="galerie">Galerie</option>
      </select>
      {type === 'avant_apres' ? (
        <div className="admin-grid-2">
          <ImageUpload name="avant" label="Image avant" onBusyChange={onBusyChange} />
          <ImageUpload name="apres" label="Image après" onBusyChange={onBusyChange} />
        </div>
      ) : (
        <ImageUpload name="galerie" label="Image" onBusyChange={onBusyChange} />
      )}
      <label className="admin-check"><input name="publie" type="checkbox" /> Publier immédiatement</label>
      <button className="btn btn-primary" type="submit" disabled={uploads > 0}>
        {uploads > 0 ? 'Envoi des images…' : 'Enregistrer'}
      </button>
    </form>
  );
}
