/* JAVASCRIPT */
function calculateAge(birthYear: number) {
  const currentYear = new Date().getFullYear();

  if (birthYear > currentYear) {
    console.log("Năm sinh không hợp lệ");
  } else {
    const age = currentYear - birthYear;
    console.log(`Tuổi của bạn là: ${age}`);
  }
}

calculateAge(1990);
calculateAge(2000);
calculateAge(2025);
calculateAge(2026);

/* PLAYWRIGHT */
import { chromium } from '@playwright/test';

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext(); // tạo context mới
  const page = await context.newPage();       // tạo trang/tab mới trong context

  await page.goto('https://example.com');
  await page.screenshot({ path: 'example.png' });

  await browser.close();
})();
