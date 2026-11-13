# PostgreSQL and Drizzle

The application uses PostgreSQL through Drizzle ORM and the `postgres` driver. The schema is provider-neutral; `DATABASE_URL` can point to Neon or another PostgreSQL service. Use the pooled connection URL for serverless deployments and keep it in local environment files or Vercel project settings, never in source code or client components.

Images use a server-only S3-compatible adapter in `lib/storage/images.ts`, so the bucket provider can be changed through configuration. It supports JPEG, PNG and WebP object uploads and deletion; public image URLs are stored in PostgreSQL, never image bytes. Configure the `OBJECT_STORAGE_*` variables in `.env.local` and Vercel. Use a public CDN/custom domain for `OBJECT_STORAGE_PUBLIC_URL` and credentials restricted to the intended bucket.

## Local configuration

1. Copy `.env.example` to `.env.local`.
2. Set `DATABASE_URL` to the PostgreSQL connection URL. Do not commit `.env.local` or send the URL in chat.
3. Generate a migration after changing `db/schema.ts` with `npm run db:generate`.
4. Apply pending migrations with `npm run db:migrate`.

Migrations are explicit commands and are not run during `next build` or application startup. The generated SQL lives in `drizzle/` and should be reviewed and committed with the schema change.

## Backups and restore

Install the PostgreSQL command-line client tools (`pg_dump` and `pg_restore`) on the machine making the backup. Run `npm run db:backup` to create a timestamped custom-format dump in `backups/`; that directory is excluded from Git.

Restore is deliberately guarded because it replaces objects in the selected database. Verify `DATABASE_URL`, then set `CONFIRM_DATABASE_RESTORE=yes` in the environment and run `npm run db:restore -- backups/<file>.dump`. Keep backups in protected storage and verify that a restore works before relying on a backup. These database dumps contain image URLs and metadata, not image files; back up the future image-storage provider separately.

## Data access

Database access is lazy and server-only through `db/index.ts`. Application code should use `lib/services/` rather than importing Drizzle or opening database connections from components. The `site_settings` table is a flexible JSONB placeholder for future establishment information; no settings interface or service is implemented in this step. Image objects should likewise be accessed through `lib/storage/`, never directly from client components.

`server-only` prevents these modules from being imported into client bundles; it is not authentication or authorization. Do not expose write services through route handlers or server actions until the administration authentication and authorization layer is implemented.