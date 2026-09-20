import { expect, test } from '@playwright/test';

const routes = ['/', '/about', '/work', '/impact', '/contact', '/donate'];

for (const route of routes) {
  test(`route ${route} renders without console errors`, async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    const response = await page.goto(route, { waitUntil: 'networkidle' });
    expect(response?.status()).toBeLessThan(400);
    // The SPA shell should mount and render the header nav.
    await expect(page.getByRole('navigation').first()).toBeVisible();
    expect(errors, `console errors on ${route}: ${errors.join('\n')}`).toHaveLength(0);
  });
}

test('unknown route shows the not-found page', async ({ page }) => {
  await page.goto('/this-route-does-not-exist');
  await expect(page.getByText(/not found|404/i).first()).toBeVisible();
});
