'use client';

import { useState } from 'react';
import { ImageUpload } from './image-upload';
import { Icon } from './icons';
import { savePhotosAction } from './settings-actions';

interface Group {
  title: string;
  hint: string;
  slots: { key: string; label: string; current: string }[];
}

export function PhotosForm({ groups }: { groups: Group[] }) {
  const [busy, setBusy] = useState(0);

  return (
    <form className="admin-form" action={savePhotosAction}>
      {groups.map((group) => (
        <section className="admin-card" key={group.title}>
          <h2 className="admin-section-title"><Icon name="images" />{group.title}</h2>
          <p className="admin-help">{group.hint}</p>
          <div className="admin-photo-grid">
            {group.slots.map((slot) => (
              <ImageUpload key={slot.key} name={slot.key} label={slot.label} initialUrl={slot.current} onBusyChange={(value) => setBusy((count) => count + (value ? 1 : -1))} />
            ))}
          </div>
        </section>
      ))}
      <button className="btn btn-primary admin-btn-icon" type="submit" disabled={busy > 0}><Icon name="save" />{busy > 0 ? 'Envoi des images…' : 'Enregistrer'}</button>
    </form>
  );
}
