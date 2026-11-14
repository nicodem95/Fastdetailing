import type { Metadata } from 'next';
import { prestationsPage } from '@/lib/page-content';
import { PageEditor } from '../page-editor';

export const metadata: Metadata = { title: 'Page Prestations', robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';

export default async function PrestationsAdminPage({ searchParams }: { searchParams: Promise<{ ok?: string }> }) {
  const { ok } = await searchParams;
  return <PageEditor page={prestationsPage} ok={ok} />;
}
