import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getAdminUser } from '@/lib/auth/server';
import { buildPhotoGroups, getSitePhotos, photoPages } from '@/lib/site-photos';
import { PageTitle } from '../icons';
import { PhotosForm } from '../photos-form';

export const metadata: Metadata = { title: 'Photos du site', robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';

export default async function PhotosPage({ searchParams }: { searchParams: Promise<{ ok?: string; page?: string }> }) {
  const { ok, page: requested } = await searchParams;
  if (!(await getAdminUser())) redirect('/admin');
  const saved = await getSitePhotos();
  const page = photoPages.includes(requested ?? '') ? (requested as string) : 'accueil';

  const groups = buildPhotoGroups(page, saved);

  return (
    <main className="section-pad">
      <div className="admin">
        <div className="admin-header"><PageTitle icon="images" hint="Cliquez sur une photo (ou glissez-en une) pour la remplacer, puis enregistrez. Les photos des réalisations se gèrent dans « Réalisations ».">Photos du site</PageTitle></div>
        {ok ? <p className="admin-success" role="status">Photos enregistrées ✓ (visibles sur le site sous environ 1 minute)</p> : null}
        <PhotosForm page={page} groups={groups} />
      </div>
    </main>
  );
}
