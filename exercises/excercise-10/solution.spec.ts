/* JAVASCRIPT */
function getCurrentDate() {
  // Get the current date
  const today = new Date();

  // Get the day, month and year
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();

  // Date, month, year format
  return `Ngày hiện tại là: ${day}/${month}/${year}`;
}

// Gọi hàm và in kết quả
console.log(getCurrentDate());

/* PLAYWRIGHT*/
import { expect, test } from "@playwright/test";

test("problem 10", async ({ page }) => {
  await page.route("*/**/api/v1/fruits", async (route) => {
    const jsonBody: { name: string; id: number }[] = [
      { name: "Cam", id: 1 },
      { name: "Táo", id: 2 },
      { name: "Xoài", id: 3 },
    ];
    await route.fulfill({ json: jsonBody });
  });
  await page.goto("https://demo.playwright.dev/api-mocking");

  await expect(page.getByText("Cam")).toBeVisible();
  await expect(page.getByText("Táo")).toBeVisible();
  await expect(page.getByText("Xoài")).toBeVisible();
});
