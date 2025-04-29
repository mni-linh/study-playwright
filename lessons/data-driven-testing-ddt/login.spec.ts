import { test, expect } from "@playwright/test";
import _users from "./users.json";

const users = [
  { username: "invalid_user1", password: "invalid_pass1" },
  { username: "invalid_user2", password: "invalid_pass2" },
];

// Method 1: Use test.each to run the same test with different data
for (const data of users) {
  test(`Login test on GitHub for username: ${data.username}`, async ({
    page,
  }) => {
    await page.goto("https://github.com/login");

    await page.fill("input#login_field", data.username);
    await page.fill("input#password", data.password);
    await page.click('input[type="submit"]');

    // Check for error message
    await expect(page.locator("div.flash-error")).toBeVisible();
    await expect(page.locator("div.flash-error")).toContainText(
      "Incorrect username or password."
    );
  });
}

// Method 2: Use test.describe to group tests together
test.describe("Login tests with multiple users", () => {
  users.forEach((user) => {
    test(`Login attempt with username: ${user.username}`, async ({ page }) => {
      await page.goto("https://github.com/login");

      await page.fill("input#login_field", user.username);
      await page.fill("input#password", user.password);
      await page.click('input[type="submit"]');

      // Kiểm tra lỗi hiển thị
      await expect(page.locator("div.flash-error")).toBeVisible();
      await expect(page.locator("div.flash-error")).toContainText(
        "Incorrect username or password."
      );
    });
  });
});

// Method 3: Use .json file to load data

for (const user of _users) {
  test(`Login test on GitHub for username: ${user.username}`, async ({
    page,
  }) => {
    await page.goto("https://github.com/login");

    await page.fill("input#login_field", user.username);
    await page.fill("input#password", user.password);
    await page.click('input[type="submit"]');

    await expect(page.locator("div.flash-error")).toBeVisible();
  });
}
