CREATE TABLE "contact_messages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"nom" text NOT NULL,
	"telephone" text NOT NULL,
	"email" text,
	"code_postal" text,
	"vehicule" text,
	"prestation" text,
	"message" text,
	"lu" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
