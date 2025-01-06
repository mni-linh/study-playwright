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
  // Test Case 1: Navigate to the Product Page
  await test.step("Navigate to the website: https://material.playwrightvn.com/ and go to the product page", async () => {
    // Step 1: Open the website
    await page.goto("https://material.playwrightvn.com/");
    // Step 2: Click on the product page link
    await page.getByRole("link", { name: "Bài học 2: Product page" }).click();
    // Step 3: Verify the URL
    await expect(page).toHaveURL(
      "https://material.playwrightvn.com/02-xpath-product-page.html"
    );
  });

  // Product details for testing
  const products = [
    {
      id: 1,
      name: "Product 1",
      price: 10.0,
      description: "This is a great product.",
      quantity: 2,
    },
    {
      id: 2,
      name: "Product 2",
      price: 20.0,
      description: "This is another great product.",
      quantity: 2,
    },
    {
      id: 3,
      name: "Product 3",
      price: 30.0,
      description: "This product is the best.",
      quantity: 3,
    },
  ];

  // Test Case 2: Add Products to the Cart
  await test.step("Add products to the cart: Product 1", async () => {
    // Step 1: Locate product 1 and click 2 times
    await page
      .locator(`[data-product-id="${products[0].id}"]`)
      .click({ clickCount: products[0].quantity });
  });

  await test.step("Add products to the cart: Product 2", async () => {
    // Step 2: Locate product 2 and click 2 times
    await page
      .locator(`[data-product-id="${products[1].id}"]`)
      .click({ clickCount: products[1].quantity });
  });

  await test.step("Add products to the cart: Product 3", async () => {
    // Step 3: Locate product 3 and click 3 times
    await page
      .locator(`[data-product-id="${products[2].id}"]`)
      .click({ clickCount: products[2].quantity });
  });

  // Test Case 3: Verify Product Quantity in Cart
  await test.step("Check the correct product quantity in the cart", async () => {
    const totalQty =
      products[0].quantity + products[1].quantity + products[2].quantity;

    // Step 1: Verify the number of rows (types of products)
    const rowLocator = page.locator("//tbody//tr");
    await expect(rowLocator).toHaveCount(products.length);

    // Step 2: Calculate total quantity of products in the cart
    let cartTotalQty = 0;
    const allRows = await rowLocator.all();
    for (const row of allRows) {
      const rawQty = await row.locator("//td").nth(2).textContent();
      cartTotalQty += parseInt(rawQty || "");
    }

    // Step 3: Assert the total quantity matches expected value
    expect(cartTotalQty).toEqual(totalQty);
  });

  // Test Case 4: Verify Total Product Cost
  await test.step("Check the total product cost", async () => {
    let totalBill = 0;
    // Step 1: Calculate expected total bill
    products.forEach((item) => (totalBill += item.price * item.quantity));

    // Step 2: Retrieve all rows from the cart table
    const rowLocators = await page.locator("//tbody//tr").all();
    let cartTotal = 0;

    // Step 3: Loop through each row to calculate the total cost
    for (const row of rowLocators) {
      const cells = await row.locator("//td").all();
      const rawPrice = (await cells[1].textContent()) || "";
      const rawQty = (await cells[2].textContent()) || "";

      const itemPrice = parseInt(rawPrice.replace("$", ""));
      const itemQty = parseInt(rawQty);
      cartTotal += itemPrice * itemQty;
    }

    // Step 4: Assert the total cost matches expected value
    expect(cartTotal).toEqual(totalBill);
  });
});
