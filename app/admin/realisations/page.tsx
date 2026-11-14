import type { Metadata } from 'next';
import { realisationsPage } from '@/lib/page-content';
import { PageEditor } from '../page-editor';

export const metadata: Metadata = { title: 'Page Réalisations', robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';

export default async function RealisationsAdminPage({ searchParams }: { searchParams: Promise<{ ok?: string }> }) {
  const { ok } = await searchParams;
  return <PageEditor page={realisationsPage} ok={ok} />;
}
