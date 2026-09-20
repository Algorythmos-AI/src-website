import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

// Next.js 16 renames middleware.ts to proxy.ts.
export default createMiddleware(routing);

export const config = {
  // Match every path except API routes, the Payload admin (added later),
  // Next internals, Vercel internals, and anything with a file extension.
  matcher: ['/((?!api|admin|_next|_vercel|.*\\..*).*)'],
};
