import { defineConfig, devices } from "@playwright/test";

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./exercises/temp",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Whether to exit with an error if any tests are marked as test.only. Useful on CI. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only. On CI run maximum 2 times, on local doesn't run */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI: Quy định số lượng worker (luồng chạy kiểm thử). Trong CI: Chỉ chạy 1 worker để tránh lỗi song song. Ở local: Để Playwright tự động tối ưu (undefined)  */
  workers: process.env.CI ? 1 : undefined,
  /* Create report with format HTML. After run test, u can open file playwright-report/index.html to see result. See more: https://playwright.dev/docs/test-reporters */
  reporter: "html",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: "https://material.playwrightvn.com/",

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
    ignoreHTTPSErrors: true, // skip error HTTPS
  },

  /* Configure projects for major browsers */
  projects: [
    /* Test against web viewports.*/
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },

    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },

    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
