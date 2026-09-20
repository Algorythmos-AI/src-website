import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('en', 'fr', 'ar');
  CREATE TYPE "public"."enum_users_role" AS ENUM('admin', 'editor');
  CREATE TYPE "public"."enum_documents_language" AS ENUM('en', 'fr', 'ar');
  CREATE TYPE "public"."enum_programs_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__programs_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__programs_v_published_locale" AS ENUM('en', 'fr', 'ar');
  CREATE TYPE "public"."enum_team_members_group" AS ENUM('leadership', 'staff');
  CREATE TYPE "public"."enum_posts_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__posts_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__posts_v_published_locale" AS ENUM('en', 'fr', 'ar');
  CREATE TYPE "public"."enum_events_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__events_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__events_v_published_locale" AS ENUM('en', 'fr', 'ar');
  CREATE TYPE "public"."enum_press_releases_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__press_releases_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__press_releases_v_published_locale" AS ENUM('en', 'fr', 'ar');
  CREATE TYPE "public"."enum_publications_type" AS ENUM('annual-report', 'report', 'brief');
  CREATE TYPE "public"."enum_publications_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__publications_v_version_type" AS ENUM('annual-report', 'report', 'brief');
  CREATE TYPE "public"."enum__publications_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__publications_v_published_locale" AS ENUM('en', 'fr', 'ar');
  CREATE TYPE "public"."enum_form_submissions_type" AS ENUM('contact', 'newsletter');
  CREATE TYPE "public"."enum_form_submissions_email_status" AS ENUM('sent', 'failed');
  CREATE TYPE "public"."enum_newsletter_subscribers_status" AS ENUM('pending', 'confirmed', 'unsubscribed');
  CREATE TYPE "public"."enum_donations_mode" AS ENUM('one-time', 'monthly');
  CREATE TYPE "public"."enum_redirects_to_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_donate_settings_currencies" AS ENUM('usd', 'eur');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"role" "enum_users_role" DEFAULT 'editor' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"reset_password_requested_at" timestamp(3) with time zone,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"credit" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar,
  	"sizes_card_url" varchar,
  	"sizes_card_width" numeric,
  	"sizes_card_height" numeric,
  	"sizes_card_mime_type" varchar,
  	"sizes_card_filesize" numeric,
  	"sizes_card_filename" varchar,
  	"sizes_hero_url" varchar,
  	"sizes_hero_width" numeric,
  	"sizes_hero_height" numeric,
  	"sizes_hero_mime_type" varchar,
  	"sizes_hero_filesize" numeric,
  	"sizes_hero_filename" varchar
  );
  
  CREATE TABLE "media_locales" (
  	"alt" varchar NOT NULL,
  	"caption" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"language" "enum_documents_language" DEFAULT 'en',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "documents_locales" (
  	"title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "programs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"image_id" integer,
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_programs_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "programs_locales" (
  	"title" varchar,
  	"tag" varchar,
  	"summary" varchar,
  	"body" jsonb,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_programs_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_slug" varchar,
  	"version_image_id" integer,
  	"version_order" numeric DEFAULT 0,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__programs_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__programs_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_programs_v_locales" (
  	"version_title" varchar,
  	"version_tag" varchar,
  	"version_summary" varchar,
  	"version_body" jsonb,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "partners" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"logo_id" integer,
  	"url" varchar,
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "team_members" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"photo_id" integer,
  	"group" "enum_team_members_group" DEFAULT 'leadership',
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "team_members_locales" (
  	"role" varchar,
  	"bio" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "stories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"person" varchar,
  	"image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "stories_locales" (
  	"title" varchar NOT NULL,
  	"quote" varchar,
  	"location" varchar,
  	"category" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "categories_locales" (
  	"title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "posts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"hero_image_id" integer,
  	"author_id" integer,
  	"published_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_posts_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "posts_locales" (
  	"title" varchar,
  	"excerpt" varchar,
  	"body" jsonb,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "posts_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer
  );
  
  CREATE TABLE "_posts_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_slug" varchar,
  	"version_hero_image_id" integer,
  	"version_author_id" integer,
  	"version_published_at" timestamp(3) with time zone,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__posts_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__posts_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_posts_v_locales" (
  	"version_title" varchar,
  	"version_excerpt" varchar,
  	"version_body" jsonb,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_posts_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer
  );
  
  CREATE TABLE "events" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"starts_at" timestamp(3) with time zone,
  	"ends_at" timestamp(3) with time zone,
  	"timezone" varchar DEFAULT 'Africa/Khartoum',
  	"online" boolean DEFAULT false,
  	"registration_url" varchar,
  	"image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_events_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "events_locales" (
  	"title" varchar,
  	"location" varchar,
  	"body" jsonb,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_events_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_slug" varchar,
  	"version_starts_at" timestamp(3) with time zone,
  	"version_ends_at" timestamp(3) with time zone,
  	"version_timezone" varchar DEFAULT 'Africa/Khartoum',
  	"version_online" boolean DEFAULT false,
  	"version_registration_url" varchar,
  	"version_image_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__events_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__events_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_events_v_locales" (
  	"version_title" varchar,
  	"version_location" varchar,
  	"version_body" jsonb,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "press_releases" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"date" timestamp(3) with time zone,
  	"attachment_id" integer,
  	"contact" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_press_releases_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "press_releases_locales" (
  	"title" varchar,
  	"body" jsonb,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_press_releases_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_slug" varchar,
  	"version_date" timestamp(3) with time zone,
  	"version_attachment_id" integer,
  	"version_contact" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__press_releases_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__press_releases_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_press_releases_v_locales" (
  	"version_title" varchar,
  	"version_body" jsonb,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "publications" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"type" "enum_publications_type" DEFAULT 'report',
  	"year" numeric,
  	"file_id" integer,
  	"cover_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_publications_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "publications_locales" (
  	"title" varchar,
  	"summary" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_publications_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_slug" varchar,
  	"version_type" "enum__publications_v_version_type" DEFAULT 'report',
  	"version_year" numeric,
  	"version_file_id" integer,
  	"version_cover_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__publications_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__publications_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_publications_v_locales" (
  	"version_title" varchar,
  	"version_summary" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "form_submissions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"type" "enum_form_submissions_type" NOT NULL,
  	"name" varchar,
  	"email" varchar NOT NULL,
  	"subject" varchar,
  	"message" varchar,
  	"locale" varchar,
  	"email_status" "enum_form_submissions_email_status" DEFAULT 'sent',
  	"ip_hash" varchar,
  	"consent_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "newsletter_subscribers" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"email" varchar NOT NULL,
  	"locale" varchar,
  	"status" "enum_newsletter_subscribers_status" DEFAULT 'pending',
  	"token_hash" varchar,
  	"confirmed_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "donations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"stripe_session_id" varchar NOT NULL,
  	"stripe_customer_id" varchar,
  	"subscription_id" varchar,
  	"stripe_event_ids" jsonb,
  	"amount" numeric,
  	"currency" varchar,
  	"mode" "enum_donations_mode",
  	"status" varchar,
  	"email" varchar,
  	"name" varchar,
  	"locale" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "redirects" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"from" varchar NOT NULL,
  	"to_type" "enum_redirects_to_type" DEFAULT 'reference',
  	"to_url" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "redirects_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"posts_id" integer,
  	"programs_id" integer,
  	"events_id" integer,
  	"press_releases_id" integer,
  	"publications_id" integer
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"documents_id" integer,
  	"programs_id" integer,
  	"partners_id" integer,
  	"team_members_id" integer,
  	"stories_id" integer,
  	"categories_id" integer,
  	"posts_id" integer,
  	"events_id" integer,
  	"press_releases_id" integer,
  	"publications_id" integer,
  	"form_submissions_id" integer,
  	"newsletter_subscribers_id" integer,
  	"donations_id" integer,
  	"redirects_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"contact_email" varchar,
  	"contact_phone" varchar,
  	"social_instagram" varchar,
  	"social_twitter" varchar,
  	"social_linkedin" varchar,
  	"default_seo_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "site_settings_locales" (
  	"contact_hq" varchar,
  	"contact_field" varchar,
  	"default_seo_title" varchar,
  	"default_seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "header_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "header_items_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "header" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "footer_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "footer_items_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "footer_legal" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "footer_legal_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "footer" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "home" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_image_id" integer,
  	"hero_video_url" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "home_locales" (
  	"hero_eyebrow" varchar,
  	"hero_heading" varchar,
  	"hero_body" varchar,
  	"mission" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "home_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"programs_id" integer
  );
  
  CREATE TABLE "impact_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "impact_stats_locales" (
  	"label" varchar NOT NULL,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "impact_map_pins" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"lat" numeric,
  	"lng" numeric
  );
  
  CREATE TABLE "impact_map_pins_locales" (
  	"label" varchar NOT NULL,
  	"note" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "impact" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "impact_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"stories_id" integer
  );
  
  CREATE TABLE "about_values" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "about_values_locales" (
  	"title" varchar NOT NULL,
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "about" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "about_locales" (
  	"mission" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "donate_settings_tiers" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"amount" numeric NOT NULL
  );
  
  CREATE TABLE "donate_settings_tiers_locales" (
  	"label" varchar,
  	"impact" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "donate_settings_currencies" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_donate_settings_currencies",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "donate_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"monthly_enabled" boolean DEFAULT true,
  	"min_amount" numeric DEFAULT 5,
  	"max_amount" numeric DEFAULT 10000,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "media_locales" ADD CONSTRAINT "media_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "documents_locales" ADD CONSTRAINT "documents_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programs" ADD CONSTRAINT "programs_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "programs_locales" ADD CONSTRAINT "programs_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "programs_locales" ADD CONSTRAINT "programs_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_programs_v" ADD CONSTRAINT "_programs_v_parent_id_programs_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."programs"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_programs_v" ADD CONSTRAINT "_programs_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_programs_v_locales" ADD CONSTRAINT "_programs_v_locales_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_programs_v_locales" ADD CONSTRAINT "_programs_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_programs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "partners" ADD CONSTRAINT "partners_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "team_members" ADD CONSTRAINT "team_members_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "team_members_locales" ADD CONSTRAINT "team_members_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."team_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "stories" ADD CONSTRAINT "stories_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "stories_locales" ADD CONSTRAINT "stories_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."stories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "categories_locales" ADD CONSTRAINT "categories_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_locales" ADD CONSTRAINT "posts_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_locales" ADD CONSTRAINT "posts_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_parent_id_posts_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_author_id_users_id_fk" FOREIGN KEY ("version_author_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_locales" ADD CONSTRAINT "_posts_v_locales_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_locales" ADD CONSTRAINT "_posts_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events" ADD CONSTRAINT "events_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events_locales" ADD CONSTRAINT "events_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events_locales" ADD CONSTRAINT "events_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_events_v" ADD CONSTRAINT "_events_v_parent_id_events_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."events"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_events_v" ADD CONSTRAINT "_events_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_events_v_locales" ADD CONSTRAINT "_events_v_locales_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_events_v_locales" ADD CONSTRAINT "_events_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_events_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "press_releases" ADD CONSTRAINT "press_releases_attachment_id_documents_id_fk" FOREIGN KEY ("attachment_id") REFERENCES "public"."documents"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "press_releases_locales" ADD CONSTRAINT "press_releases_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "press_releases_locales" ADD CONSTRAINT "press_releases_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."press_releases"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_press_releases_v" ADD CONSTRAINT "_press_releases_v_parent_id_press_releases_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."press_releases"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_press_releases_v" ADD CONSTRAINT "_press_releases_v_version_attachment_id_documents_id_fk" FOREIGN KEY ("version_attachment_id") REFERENCES "public"."documents"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_press_releases_v_locales" ADD CONSTRAINT "_press_releases_v_locales_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_press_releases_v_locales" ADD CONSTRAINT "_press_releases_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_press_releases_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "publications" ADD CONSTRAINT "publications_file_id_documents_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."documents"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "publications" ADD CONSTRAINT "publications_cover_id_media_id_fk" FOREIGN KEY ("cover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "publications_locales" ADD CONSTRAINT "publications_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "publications_locales" ADD CONSTRAINT "publications_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."publications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_publications_v" ADD CONSTRAINT "_publications_v_parent_id_publications_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."publications"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_publications_v" ADD CONSTRAINT "_publications_v_version_file_id_documents_id_fk" FOREIGN KEY ("version_file_id") REFERENCES "public"."documents"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_publications_v" ADD CONSTRAINT "_publications_v_version_cover_id_media_id_fk" FOREIGN KEY ("version_cover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_publications_v_locales" ADD CONSTRAINT "_publications_v_locales_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_publications_v_locales" ADD CONSTRAINT "_publications_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_publications_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."redirects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_programs_fk" FOREIGN KEY ("programs_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_events_fk" FOREIGN KEY ("events_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_press_releases_fk" FOREIGN KEY ("press_releases_id") REFERENCES "public"."press_releases"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_publications_fk" FOREIGN KEY ("publications_id") REFERENCES "public"."publications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_documents_fk" FOREIGN KEY ("documents_id") REFERENCES "public"."documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_programs_fk" FOREIGN KEY ("programs_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_partners_fk" FOREIGN KEY ("partners_id") REFERENCES "public"."partners"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_team_members_fk" FOREIGN KEY ("team_members_id") REFERENCES "public"."team_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_stories_fk" FOREIGN KEY ("stories_id") REFERENCES "public"."stories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_events_fk" FOREIGN KEY ("events_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_press_releases_fk" FOREIGN KEY ("press_releases_id") REFERENCES "public"."press_releases"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_publications_fk" FOREIGN KEY ("publications_id") REFERENCES "public"."publications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_form_submissions_fk" FOREIGN KEY ("form_submissions_id") REFERENCES "public"."form_submissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_newsletter_subscribers_fk" FOREIGN KEY ("newsletter_subscribers_id") REFERENCES "public"."newsletter_subscribers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_donations_fk" FOREIGN KEY ("donations_id") REFERENCES "public"."donations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_redirects_fk" FOREIGN KEY ("redirects_id") REFERENCES "public"."redirects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_default_seo_image_id_media_id_fk" FOREIGN KEY ("default_seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings_locales" ADD CONSTRAINT "site_settings_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_items" ADD CONSTRAINT "header_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_items_locales" ADD CONSTRAINT "header_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_items" ADD CONSTRAINT "footer_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_items_locales" ADD CONSTRAINT "footer_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_legal" ADD CONSTRAINT "footer_legal_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_legal_locales" ADD CONSTRAINT "footer_legal_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_legal"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home" ADD CONSTRAINT "home_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_locales" ADD CONSTRAINT "home_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_rels" ADD CONSTRAINT "home_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_rels" ADD CONSTRAINT "home_rels_programs_fk" FOREIGN KEY ("programs_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "impact_stats" ADD CONSTRAINT "impact_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."impact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "impact_stats_locales" ADD CONSTRAINT "impact_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."impact_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "impact_map_pins" ADD CONSTRAINT "impact_map_pins_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."impact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "impact_map_pins_locales" ADD CONSTRAINT "impact_map_pins_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."impact_map_pins"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "impact_rels" ADD CONSTRAINT "impact_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."impact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "impact_rels" ADD CONSTRAINT "impact_rels_stories_fk" FOREIGN KEY ("stories_id") REFERENCES "public"."stories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_values" ADD CONSTRAINT "about_values_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_values_locales" ADD CONSTRAINT "about_values_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_values"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_locales" ADD CONSTRAINT "about_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "donate_settings_tiers" ADD CONSTRAINT "donate_settings_tiers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."donate_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "donate_settings_tiers_locales" ADD CONSTRAINT "donate_settings_tiers_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."donate_settings_tiers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "donate_settings_currencies" ADD CONSTRAINT "donate_settings_currencies_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."donate_settings"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "media_sizes_card_sizes_card_filename_idx" ON "media" USING btree ("sizes_card_filename");
  CREATE INDEX "media_sizes_hero_sizes_hero_filename_idx" ON "media" USING btree ("sizes_hero_filename");
  CREATE UNIQUE INDEX "media_locales_locale_parent_id_unique" ON "media_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "documents_updated_at_idx" ON "documents" USING btree ("updated_at");
  CREATE INDEX "documents_created_at_idx" ON "documents" USING btree ("created_at");
  CREATE UNIQUE INDEX "documents_filename_idx" ON "documents" USING btree ("filename");
  CREATE UNIQUE INDEX "documents_locales_locale_parent_id_unique" ON "documents_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "programs_slug_idx" ON "programs" USING btree ("slug");
  CREATE INDEX "programs_image_idx" ON "programs" USING btree ("image_id");
  CREATE INDEX "programs_updated_at_idx" ON "programs" USING btree ("updated_at");
  CREATE INDEX "programs_created_at_idx" ON "programs" USING btree ("created_at");
  CREATE INDEX "programs__status_idx" ON "programs" USING btree ("_status");
  CREATE INDEX "programs_meta_meta_image_idx" ON "programs_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX "programs_locales_locale_parent_id_unique" ON "programs_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_programs_v_parent_idx" ON "_programs_v" USING btree ("parent_id");
  CREATE INDEX "_programs_v_version_version_slug_idx" ON "_programs_v" USING btree ("version_slug");
  CREATE INDEX "_programs_v_version_version_image_idx" ON "_programs_v" USING btree ("version_image_id");
  CREATE INDEX "_programs_v_version_version_updated_at_idx" ON "_programs_v" USING btree ("version_updated_at");
  CREATE INDEX "_programs_v_version_version_created_at_idx" ON "_programs_v" USING btree ("version_created_at");
  CREATE INDEX "_programs_v_version_version__status_idx" ON "_programs_v" USING btree ("version__status");
  CREATE INDEX "_programs_v_created_at_idx" ON "_programs_v" USING btree ("created_at");
  CREATE INDEX "_programs_v_updated_at_idx" ON "_programs_v" USING btree ("updated_at");
  CREATE INDEX "_programs_v_snapshot_idx" ON "_programs_v" USING btree ("snapshot");
  CREATE INDEX "_programs_v_published_locale_idx" ON "_programs_v" USING btree ("published_locale");
  CREATE INDEX "_programs_v_latest_idx" ON "_programs_v" USING btree ("latest");
  CREATE INDEX "_programs_v_autosave_idx" ON "_programs_v" USING btree ("autosave");
  CREATE INDEX "_programs_v_version_meta_version_meta_image_idx" ON "_programs_v_locales" USING btree ("version_meta_image_id","_locale");
  CREATE UNIQUE INDEX "_programs_v_locales_locale_parent_id_unique" ON "_programs_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "partners_logo_idx" ON "partners" USING btree ("logo_id");
  CREATE INDEX "partners_updated_at_idx" ON "partners" USING btree ("updated_at");
  CREATE INDEX "partners_created_at_idx" ON "partners" USING btree ("created_at");
  CREATE INDEX "team_members_photo_idx" ON "team_members" USING btree ("photo_id");
  CREATE INDEX "team_members_updated_at_idx" ON "team_members" USING btree ("updated_at");
  CREATE INDEX "team_members_created_at_idx" ON "team_members" USING btree ("created_at");
  CREATE UNIQUE INDEX "team_members_locales_locale_parent_id_unique" ON "team_members_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "stories_image_idx" ON "stories" USING btree ("image_id");
  CREATE INDEX "stories_updated_at_idx" ON "stories" USING btree ("updated_at");
  CREATE INDEX "stories_created_at_idx" ON "stories" USING btree ("created_at");
  CREATE UNIQUE INDEX "stories_locales_locale_parent_id_unique" ON "stories_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "categories_slug_idx" ON "categories" USING btree ("slug");
  CREATE INDEX "categories_updated_at_idx" ON "categories" USING btree ("updated_at");
  CREATE INDEX "categories_created_at_idx" ON "categories" USING btree ("created_at");
  CREATE UNIQUE INDEX "categories_locales_locale_parent_id_unique" ON "categories_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "posts_slug_idx" ON "posts" USING btree ("slug");
  CREATE INDEX "posts_hero_image_idx" ON "posts" USING btree ("hero_image_id");
  CREATE INDEX "posts_author_idx" ON "posts" USING btree ("author_id");
  CREATE INDEX "posts_updated_at_idx" ON "posts" USING btree ("updated_at");
  CREATE INDEX "posts_created_at_idx" ON "posts" USING btree ("created_at");
  CREATE INDEX "posts__status_idx" ON "posts" USING btree ("_status");
  CREATE INDEX "posts_meta_meta_image_idx" ON "posts_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX "posts_locales_locale_parent_id_unique" ON "posts_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "posts_rels_order_idx" ON "posts_rels" USING btree ("order");
  CREATE INDEX "posts_rels_parent_idx" ON "posts_rels" USING btree ("parent_id");
  CREATE INDEX "posts_rels_path_idx" ON "posts_rels" USING btree ("path");
  CREATE INDEX "posts_rels_categories_id_idx" ON "posts_rels" USING btree ("categories_id");
  CREATE INDEX "_posts_v_parent_idx" ON "_posts_v" USING btree ("parent_id");
  CREATE INDEX "_posts_v_version_version_slug_idx" ON "_posts_v" USING btree ("version_slug");
  CREATE INDEX "_posts_v_version_version_hero_image_idx" ON "_posts_v" USING btree ("version_hero_image_id");
  CREATE INDEX "_posts_v_version_version_author_idx" ON "_posts_v" USING btree ("version_author_id");
  CREATE INDEX "_posts_v_version_version_updated_at_idx" ON "_posts_v" USING btree ("version_updated_at");
  CREATE INDEX "_posts_v_version_version_created_at_idx" ON "_posts_v" USING btree ("version_created_at");
  CREATE INDEX "_posts_v_version_version__status_idx" ON "_posts_v" USING btree ("version__status");
  CREATE INDEX "_posts_v_created_at_idx" ON "_posts_v" USING btree ("created_at");
  CREATE INDEX "_posts_v_updated_at_idx" ON "_posts_v" USING btree ("updated_at");
  CREATE INDEX "_posts_v_snapshot_idx" ON "_posts_v" USING btree ("snapshot");
  CREATE INDEX "_posts_v_published_locale_idx" ON "_posts_v" USING btree ("published_locale");
  CREATE INDEX "_posts_v_latest_idx" ON "_posts_v" USING btree ("latest");
  CREATE INDEX "_posts_v_autosave_idx" ON "_posts_v" USING btree ("autosave");
  CREATE INDEX "_posts_v_version_meta_version_meta_image_idx" ON "_posts_v_locales" USING btree ("version_meta_image_id","_locale");
  CREATE UNIQUE INDEX "_posts_v_locales_locale_parent_id_unique" ON "_posts_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_posts_v_rels_order_idx" ON "_posts_v_rels" USING btree ("order");
  CREATE INDEX "_posts_v_rels_parent_idx" ON "_posts_v_rels" USING btree ("parent_id");
  CREATE INDEX "_posts_v_rels_path_idx" ON "_posts_v_rels" USING btree ("path");
  CREATE INDEX "_posts_v_rels_categories_id_idx" ON "_posts_v_rels" USING btree ("categories_id");
  CREATE UNIQUE INDEX "events_slug_idx" ON "events" USING btree ("slug");
  CREATE INDEX "events_image_idx" ON "events" USING btree ("image_id");
  CREATE INDEX "events_updated_at_idx" ON "events" USING btree ("updated_at");
  CREATE INDEX "events_created_at_idx" ON "events" USING btree ("created_at");
  CREATE INDEX "events__status_idx" ON "events" USING btree ("_status");
  CREATE INDEX "events_meta_meta_image_idx" ON "events_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX "events_locales_locale_parent_id_unique" ON "events_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_events_v_parent_idx" ON "_events_v" USING btree ("parent_id");
  CREATE INDEX "_events_v_version_version_slug_idx" ON "_events_v" USING btree ("version_slug");
  CREATE INDEX "_events_v_version_version_image_idx" ON "_events_v" USING btree ("version_image_id");
  CREATE INDEX "_events_v_version_version_updated_at_idx" ON "_events_v" USING btree ("version_updated_at");
  CREATE INDEX "_events_v_version_version_created_at_idx" ON "_events_v" USING btree ("version_created_at");
  CREATE INDEX "_events_v_version_version__status_idx" ON "_events_v" USING btree ("version__status");
  CREATE INDEX "_events_v_created_at_idx" ON "_events_v" USING btree ("created_at");
  CREATE INDEX "_events_v_updated_at_idx" ON "_events_v" USING btree ("updated_at");
  CREATE INDEX "_events_v_snapshot_idx" ON "_events_v" USING btree ("snapshot");
  CREATE INDEX "_events_v_published_locale_idx" ON "_events_v" USING btree ("published_locale");
  CREATE INDEX "_events_v_latest_idx" ON "_events_v" USING btree ("latest");
  CREATE INDEX "_events_v_autosave_idx" ON "_events_v" USING btree ("autosave");
  CREATE INDEX "_events_v_version_meta_version_meta_image_idx" ON "_events_v_locales" USING btree ("version_meta_image_id","_locale");
  CREATE UNIQUE INDEX "_events_v_locales_locale_parent_id_unique" ON "_events_v_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "press_releases_slug_idx" ON "press_releases" USING btree ("slug");
  CREATE INDEX "press_releases_attachment_idx" ON "press_releases" USING btree ("attachment_id");
  CREATE INDEX "press_releases_updated_at_idx" ON "press_releases" USING btree ("updated_at");
  CREATE INDEX "press_releases_created_at_idx" ON "press_releases" USING btree ("created_at");
  CREATE INDEX "press_releases__status_idx" ON "press_releases" USING btree ("_status");
  CREATE INDEX "press_releases_meta_meta_image_idx" ON "press_releases_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX "press_releases_locales_locale_parent_id_unique" ON "press_releases_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_press_releases_v_parent_idx" ON "_press_releases_v" USING btree ("parent_id");
  CREATE INDEX "_press_releases_v_version_version_slug_idx" ON "_press_releases_v" USING btree ("version_slug");
  CREATE INDEX "_press_releases_v_version_version_attachment_idx" ON "_press_releases_v" USING btree ("version_attachment_id");
  CREATE INDEX "_press_releases_v_version_version_updated_at_idx" ON "_press_releases_v" USING btree ("version_updated_at");
  CREATE INDEX "_press_releases_v_version_version_created_at_idx" ON "_press_releases_v" USING btree ("version_created_at");
  CREATE INDEX "_press_releases_v_version_version__status_idx" ON "_press_releases_v" USING btree ("version__status");
  CREATE INDEX "_press_releases_v_created_at_idx" ON "_press_releases_v" USING btree ("created_at");
  CREATE INDEX "_press_releases_v_updated_at_idx" ON "_press_releases_v" USING btree ("updated_at");
  CREATE INDEX "_press_releases_v_snapshot_idx" ON "_press_releases_v" USING btree ("snapshot");
  CREATE INDEX "_press_releases_v_published_locale_idx" ON "_press_releases_v" USING btree ("published_locale");
  CREATE INDEX "_press_releases_v_latest_idx" ON "_press_releases_v" USING btree ("latest");
  CREATE INDEX "_press_releases_v_autosave_idx" ON "_press_releases_v" USING btree ("autosave");
  CREATE INDEX "_press_releases_v_version_meta_version_meta_image_idx" ON "_press_releases_v_locales" USING btree ("version_meta_image_id","_locale");
  CREATE UNIQUE INDEX "_press_releases_v_locales_locale_parent_id_unique" ON "_press_releases_v_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "publications_slug_idx" ON "publications" USING btree ("slug");
  CREATE INDEX "publications_file_idx" ON "publications" USING btree ("file_id");
  CREATE INDEX "publications_cover_idx" ON "publications" USING btree ("cover_id");
  CREATE INDEX "publications_updated_at_idx" ON "publications" USING btree ("updated_at");
  CREATE INDEX "publications_created_at_idx" ON "publications" USING btree ("created_at");
  CREATE INDEX "publications__status_idx" ON "publications" USING btree ("_status");
  CREATE INDEX "publications_meta_meta_image_idx" ON "publications_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX "publications_locales_locale_parent_id_unique" ON "publications_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_publications_v_parent_idx" ON "_publications_v" USING btree ("parent_id");
  CREATE INDEX "_publications_v_version_version_slug_idx" ON "_publications_v" USING btree ("version_slug");
  CREATE INDEX "_publications_v_version_version_file_idx" ON "_publications_v" USING btree ("version_file_id");
  CREATE INDEX "_publications_v_version_version_cover_idx" ON "_publications_v" USING btree ("version_cover_id");
  CREATE INDEX "_publications_v_version_version_updated_at_idx" ON "_publications_v" USING btree ("version_updated_at");
  CREATE INDEX "_publications_v_version_version_created_at_idx" ON "_publications_v" USING btree ("version_created_at");
  CREATE INDEX "_publications_v_version_version__status_idx" ON "_publications_v" USING btree ("version__status");
  CREATE INDEX "_publications_v_created_at_idx" ON "_publications_v" USING btree ("created_at");
  CREATE INDEX "_publications_v_updated_at_idx" ON "_publications_v" USING btree ("updated_at");
  CREATE INDEX "_publications_v_snapshot_idx" ON "_publications_v" USING btree ("snapshot");
  CREATE INDEX "_publications_v_published_locale_idx" ON "_publications_v" USING btree ("published_locale");
  CREATE INDEX "_publications_v_latest_idx" ON "_publications_v" USING btree ("latest");
  CREATE INDEX "_publications_v_autosave_idx" ON "_publications_v" USING btree ("autosave");
  CREATE INDEX "_publications_v_version_meta_version_meta_image_idx" ON "_publications_v_locales" USING btree ("version_meta_image_id","_locale");
  CREATE UNIQUE INDEX "_publications_v_locales_locale_parent_id_unique" ON "_publications_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "form_submissions_updated_at_idx" ON "form_submissions" USING btree ("updated_at");
  CREATE INDEX "form_submissions_created_at_idx" ON "form_submissions" USING btree ("created_at");
  CREATE UNIQUE INDEX "newsletter_subscribers_email_idx" ON "newsletter_subscribers" USING btree ("email");
  CREATE INDEX "newsletter_subscribers_updated_at_idx" ON "newsletter_subscribers" USING btree ("updated_at");
  CREATE INDEX "newsletter_subscribers_created_at_idx" ON "newsletter_subscribers" USING btree ("created_at");
  CREATE UNIQUE INDEX "donations_stripe_session_id_idx" ON "donations" USING btree ("stripe_session_id");
  CREATE INDEX "donations_updated_at_idx" ON "donations" USING btree ("updated_at");
  CREATE INDEX "donations_created_at_idx" ON "donations" USING btree ("created_at");
  CREATE UNIQUE INDEX "redirects_from_idx" ON "redirects" USING btree ("from");
  CREATE INDEX "redirects_updated_at_idx" ON "redirects" USING btree ("updated_at");
  CREATE INDEX "redirects_created_at_idx" ON "redirects" USING btree ("created_at");
  CREATE INDEX "redirects_rels_order_idx" ON "redirects_rels" USING btree ("order");
  CREATE INDEX "redirects_rels_parent_idx" ON "redirects_rels" USING btree ("parent_id");
  CREATE INDEX "redirects_rels_path_idx" ON "redirects_rels" USING btree ("path");
  CREATE INDEX "redirects_rels_posts_id_idx" ON "redirects_rels" USING btree ("posts_id");
  CREATE INDEX "redirects_rels_programs_id_idx" ON "redirects_rels" USING btree ("programs_id");
  CREATE INDEX "redirects_rels_events_id_idx" ON "redirects_rels" USING btree ("events_id");
  CREATE INDEX "redirects_rels_press_releases_id_idx" ON "redirects_rels" USING btree ("press_releases_id");
  CREATE INDEX "redirects_rels_publications_id_idx" ON "redirects_rels" USING btree ("publications_id");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_documents_id_idx" ON "payload_locked_documents_rels" USING btree ("documents_id");
  CREATE INDEX "payload_locked_documents_rels_programs_id_idx" ON "payload_locked_documents_rels" USING btree ("programs_id");
  CREATE INDEX "payload_locked_documents_rels_partners_id_idx" ON "payload_locked_documents_rels" USING btree ("partners_id");
  CREATE INDEX "payload_locked_documents_rels_team_members_id_idx" ON "payload_locked_documents_rels" USING btree ("team_members_id");
  CREATE INDEX "payload_locked_documents_rels_stories_id_idx" ON "payload_locked_documents_rels" USING btree ("stories_id");
  CREATE INDEX "payload_locked_documents_rels_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("categories_id");
  CREATE INDEX "payload_locked_documents_rels_posts_id_idx" ON "payload_locked_documents_rels" USING btree ("posts_id");
  CREATE INDEX "payload_locked_documents_rels_events_id_idx" ON "payload_locked_documents_rels" USING btree ("events_id");
  CREATE INDEX "payload_locked_documents_rels_press_releases_id_idx" ON "payload_locked_documents_rels" USING btree ("press_releases_id");
  CREATE INDEX "payload_locked_documents_rels_publications_id_idx" ON "payload_locked_documents_rels" USING btree ("publications_id");
  CREATE INDEX "payload_locked_documents_rels_form_submissions_id_idx" ON "payload_locked_documents_rels" USING btree ("form_submissions_id");
  CREATE INDEX "payload_locked_documents_rels_newsletter_subscribers_id_idx" ON "payload_locked_documents_rels" USING btree ("newsletter_subscribers_id");
  CREATE INDEX "payload_locked_documents_rels_donations_id_idx" ON "payload_locked_documents_rels" USING btree ("donations_id");
  CREATE INDEX "payload_locked_documents_rels_redirects_id_idx" ON "payload_locked_documents_rels" USING btree ("redirects_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "site_settings_default_seo_default_seo_image_idx" ON "site_settings" USING btree ("default_seo_image_id");
  CREATE UNIQUE INDEX "site_settings_locales_locale_parent_id_unique" ON "site_settings_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "header_items_order_idx" ON "header_items" USING btree ("_order");
  CREATE INDEX "header_items_parent_id_idx" ON "header_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "header_items_locales_locale_parent_id_unique" ON "header_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "footer_items_order_idx" ON "footer_items" USING btree ("_order");
  CREATE INDEX "footer_items_parent_id_idx" ON "footer_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "footer_items_locales_locale_parent_id_unique" ON "footer_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "footer_legal_order_idx" ON "footer_legal" USING btree ("_order");
  CREATE INDEX "footer_legal_parent_id_idx" ON "footer_legal" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "footer_legal_locales_locale_parent_id_unique" ON "footer_legal_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_hero_hero_image_idx" ON "home" USING btree ("hero_image_id");
  CREATE UNIQUE INDEX "home_locales_locale_parent_id_unique" ON "home_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_rels_order_idx" ON "home_rels" USING btree ("order");
  CREATE INDEX "home_rels_parent_idx" ON "home_rels" USING btree ("parent_id");
  CREATE INDEX "home_rels_path_idx" ON "home_rels" USING btree ("path");
  CREATE INDEX "home_rels_programs_id_idx" ON "home_rels" USING btree ("programs_id");
  CREATE INDEX "impact_stats_order_idx" ON "impact_stats" USING btree ("_order");
  CREATE INDEX "impact_stats_parent_id_idx" ON "impact_stats" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "impact_stats_locales_locale_parent_id_unique" ON "impact_stats_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "impact_map_pins_order_idx" ON "impact_map_pins" USING btree ("_order");
  CREATE INDEX "impact_map_pins_parent_id_idx" ON "impact_map_pins" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "impact_map_pins_locales_locale_parent_id_unique" ON "impact_map_pins_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "impact_rels_order_idx" ON "impact_rels" USING btree ("order");
  CREATE INDEX "impact_rels_parent_idx" ON "impact_rels" USING btree ("parent_id");
  CREATE INDEX "impact_rels_path_idx" ON "impact_rels" USING btree ("path");
  CREATE INDEX "impact_rels_stories_id_idx" ON "impact_rels" USING btree ("stories_id");
  CREATE INDEX "about_values_order_idx" ON "about_values" USING btree ("_order");
  CREATE INDEX "about_values_parent_id_idx" ON "about_values" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "about_values_locales_locale_parent_id_unique" ON "about_values_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "about_locales_locale_parent_id_unique" ON "about_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "donate_settings_tiers_order_idx" ON "donate_settings_tiers" USING btree ("_order");
  CREATE INDEX "donate_settings_tiers_parent_id_idx" ON "donate_settings_tiers" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "donate_settings_tiers_locales_locale_parent_id_unique" ON "donate_settings_tiers_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "donate_settings_currencies_order_idx" ON "donate_settings_currencies" USING btree ("order");
  CREATE INDEX "donate_settings_currencies_parent_idx" ON "donate_settings_currencies" USING btree ("parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "media_locales" CASCADE;
  DROP TABLE "documents" CASCADE;
  DROP TABLE "documents_locales" CASCADE;
  DROP TABLE "programs" CASCADE;
  DROP TABLE "programs_locales" CASCADE;
  DROP TABLE "_programs_v" CASCADE;
  DROP TABLE "_programs_v_locales" CASCADE;
  DROP TABLE "partners" CASCADE;
  DROP TABLE "team_members" CASCADE;
  DROP TABLE "team_members_locales" CASCADE;
  DROP TABLE "stories" CASCADE;
  DROP TABLE "stories_locales" CASCADE;
  DROP TABLE "categories" CASCADE;
  DROP TABLE "categories_locales" CASCADE;
  DROP TABLE "posts" CASCADE;
  DROP TABLE "posts_locales" CASCADE;
  DROP TABLE "posts_rels" CASCADE;
  DROP TABLE "_posts_v" CASCADE;
  DROP TABLE "_posts_v_locales" CASCADE;
  DROP TABLE "_posts_v_rels" CASCADE;
  DROP TABLE "events" CASCADE;
  DROP TABLE "events_locales" CASCADE;
  DROP TABLE "_events_v" CASCADE;
  DROP TABLE "_events_v_locales" CASCADE;
  DROP TABLE "press_releases" CASCADE;
  DROP TABLE "press_releases_locales" CASCADE;
  DROP TABLE "_press_releases_v" CASCADE;
  DROP TABLE "_press_releases_v_locales" CASCADE;
  DROP TABLE "publications" CASCADE;
  DROP TABLE "publications_locales" CASCADE;
  DROP TABLE "_publications_v" CASCADE;
  DROP TABLE "_publications_v_locales" CASCADE;
  DROP TABLE "form_submissions" CASCADE;
  DROP TABLE "newsletter_subscribers" CASCADE;
  DROP TABLE "donations" CASCADE;
  DROP TABLE "redirects" CASCADE;
  DROP TABLE "redirects_rels" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TABLE "site_settings_locales" CASCADE;
  DROP TABLE "header_items" CASCADE;
  DROP TABLE "header_items_locales" CASCADE;
  DROP TABLE "header" CASCADE;
  DROP TABLE "footer_items" CASCADE;
  DROP TABLE "footer_items_locales" CASCADE;
  DROP TABLE "footer_legal" CASCADE;
  DROP TABLE "footer_legal_locales" CASCADE;
  DROP TABLE "footer" CASCADE;
  DROP TABLE "home" CASCADE;
  DROP TABLE "home_locales" CASCADE;
  DROP TABLE "home_rels" CASCADE;
  DROP TABLE "impact_stats" CASCADE;
  DROP TABLE "impact_stats_locales" CASCADE;
  DROP TABLE "impact_map_pins" CASCADE;
  DROP TABLE "impact_map_pins_locales" CASCADE;
  DROP TABLE "impact" CASCADE;
  DROP TABLE "impact_rels" CASCADE;
  DROP TABLE "about_values" CASCADE;
  DROP TABLE "about_values_locales" CASCADE;
  DROP TABLE "about" CASCADE;
  DROP TABLE "about_locales" CASCADE;
  DROP TABLE "donate_settings_tiers" CASCADE;
  DROP TABLE "donate_settings_tiers_locales" CASCADE;
  DROP TABLE "donate_settings_currencies" CASCADE;
  DROP TABLE "donate_settings" CASCADE;
  DROP TYPE "public"."_locales";
  DROP TYPE "public"."enum_users_role";
  DROP TYPE "public"."enum_documents_language";
  DROP TYPE "public"."enum_programs_status";
  DROP TYPE "public"."enum__programs_v_version_status";
  DROP TYPE "public"."enum__programs_v_published_locale";
  DROP TYPE "public"."enum_team_members_group";
  DROP TYPE "public"."enum_posts_status";
  DROP TYPE "public"."enum__posts_v_version_status";
  DROP TYPE "public"."enum__posts_v_published_locale";
  DROP TYPE "public"."enum_events_status";
  DROP TYPE "public"."enum__events_v_version_status";
  DROP TYPE "public"."enum__events_v_published_locale";
  DROP TYPE "public"."enum_press_releases_status";
  DROP TYPE "public"."enum__press_releases_v_version_status";
  DROP TYPE "public"."enum__press_releases_v_published_locale";
  DROP TYPE "public"."enum_publications_type";
  DROP TYPE "public"."enum_publications_status";
  DROP TYPE "public"."enum__publications_v_version_type";
  DROP TYPE "public"."enum__publications_v_version_status";
  DROP TYPE "public"."enum__publications_v_published_locale";
  DROP TYPE "public"."enum_form_submissions_type";
  DROP TYPE "public"."enum_form_submissions_email_status";
  DROP TYPE "public"."enum_newsletter_subscribers_status";
  DROP TYPE "public"."enum_donations_mode";
  DROP TYPE "public"."enum_redirects_to_type";
  DROP TYPE "public"."enum_donate_settings_currencies";`)
}
