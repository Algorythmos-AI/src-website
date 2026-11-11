import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_galleries_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__galleries_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__galleries_v_published_locale" AS ENUM('en', 'fr', 'ar');
  CREATE TABLE "galleries_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "galleries_videos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar
  );
  
  CREATE TABLE "galleries_videos_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "galleries" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"date" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_galleries_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "galleries_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_galleries_v_version_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_galleries_v_version_videos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_galleries_v_version_videos_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_galleries_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_slug" varchar,
  	"version_date" timestamp(3) with time zone,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__galleries_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__galleries_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_galleries_v_locales" (
  	"version_title" varchar,
  	"version_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "galleries_id" integer;
  ALTER TABLE "galleries_images" ADD CONSTRAINT "galleries_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "galleries_images" ADD CONSTRAINT "galleries_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."galleries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "galleries_videos" ADD CONSTRAINT "galleries_videos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."galleries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "galleries_videos_locales" ADD CONSTRAINT "galleries_videos_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."galleries_videos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "galleries_locales" ADD CONSTRAINT "galleries_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."galleries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_galleries_v_version_images" ADD CONSTRAINT "_galleries_v_version_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_galleries_v_version_images" ADD CONSTRAINT "_galleries_v_version_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_galleries_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_galleries_v_version_videos" ADD CONSTRAINT "_galleries_v_version_videos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_galleries_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_galleries_v_version_videos_locales" ADD CONSTRAINT "_galleries_v_version_videos_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_galleries_v_version_videos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_galleries_v" ADD CONSTRAINT "_galleries_v_parent_id_galleries_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."galleries"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_galleries_v_locales" ADD CONSTRAINT "_galleries_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_galleries_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "galleries_images_order_idx" ON "galleries_images" USING btree ("_order");
  CREATE INDEX "galleries_images_parent_id_idx" ON "galleries_images" USING btree ("_parent_id");
  CREATE INDEX "galleries_images_image_idx" ON "galleries_images" USING btree ("image_id");
  CREATE INDEX "galleries_videos_order_idx" ON "galleries_videos" USING btree ("_order");
  CREATE INDEX "galleries_videos_parent_id_idx" ON "galleries_videos" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "galleries_videos_locales_locale_parent_id_unique" ON "galleries_videos_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "galleries_slug_idx" ON "galleries" USING btree ("slug");
  CREATE INDEX "galleries_updated_at_idx" ON "galleries" USING btree ("updated_at");
  CREATE INDEX "galleries_created_at_idx" ON "galleries" USING btree ("created_at");
  CREATE INDEX "galleries__status_idx" ON "galleries" USING btree ("_status");
  CREATE UNIQUE INDEX "galleries_locales_locale_parent_id_unique" ON "galleries_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_galleries_v_version_images_order_idx" ON "_galleries_v_version_images" USING btree ("_order");
  CREATE INDEX "_galleries_v_version_images_parent_id_idx" ON "_galleries_v_version_images" USING btree ("_parent_id");
  CREATE INDEX "_galleries_v_version_images_image_idx" ON "_galleries_v_version_images" USING btree ("image_id");
  CREATE INDEX "_galleries_v_version_videos_order_idx" ON "_galleries_v_version_videos" USING btree ("_order");
  CREATE INDEX "_galleries_v_version_videos_parent_id_idx" ON "_galleries_v_version_videos" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_galleries_v_version_videos_locales_locale_parent_id_unique" ON "_galleries_v_version_videos_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_galleries_v_parent_idx" ON "_galleries_v" USING btree ("parent_id");
  CREATE INDEX "_galleries_v_version_version_slug_idx" ON "_galleries_v" USING btree ("version_slug");
  CREATE INDEX "_galleries_v_version_version_updated_at_idx" ON "_galleries_v" USING btree ("version_updated_at");
  CREATE INDEX "_galleries_v_version_version_created_at_idx" ON "_galleries_v" USING btree ("version_created_at");
  CREATE INDEX "_galleries_v_version_version__status_idx" ON "_galleries_v" USING btree ("version__status");
  CREATE INDEX "_galleries_v_created_at_idx" ON "_galleries_v" USING btree ("created_at");
  CREATE INDEX "_galleries_v_updated_at_idx" ON "_galleries_v" USING btree ("updated_at");
  CREATE INDEX "_galleries_v_snapshot_idx" ON "_galleries_v" USING btree ("snapshot");
  CREATE INDEX "_galleries_v_published_locale_idx" ON "_galleries_v" USING btree ("published_locale");
  CREATE INDEX "_galleries_v_latest_idx" ON "_galleries_v" USING btree ("latest");
  CREATE INDEX "_galleries_v_autosave_idx" ON "_galleries_v" USING btree ("autosave");
  CREATE UNIQUE INDEX "_galleries_v_locales_locale_parent_id_unique" ON "_galleries_v_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_galleries_fk" FOREIGN KEY ("galleries_id") REFERENCES "public"."galleries"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_galleries_id_idx" ON "payload_locked_documents_rels" USING btree ("galleries_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE IF EXISTS "galleries_images" CASCADE;
  DROP TABLE IF EXISTS "galleries_videos" CASCADE;
  DROP TABLE IF EXISTS "galleries_videos_locales" CASCADE;
  DROP TABLE IF EXISTS "galleries" CASCADE;
  DROP TABLE IF EXISTS "galleries_locales" CASCADE;
  DROP TABLE IF EXISTS "_galleries_v_version_images" CASCADE;
  DROP TABLE IF EXISTS "_galleries_v_version_videos" CASCADE;
  DROP TABLE IF EXISTS "_galleries_v_version_videos_locales" CASCADE;
  DROP TABLE IF EXISTS "_galleries_v" CASCADE;
  DROP TABLE IF EXISTS "_galleries_v_locales" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_galleries_fk";
  
  DROP INDEX IF EXISTS "payload_locked_documents_rels_galleries_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "galleries_id";
  DROP TYPE IF EXISTS "public"."enum_galleries_status";
  DROP TYPE IF EXISTS "public"."enum__galleries_v_version_status";
  DROP TYPE IF EXISTS "public"."enum__galleries_v_published_locale";`)
}
