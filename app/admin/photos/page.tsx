import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getAdminUser } from '@/lib/auth/server';
import { getSitePhotos, photoGroups } from '@/lib/site-photos';
import { PageTitle } from '../icons';
import { PhotosForm } from '../photos-form';

export const metadata: Metadata = { title: 'Photos du site', robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';

export default async function PhotosPage({ searchParams }: { searchParams: Promise<{ ok?: string }> }) {
  const { ok } = await searchParams;
  if (!(await getAdminUser())) redirect('/admin');
  const saved = await getSitePhotos();

  const groups = photoGroups.map((group) => ({
    title: group.title,
    hint: group.hint,
    slots: group.slots.map((slot) => {
      const src = saved[slot.key] || slot.defaultSrc;
      return { key: slot.key, label: slot.label, current: src.startsWith('http') ? src : `/${src}` };
    }),
  }));

  return (
    <main className="section-pad">
      <div className="admin">
        <div className="admin-header"><PageTitle icon="images" hint="Cliquez sur une photo (ou glissez-en une) pour la remplacer, puis enregistrez. Les photos des réalisations se gèrent dans « Réalisations ».">Photos du site</PageTitle></div>
        {ok ? <p className="admin-success" role="status">Photos enregistrées ✓ (visibles sur le site sous environ 1 minute)</p> : null}
        <PhotosForm groups={groups} />
      </div>
    </main>
  );
}
