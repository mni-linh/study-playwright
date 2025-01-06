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
  await test.step("Navigate to the website: https://material.playwrightvn.com/ and go to the product page", async () => {
    await page.goto("https://material.playwrightvn.com/");
    await page.getByRole("link", { name: "Bài học 2: Product page" }).click();

    await expect(page).toHaveURL(
      "https://material.playwrightvn.com/02-xpath-product-page.html"
    );
  });

  // Add products to the cart
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

  await test.step("Add products to the cart: 2 products 1.", async () => {
    await page
      .locator(`[data-product-id="${products[0].id}"]`)
      .click({ clickCount: products[0].quantity });
  });

  await test.step("Add products to the cart: 2 products 2.", async () => {
    await page
      .locator(`[data-product-id="${products[1].id}"]`)
      .click({ clickCount: products[1].quantity });
  });

  await test.step("Add products to the cart: 3 products 3.", async () => {
    await page
      .locator(`[data-product-id="${products[2].id}"]`)
      .click({ clickCount: products[2].quantity });
  });

  await test.step("Check the correct product quantity.", async () => {
    const totalQty =
      products[0].quantity + products[1].quantity + products[2].quantity;

    // Check if there are product types in the cart
    const rowLocator = page.locator("//tbody//tr");
    await expect(rowLocator).toHaveCount(products.length);

    // Check the number of products in the shopping cart
    let cartTotalQty = 0;
    const allRows = await rowLocator.all();
    for (const row of allRows) {
      const rawQty = await row.locator("//td").nth(2).textContent();
      cartTotalQty += parseInt(rawQty || "");
    }

    expect(cartTotalQty).toEqual(totalQty);
  });

  await test.step("Check the total product cost", async () => {
    let totalBill = 0;
    products.forEach((item) => (totalBill += item.price * item.quantity));
    const rowLocators = await page.locator("//tbody//tr").all();

    let cartTotal = 0;
    for (const row of rowLocators) {
      const cells = await row.locator("//td").all();
      const rawPrice = (await cells[1].textContent()) || "";
      const rawQty = (await cells[2].textContent()) || "";

      const itemPrice = parseInt(rawPrice.replace("$", ""));
      const itemQty = parseInt(rawQty);
      cartTotal += itemPrice * itemQty;
    }

    expect(cartTotal).toEqual(totalBill);
  });
});
