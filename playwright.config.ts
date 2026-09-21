import { defineConfig, devices } from '@playwright/test';

const PORT = 4173;
// Point the runner at a deployed URL (staging/preview/prod) by setting
// BASE_URL. Otherwise a local build is started on PORT.
const BASE_URL = process.env.BASE_URL?.replace(/\/$/, '') ?? `http://localhost:${PORT}`;
const useLocalServer = !process.env.BASE_URL;

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL: BASE_URL,
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    // Pixel 5 is Chromium-based, so CI only needs the chromium browser.
    { name: 'mobile', use: { ...devices['Pixel 5'] } },
  ],
  webServer: useLocalServer
    ? {
        command: `npm run build && npx next start -p ${PORT}`,
        port: PORT,
        reuseExistingServer: !process.env.CI,
        timeout: 180_000,
      }
    : undefined,
});
