/* PLAYWRIGHT */
import { expect, test } from "@playwright/test";

// Testcase: Trang trí cây thông Noel
test("Decorate the Christmas tree", async ({ page }) => {
  // Step 1: Truy cập vào trang web chính
  await page.goto("https://material.playwrightvn.com/");

  // Step 2: Xác minh nội dung "Tài liệu học automation test" hiển thị
  await expect(page.getByText("Tài liệu học automation test")).toBeVisible();

  // Step 3: Nhấp vào liên kết dẫn đến trò chơi "Trang trí cây thông Noel"
  await page
    .getByRole("link", { name: "Game 04: Trang trí cây thông Noel" })
    .click();

  // Step 4: Xác minh tiêu đề "Trang Trí Cây Thông Noel" hiển thị
  await expect(page.getByText("Trang Trí Cây Thông Noel")).toBeVisible();

  // Step 5: Lấy danh sách các phong cách trang trí từ giao diện
  let listStyles = await page.locator("ul[style]>li").all();
  let arrStyles: object[] = [];

  for (const style of listStyles) {
    // Step 5.1: Lấy nội dung văn bản từng phong cách trong danh sách
    let txtStyle = await style.textContent();

    // Step 5.2: Trích xuất tên phong cách và số lượng từ văn bản
    let textMatch = txtStyle?.match(/(\d+)\s+(.*)/);
    if (textMatch) {
      arrStyles.push({ styleName: textMatch[2], quantity: textMatch[1] });
    }
  }

  // Step 6: Thực hiện nhấp vào các nút tương ứng với từng phong cách
  for (const element of arrStyles) {
    // Step 6.1: Lặp qua danh sách phong cách và nhấp vào nút với số lần tương ứng
    await page
      .getByRole("button")
      .filter({ hasText: element["styleName"] })
      .click({ clickCount: +element["quantity"] });
  }

  // Step 7: Xác minh thông báo hoàn thành xuất sắc hiển thị
  await expect(page.locator(`//div[@id='result-message']`)).toHaveText(
    "🎉 Chúc mừng! Bạn đã hoàn thành xuất sắc!"
  );
});
