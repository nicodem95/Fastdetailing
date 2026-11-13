import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import * as cheerio from 'cheerio';

export const legacyPageSlugs = [
  'prestations',
  'avant-apres',
  'realisations',
  'pare-brise',
  'tarifs-lavage-auto',
  'administratif-assurance',
  'contact',
  'mentions-legales',
] as const;

export type LegacyPageSlug = 'index' | (typeof legacyPageSlugs)[number];

export function isLegacyPageSlug(slug: string): slug is LegacyPageSlug {
  return legacyPageSlugs.some((pageSlug) => pageSlug === slug);
}

export function getLegacyPage(slug: LegacyPageSlug) {
  const source = readFileSync(join(process.cwd(), `${slug}.html`), 'utf8');
  const $ = cheerio.load(source);
  const main = $('main').first();
  const head = $('head');
  const body = $('body');

  const externalScripts = body.find('script[src]').map((_, script) => $(script).attr('src') || '').get();
  const inlineScripts = body.find('script:not([src])').map((_, script) => $(script).html() || '').get();
  body.find('script').remove();

  const structuredData = head.find('script[type="application/ld+json"]').map((_, script) => $(script).html() || '').get();
  const inlineStyles = head.find('style').map((_, style) => $(style).html() || '').get();
  const description = head.find('meta[name="description"]').attr('content');
  const canonical = head.find('link[rel="canonical"]').attr('href');
  const robots = head.find('meta[name="robots"]').attr('content');
  const ogTitle = head.find('meta[property="og:title"]').attr('content');
  const ogDescription = head.find('meta[property="og:description"]').attr('content');
  const ogUrl = head.find('meta[property="og:url"]').attr('content');
  const ogImage = head.find('meta[property="og:image"]').attr('content');
  const ogType = head.find('meta[property="og:type"]').attr('content');
  const twitterCard = head.find('meta[name="twitter:card"]').attr('content');
  const twitterTitle = head.find('meta[name="twitter:title"]').attr('content');
  const twitterDescription = head.find('meta[name="twitter:description"]').attr('content');
  const favicon = head.find('link[rel="icon"]').attr('href');

  const extras = body.children().not('.skip-link, .site-header, main, .site-footer').toArray()
    .map((element) => $.html(element) || '')
    .join('');

  return {
    title: head.find('title').text(),
    description,
    canonical,
    robots,
    ogTitle,
    ogDescription,
    ogUrl,
    ogImage,
    ogType,
    twitterCard,
    twitterTitle,
    twitterDescription,
    favicon,
    bodyClass: body.attr('class') || '',
    mainHtml: main.html() || '',
    extrasHtml: extras,
    externalScripts,
    inlineScripts,
    inlineStyles,
    structuredData,
  };
}