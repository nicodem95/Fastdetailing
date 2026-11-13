import { notFound } from 'next/navigation';
import { LegacyPage, getLegacyMetadata } from '@/components/legacy-page';
import { isLegacyPageSlug, legacyPageSlugs } from '@/lib/legacy-pages';

export const dynamicParams = false;
export const revalidate = 60;

export function generateStaticParams() {
  return legacyPageSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!isLegacyPageSlug(slug)) return {};
  return getLegacyMetadata(slug);
}

export default async function LegacyRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!isLegacyPageSlug(slug)) notFound();
  return <LegacyPage slug={slug} />;
}