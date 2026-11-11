import { describe, expect, it } from 'vitest';
import { formatFileSize, languageName } from './format';

describe('formatFileSize', () => {
  it('formats megabytes and kilobytes', () => {
    expect(formatFileSize(2.4 * 1024 * 1024, 'en')).toBe('2.4 MB');
    expect(formatFileSize(15 * 1024 * 1024, 'en')).toBe('15 MB');
    expect(formatFileSize(300 * 1024, 'en')).toBe('300 kB');
    expect(formatFileSize(10, 'en')).toBe('1 kB');
  });

  it('uses the locale decimal separator', () => {
    expect(formatFileSize(2.4 * 1024 * 1024, 'fr')).toMatch(/^2,4\s?Mo$/);
  });

  it('returns empty for missing or invalid sizes', () => {
    expect(formatFileSize(null, 'en')).toBe('');
    expect(formatFileSize(undefined, 'en')).toBe('');
    expect(formatFileSize(0, 'en')).toBe('');
    expect(formatFileSize(Number.NaN, 'en')).toBe('');
  });
});

describe('languageName', () => {
  it('names the language in the display locale', () => {
    expect(languageName('ar', 'en')).toBe('Arabic');
    expect(languageName('en', 'fr')).toBe('anglais');
  });

  it('returns empty for missing codes', () => {
    expect(languageName(null, 'en')).toBe('');
  });
});
