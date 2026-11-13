import type { Metadata } from 'next';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { injectBeforeAfterCards } from '@/lib/before-after-cards';
import { getLegacyPage, type LegacyPageSlug } from '@/lib/legacy-pages';
import { LegacyPageRuntime } from './legacy-page-runtime';

export function getLegacyMetadata(slug: LegacyPageSlug): Metadata {
  const page = getLegacyPage(slug);

  return {
    title: page.title,
    description: page.description,
    robots: page.robots,
    alternates: page.canonical ? { canonical: page.canonical } : undefined,
    icons: page.favicon,
    openGraph: page.ogTitle || page.ogDescription || page.ogUrl
      ? {
          title: page.ogTitle,
          description: page.ogDescription,
          url: page.ogUrl,
          type: page.ogType === 'article' ? 'article' : 'website',
          images: page.ogImage ? [page.ogImage] : undefined,
        }
      : undefined,
    twitter: page.twitterCard
      ? {
          card: page.twitterCard === 'summary' ? 'summary' : 'summary_large_image',
          title: page.twitterTitle,
          description: page.twitterDescription,
        }
      : undefined,
  };
}

export async function LegacyPage({ slug }: { slug: LegacyPageSlug }) {
  const page = getLegacyPage(slug);
  if (slug === 'avant-apres') page.mainHtml = await injectBeforeAfterCards(page.mainHtml);

  return (
    <>
      <LegacyPageRuntime bodyClass={page.bodyClass} externalScripts={page.externalScripts} inlineScripts={page.inlineScripts} />
      {page.inlineStyles.map((css, index) => (
        <style key={index} dangerouslySetInnerHTML={{ __html: css }} />
      ))}
      <SiteHeader />
      <main id="contenu" dangerouslySetInnerHTML={{ __html: page.mainHtml }} />
      <div dangerouslySetInnerHTML={{ __html: page.extrasHtml }} />
      <SiteFooter />
      {page.structuredData.map((jsonLd, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      ))}
    </>
  );
}