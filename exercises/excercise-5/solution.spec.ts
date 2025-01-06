/* JAVASCRIPT */
// Create a productList object to store the product list
const productList = {
  products: {},

  // Function to add products to the list
  addProduct(name, price) {
    if (!name || price <= 0) {
      console.log("Tên sản phẩm hoặc giá không hợp lệ.");
      return;
    }
    this.products[name] = price;
    console.log(`Đã thêm sản phẩm: ${name}, giá: ${price}`);
  },

  // Function to remove products to the list
  removeProduct(name) {
    if (this.products[name]) {
      delete this.products[name];
      console.log(`Đã xóa sản phẩm: ${name}`);
    } else {
      console.log(`Không tìm thấy sản phẩm: ${name}`);
    }
  },

  // The function calculates the total value of products in the list
  calculateTotal() {
    const total = Object.values(this.products).reduce(
      (sum, price) => sum + price,
      0
    );
    console.log(`Tổng giá trị sản phẩm: ${total}`);
    return total;
  },

  // The function displays a list of products
  displayProducts() {
    console.log("Sản phẩm trong danh sách:");
    for (const [name, price] of Object.entries(this.products)) {
      console.log(`${name}: ${price}`);
    }
  },
};

// Use functions
productList.addProduct("Táo", 5000);
productList.addProduct("Chuối", 3000);
productList.removeProduct("Chuối");
productList.displayProducts();
productList.calculateTotal();

/* PLAYWRIGHT*/
import { test, expect } from "@playwright/test";

test.describe("Puzzle Drag and Drop Game", () => {
  test("Complete the Puzzle", async ({ page }) => {
    // Test Case 1: Navigate to the website and go to the puzzle page
    await test.step("Navigate to the puzzle game", async () => {
      // Step 1: Open the website
      await page.goto("https://material.playwrightvn.com/");

      // Step 2: Click on the puzzle game link
      await page
        .getByRole("link", { name: /Puzzle drag and drop game/ })
        .click();

      // Step 3: Verify the URL
      await expect(page).toHaveURL(
        "https://material.playwrightvn.com/05-xpath-drag-and-drop.html"
      );
    });

    // Test Case 2: Drag and drop puzzle pieces to complete the game
    await test.step("Drag and drop puzzle pieces", async () => {
      // Step 1: Register the dialog event handler to check the success message
      page.on("dialog", async (dialog) => {
        expect(dialog.message()).toBe(
          "Congratulations! You completed the puzzle."
        );
        await dialog.dismiss(); // Dismiss the dialog
      });

      // Step 2: Loop through each piece and perform drag-and-drop
      for (let i = 1; i < 5; i++) {
        const sourceLocator = page.locator(`//div[@id='piece-${i}']`);
        const destinationLocator = page.locator(`//div[@data-piece='${i}']`);

        // Drag each puzzle piece to its target location
        await sourceLocator.dragTo(destinationLocator);
      }
    });
  });
});
