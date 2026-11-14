// One-off: copies the 14 photos that were hard-coded on the Réalisations page into the database,
// so that the admin shows the same gallery as the site. Does nothing if gallery entries already exist.
import fs from 'node:fs';
import postgres from 'postgres';

for (const line of fs.readFileSync('.env.local', 'utf8').split(/\r?\n/)) {
  const match = line.match(/^([A-Z_]+)=(.*)$/);
  if (match && !process.env[match[1]]) process.env[match[1]] = match[2].replace(/^"|"$/g, '');
}

const items = [
  ['interieur', 'Interieur_Voiture/WhatsApp Image 2026-05-09 at 19.50.35.jpeg', 'Nettoyage intérieur voiture à Gisors', 'Intérieur'],
  ['interieur', 'Sieges/apres.jpeg', 'Rénovation des sièges véhicule', 'Sièges'],
  ['exterieur', 'Garage_exterieur/WhatsApp Image 2026-05-09 at 19.58.49 (2).jpeg', 'Nettoyage extérieur véhicule', 'Extérieur'],
  ['polish', 'Avant_Apres/10/WhatsApp Image 2026-05-09 at 19.42.21.jpeg', 'Polish et lustrage de carrosserie', 'Polish'],
  ['phares', 'Phares/WhatsApp Image 2026-05-09 at 19.41.11.jpeg', 'Rénovation optiques et phares', 'Phares'],
  ['moto', 'Moto/moto-renovee.jpg', 'Nettoyage moto detailing', 'Moto'],
  ['phares', 'Phares/WhatsApp Image 2026-05-09 at 19.41.13.jpeg', 'Phare rénové en détail', 'Phares'],
  ['phares', 'Phares/WhatsApp Image 2026-05-09 at 19.42.14.jpeg', 'Rénovation optique avant après', 'Optiques'],
  ['phares', 'Phares/WhatsApp Image 2026-05-09 at 19.42.14 (1).jpeg', 'Phares rénovés Fast Detailing', 'Phares'],
  ['phares', 'Phares/WhatsApp Image 2026-05-09 at 19.50.40 (1).jpeg', 'Photo de phare rénové', 'Phares'],
  ['phares', 'Phares/WhatsApp Image 2026-05-09 at 19.50.40 (2).jpeg', 'Rénovation phare voiture', 'Phares'],
  ['phares', 'Phares/WhatsApp Image 2026-05-09 at 19.50.40 (3).jpeg', 'Phare rénové et brillant', 'Phares'],
  ['phares', 'Phares/WhatsApp Image 2026-05-09 at 19.50.40 (4).jpeg', 'Rénovation optique finale', 'Phares'],
  ['exterieur', 'Garage_exterieur/WhatsApp Image 2026-05-09 at 19.41.03.jpeg', 'Préparation véhicule extérieur', 'Préparation'],
];

const sql = postgres(process.env.DATABASE_URL);
const [{ count }] = await sql`select count(*)::int as count from realisations where type = 'galerie'`;
if (count > 0) {
  console.log(`Already ${count} gallery entries, nothing to do.`);
} else {
  await sql.begin(async (tx) => {
    for (const [index, [categorie, file, alt, titre]] of items.entries()) {
      const [row] = await tx`insert into realisations (titre, description, categorie, type, publie, ordre) values (${titre}, ${alt}, ${categorie}, 'galerie', true, ${100 + index}) returning id`;
      await tx`insert into realisation_images (realisation_id, url, type_image, ordre) values (${row.id}, ${'/assets/' + file}, 'galerie', 0)`;
    }
  });
  console.log(`Inserted ${items.length} gallery entries.`);
}
await sql.end();
