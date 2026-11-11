import { describe, expect, it } from 'vitest';
import { toSocialLinks } from './social';

describe('toSocialLinks', () => {
  it('returns nothing for missing settings', () => {
    expect(toSocialLinks(undefined)).toEqual([]);
    expect(toSocialLinks(null)).toEqual([]);
    expect(toSocialLinks({})).toEqual([]);
  });

  it('keeps https links in footer order and drops empty ones', () => {
    expect(
      toSocialLinks({
        linkedin: 'https://www.linkedin.com/company/src',
        facebook: 'https://www.facebook.com/src',
        twitter: '',
        instagram: null,
      })
    ).toEqual([
      { network: 'facebook', href: 'https://www.facebook.com/src' },
      { network: 'linkedin', href: 'https://www.linkedin.com/company/src' },
    ]);
  });

  it('rejects non-https and malformed values', () => {
    expect(
      toSocialLinks({
        facebook: 'http://facebook.com/src',
        twitter: 'javascript:alert(1)',
        instagram: 'not a url',
        linkedin: '  https://www.linkedin.com/company/src  ',
      })
    ).toEqual([{ network: 'linkedin', href: 'https://www.linkedin.com/company/src' }]);
  });
});
