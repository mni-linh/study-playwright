import { test, expect } from '@playwright/test';

test('Basic Google test', async ({ page }) => {
  await page.goto('https://www.google.com');
  await expect(page).toHaveTitle(/Google/);
});
