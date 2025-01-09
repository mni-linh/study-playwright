/* PLAYWRIGHT */
import { expect, Page, test } from "@playwright/test";

test.describe("Test Trello", () => {
  // Pre-condition: Tạo bảng với 3 cột "Cần làm", "Đang làm", và "Đã hoàn thành"
  test.beforeEach(async ({ page }) => {
    // Step 1: Truy cập trang Trello clone
    await page.goto("https://material.playwrightvn.com/026-trello.html");
    // Step 2: Thêm cột "Cần làm" vào bảng nếu chưa tồn tại
    await addBoard(page, "Cần làm");
    // Step 3: Thêm cột "Đang làm" vào bảng nếu chưa tồn tại
    await addBoard(page, "Đang làm");
    // Step 4: Thêm cột "Đã hoàn thành" vào bảng nếu chưa tồn tại
    await addBoard(page, "Đã hoàn thành");
  });

  // Cleanup: Xóa tất cả các cột sau khi bài kiểm tra hoàn thành
  test.afterEach(async ({ page }) => {
    // Step 5: Xóa tất cả các cột trong bảng
    for (let i = 0; i < 3; i++) {
      await page.locator(`span.delete-list`).nth(0).click();
    }
    // Step 6: Đóng trang sau khi hoàn tất
    await page.close();
  });

  // Testcase: Thêm công việc và di chuyển giữa các cột
  test("Thêm công việc", async ({ page }) => {
    // Step 7: Click vào nút "Thêm thẻ" trong cột "Cần làm"
    await page.click(
      `//h3[text()='Cần làm']/../following-sibling::div[@class='add-card']`
    );
    // Step 8: Nhập nội dung công việc là "Viết bài Playwright Việt Nam"
    await page.fill(
      `//input[@class='card-input']`,
      "Viết bài Playwright Việt Nam"
    );
    // Step 9: Click nút "Thêm thẻ" để lưu công việc
    await page.click(`//button[text()='Thêm thẻ']`);
    // Step 10: Verify rằng thẻ vừa tạo có class "priority-high"
    await expect(
      page.locator(`div.card`).locator(`css=>div:nth-child(1)`)
    ).toHaveClass("label priority-high");
    // Step 11: Kéo thẻ từ cột "Cần làm" sang cột "Đang làm"
    await page
      .locator("div.card")
      .dragTo(
        page.locator(
          `//*[text()='Đang làm']/../following-sibling::div[@class='add-card']`
        )
      );
  });
});

// Hàm trợ giúp: Thêm cột vào bảng nếu chưa tồn tại
async function addBoard(page: Page, columnName: string) {
  // Step A: Kiểm tra xem cột đã tồn tại hay chưa
  const isColumnExist: boolean = await page.getByText(columnName).isVisible();
  // Step B: Nếu cột chưa tồn tại, thêm cột mới
  if (!isColumnExist) {
    await page.locator("div.add-list").click();
    await page.locator("input.list-input").fill(columnName);
    await page.locator(`//button[text()='Thêm danh sách']`).click();
  }
}
