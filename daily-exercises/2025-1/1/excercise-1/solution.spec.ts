/* JAVASCRIPT */
function isPrime(n: number) {
  if (n < 2) {
    console.log(`${n} Số này không phải là số nguyên tố `);
    return;
  } else {
    for (let i = 2; i <= Math.sqrt(n); i++) {
      if (n % i === 0) {
        console.log(`${i} Số này không phải là số nguyên tố `);
        return;
      }
    }
    console.log(`${n} Số này là số nguyên tố `);
  }
}

isPrime(7);
isPrime(6);
isPrime(2);
isPrime(1);

/* PLAYWRIGHT*/
import { test, expect } from "@playwright/test";
test("problem 3", async ({ page }) => {
  await page.goto("https://material.playwrightvn.com/");
  await page.getByRole("link", { name: "Bài học 2: Product page" }).click();

  await expect(page).toHaveURL(
    "https://material.playwrightvn.com/02-xpath-product-page.html"
  );

  // Add product to cart
  await page.locator('button[data-product-id="1"]').click();
  await page.locator('button[data-product-id="1"]').click();
  await page.locator('button[data-product-id="2"]').click();
  await page.locator('button[data-product-id="2"]').click();
  await page.locator('button[data-product-id="3"]').click();
  await page.locator('button[data-product-id="3"]').click();
  await page.locator('button[data-product-id="3"]').click();

  const rows = await page.locator("#cart-items tr");
  const rowCount = await rows.count();
  const expectedQuantities = {
    "Product 1": "2",
    "Product 2": "2",
    "Product 3": "3",
  };

  for (let i = 0; i < rowCount; i++) {
    const productName = await rows
      .nth(i)
      .locator("td:nth-child(1)")
      .textContent();
    const quantity = await rows.nth(i).locator("td:nth-child(3)").textContent();

    console.log(
      `Product: ${productName?.trim()}, Quantity: ${quantity?.trim()}`
    );

    await expect(quantity?.trim()).toBe(
      expectedQuantities[productName?.trim() || ""]
    );
  }

  // calculatedTotalPrice: the total amount of calculation
  let calculatedTotalPrice = 0;

  // Browse each product to calculate the total
  for (let i = 0; i < rowCount; i++) {
    const priceText = await rows
      .nth(i)
      .locator("td:nth-child(2)")
      .textContent();
    const quantityText = await rows
      .nth(i)
      .locator("td:nth-child(3)")
      .textContent();
    const totalText = await rows
      .nth(i)
      .locator("td:nth-child(4)")
      .textContent();

    const price = parseFloat(priceText.replace("$", ""));
    const quantity = parseInt(quantityText.trim());
    const total = parseFloat(totalText.replace("$", ""));

    const calculatedProductTotal = price * quantity;

    await expect(total).toBeCloseTo(calculatedProductTotal, 2); // Test with 2 decimal places accuracy

    calculatedTotalPrice += calculatedProductTotal;
  }

  // Get the total amount displayed
  const displayedTotalPriceText = await page
    .locator(".total-price")
    .textContent();
  const displayedTotalPrice = parseFloat(
    displayedTotalPriceText.replace("$", "")
  );

  console.log("Tổng tiền tính toán:", calculatedTotalPrice);
  console.log("Tổng tiền hiển thị:", displayedTotalPrice);

  // Check the total cost of all products is correct
  await expect(displayedTotalPrice).toBeCloseTo(calculatedTotalPrice, 2);
});
