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
