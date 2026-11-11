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

/** Locale-aware file size, e.g. "2.4 MB" / "2,4 Mo". Empty string for missing/invalid sizes. */
export function formatFileSize(bytes: number | null | undefined, locale: Locale): string {
  if (typeof bytes !== 'number' || !Number.isFinite(bytes) || bytes <= 0) return '';
  const mb = bytes / (1024 * 1024);
  const [value, unit] = mb >= 1 ? [mb, 'megabyte'] : [Math.max(bytes / 1024, 1), 'kilobyte'];
  return new Intl.NumberFormat(locale, {
    style: 'unit',
    unit,
    unitDisplay: 'short',
    maximumFractionDigits: value < 10 ? 1 : 0,
  }).format(value);
}

/** A language code ("en", "fr", "ar") as its name in the display locale. */
export function languageName(code: string | null | undefined, locale: Locale): string {
  if (!code) return '';
  try {
    return new Intl.DisplayNames([locale], { type: 'language' }).of(code) ?? '';
  } catch {
    return '';
  }
}
