import { test, expect } from '@playwright/test';

test('Xử lý mở tab mới từ playwright.dev', async ({ page, context }) => {
  await page.goto('https://playwright.dev');

  // Giả sử link "GitHub" ở footer mở ra tab mới (dùng target="_blank")
  const [newTab] = await Promise.all([
    context.waitForEvent('page'),
    page.getByLabel('GitHub repository').click(), // Cái này là thẻ trên cùng
  ]);
  
  // Đợi tab mới load
  await newTab.waitForLoadState();

  // Kiểm tra URL tab mới
  expect(newTab.url()).toContain('github.com');

  // Tương tác (nếu cần)
  const title = await newTab.title();
  console.log('Title tab mới:', title);

  // Đóng tab mới
  await newTab.close();

  // Quay về tab cũ
  await page.bringToFront();
});