import type { TextFieldValidation } from 'payload';

/**
 * Requires a value only when editing the default (English) locale, so content
 * can be published in English and translated into fr/ar later without blocking.
 * All fields using this are `type: 'text'`.
 */
export const requiredInEnglish: TextFieldValidation = (value, { req }) => {
  const locale = req?.locale;
  if ((!locale || locale === 'en') && (value === undefined || value === null || value === '')) {
    return 'This field is required (in English).';
  }
  return true;
};

/**
 * Optional absolute https:// URL (social profile links, external pages).
 * Empty is allowed; anything else must parse as an https URL.
 */
export const optionalHttpsUrl: TextFieldValidation = (value) => {
  if (value === undefined || value === null || value === '') return true;
  try {
    const url = new URL(String(value));
    if (url.protocol !== 'https:') return 'Use a full link starting with https://';
    return true;
  } catch {
    return 'Use a full link starting with https://';
  }
};
