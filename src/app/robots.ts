import type { MetadataRoute } from 'next';

const BASE = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://src-zeta-teal.vercel.app').replace(
  /\/$/,
  ''
);

export default function robots(): MetadataRoute.Robots {
  // Non-production (preview) deployments should not be indexed.
  const isProduction = process.env.VERCEL_ENV ? process.env.VERCEL_ENV === 'production' : true;

  if (!isProduction) {
    return { rules: [{ userAgent: '*', disallow: '/' }] };
  }

  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/admin', '/api'] }],
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  };
}
