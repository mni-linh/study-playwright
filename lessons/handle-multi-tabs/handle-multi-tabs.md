
# 🧭 Xử lý Nhiều Tab/Window trong Playwright (Áp dụng GitHub)

## 🔍 Mô tả

Một số liên kết trên GitHub mở ra trong tab mới (target="_blank"). Bạn có thể xử lý bằng cách chờ sự kiện `context.waitForEvent('page')` để bắt tab mới và tiếp tục thao tác với nó.

---

## 🧪 Ví dụ thực tế với GitHub

### 👉 Mục tiêu:
Click vào liên kết GitHub trong trang [https://playwright.dev](https://playwright.dev), tab mới sẽ mở ra GitHub repo.

### ✅ Script

```ts
import { test, expect } from '@playwright/test';

test('Open GitHub in new tab', async ({ page, context }) => {
  await page.goto('https://playwright.dev');

  // Đợi tab mới mở ra
  const [githubPage] = await Promise.all([
    context.waitForEvent('page'),
    page.locator('a[href="https://github.com/microsoft/playwright"]').first().click()
  ]);

  await githubPage.waitForLoadState();

  // Kiểm tra title của trang GitHub mới mở
  await expect(githubPage).toHaveTitle(/microsoft\/playwright/);
});
```

---

## 📝 Lưu ý

- Luôn sử dụng `Promise.all([ waitForEvent, action ])` để tránh lỗi do tab chưa mở kịp.
- Sử dụng `.first()` nếu selector trả về nhiều hơn một phần tử.
- Có thể sử dụng `context.pages()` để lấy danh sách tất cả các tab đang mở.

---

## 📚 Tham khảo

- [Playwright Context API](https://playwright.dev/docs/api/class-browsercontext)
- [Working with multiple pages](https://playwright.dev/docs/pages#handling-new-pages)
