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
  // Test Case 1: Navigate to the website and go to the todo page
  await test.step("Navigate to the website: https://material.playwrightvn.com/ and go to the mount event page", async () => {
    // Step 1: Open the website
    await page.goto("https://material.playwrightvn.com/");

    // Step 2: Click on the mount event page link
    await page
      .getByRole("link", { name: /Bài học 5: Xử lý mouse event/ })
      .click();

    // Step 3: Verify the URL
    await expect(page).toHaveURL(
      "https://material.playwrightvn.com/018-mouse.html"
    );

    const clickLoc = page.locator("//div[@id='clickArea']");
  });
});
