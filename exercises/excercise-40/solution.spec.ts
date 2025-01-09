/* PLAYWRIGHT */
import { test, expect } from "@playwright/test";

const txtPlayerName: string = "https://github.com/mni-linh";

test("Game Pikachu", async ({ page }) => {
  // Step 1: Truy cập trang web trò chơi Pikachu
  await page.goto("https://material.playwrightvn.com/games/002-pikachu.html");

  // Step 2: Nhập tên người chơi vào ô input
  await page.fill("#playerName", txtPlayerName);

  // Nhấn nút "Bắt đầu" để bắt đầu trò chơi
  await page.click('//button[@onclick="startGame()"]');

  // Step 3: Xác minh thông tin người chơi hiển thị đúng trên giao diện
  await page
    .locator("#playerInfo")
    .waitFor({ state: "visible", timeout: 5000 });
  await expect(page.locator("#playerInfo")).toHaveText(
    `Người chơi: ${txtPlayerName}`
  );

  // Step 4: Xác định tất cả các số trên bảng
  let size = await page.locator('//div[@class="outer"]').count(); // Đếm số ô
  let setOuter: Set<string> = new Set();

  // Lấy các giá trị khác nhau trong bảng
  for (let i = 1; i <= size; i++) {
    let textOuter = await page
      .locator(`//div[@class="outer"][${i}]`)
      .textContent();
    if (textOuter) {
      setOuter.add(textOuter); // Lưu số vào tập hợp (loại bỏ trùng lặp)
    }
  }

  // Step 7: Lắng nghe thông báo chiến thắng hiển thị
  page.on("dialog", (dialog) => {
    expect(dialog.message()).toEqual("Bạn đã thắng cuộc!"); // Kiểm tra thông báo
    dialog.accept(); // Đóng dialog
  });

  // Step 5: Tìm và nhấp vào từng cặp số giống nhau
  const arr: string[] = [...setOuter]; // Chuyển Set thành mảng để xử lý
  for (const value of arr) {
    // Tìm hai ô có cùng số (theo giá trị trong mảng)
    let outer1 = page.locator(`//div[@id='grid']/div[text()="${value}"][1]`);
    let outer2 = page.locator(`//div[@id='grid']/div[text()="${value}"][2]`);

    // Nhấp vào từng ô
    await outer1.click();
    await outer2.click();

    // Step 6: Xác minh rằng các ô đã nhấp biến mất khỏi bảng
    await expect.soft(outer1).toBeHidden(); // Ô đầu tiên không còn hiển thị
    await expect.soft(outer2).toBeHidden(); // Ô thứ hai không còn hiển thị

    // Kiểm tra không có lỗi trong quá trình xử lý
    expect(test.info().errors).toHaveLength(0);
  }

  // Đóng trình duyệt sau khi hoàn thành testcase
  await page.close();
});
