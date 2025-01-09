/* PLAYWRIGHT */
import { test, expect } from "@playwright/test";

test("Mock time", async ({ page }) => {
  await page.clock.setFixedTime(new Date("2025-01-09T01:00:00"));
  await page.goto(
    `https://material.playwrightvn.com/017-detect-user-agent.html`
  );
  await expect(page.locator(`//span[@id="localTime"]`)).toContainText(
    "1:00:00"
  );
});
