import type { Metadata } from 'next';
import { avantApresPage } from '@/lib/page-content';
import { PageEditor } from '../page-editor';

export const metadata: Metadata = { title: 'Page Avant / Après', robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';

export default async function AvantApresAdminPage({ searchParams }: { searchParams: Promise<{ ok?: string }> }) {
  const { ok } = await searchParams;
  return <PageEditor page={avantApresPage} ok={ok} />;
}
