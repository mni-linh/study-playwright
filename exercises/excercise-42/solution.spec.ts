/* PLAYWRIGHT */
import { expect, Locator, test } from "@playwright/test";

// Testcase: Tìm kiếm và xác minh vì tinh tú
test("Look for stars", async ({ page }) => {
  // Step 1: Truy cập trang chủ của ứng dụng
  await page.goto("https://material.playwrightvn.com/");

  // Step 2: Xác minh rằng tiêu đề "Tài liệu học automation test" hiển thị
  await expect(page.getByText("Tài liệu học automation test")).toBeVisible();

  // Step 3: Nhấp vào liên kết dẫn đến game "Vi tính tú"
  await page.click(`a[href='games/003-vi-tinh-tu.html']`);

  // Step 4: Khởi tạo biến để lưu tên mục tiêu và biến đếm số vòng lặp
  let targetName = "";
  let loopCount = 0;

  // Step 5: Thực hiện vòng lặp để tìm tên mục tiêu từ trang
  do {
    // Step 5.1: Lấy nội dung từ phần tử có ID "target-name"
    const text = await page.locator(`span#target-name`).textContent();

    // Step 5.2: Nếu lấy được tên mục tiêu, lưu giá trị và thoát vòng lặp
    if (text) {
      targetName = text;
      break;
    } else if (loopCount >= 3) {
      // Step 5.3: Nếu vượt quá số lần lặp, báo lỗi và dừng bài kiểm tra
      throw new Error(`ERROR: get target name failed!!! `);
    }

    // Step 5.4: Tăng biến đếm vòng lặp
    loopCount++;
  } while (!targetName);

  // Step 6: Tạo đối tượng Locator cho vì tinh tú mục tiêu dựa trên tên
  const mysteryBoxTarget: Locator = page.locator(
    `//*[@class='constellation-name' and text()='${targetName}']`
  );

  // Step 7: Lắng nghe sự kiện hiển thị hộp thoại
  page.on("dialog", async (dialog) => {
    // Step 7.1: Xác minh nội dung thông báo trong hộp thoại
    expect(dialog.message()).toEqual(
      "Chúc mừng! Bạn đã tìm được vì tinh tú đúng!"
    );

    // Step 7.2: Chấp nhận hộp thoại
    await dialog.accept();
  });

  // Step 8: Nhấp vào vì tinh tú mục tiêu
  await mysteryBoxTarget.click();
});
