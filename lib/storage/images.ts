import 'server-only';
import { del } from '@vercel/blob';

export const allowedImageTypes = ['image/jpeg', 'image/png', 'image/webp'];
export const maxImageBytes = 8 * 1024 * 1024;

export function isStoredImageUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && url.hostname.endsWith('.public.blob.vercel-storage.com') && url.pathname.startsWith('/realisations/');
  } catch {
    return false;
  }
}

export async function deleteImageObjects(urls: string[]) {
  const owned = urls.filter(isStoredImageUrl);
  if (owned.length) await del(owned);
}
