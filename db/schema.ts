import { relations } from 'drizzle-orm';
import {
  boolean,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';

export const realisationTypeEnum = pgEnum('realisation_type', ['galerie', 'avant_apres']);
export const realisationImageTypeEnum = pgEnum('realisation_image_type', ['avant', 'apres', 'galerie']);

export const realisations = pgTable('realisations', {
  id: uuid('id').defaultRandom().primaryKey(),
  titre: text('titre').notNull(),
  description: text('description'),
  categorie: text('categorie').notNull(),
  type: realisationTypeEnum('type').notNull(),
  publie: boolean('publie').notNull().default(false),
  ordre: integer('ordre').notNull().default(0),
  createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'date' }).notNull().defaultNow(),
});

export const realisationImages = pgTable('realisation_images', {
  id: uuid('id').defaultRandom().primaryKey(),
  realisationId: uuid('realisation_id')
    .notNull()
    .references(() => realisations.id, { onDelete: 'cascade' }),
  url: text('url').notNull(),
  typeImage: realisationImageTypeEnum('type_image').notNull(),
  ordre: integer('ordre').notNull().default(0),
});

export const siteSettings = pgTable('site_settings', {
  cle: text('cle').primaryKey(),
  valeur: jsonb('valeur').$type<unknown>().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'date' }).notNull().defaultNow(),
});

export const realisationsRelations = relations(realisations, ({ many }) => ({
  images: many(realisationImages),
}));

export const realisationImagesRelations = relations(realisationImages, ({ one }) => ({
  realisation: one(realisations, {
    fields: [realisationImages.realisationId],
    references: [realisations.id],
  }),
}));

export type Realisation = typeof realisations.$inferSelect;
export type NewRealisation = typeof realisations.$inferInsert;
export type RealisationImage = typeof realisationImages.$inferSelect;
export type NewRealisationImage = typeof realisationImages.$inferInsert;
export type RealisationType = (typeof realisationTypeEnum.enumValues)[number];
export type RealisationImageType = (typeof realisationImageTypeEnum.enumValues)[number];