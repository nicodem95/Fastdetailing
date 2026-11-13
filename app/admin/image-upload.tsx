'use client';

import { upload } from '@vercel/blob/client';
import { useState } from 'react';

export function ImageUpload({ name, label }: { name: string; label: string }) {
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState('');

  async function onChange(file: File | undefined) {
    setUrl('');
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
    <label>
      {label}{' '}
      <input type="file" accept="image/jpeg,image/png,image/webp" onChange={(event) => onChange(event.target.files?.[0])} />
      <input type="hidden" name={name} value={url} />
      {status ? <small> {status}</small> : null}
    </label>
  );
}
