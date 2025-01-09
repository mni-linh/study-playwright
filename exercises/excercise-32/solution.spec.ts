/* PLAYWRIGHT */

import { test, expect } from "@playwright/test";

type Product = {
  name: string;
  quantity: number;
};

async function getShoppingList(page: any): Promise<Product[]> {
  const shoppingList: Product[] = [];
  const rows = await page.locator("#wishlist > tr").all();
  for (const row of rows) {
    const cells = await row.locator("td").allTextContents();
    shoppingList.push({ name: cells[0], quantity: Number(cells[1]) });
  }
  return shoppingList;
}

async function clickAddBtn(page: any, product: Product) {
  const plusButton = await page
    .locator(`#cart div:has-text("${product.name} - +")`)
    .getByRole("button")
    .first();
  await plusButton.click({ clickCount: product.quantity });
}

async function processShopping(
  page: any,
  shoppingList: Product[]
): Promise<void> {
  for (let i = 0; i < 4 && shoppingList.length > 0; i++) {
    const availableProductNames = await page
      .locator("#cart .product-name")
      .allTextContents();
    const availableProducts = new Set(availableProductNames);
    const remainingItems: Product[] = [];

    for (const item of shoppingList) {
      if (availableProducts.has(item.name)) {
        await clickAddBtn(page, item);
      } else {
        remainingItems.push(item);
      }
    }

    shoppingList = remainingItems;

    if (shoppingList.length > 0) {
      await page.locator('button:has-text("Trang sau")').click();
    }
  }
}

test.describe("Go Shopping for Mom", () => {
  test("Test Case 1: Verify Shopping Process", async ({ page }) => {
    // Step 1: Navigate to the shopping page
    await page.goto("https://material.playwrightvn.com/games/001-di-cho.html");

    // Step 2: Retrieve the shopping list
    let shoppingList = await getShoppingList(page);

    // Step 3: Process the shopping list
    await processShopping(page, shoppingList);

    // Step 4: Verify the result
    await page
      .locator("button.check-result", { hasText: "Kiểm tra kết quả" })
      .click();

    // Step 5: Handle the confirmation dialog
    page.once("dialog", async (dialog) => {
      expect(dialog.message()).toBe("Bạn đã đi chợ chính xác!");
      await dialog.accept();
    });
  });
});
