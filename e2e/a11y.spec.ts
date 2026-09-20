import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

// Run axe on desktop only to avoid duplicate runs across projects.
test.skip(() => test.info().project.name !== 'chromium', 'a11y checked on desktop project');

const routes = ['/en', '/en/work', '/en/news', '/en/contact', '/en/donate'];

for (const route of routes) {
  test(`no serious/critical accessibility violations on ${route}`, async ({ page }) => {
    await page.goto(route, { waitUntil: 'networkidle' });
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    const serious = results.violations.filter(
      (v) => v.impact === 'serious' || v.impact === 'critical'
    );
    expect(serious, serious.map((v) => `${v.id}: ${v.help}`).join('\n')).toHaveLength(0);
  });
}

test('RTL Arabic home has no serious/critical violations', async ({ page }) => {
  await page.goto('/ar', { waitUntil: 'networkidle' });
  const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze();
  const serious = results.violations.filter(
    (v) => v.impact === 'serious' || v.impact === 'critical'
  );
  expect(serious, serious.map((v) => v.id).join('\n')).toHaveLength(0);
});
