/* PLAYWRIGHT */

import { expect, test } from "@playwright/test";

// Định nghĩa các thông điệp phản hồi
const MESSAGE = {
  stop(input) {
    return `Chúc mừng! Bạn đã tìm thấy ${input}!`; // Khi tìm thấy mục tiêu
  },
  continue(input) {
    return `Tiếp tục tìm kiếm! Đây là ${input}`; // Khi chưa tìm thấy mục tiêu
  },
};

// Testcase: Tìm kiếm Pokémon trong Túi Mù
test("Look for pokemon", async ({ page }) => {
  // Step 1: Truy cập trang web
  await page.goto("https://material.playwrightvn.com/");

  // Step 2: Xác minh tiêu đề trang chính hiển thị đúng
  await expect(page.getByText("Tài liệu học automation test")).toBeVisible();

  // Step 3: Nhấp vào liên kết dẫn đến trò chơi Pokémon
  await page.click(`a[href='games/004-pokemon.html']`);

  // Step 4: Xác minh nút "Mở Túi Mù Pokemon!" hiển thị trên trang
  await expect(page.getByText("Mở Túi Mù Pokemon!")).toBeVisible();

  // Step 5: Lấy tên Pokémon mục tiêu từ giao diện
  let targetName = "";
  let loopCount = 0;
  await page.waitForTimeout(500); // Đợi ngắn để giao diện tải xong
  do {
    // Step 5.1: Lấy nội dung từ phần tử có ID "target-pokemon"
    const text = await page.locator(`div#target-pokemon`).textContent();

    if (text) {
      // Step 5.2: Tách lấy tên Pokémon mục tiêu từ nội dung
      targetName = text.slice(text.indexOf(": ") + 2).trim();
      break;
    } else if (loopCount >= 5) {
      // Step 5.3: Báo lỗi nếu không tìm thấy tên mục tiêu sau 5 lần lặp
      throw new Error(`ERROR: get target pokemon failed!!! `);
    }

    loopCount++;
  } while (!targetName);

  // Step 6: Lấy danh sách tất cả các Túi Mù Pokémon (bag)
  const arrLocator = await page.locator(`div.bag`).all();

  // Step 7: Lặp qua từng Túi Mù để tìm Pokémon mục tiêu
  for (const element of arrLocator) {
    // Step 7.1: Nhấp vào túi mù
    await element.click();

    // Step 7.2: Lấy tên Pokémon trong túi vừa mở
    let pokemonName = await element.locator("div.pokemon-name").textContent();

    if (pokemonName === targetName) {
      // Step 7.3: Nếu tìm thấy Pokémon mục tiêu, xác minh thông điệp "Chúc mừng!"
      await expect(page.locator(`//div[@id='result']`)).toHaveText(
        MESSAGE.stop(targetName)
      );
      break; // Dừng vòng lặp khi tìm thấy
    } else {
      // Step 7.4: Nếu chưa tìm thấy, xác minh thông điệp "Tiếp tục tìm kiếm!"
      await expect(page.locator(`//div[@id='result']`)).toHaveText(
        MESSAGE.continue(pokemonName)
      );
    }
  }
});
