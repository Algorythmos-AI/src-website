import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import {
  getEventSlugs,
  getPostSlugs,
  getPressSlugs,
  getProgramSlugs,
  getPublicationSlugs,
} from '@/lib/queries';

const BASE = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.src-rural.org').replace(/\/$/, '');

function withAlternates(path: string): MetadataRoute.Sitemap[number] {
  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, `${BASE}/${l}${path}`])
  ) as Record<string, string>;
  return {
    url: `${BASE}/${routing.defaultLocale}${path}`,
    alternates: { languages },
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPaths = [
    '',
    '/about',
    '/work',
    '/impact',
    '/contact',
    '/donate',
    '/news',
    '/events',
    '/press',
    '/publications',
    '/media',
  ];

  let dynamicPaths: string[] = [];
  try {
    const [programs, posts, events, press, publications] = await Promise.all([
      getProgramSlugs(),
      getPostSlugs(),
      getEventSlugs(),
      getPressSlugs(),
      getPublicationSlugs(),
    ]);
    dynamicPaths = [
      ...programs.map((s) => `/work/${s}`),
      ...posts.map((s) => `/news/${s}`),
      ...events.map((s) => `/events/${s}`),
      ...press.map((s) => `/press/${s}`),
      ...publications.map((s) => `/publications/${s}`),
    ];
  } catch {
    // DB unavailable at build → ship the static routes only.
  }

  return [...staticPaths, ...dynamicPaths].map(withAlternates);
}
