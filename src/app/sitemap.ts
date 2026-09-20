import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { getEventSlugs, getPostSlugs, getPressSlugs, getProgramSlugs } from '@/lib/queries';
import { getPayloadClient } from '@/lib/payload';

const BASE = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://src-zeta-teal.vercel.app').replace(
  /\/$/,
  ''
);

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
  ];

  let dynamicPaths: string[] = [];
  try {
    const [programs, posts, events, press, publications] = await Promise.all([
      getProgramSlugs(),
      getPostSlugs(),
      getEventSlugs(),
      getPressSlugs(),
      getPayloadClient()
        .then((p) =>
          p.find({
            collection: 'publications',
            where: { _status: { equals: 'published' } },
            depth: 0,
            limit: 500,
            pagination: false,
          })
        )
        .then((r) => r.docs.map((d) => d.slug).filter((s): s is string => Boolean(s))),
    ]);
    dynamicPaths = [
      ...programs.map((s) => `/work/${s}`),
      ...posts.map((s) => `/news/${s}`),
      ...events.map((s) => `/events/${s}`),
      ...press.map((s) => `/press/${s}`),
      ...publications.map(() => ''), // publications have no detail route
    ].filter(Boolean);
  } catch {
    // DB unavailable at build → ship the static routes only.
  }

  return [...staticPaths, ...dynamicPaths].map(withAlternates);
}
