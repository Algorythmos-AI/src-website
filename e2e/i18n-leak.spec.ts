import { expect, test } from '@playwright/test';

/**
 * Guardrail: on /fr and /ar, the visible body copy must not contain any of the
 * distinctive English sentences from the site. Catches regressions where a new
 * hard-coded English string sneaks into a view or a message key gets skipped.
 *
 * Only body text is checked — not <head> — because static Unicode literals
 * embedded in the JS bundle (e.g. an English fallback string a component ships
 * but never renders) can appear in the raw HTML too. Reading `document.body`
 * innerText excludes those.
 */

const routes = [
  '',
  '/about',
  '/work',
  '/impact',
  '/contact',
  '/donate',
  '/news',
  '/events',
  '/press',
  '/publications',
  '/privacy',
  '/terms',
];

// Sentences that appear only in the English UI or CMS content. Each is
// distinctive enough that it cannot show up incidentally in a French or Arabic
// page (proper nouns and brand words like SRC/UNICEF are excluded by design).
const englishSentinels = [
  // Home / Hero
  'Building peace and resilience across rural Sudan',
  'Stand with rural Sudan',
  'Where your support goes',
  'View all programs',
  'In partnership with',
  'Annual Report 2024',
  'Read the report',
  'Donate to SRC',
  'Read our founding story',
  'From our leadership',
  // About
  'A decade of resilience',
  'Our story',
  'Rooted in local wisdom',
  'Our core principles',
  'The team behind SRC',
  // Work
  'How we work in rural Sudan',
  'Global standards, local execution',
  // Impact
  'Our impact, audited and reported',
  'Stories behind the numbers',
  'Where we work',
  'Support our impact',
  // Contact
  "We'd like to hear from you",
  'Send us a message',
  'Send message',
  'Full name',
  'Office hours',
  // Donate
  'Direct impact, fully accounted for',
  'Choose an amount',
  'Or enter a custom amount',
  // News / lists
  'Updates from the field',
  'Where to meet SRC',
  'Official statements and media resources',
  'Reports, briefs, and annual accounts',
  // Legal
  'Privacy Policy',
  'Terms of Use',
  'Information we collect',
  'Acceptable use',
  // CMS content
  'Resilient Peacebuilding',
  'Rural Education Centers',
  'Emergency Water Relief',
  'Mobile Health Clinics',
  'Sustainable Agriculture',
  "Women's Cooperatives",
  'People reached',
  'Active programs',
  'Field sites',
];

for (const locale of ['fr', 'ar'] as const) {
  test.describe(`no English leaks on /${locale}`, () => {
    for (const path of routes) {
      const route = `/${locale}${path}`;
      test(route, async ({ page }) => {
        const res = await page.goto(route, { waitUntil: 'networkidle' });
        expect(res?.status()).toBeLessThan(400);
        const text = (await page.evaluate(() => document.body.innerText)) ?? '';
        const leaks = englishSentinels.filter((s) => text.includes(s));
        expect(leaks, `English leaks on ${route}: ${leaks.join(' | ')}`).toEqual([]);
      });
    }

    test(`/${locale} html has correct lang${locale === 'ar' ? ' and dir=rtl' : ''}`, async ({
      page,
    }) => {
      await page.goto(`/${locale}`);
      await expect(page.locator('html')).toHaveAttribute('lang', locale);
      if (locale === 'ar') await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
    });
  });
}
