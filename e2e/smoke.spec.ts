import { expect, test } from '@playwright/test';

const paths = ['', '/about', '/work', '/impact', '/contact', '/donate'];

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
