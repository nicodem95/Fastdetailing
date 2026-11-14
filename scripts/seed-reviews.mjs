// One-off: copies the reviews (saved in site_settings if any, else lib/default-reviews.json) into the reviews table.
// Does nothing if the table already has rows.
import fs from 'node:fs';
import postgres from 'postgres';

for (const line of fs.readFileSync('.env.local', 'utf8').split(/\r?\n/)) {
  const match = line.match(/^([A-Z_]+)=(.*)$/);
  if (match && !process.env[match[1]]) process.env[match[1]] = match[2].replace(/^"|"$/g, '');
}

const sql = postgres(process.env.DATABASE_URL);
const [{ count }] = await sql`select count(*)::int as count from reviews`;
if (count > 0) {
  console.log(`Already ${count} reviews, nothing to do.`);
} else {
  const [saved] = await sql`select valeur from site_settings where cle = 'reviews'`;
  const list = Array.isArray(saved?.valeur) ? saved.valeur : JSON.parse(fs.readFileSync('lib/default-reviews.json', 'utf8'));
  await sql.begin(async (tx) => {
    for (const [ordre, review] of list.entries()) {
      await tx`insert into reviews (nom, ville, note, source, texte, publie, ordre) values (${review.name}, ${review.location || 'Gisors'}, ${review.rating || 5}, ${review.source || 'Google'}, ${review.fullText}, true, ${ordre})`;
    }
  });
  console.log(`Inserted ${list.length} reviews.`);
}
await sql.end();
