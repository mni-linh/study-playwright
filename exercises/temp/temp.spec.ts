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
import { test } from "@playwright/test";
test("problem 1", async ({ page }) => {
  await page.goto("");
});
