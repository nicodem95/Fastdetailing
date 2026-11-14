import { notFound } from 'next/navigation';
import { SitePage, getPageMetadata, isPageSlug, pageSlugs } from '@/components/site-page';

export const dynamicParams = false;
export const revalidate = 60;

export function generateStaticParams() {
  return pageSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!isPageSlug(slug)) return {};
  return getPageMetadata(slug);
}

export default async function PageRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!isPageSlug(slug)) notFound();
  return <SitePage slug={slug} />;
}
