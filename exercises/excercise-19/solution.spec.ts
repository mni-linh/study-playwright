/* PLAYWRIGHT */
import { test, expect } from "@playwright/test";

test.describe("Demo expect.configure", () => {
  test("Test 1: Cấu hình expect timeout = 30s", async ({ page }) => {
    // Cấu hình expect timeout = 30s
    expect.configure({ timeout: 30_000 });

    await page.goto("https://material.playwrightvn.com/");

    // Một ví dụ kiểm tra với cấu hình timeout
    await expect(page.locator("h1")).toHaveText("Tài liệu học automation test");
  });

  test("Test 2: Cấu hình expect timeout = 10s, soft assertion = true", async ({
    page,
  }) => {
    // Cấu hình expect timeout = 10s, soft assertion = true
    expect.configure({ timeout: 10_000, soft: true });

    await page.goto("https://material.playwrightvn.com/");

    // Một ví dụ kiểm tra với cấu hình timeout và soft assertion
    await expect(page.locator("h1")).toHaveText("Tài liệu học automation test"); // Không fail test, vì soft = true
    console.log("Soft assertion completed.");
  });
});
