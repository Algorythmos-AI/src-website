import { expect, test } from '@playwright/test';

const paths = [
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
  '/media',
];

test.describe('English routes', () => {
  for (const path of paths) {
    const route = `/en${path}`;
    test(`route ${route} renders without console errors`, async ({ page }) => {
      const errors: string[] = [];
      page.on('console', (msg) => {
        if (msg.type() === 'error') errors.push(msg.text());
      });
      const response = await page.goto(route, { waitUntil: 'networkidle' });
      expect(response?.status()).toBeLessThan(400);
      await expect(page.getByRole('navigation').first()).toBeVisible();

      // Scroll the full page so lazy images load, then assert none rendered broken.
      await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += window.innerHeight) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 100));
        }
        window.scrollTo(0, 0);
      });
      await page.waitForLoadState('networkidle');
      const brokenImages = await page.evaluate(() =>
        [...document.querySelectorAll('img')]
          .filter((img) => img.complete && img.naturalWidth === 0)
          .map((img) => img.currentSrc || img.src)
      );
      expect(brokenImages, `broken images on ${route}`).toEqual([]);

      // No horizontal overflow (mobile projects catch RTL/layout regressions).
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth
      );
      expect(overflow, `horizontal overflow on ${route}`).toBeLessThanOrEqual(1);

      expect(errors, `console errors on ${route}: ${errors.join('\n')}`).toHaveLength(0);
    });
  }
});

test('root redirects to a locale-prefixed path', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveURL(/\/en$/);
});

test('Arabic locale renders right-to-left', async ({ page }) => {
  await page.goto('/ar');
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
  await expect(page.locator('html')).toHaveAttribute('lang', 'ar');
});

test('French locale renders with lang=fr', async ({ page }) => {
  await page.goto('/fr');
  await expect(page.locator('html')).toHaveAttribute('lang', 'fr');
});

test('unknown route shows the not-found page', async ({ page }) => {
  const res = await page.goto('/en/this-route-does-not-exist');
  expect(res?.status()).toBe(404);
  await expect(page.getByText(/404/).first()).toBeVisible();
});

test.describe('Primary navigation', () => {
  const cases = [
    { locale: 'en', label: 'Publications', media: 'Media', openMenu: 'Open menu' },
    { locale: 'fr', label: 'Publications', media: 'Médias', openMenu: 'Ouvrir le menu' },
    { locale: 'ar', label: 'المنشورات', media: 'الوسائط', openMenu: 'فتح القائمة' },
  ];

  for (const { locale, label, media, openMenu } of cases) {
    test(`links to publications and media and fits the header in ${locale}`, async ({
      page,
      isMobile,
    }) => {
      await page.goto(`/${locale}/about`);
      const nav = page.getByRole('navigation').first();
      if (isMobile) {
        await nav.getByRole('button', { name: openMenu }).click();
      }
      const link = nav.getByRole('link', { name: label, exact: true });
      await expect(link).toBeVisible();
      await expect(link).toHaveAttribute('href', `/${locale}/publications`);
      const mediaLink = nav.getByRole('link', { name: media, exact: true });
      await expect(mediaLink).toBeVisible();
      await expect(mediaLink).toHaveAttribute('href', `/${locale}/media`);

      // The header row must not be wider than the viewport in any language.
      const overflow = await nav.evaluate((el) => el.scrollWidth - el.clientWidth);
      expect(overflow, `header overflow in ${locale}`).toBeLessThanOrEqual(1);
    });
  }
});

test('unknown publication slug shows the not-found page', async ({ page }) => {
  const res = await page.goto('/en/publications/this-report-does-not-exist');
  expect(res?.status()).toBe(404);
  await expect(page.getByText(/404/).first()).toBeVisible();
});

test('media page allows the YouTube and Vimeo players in its CSP', async ({ request }) => {
  const res = await request.get('/en/media');
  expect(res.status()).toBe(200);
  const csp = res.headers()['content-security-policy'] ?? '';
  expect(csp).toContain('frame-src');
  expect(csp).toContain('https://www.youtube-nocookie.com');
  expect(csp).toContain('https://player.vimeo.com');
});
