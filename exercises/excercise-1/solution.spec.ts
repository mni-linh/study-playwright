/* JAVASCRIPT */
function calculateBMI(height: number, weight: number) {
  const BMI = weight / (height * height);
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
import { test, expect } from "@playwright/test";

test("problem 1", async ({ page }) => {
  // Step 1: Navigate to the Register Page
  await page.goto("https://material.playwrightvn.com/");
  await page.getByRole("link", { name: /Register Page/}).click();


  // Step 2: Fill in Registration Details
  const username = "mni-linh";
  const email = "tranthitulinh1305@gmail.com";

  await page.locator("#username").fill(username);
  await page.locator("#email").fill(email);

  // Step 3: Submit the Registration Form
  await page.getByRole("button", { name: "Register" }).click();

  // Step 4: Validate Navigation to the Register Page
  await expect(page).toHaveURL(
    "https://material.playwrightvn.com/01-xpath-register-page.html"
  );
  
  // Step 5: Validate Registration Table
  // Ensure only one row exists in the table
  await expect(page.locator("//tbody//tr")).toHaveCount(1);

  // Validate Username and Email in the table
  await expect(page.locator("//tbody//td").nth(1)).toHaveText(username);
  await expect(page.locator("//tbody//td").nth(2)).toHaveText(email);
});
