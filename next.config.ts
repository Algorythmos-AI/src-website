import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import { withPayload } from '@payloadcms/next/withPayload';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const securityHeaders = [
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
];

// Strict CSP for the public site. 'unsafe-inline' scripts cover the theme init
// and JSON-LD; a nonce-based policy is a future hardening step.
const frontendCsp = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "img-src 'self' data: blob: https://images.unsplash.com https://plus.unsplash.com https://*.public.blob.vercel-storage.com",
  "font-src 'self' https://fonts.gstatic.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "script-src 'self' 'unsafe-inline' https://js.stripe.com https://challenges.cloudflare.com",
  "connect-src 'self' https://api.stripe.com",
  'frame-src https://js.stripe.com https://checkout.stripe.com https://challenges.cloudflare.com',
  "form-action 'self' https://checkout.stripe.com",
].join('; ');

// Looser CSP for the Payload admin bundle.
const adminCsp = [
  "default-src 'self'",
  "base-uri 'self'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "style-src 'self' 'unsafe-inline'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
  "connect-src 'self'",
  "worker-src 'self' blob:",
  "frame-ancestors 'self'",
].join('; ');

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
    return [
      { source: '/:path*', headers: securityHeaders },
      { source: '/admin/:path*', headers: [{ key: 'Content-Security-Policy', value: adminCsp }] },
      // Everything except the admin bundle gets the strict frontend CSP.
      {
        source: '/((?!admin).*)',
        headers: [{ key: 'Content-Security-Policy', value: frontendCsp }],
      },
    ];
  },
};

export default withPayload(withNextIntl(nextConfig), { devBundleServerPackages: false });
