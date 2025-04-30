# 📸 Chụp ảnh màn hình & Quay video trong Playwright

## 1. Chụp ảnh màn hình (Screenshots)

### 📌 Toàn bộ trang

```ts
await page.goto("https://example.com");
await page.screenshot({ path: "example-full.png", fullPage: true });
```

### 📌 Một phần tử cụ thể

```ts
const element = await page.locator("h1");
await element.screenshot({ path: "heading.png" });
```

## 2. Quay video (Record Video)

### ✍️ Cấu hình video trong `playwright.config.ts`

```ts
import { defineConfig } from "@playwright/test";

export default defineConfig({
  use: {
    video: "on", // hoặc 'retain-on-failure', 'off'
  },
});
```

### 📌 Lưu video sau khi chạy test

```ts
import { test, expect } from "@playwright/test";

test("Record video example", async ({ page }) => {
  await page.goto("https://example.com");
  await expect(page).toHaveTitle(/Example/);
});
```

Sau khi chạy test, video sẽ được lưu trong thư mục `test-results` theo mặc định.

---

## ✅ Ghi chú

- Bạn có thể kết hợp cả video và screenshot để phục vụ cho mục đích debug test failed.
- Cấu hình nâng cao cho phép đặt thư mục lưu video hoặc chỉ ghi lại khi test fail.

```ts
use: {
  video: 'retain-on-failure',
  screenshot: 'only-on-failure',
}
```
