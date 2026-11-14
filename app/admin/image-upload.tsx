'use client';

import { upload } from '@vercel/blob/client';
import { useState, type DragEvent } from 'react';

export function ImageUpload({ name, label, initialUrl = '', onBusyChange }: { name: string; label: string; initialUrl?: string; onBusyChange?: (busy: boolean) => void }) {
  const [url, setUrl] = useState(initialUrl);
  const [status, setStatus] = useState('');
  const [preview, setPreview] = useState(initialUrl);
  const [dragging, setDragging] = useState(false);

  async function handleFile(file: File | undefined) {
    if (!file) return;
    setUrl('');
    setPreview(URL.createObjectURL(file));
    setStatus('Envoi en cours…');
    onBusyChange?.(true);
    try {
      const extension = file.type === 'image/png' ? 'png' : file.type === 'image/webp' ? 'webp' : 'jpg';
      const blob = await upload(`realisations/${crypto.randomUUID()}.${extension}`, file, {
        access: 'public',
        handleUploadUrl: '/api/blob/upload',
      });
      setUrl(blob.url);
      setStatus('Image envoyée ✓');
    } catch {
      setStatus('Échec de l’envoi (JPEG, PNG ou WebP, 8 Mo maximum).');
    } finally {
      onBusyChange?.(false);
    }
  }

  function onDrop(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    setDragging(false);
    handleFile(event.dataTransfer.files?.[0]);
  }

  return (
    <div className="admin-file">
      <span>{label}</span>
      <label
        className={`admin-dropzone${dragging ? ' dragging' : ''}`}
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
      >
        {preview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={preview} alt="" />
        ) : (
          <span className="admin-dropzone-hint">Glissez une image ici<br />ou cliquez pour choisir</span>
        )}
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          hidden
          onChange={(event) => handleFile(event.target.files?.[0])}
        />
      </label>
      <input type="hidden" name={name} value={url} />
      {status ? <small>{status}</small> : null}
    </div>
  );
}
