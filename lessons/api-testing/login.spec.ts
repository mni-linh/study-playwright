import { test, expect, request } from '@playwright/test';

test('JSONPlaceholder Login Simulation', async ({ page, browser }) => {
  const apiContext = await browser.newContext();
  
  // Giả lập đăng nhập bằng cách gọi API lấy thông tin người dùng
  const response = await apiContext.request.get('https://jsonplaceholder.typicode.com/users/1');
  
  expect(response.status()).toBe(200);
  const userData = await response.json();
  expect(userData).toHaveProperty('name');
  expect(userData.name).toBe('Leanne Graham');
});
