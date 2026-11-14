import type { Metadata } from 'next';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { AdministratifAssuranceContent, AdministratifAssuranceExtras } from '@/components/pages/administratif-assurance';
import { AvantApresContent, AvantApresExtras } from '@/components/pages/avant-apres';
import { ContactContent, ContactExtras } from '@/components/pages/contact';
import { HomeContent } from '@/components/pages/home-content';
import { IndexExtras } from '@/components/pages/index';
import { MentionsLegalesContent, MentionsLegalesExtras } from '@/components/pages/mentions-legales';
import { PareBriseContent, PareBriseExtras } from '@/components/pages/pare-brise';
import { PrestationsContent, PrestationsExtras } from '@/components/pages/prestations';
import { RealisationsContent, RealisationsExtras } from '@/components/pages/realisations';
import { TarifsContent } from '@/components/pages/tarifs-content';
import { TarifsLavageAutoExtras } from '@/components/pages/tarifs-lavage-auto';
import { getSitePhotos, sitePhoto } from '@/lib/site-photos';
import { getBanner, getLegal, getSeo } from '@/lib/extra-content';
import { pageData, type PageSlug } from '@/lib/page-data';
import { applySiteInfo, getOptions, getPrices, getSiteInfo, getTexts } from '@/lib/site-content';
import { LegacyPageRuntime } from './legacy-page-runtime';

interface PageMeta {
  title: string;
  description?: string;
  canonical?: string;
  robots?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogUrl?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  bodyClass: string;
  structuredData: readonly string[];
  inlineStyles: readonly string[];
  inlineScripts: readonly string[];
}

export const pageSlugs = (Object.keys(pageData) as PageSlug[]).filter((slug) => slug !== 'index');

export function isPageSlug(slug: string): slug is PageSlug {
  return slug !== 'index' && slug in pageData;
}

export async function getPageMetadata(slug: PageSlug): Promise<Metadata> {
  const page: PageMeta = pageData[slug];
  const [seo, photos] = await Promise.all([getSeo(slug), getSitePhotos()]);
  const ogImage = photos['site.share'] || page.ogImage;

  return {
    title: seo.title,
    description: seo.description,
    robots: page.robots,
    alternates: page.canonical ? { canonical: page.canonical } : undefined,
    openGraph: page.ogTitle || page.ogDescription || page.ogUrl
      ? {
          title: page.ogTitle ? seo.title : undefined,
          description: page.ogDescription ? seo.description : undefined,
          url: page.ogUrl,
          type: page.ogType === 'article' ? 'article' : 'website',
          images: ogImage ? [ogImage] : undefined,
        }
      : undefined,
    twitter: page.twitterCard
      ? {
          card: page.twitterCard === 'summary' ? 'summary' : 'summary_large_image',
          title: page.twitterTitle ? seo.title : undefined,
          description: page.twitterDescription ? seo.description : undefined,
        }
      : undefined,
  };
}

export async function SitePage({ slug }: { slug: PageSlug }) {
  const page: PageMeta = pageData[slug];
  const [info, prices, texts, options, photos, banner, legal] = await Promise.all([getSiteInfo(), getPrices(), getTexts(), getOptions(), getSitePhotos(), getBanner(), getLegal()]);
  const defaults = {};

  const content = {
    'index': <HomeContent info={info} texts={texts} photos={photos} />,
    'prestations': <PrestationsContent info={info} content={defaults} photos={photos} />,
    'avant-apres': <AvantApresContent info={info} photos={photos} />,
    'realisations': <RealisationsContent info={info} photos={photos} />,
    'pare-brise': <PareBriseContent info={info} content={defaults} photos={photos} />,
    'administratif-assurance': <AdministratifAssuranceContent info={info} assurance={defaults} photos={photos} />,
    'contact': <ContactContent info={info} texts={texts} photos={photos} />,
    'mentions-legales': <MentionsLegalesContent info={info} legal={legal} />,
    'tarifs-lavage-auto': <TarifsContent info={info} prices={prices} options={options} texts={texts} />,
  }[slug];

  const extras = {
    'index': <IndexExtras info={info} />,
    'prestations': <PrestationsExtras info={info} />,
    'avant-apres': <AvantApresExtras info={info} />,
    'realisations': <RealisationsExtras info={info} />,
    'pare-brise': <PareBriseExtras info={info} />,
    'administratif-assurance': <AdministratifAssuranceExtras info={info} />,
    'contact': <ContactExtras info={info} />,
    'mentions-legales': <MentionsLegalesExtras info={info} />,
    'tarifs-lavage-auto': <TarifsLavageAutoExtras info={info} />,
  }[slug];

  return (
    <>
      <LegacyPageRuntime bodyClass={page.bodyClass} externalScripts={['assets/js/main.js']} inlineScripts={[...page.inlineScripts]} />
      {page.inlineStyles.map((css, index) => (
        <style key={index} dangerouslySetInnerHTML={{ __html: css }} />
      ))}
      <SiteHeader info={info} banner={banner} logo={sitePhoto(photos, 'site.logo')} />
      <main id="contenu">{content}</main>
      {extras}
      <SiteFooter info={info} />
      {page.structuredData.map((jsonLd, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: applySiteInfo(jsonLd, info) }} />
      ))}
    </>
  );
}
