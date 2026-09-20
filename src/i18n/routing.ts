import { defineRouting } from 'next-intl/routing';

export const locales = ['en', 'fr', 'ar'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

/** Right-to-left locales, used to set the <html dir> attribute. */
export const rtlLocales: readonly Locale[] = ['ar'];

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: 'always',
});
