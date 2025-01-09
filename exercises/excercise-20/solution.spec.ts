/* PLAYWRIGHT */
import { test, expect } from "@playwright/test";

test("Expect input enabled after 7 seconds", async ({ page }) => {
  // Điều hướng tới trang
  await page.goto("https://material.playwrightvn.com/019-enable-form.html");

  // Chờ đến khi input được kích hoạt (enabled)
  const inputLocator = page.locator("input");

  let isEnabled = false;
  let attempts = 0;
  const maxAttempts = 7;

  // Kiểm tra trạng thái liên tục với thời gian chờ sau mỗi giây
  while (attempts < maxAttempts) {
    isEnabled = await inputLocator.isEnabled();
    if (isEnabled) break;

    attempts++;
    await new Promise((resolve) => setTimeout(resolve, 1000)); // chờ 1 giây
  }

  expect(isEnabled).toBe(true); // Xác nhận input được bật sau 7 giây

  console.log("Input đã được kích hoạt sau 7 giây.");
});
