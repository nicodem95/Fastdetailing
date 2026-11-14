CREATE TABLE "reviews" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"nom" text NOT NULL,
	"ville" text DEFAULT 'Gisors' NOT NULL,
	"note" integer DEFAULT 5 NOT NULL,
	"source" text DEFAULT 'Google' NOT NULL,
	"texte" text NOT NULL,
	"publie" boolean DEFAULT true NOT NULL,
	"ordre" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
