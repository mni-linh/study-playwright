/* JAVASCRIPT */
function calculateBMI(height: number, weight: number) {
  const BMI = weight / Math.pow(height, 2);

  if (BMI < 18.5) {
    console.log(`Kết quả BMI: ${BMI}\nPhân loại: Gầy`);
  } else if (BMI < 24.9) {
    console.log(`Kết quả BMI: ${BMI}\nPhân loại: Bình thường`);
  } else if (BMI < 29) {
    console.log(`Kết quả BMI: ${BMI}\nPhân loại: Thừa cân`);
  } else {
    console.log(`Kết quả BMI: ${BMI}\nPhân loại: Béo phì`);
  }
}

calculateBMI(1.75, 68);

/* PLAYWRIGHT */
import { expect, test } from "@playwright/test";

// test.beforeEach(async ({ page }) => {
//   await page.goto("https://material.playwrightvn.com/");
// });

test("problem 1", async ({ page }) => {
  await page.goto("/");

  // Step 1: Navigate to the Register Page
  await page.getByRole("link", { name: "Register" }).click();

  // Step 2: Fill in Registration Details
  const username = "mni-linh";
  const email = "tranthitulinh1305@gmail.com";

  await page.locator("#username").fill(username);
  await page.locator("#email").fill(email);

  // Step 3: Submit the Registration Form
  await page.getByRole("button", { name: "Register" }).click();

  // Check URL after registration
  await expect(page).toHaveURL(
    "https://material.playwrightvn.com/01-xpath-register-page.html"
  );

  // Get the count of rows in the table
  const rowCount = await page.locator("//tbody/tr").count();
  // Get the last row in the table
  const lastRow = page.locator("//tbody/tr[last()]");

  // Validate the number of rows in the table
  await expect(lastRow.locator("td").nth(0)).toHaveText(rowCount.toString());
  // Validate the username and email in the last row of the table
  await expect(lastRow.locator("td").nth(1)).toHaveText(username);
  await expect(lastRow.locator("td").nth(2)).toHaveText(email);
});
