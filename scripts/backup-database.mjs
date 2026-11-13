import { config } from 'dotenv';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';

config({ path: ['.env.local', '.env'] });

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error('Set DATABASE_URL in .env.local before creating a backup.');
}

const backupDirectory = join(process.cwd(), 'backups');
mkdirSync(backupDirectory, { recursive: true });
const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
const backupPath = join(backupDirectory, `fastdetailing-${timestamp}.dump`);

const result = spawnSync('pg_dump', [
  '--format=custom',
  '--no-owner',
  '--no-acl',
  '--file',
  backupPath,
], {
  env: { ...process.env, PGDATABASE: databaseUrl },
  stdio: 'inherit',
});

if (result.error) {
  throw new Error(`Could not run pg_dump: ${result.error.message}. Install PostgreSQL client tools and retry.`);
}
if (result.status !== 0) {
  throw new Error(`pg_dump failed with exit code ${result.status}.`);
}

console.log(`Database backup created: ${backupPath}`);