CREATE TYPE "public"."realisation_image_type" AS ENUM('avant', 'apres', 'galerie');--> statement-breakpoint
CREATE TYPE "public"."realisation_type" AS ENUM('galerie', 'avant_apres');--> statement-breakpoint
CREATE TABLE "realisation_images" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"realisation_id" uuid NOT NULL,
	"url" text NOT NULL,
	"type_image" realisation_image_type NOT NULL,
	"ordre" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "realisations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"titre" text NOT NULL,
	"description" text,
	"categorie" text NOT NULL,
	"type" realisation_type NOT NULL,
	"publie" boolean DEFAULT false NOT NULL,
	"ordre" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "site_settings" (
	"cle" text PRIMARY KEY NOT NULL,
	"valeur" jsonb NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "realisation_images" ADD CONSTRAINT "realisation_images_realisation_id_realisations_id_fk" FOREIGN KEY ("realisation_id") REFERENCES "public"."realisations"("id") ON DELETE cascade ON UPDATE no action;
--> statement-breakpoint
CREATE FUNCTION "public"."fastdetailing_set_updated_at"() RETURNS trigger AS $$
BEGIN
	NEW."updated_at" = now();
	RETURN NEW;
END;
$$ LANGUAGE plpgsql;
--> statement-breakpoint
CREATE TRIGGER "realisations_set_updated_at" BEFORE UPDATE ON "realisations"
FOR EACH ROW EXECUTE FUNCTION "public"."fastdetailing_set_updated_at"();
--> statement-breakpoint
CREATE TRIGGER "site_settings_set_updated_at" BEFORE UPDATE ON "site_settings"
FOR EACH ROW EXECUTE FUNCTION "public"."fastdetailing_set_updated_at"();