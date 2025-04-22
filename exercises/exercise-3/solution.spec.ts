/* JAVASCRIPT */
function isPrime(num: number) {
  if (num < 2) {
    console.log(`${num} không phải là số nguyên tố`);
    return;
  }
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) {
      console.log(`${num} không phải là số nguyên tố`);
      return;
    }
  }
  console.log(`${num} là số nguyên tố`);
}

isPrime(7);
isPrime(10);

/* PLAYWRIGHT */
import { expect, test } from "@playwright/test";

test("problem 2", async ({ page }) => {
  await page.goto("/");

  // Step 1: Navigate to the Product Page
  await page.getByRole("link", { name: "Product page" }).click();

  // Step 2: Click on the "Add to cart" button for the first product
  await page.locator('.add-to-cart[data-product-id="1"]').dblclick();
  await page.locator('.add-to-cart[data-product-id="2"]').dblclick();
  await page.locator('.add-to-cart[data-product-id="3"]').dblclick();
  await page.locator('.add-to-cart[data-product-id="3"]').click();

  // Step 3: Check cart count
  await expect(page.locator("//tbody/tr[1]/td[3]")).toHaveText("2");
  await expect(page.locator("//tbody/tr[2]/td[3]")).toHaveText("2");
  await expect(page.locator("//tbody/tr[3]/td[3]")).toHaveText("3");

  let totalPrice = 0;
  const rows = page.locator("//tbody/tr");
  for (let i = 0; i < (await rows.count()); i++) {
    // Get the price from column 2
    const priceText = await rows
      .nth(i)
      .locator("td:nth-child(2)")
      .textContent();
    const price = parseFloat(priceText?.replace("$", "") || "0");

    // Get the quantity from column 3
    const quantityText = await rows
      .nth(i)
      .locator("td:nth-child(3)")
      .textContent();
    const quantity = parseInt(quantityText || "0");

    // Calculate the total for this row
    const rowTotal = price * quantity;
    // Sum up the total price
    totalPrice += rowTotal;
  }
  const totalPriceText = await page.locator("tfoot .total-price").textContent();
  const totalPriceValue = parseFloat(totalPriceText?.replace("$", "") || "0");
  // Validate the total price
  expect(totalPriceValue).toEqual(totalPrice);
});
