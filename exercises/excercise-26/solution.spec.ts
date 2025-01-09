/* PLAYWRIGHT */
import { test, expect } from "@playwright/test";

test("Verify Alert After 5 Minutes on Material Playwright Page", async ({
  page,
}) => {
  await page.clock.install();
  await page.goto(
    `https://material.playwrightvn.com/026-count-time-in-page.html`
  );
  await page.clock.fastForward("05:00");
  page.on("dialog", async (dialog) => {
    await expect(dialog.message()).toContain(
      "Bạn đã ở lại trang web hơn 5 phút!"
    );
    await dialog.accept();
  });
});
