/* PLAYWRIGHT */

import { test, expect } from "@playwright/test";

let username = "vn84";
let pwd = "StrongPassword@123";
let quantity = "1";

test.describe("Authentication Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(
      "https://material.playwrightvn.com/01-concert-ticket/login.html"
    );
    await page.locator(`//input[@id="username"]`).fill(username);
    await page.locator(`//input[@id="password"]`).fill(pwd);
    await page.click('//button[@id="login-btn"]');
  });

  test.afterEach(async ({ page }) => {
    await page.goto(
      "https://material.playwrightvn.com/01-concert-ticket/login.html"
    );
    await page.click('//button[@id="logout-btn"]');
  });

  test("Book ticket and verify cart", async ({ page }) => {
    // Bước 1: Đặt vé
    await page.locator('//button[@data-ticket-name="Hỏa lực 1,2,3,4"]').click();

    // Bước 2: Lấy thông tin giá vé
    const button = await page.$("button.btn-book-ticket");
    if (button) {
      const ticketPrice = await button.getAttribute("data-ticket-price");
      if (ticketPrice) {
        const formattedPrice = new Intl.NumberFormat().format(
          Number(ticketPrice)
        );

        // Bước 3: Đặt số lượng vé
        await page.locator(`//input[@id="ticket-quantity"]`).fill(quantity);

        // Bước 4: Xác nhận đặt vé
        await page.getByRole("button", { name: "Xác nhận" }).click();

        // Bước 5: Kiểm tra giỏ hàng
        const qty = await page.locator('//span[@id="cart-count"]').innerText();
        expect(qty).toEqual(quantity);

        // Bước 6: Đi tới trang giỏ hàng
        await page.locator(`//div[@id="cart-icon"]`).click();
        await expect(
          page.getByRole("heading", { name: "Giỏ hàng của bạn" })
        ).toBeVisible();

        // Bước 7: Kiểm tra tổng giá đúng với giá vé
        expect(
          await page.locator(`//div[@id="total-price"]`).innerText()
        ).toContain(formattedPrice);
      } else {
        console.error("Ticket price not found");
      }
    } else {
      console.error("Button not found");
    }
  });
});
