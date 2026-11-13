import type { Metadata } from 'next';
import * as cheerio from 'cheerio';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const source = readFileSync(join(process.cwd(), 'index.html'), 'utf8');
const $ = cheerio.load(source);

export const metadata: Metadata = {
  title: $('title').text(),
  description: $('meta[name="description"]').attr('content'),
  robots: $('meta[name="robots"]').attr('content'),
  alternates: { canonical: $('link[rel="canonical"]').attr('href') },
  openGraph: {
    title: $('meta[property="og:title"]').attr('content'),
    description: $('meta[property="og:description"]').attr('content'),
    url: $('meta[property="og:url"]').attr('content'),
    type: 'website',
    images: [$('meta[property="og:image"]').attr('content') || ''],
  },
  twitter: {
    card: 'summary_large_image',
    title: $('meta[name="twitter:title"]').attr('content'),
    description: $('meta[name="twitter:description"]').attr('content'),
  },
};