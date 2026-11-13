import { config } from 'dotenv';
import postgres from 'postgres';

config({ path: ['.env.local', '.env'] });

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not configured.');
}

const sql = postgres(process.env.DATABASE_URL, {
  max: 1,
  connect_timeout: 10,
  prepare: false,
});

try {
  const rows = await sql`
    SELECT table_name
    FROM information_schema.tables
    WHERE table_schema = ${'public'}
      AND table_name = ANY(${['realisations', 'realisation_images', 'site_settings']})
    ORDER BY table_name
  `;
  const actualTables = rows.map((row) => row.table_name);
  const missingTables = ['realisations', 'realisation_images', 'site_settings']
    .filter((tableName) => !actualTables.includes(tableName));

  if (missingTables.length) {
    throw new Error(`Missing expected tables: ${missingTables.join(', ')}`);
  }

  console.log(`Database connection successful. Verified tables: ${actualTables.join(', ')}.`);
} catch (error) {
  const code = error && typeof error === 'object' && 'code' in error ? ` (${error.code})` : '';
  console.error(`Database check failed${code}. Check DATABASE_URL and Neon connectivity.`);
  process.exitCode = 1;
} finally {
  await sql.end();
}