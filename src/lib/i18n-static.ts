import { locales, defaultLocale, rtlLocales, type Locale } from '@/i18n/routing';
import en from '../../messages/en.json';
import fr from '../../messages/fr.json';
import ar from '../../messages/ar.json';

// Access to the message catalogues outside a next-intl request context — for
// route handlers (newsletter confirm) and the root-level not-found / error
// boundaries, which render without a locale segment.
const catalogs = { en, fr, ar } as const;

export function normalizeLocale(input?: string | null): Locale {
  return (locales as readonly string[]).includes(input ?? '') ? (input as Locale) : defaultLocale;
}

export function isRtl(locale: string): boolean {
  return (rtlLocales as readonly string[]).includes(normalizeLocale(locale));
}

/** Returns a translator for a namespace in the given (validated) locale. */
export function staticT(locale: string, namespace: keyof typeof en) {
  const loc = normalizeLocale(locale);
  const ns = (catalogs[loc] as Record<string, Record<string, string>>)[namespace] ?? {};
  return (key: string) => ns[key] ?? key;
}
