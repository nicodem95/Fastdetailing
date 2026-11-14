import 'server-only';
import * as cheerio from 'cheerio';
import { listPublishedRealisations } from '@/lib/services/realisations';

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

async function loadCards() {
  try {
    const items = await listPublishedRealisations();
    return items
      .filter((item) => item.type === 'avant_apres')
      .map((item) => ({
        item,
        before: item.images.find((image) => image.typeImage === 'avant'),
        after: item.images.find((image) => image.typeImage === 'apres'),
      }))
      .filter((entry) => entry.before && entry.after);
  } catch {
    return [];
  }
}

// Puts published database entries before the static comparison cards, which are always kept.
export async function injectBeforeAfterCards(mainHtml: string) {
  const cards = await loadCards();
  if (!cards.length) return mainHtml;

  const html = cards.map(({ item, before, after }) => {
    const title = escapeHtml(item.titre);
    const description = item.description ? `<p>${escapeHtml(item.description)}</p>` : '';
    return `<article class="before-after-card" data-before-after><div class="before-after-media"><img class="media-before" src="${escapeHtml(before!.url)}" alt="Avant ${title}" loading="lazy" decoding="async"><img class="media-after" src="${escapeHtml(after!.url)}" alt="Après ${title}" loading="lazy" decoding="async"><div class="before-after-separator" aria-hidden="true"></div><div class="before-label">Avant</div><div class="after-label">Après</div><input class="before-after-range" type="range" min="0" max="100" value="50" aria-label="Ajuster la comparaison avant après"></div><div class="before-after-copy"><h3>${title}</h3>${description}</div></article>`;
  }).join('');

  const $ = cheerio.load(mainHtml, null, false);
  $('#beforeAfterGrid').prepend(html);
  return $.html();
}
