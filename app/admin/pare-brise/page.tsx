import type { Metadata } from 'next';
import { pareBrisePage } from '@/lib/page-content';
import { PageEditor } from '../page-editor';

export const metadata: Metadata = { title: 'Page Pare-brise', robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';

export default async function PareBriseAdminPage({ searchParams }: { searchParams: Promise<{ ok?: string }> }) {
  const { ok } = await searchParams;
  return <PageEditor page={pareBrisePage} ok={ok} />;
}
