import { test, expect } from "@playwright/test";

test("GitHub home page", async ({ page }) => {
  await page.goto("https://github.com");
  await expect(page).toHaveTitle(/GitHub/);
});
