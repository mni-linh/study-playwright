/* JAVASCRIPT */
function calculateTip(billAmount, tipPercentage) {
  const tipAmount = billAmount * (tipPercentage / 100);
  return tipAmount;
}

const bill = 100;
const tipRate = 15;
console.log("Tiền tip: " + calculateTip(bill, tipRate));

/* PLAYWRIGHT*/
import { test, expect } from "@playwright/test";

test("problem 12", async ({ page }) => {
  // Step 1: Navigate to the page
  await test.step("Navigate to the page", async () => {
    await page.goto("https://material.playwrightvn.com/021-import-export.html");
  });

  // Step 2: Select filter criteria as "Lớp" and search for "A4"
  await test.step("Select filter criteria and search for 'A4'", async () => {
    await page.locator("#filterCriteria").selectOption("Lớp");
    await page.getByPlaceholder("Nhập nội dung tìm kiếm...").click();
    await page.getByPlaceholder("Nhập nội dung tìm kiếm...").fill("A4");
    await page.getByRole("button", { name: "Tìm kiếm" }).click();
  });

  // Step 3: Verify that only one row with "A4" is visible
  await test.step("Verify only one row with 'A4' is visible", async () => {
    let listRow = page.locator("#studentTable tbody tr");
    const lenghtListRow = await listRow.count();
    let visibleCount = 0;
    for (let i = 0; i < lenghtListRow; i++) {
      const row = listRow.nth(i);
      if (await row.isVisible()) {
        const checkCell = row.locator("td").nth(2);
        await expect(checkCell).toContainText("A4");
        visibleCount++;
      }
    }
    expect(visibleCount).toBe(1);
  });

  // Step 4: Clear the search input and click search again
  await test.step("Clear search input and click search again", async () => {
    await page.getByPlaceholder("Nhập nội dung tìm kiếm...").click();
    await page.getByPlaceholder("Nhập nội dung tìm kiếm...").fill("");
    await page.getByRole("button", { name: "Tìm kiếm" }).click();
  });

  // Step 5: Verify all rows are visible after clearing the search input
  await test.step("Verify all rows are visible after clearing search input", async () => {
    let listRow = page.locator("#studentTable tbody tr");
    const lenghtListRow = await listRow.count();
    let visibleCount = 0;
    for (let i = 0; i < lenghtListRow; i++) {
      const row = listRow.nth(i);
      if (await row.isVisible()) {
        visibleCount++;
      }
    }
    expect(visibleCount).toBe(lenghtListRow);
  });
});
