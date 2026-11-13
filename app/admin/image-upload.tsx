'use client';

import { upload } from '@vercel/blob/client';
import { useState } from 'react';

export function ImageUpload({ name, label }: { name: string; label: string }) {
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState('');
  const [fileName, setFileName] = useState('');

  async function onChange(file: File | undefined) {
    setUrl('');
    setFileName(file?.name ?? '');
    if (!file) return setStatus('');
    setStatus('Envoi en cours…');
    try {
      const extension = file.type === 'image/png' ? 'png' : file.type === 'image/webp' ? 'webp' : 'jpg';
      const blob = await upload(`realisations/${crypto.randomUUID()}.${extension}`, file, {
        access: 'public',
        handleUploadUrl: '/api/blob/upload',
      });
      setUrl(blob.url);
      setStatus('Image envoyée ✓');
    } catch {
      setStatus('Échec de l’envoi (JPEG, PNG ou WebP, 8 Mo maximum, stockage configuré).');
    }
  }

  return (
    <div className="admin-file">
      <span>{label}</span>
      <label className="admin-file-drop">
        <span className="admin-file-btn">{fileName ? 'Changer' : 'Choisir une image'}</span>
        <span className="admin-file-name">{fileName || 'Aucune image'}</span>
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          hidden
          onChange={(event) => onChange(event.target.files?.[0])}
        />
      </label>
      <input type="hidden" name={name} value={url} />
      {status ? <small>{status}</small> : null}
    </div>
  );
}
