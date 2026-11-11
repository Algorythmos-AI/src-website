import path from 'path';
import { fileURLToPath } from 'url';
import { buildConfig } from 'payload';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob';
import { seoPlugin } from '@payloadcms/plugin-seo';
import { redirectsPlugin } from '@payloadcms/plugin-redirects';
import sharp from 'sharp';

import { Users } from '@/collections/Users';
import { Media } from '@/collections/Media';
import { Documents } from '@/collections/Documents';
import { Programs } from '@/collections/Programs';
import { Partners } from '@/collections/Partners';
import { TeamMembers } from '@/collections/TeamMembers';
import { Stories } from '@/collections/Stories';
import { Categories } from '@/collections/Categories';
import { Posts } from '@/collections/Posts';
import { Events } from '@/collections/Events';
import { PressReleases } from '@/collections/PressReleases';
import { Publications } from '@/collections/Publications';
import { Galleries } from '@/collections/Galleries';
import { FormSubmissions } from '@/collections/FormSubmissions';
import { NewsletterSubscribers } from '@/collections/NewsletterSubscribers';
import { Donations } from '@/collections/Donations';
import { SiteSettings } from '@/globals/SiteSettings';
import { Header, Footer } from '@/globals/Navigation';
import { Home } from '@/globals/Home';
import { Impact } from '@/globals/Impact';
import { About } from '@/globals/About';
import { DonateSettings } from '@/globals/DonateSettings';

const dirname = path.dirname(fileURLToPath(import.meta.url));

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

const seoCollections = ['posts', 'programs', 'events', 'press-releases', 'publications'];

export default buildConfig({
  // No serverURL: local-disk media URLs stay relative (`/api/media/file/…`) so
  // they resolve on whatever origin serves them (dev :3000, CI :4173, prod).
  // Production media is served absolutely from Vercel Blob instead.
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname, 'app') },
    meta: { titleSuffix: ' — SRC' },
  },
  editor: lexicalEditor(),
  collections: [
    Users,
    Media,
    Documents,
    Programs,
    Partners,
    TeamMembers,
    Stories,
    Categories,
    Posts,
    Events,
    PressReleases,
    Publications,
    Galleries,
    FormSubmissions,
    NewsletterSubscribers,
    Donations,
  ],
  globals: [SiteSettings, Header, Footer, Home, Impact, About, DonateSettings],
  localization: {
    locales: [
      { label: 'English', code: 'en' },
      { label: 'Français', code: 'fr' },
      { label: 'العربية', code: 'ar', rtl: true },
    ],
    defaultLocale: 'en',
    fallback: true,
  },
  graphQL: { disable: true },
  cors: [siteUrl],
  csrf: [siteUrl],
  db: postgresAdapter({
    pool: { connectionString: process.env.POSTGRES_URL },
    // Auto-sync schema in dev; production uses committed migrations.
    push: process.env.NODE_ENV !== 'production',
  }),
  sharp,
  secret: process.env.PAYLOAD_SECRET ?? '',
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
  plugins: [
    seoPlugin({
      collections: seoCollections,
      uploadsCollection: 'media',
      generateTitle: ({ doc }: { doc: { title?: string } }) => doc?.title ?? '',
    }),
    redirectsPlugin({ collections: seoCollections }),
    ...(process.env.BLOB_READ_WRITE_TOKEN
      ? [
          vercelBlobStorage({
            enabled: true,
            token: process.env.BLOB_READ_WRITE_TOKEN,
            // Client-side uploads bypass the 4.5 MB serverless body limit.
            clientUploads: true,
            // Serve public media straight from the Blob CDN (media.url becomes the
            // absolute blob URL) instead of proxying through Payload's route.
            collections: {
              media: { disablePayloadAccessControl: true },
              documents: { disablePayloadAccessControl: true },
            },
          }),
        ]
      : []),
  ],
});
