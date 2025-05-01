# 🎭 Mocking & Handling Network Requests trong Playwright

Trong Playwright, bạn có thể:

- Chặn (intercept) các request mạng.
- Trả về dữ liệu giả (mock data).
- Thay đổi request hoặc response.
- Mô phỏng lỗi mạng như timeout, lỗi 500,...
- Ghi log các request/response.

---

## 🔧 Cấu trúc cơ bản

```ts
page.route("**/url-pattern", async (route, request) => {
  // xử lý tại đây: fulfill(), continue(), abort()
});
```

## 🧪 Ví dụ 1: Mock API response

### HTML giả định (frontend)

```ts
  <!-- file: index.html -->
  <!DOCTYPE html>
  <html>
  <head><title>Mock API</title></head>
  <body>
    <h1 id="username">Loading...</h1>
    <script>
      fetch('/api/user')
        .then(res => res.json())
        .then(data => {
          document.getElementById('username').innerText = data.name;
        });
    </script>
  </body>
  </html>
```

### Script test

```ts
import { test, expect } from "@playwright/test";

test("Mock API response", async ({ page }) => {
  await page.route("**/api/user", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ name: "Mock User", age: 30 }),
    });
  });

  await page.goto("http://localhost:3000"); // nơi chạy file HTML
  await expect(page.locator("#username")).toHaveText("Mock User");
});
```

## 🧪 Ví dụ 2: Thay đổi header request

```ts
test("Thêm Authorization Header", async ({ page }) => {
  await page.route("**/api/protected", async (route) => {
    const request = route.request();
    await route.continue({
      headers: {
        ...request.headers(),
        Authorization: "Bearer token-mock",
      },
    });
  });

  await page.goto("https://your-app.com");
});
```

## 🧪 Ví dụ 3: Mô phỏng lỗi mạng

```ts
test("Simulate network failure", async ({ page }) => {
  await page.route("**/api/fetch", async (route) => {
    await route.abort("failed"); // mô phỏng không kết nối được
  });

  await page.goto("https://your-app.com");
});
```

## 🧪 Ví dụ 4: Log toàn bộ request/response

```ts
test("Log network traffic", async ({ page }) => {
  page.on("request", (req) => {
    console.log(">>", req.method(), req.url());
  });

  page.on("response", (res) => {
    console.log("<<", res.status(), res.url());
  });

  await page.goto("https://playwright.dev");
});
```

## ✅ Các kiểu xử lý route

```ts
| API                | Mô tả                                                     |
|--------------------|-----------------------------------------------------------|
| `route.continue()` | Tiếp tục gửi request (có thể sửa headers, method...)      |
| `route.fulfill()`  | Trả về response giả từ script                             |
| `route.abort()`    | Hủy request (thường dùng để mô phỏng lỗi mạng)            |

```

## 📌 Ghi nhớ

- Dùng `**/api/*` để bắt tất cả API trong một pattern.

- `page.route()` nên được gọi trước khi `.goto()` hoặc hành động gây ra request.

- Tốt cho test giao diện độc lập backend.
