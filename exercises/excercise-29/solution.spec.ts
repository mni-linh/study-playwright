/* PLAYWRIGHT */
import test, { expect } from "@playwright/test";
import path from "path";

const authFile = path.join(__dirname, "./.auth/user.json");
const username = "vn84";
const pwd = "StrongPassword@123";

// Test group: Authenticate
test.describe("Authenticate", () => {
  test("Login", async ({ page }) => {
    await page.goto(
      "https://material.playwrightvn.com/01-concert-ticket/login.html"
    );

    // Step 1: Fill username, password
    await page.locator(`#username`).fill(username);
    await page.locator(`#password`).fill(pwd);

    // Step 2: Click button login
    await page.click("#login-btn");

    // Step 3: Save authentication information
    await page.context().storageState({ path: authFile });

    // Verify login was successful
    await expect(
      page.getByRole("heading", {
        name: "Chào mừng đến với trang đặt vé concert",
      })
    ).toBeVisible();
  });
});

// Test group: Book ticket
test.describe("Book ticket", () => {
  test.use({ storageState: authFile });

  test("Book ticket", async ({ page }) => {
    await page.goto("https://material.playwrightvn.com/01-concert-ticket/");

    // Step 1: Verify heading xuất hiện mà không cần đăng nhập
    await expect(
      page.getByRole("heading", {
        name: "Chào mừng đến với trang đặt vé concert",
      })
    ).toBeVisible();

    // Step 2: Click button "Đặt vé" và chọn hạng vé: "Phát Tài và Tinh Tú"
    await page
      .locator(`//button[@data-ticket-name='Phát Tài và Tinh Tú']`)
      .click();

    // Verify popup xuất hiện
    await expect(page.locator(`#popup`)).toBeVisible();

    // Step 3: Đặt 2 vé
    await page.locator(`#ticket-quantity`).fill("2");
    await page.getByRole("button", { name: "Xác nhận" }).click();

    // Step 4: Verify thông tin đặt vé thành công
    page.once("dialog", async (dialog) => {
      const expectedMessage =
        "Đặt vé thành công!\nHạng vé: Phát Tài và Tinh Tú\nSố lượng: 2";
      expect(dialog.message()).toBe(expectedMessage);
      await dialog.accept();
    });
  });
});
