import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/**
 * Phase 1: Site Settings facebook link, About mandate + what-we-do.
 * Also adds the storage plugin's `_objectkey` columns, which may already exist
 * in production, so every statement is idempotent.
 */
export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "about_what_we_do" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "about_what_we_do_locales" (
  	"title" varchar NOT NULL,
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "_objectkey" varchar;
  ALTER TABLE "documents" ADD COLUMN IF NOT EXISTS "_objectkey" varchar;
  ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "social_facebook" varchar;
  ALTER TABLE "about_locales" ADD COLUMN IF NOT EXISTS "mandate" jsonb;
  DO $$ BEGIN
    ALTER TABLE "about_what_we_do" ADD CONSTRAINT "about_what_we_do_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL;
  END $$;
  DO $$ BEGIN
    ALTER TABLE "about_what_we_do_locales" ADD CONSTRAINT "about_what_we_do_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_what_we_do"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL;
  END $$;
  CREATE INDEX IF NOT EXISTS "about_what_we_do_order_idx" ON "about_what_we_do" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "about_what_we_do_parent_id_idx" ON "about_what_we_do" USING btree ("_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "about_what_we_do_locales_locale_parent_id_unique" ON "about_what_we_do_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE IF EXISTS "about_what_we_do" CASCADE;
  DROP TABLE IF EXISTS "about_what_we_do_locales" CASCADE;
  ALTER TABLE "site_settings" DROP COLUMN IF EXISTS "social_facebook";
  ALTER TABLE "about_locales" DROP COLUMN IF EXISTS "mandate";`)
}
