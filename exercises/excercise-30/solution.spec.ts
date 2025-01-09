/* PLAYWRIGHT */

import { test, expect } from "@playwright/test";

test("Verify canary release mode in Playwright documentation", async ({
  page,
}) => {
  await page.goto("https://playwright.dev/docs/test-use-options");

  // Step 1: Nhấn phím Shift 5 lần
  for (let i = 0; i < 5; i++) {
    await page.keyboard.press("Shift");
  }

  // Step 2: Kiểm tra thông điệp hiển thị
  const message = await page.locator(
    'div.theme-doc-version-banner:has-text("This is unreleased documentation for Playwright Next version.")'
  );
  await expect(message).toBeVisible();

  // Step 3: Kiểm tra URL hiện tại chứa "docs/next"
  await expect(page).toHaveURL(/.*docs\/next.*/);
});
