import { routing } from '@/i18n/routing';

const SITE = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.src-rural.org').replace(/\/$/, '');

/**
 * Build canonical + hreflang alternates for a localized page, so Google serves
 * the right language version and connects the en/fr/ar variants.
 * `path` is the route without the locale prefix, e.g. '/about' or '' for home.
 */
export function localeAlternates(locale: string, path = '') {
  const clean = path === '/' ? '' : path;
  const languages: Record<string, string> = {};
  for (const l of routing.locales) languages[l] = `${SITE}/${l}${clean}`;
  languages['x-default'] = `${SITE}/${routing.defaultLocale}${clean}`;
  return { canonical: `${SITE}/${locale}${clean}`, languages };
}
