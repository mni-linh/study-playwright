/* JAVASCRIPT */
function findLargestNumber(array) {
  if (array.length === 0) {
    return "Mảng rỗng";
  }

  let largest = array[0];
  for (let i = 1; i < array.length; i++) {
    if (array[i] > largest) {
      largest = array[i];
    }
  }
  return `Số lớn nhất là: ${largest}`;
}

const array = [3, 7, 2, 5, 9];
console.log(findLargestNumber(array));

const emptyArray = [];
console.log(findLargestNumber(emptyArray));

/* PLAYWRIGHT*/
import { test, expect } from "@playwright/test";

test("problem 6", async ({ page }) => {
  // Test Case: Mouse event handling on "Nhấn hoặc nhấn đúp vào đây!"
  await test.step("Navigate to the website and verify navigation to mouse event page", async () => {
    // Step 1: Open the website
    await page.goto("https://material.playwrightvn.com/");

    // Step 2: Click on "Bài học 5: Xử lý mouse event" link
    await page
      .getByRole("link", { name: /Bài học 5: Xử lý mouse event/ })
      .click();

    // Step 3: Verify the URL of the target page
    await expect(page).toHaveURL(
      "https://material.playwrightvn.com/018-mouse.html"
    );
  });

  // Locate elements for interaction and verification
  const clickArea = page.locator("//div[@id='clickArea']"); // The clickable area
  const clickCount = page.locator("//p[@id='clickCount']"); // Text displaying click count
  const clickType = page.locator("//p[@id='clickType']"); // Text displaying click type
  const modifierKeys = page.locator("//p[@id='modifierKeys']"); // Text displaying modifier keys

  // Step 4: Perform a single click and verify the results
  await test.step("Perform single click and verify click count, type, and modifier keys", async () => {
    await clickArea.click(); // Single click action
    await expect(clickCount).toHaveText("Số lần nhấn: 1"); // Verify click count
    await expect(clickType).toHaveText("Loại nhấn: Đơn"); // Verify click type
    await expect(modifierKeys).toHaveText("Phím kèm theo: Không có"); // Verify modifier keys
  });

  // Step 5: Perform a double click and verify the results
  await test.step("Perform double click and verify click count, type, and modifier keys", async () => {
    await clickArea.dblclick(); // Double click action
    await expect(clickCount).toHaveText("Số lần nhấn: 3"); // Verify click count
    await expect(clickType).toHaveText("Loại nhấn: Đúp"); // Verify click type
    await expect(modifierKeys).toHaveText("Phím kèm theo: Không có"); // Verify modifier keys
  });

  // Step 6: Perform a single click with Shift key and verify the results
  await test.step("Perform single click with Shift key and verify click count, type, and modifier keys", async () => {
    await clickArea.click({ modifiers: ["Shift"] }); // Click with Shift modifier
    await expect(clickCount).toHaveText("Số lần nhấn: 4"); // Verify click count
    await expect(clickType).toHaveText("Loại nhấn: Đơn"); // Verify click type
    await expect(modifierKeys).toHaveText("Phím kèm theo: Shift"); // Verify modifier keys
  });
});
