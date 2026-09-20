import { expect, test } from '@playwright/test';

// Forms hit the rate limiter (keyed by IP); run once on desktop only so parallel
// projects don't share the same localhost IP budget.
test.skip(
  () => test.info().project.name !== 'chromium',
  'form submission tested on desktop project only'
);

test('contact form submits and shows a success message', async ({ page }) => {
  await page.goto('/en/contact');
  await page.fill('#contact-name', 'Jane Tester');
  await page.fill('#contact-email', 'jane.tester@example.com');
  await page.fill(
    '#contact-message',
    'This is an automated end-to-end test message with sufficient length.'
  );
  // Wait past the minimum fill time (anti-bot) before submitting.
  await page.waitForTimeout(2200);
  await page.getByRole('button', { name: /send message/i }).click();
  await expect(page.getByText(/your message has been sent/i)).toBeVisible({ timeout: 15000 });
});

test('newsletter form requires consent and confirms on submit', async ({ page }) => {
  await page.goto('/en/contact');
  const email = page.locator('#newsletter-email');
  await email.scrollIntoViewIfNeeded();
  await email.fill('subscriber@example.com');
  await page.check('input[name="consent"]');
  await page.waitForTimeout(2200);
  await page.getByRole('button', { name: /subscribe/i }).click();
  await expect(page.getByText(/check your inbox/i)).toBeVisible({ timeout: 15000 });
});
