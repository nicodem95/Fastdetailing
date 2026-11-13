import { config } from 'dotenv';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

config({ path: ['.env.local', '.env'] });

const databaseUrl = process.env.DATABASE_URL;
const backupArgument = process.argv[2];

if (!databaseUrl) {
  throw new Error('Set DATABASE_URL in .env.local before restoring a database.');
}
if (!backupArgument) {
  throw new Error('Pass the backup file path: npm run db:restore -- backups/file.dump');
}
if (process.env.CONFIRM_DATABASE_RESTORE !== 'yes') {
  throw new Error('Restore replaces database objects. Set CONFIRM_DATABASE_RESTORE=yes to confirm the target.');
}

const backupPath = resolve(backupArgument);
if (!existsSync(backupPath)) {
  throw new Error(`Backup file not found: ${backupPath}`);
}

const result = spawnSync('pg_restore', [
  '--clean',
  '--if-exists',
  '--no-owner',
  '--no-acl',
  backupPath,
], {
  env: { ...process.env, PGDATABASE: databaseUrl },
  stdio: 'inherit',
});

if (result.error) {
  throw new Error(`Could not run pg_restore: ${result.error.message}. Install PostgreSQL client tools and retry.`);
}
if (result.status !== 0) {
  throw new Error(`pg_restore failed with exit code ${result.status}.`);
}

console.log('Database restore completed.');