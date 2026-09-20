import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import { withPayload } from '@payloadcms/next/withPayload';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const securityHeaders = [
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=()' },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // next-intl ships ESM that imports `next/navigation` extensionless; Next 16 has
  // no package `exports` map, so it must be transpiled (not externalized) for that
  // import to resolve through Next's bundler aliases during server rendering.
  transpilePackages: ['next-intl'],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'plus.unsplash.com' },
      { protocol: 'https', hostname: '*.public.blob.vercel-storage.com' },
    ],
  },
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  },
};

export default withPayload(withNextIntl(nextConfig), { devBundleServerPackages: false });
