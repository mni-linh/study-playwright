# 📄 Mở trang với `page.goto()` trong Playwright

## 🧠 Giới thiệu

Phương thức `page.goto(url)` được sử dụng để **điều hướng trình duyệt đến một URL cụ thể**. Đây là bước đầu tiên trong hầu hết các kịch bản test tự động, giúp mở trang web bạn cần kiểm thử.

---

## ✅ Cú pháp

```ts
await page.goto("https://example.com");
```

## ⚙️ Các tùy chọn thường dùng

```ts
await page.goto("https://example.com", {
  timeout: 10000, // Thời gian chờ tối đa (ms)
  waitUntil: "load", // Điều kiện chờ (load | domcontentloaded | networkidle)
});
```

### 📌 Giải thích `waitUntil`:

| Giá trị              | Mô tả                                                                          |
| -------------------- | ------------------------------------------------------------------------------ |
| `'load'`             | Chờ đến khi sự kiện `load` được kích hoạt                                      |
| `'domcontentloaded'` | Chờ đến khi DOM đã được phân tích xong                                         |
| `'networkidle'`      | Chờ khi không còn kết nối mạng trong ít nhất 500ms (dùng khi có nhiều request) |

## 🧪 Ví dụ cơ bản

```ts
import { test, expect } from "@playwright/test";

test("Truy cập trang Playwright", async ({ page }) => {
  await page.goto("https://playwright.dev");
  await expect(page).toHaveTitle(/Playwright/);
});
```

## ⚠️ Lưu ý quan trọng
Nên luôn dùng await khi gọi `page.goto()`, vì đây là một thao tác bất đồng bộ.

Kết hợp `expect(page).toHaveURL()` để đảm bảo trang đã được mở đúng.
