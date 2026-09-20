import type { Locale } from '@/i18n/routing';

/** Locale-aware long date, e.g. "12 March 2026". Safe on null/invalid input. */
export function formatDate(value: string | null | undefined, locale: Locale): string {
  if (!value) return '';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return '';
  return new Intl.DateTimeFormat(locale, { dateStyle: 'long' }).format(d);
}

/** Locale-aware date + time in a given timezone. */
export function formatDateTime(
  value: string | null | undefined,
  locale: Locale,
  timeZone?: string
): string {
  if (!value) return '';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return '';
  return new Intl.DateTimeFormat(locale, {
    dateStyle: 'long',
    timeStyle: 'short',
    timeZone: timeZone || undefined,
  }).format(d);
}
