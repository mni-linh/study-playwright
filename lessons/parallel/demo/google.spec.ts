import { test, expect } from "@playwright/test";

test("Google search", async ({ page }) => {
  await page.goto("https://www.google.com/");
  await page.locator('input[title="Search"]').fill("Playwright");
  await page.keyboard.press("Enter");
  await expect(page).toHaveTitle(/Playwright/);
});
