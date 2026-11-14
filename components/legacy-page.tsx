import type { Metadata } from 'next';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { injectBeforeAfterCards } from '@/lib/before-after-cards';
import { applyPrices, applySiteInfo, applyTexts, getPrices, getSiteInfo, getTexts } from '@/lib/site-content';
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
  const [info, prices, texts] = await Promise.all([getSiteInfo(), getPrices(), getTexts()]);
  if (slug === 'avant-apres') page.mainHtml = await injectBeforeAfterCards(page.mainHtml);
  if (slug === 'tarifs-lavage-auto') page.mainHtml = applyPrices(page.mainHtml, prices);
  page.mainHtml = applyTexts(page.mainHtml, slug, texts);
  page.mainHtml = applySiteInfo(page.mainHtml, info);
  page.extrasHtml = applySiteInfo(page.extrasHtml, info);
  page.structuredData = page.structuredData.map((jsonLd) => applySiteInfo(jsonLd, info));

  return (
    <>
      <LegacyPageRuntime bodyClass={page.bodyClass} externalScripts={page.externalScripts} inlineScripts={page.inlineScripts} />
      {page.inlineStyles.map((css, index) => (
        <style key={index} dangerouslySetInnerHTML={{ __html: css }} />
      ))}
      <SiteHeader info={info} />
      <main id="contenu" dangerouslySetInnerHTML={{ __html: page.mainHtml }} />
      <div dangerouslySetInnerHTML={{ __html: page.extrasHtml }} />
      <SiteFooter info={info} />
      {page.structuredData.map((jsonLd, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      ))}
    </>
  );
}