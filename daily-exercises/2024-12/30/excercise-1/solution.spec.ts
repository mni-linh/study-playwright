/* Javascript */
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

/* Playwright */
import { test, expect } from "@playwright/test";

test("2024-12-30 _ 1", async ({ page }) => {
  await page.goto("https://material.playwrightvn.com/");
  await page
    .getByRole("link", { name: "Bài học 1: Register Page (có đủ các element)" })
    .click();

  await expect(page).toHaveURL(
    "https://material.playwrightvn.com/01-xpath-register-page.html"
  );

  const username = "mni-linh";
  const email = "tranthitulinh1305@gmail.com";

  await page.locator("#username").fill(username);
  await page.locator("#email").fill(email);
  await page.getByRole("button", { name: "Register" }).click();

  await expect(page.locator("//tbody//tr")).toHaveCount(1);
  await expect(page.locator("//tbody//td").nth(1)).toHaveText(username);
  await expect(page.locator("//tbody//td").nth(2)).toHaveText(email);
});
