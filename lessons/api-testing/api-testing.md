# 🎯 API Testing với Playwright

## 1. API Testing là gì?

- **API Testing** là quá trình kiểm thử các API trực tiếp để xác minh rằng API hoạt động đúng, trả về dữ liệu như mong đợi, và xử lý lỗi đúng cách.
- Thay vì test giao diện người dùng (UI), ta **test trực tiếp tầng giao tiếp** giữa server và client.

---

## 2. Tại sao dùng Playwright để test API?

- Dùng chung framework Playwright cho cả **UI** và **API** test ⇒ quản lý đồng bộ.
- Dễ **tạo request**, **kiểm tra response** ngay trong test.
- Hỗ trợ đầy đủ: `GET`, `POST`, `PUT`, `PATCH`, `DELETE`, `HEAD`,...
- Tích hợp `request context` để dễ dàng config **headers**, **authentication**, **baseURL**,...

---

## 3. Các API Method Playwright hỗ trợ:

| Method                         | Ý nghĩa                      |
| :----------------------------- | :--------------------------- |
| `request.get(url)`             | Gửi request GET              |
| `request.post(url, { data })`  | Gửi request POST với payload |
| `request.put(url, { data })`   | Gửi request PUT              |
| `request.delete(url)`          | Gửi request DELETE           |
| `request.patch(url, { data })` | Gửi request PATCH            |

---

## 4. Quy trình test API cơ bản

1. **Send request** tới server (GET, POST, PUT,...)
2. **Check status code** trả về (`200`, `201`, `400`, `404`, `500`,...)
3. **Parse response body** (`json`, `text`, ...)
4. **Validate** các field: giá trị, kiểu dữ liệu, schema,...
5. **Test negative case**: gửi dữ liệu sai, thiếu field, lỗi authentication,...

---

## 5. Ví dụ Code cơ bản

```typescript
import { test, expect } from "@playwright/test";

test("Check GET API", async ({ request }) => {
  const response = await request.get("https://api.github.com/users/playwright");
  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(body.login).toBe("playwright");
});
```

## 6. request.newContext()

- Cho phép tạo context API mới với headers riêng (ví dụ như Authorization token, Content-Type, Cookie, etc.)
- Ví dụ:

```typescript
const apiContext = await playwright.request.newContext({
  baseURL: "https://api.example.com",
  extraHTTPHeaders: {
    Authorization: `Bearer your_token`,
    "Content-Type": "application/json",
  },
});

const res = await apiContext.get("/profile");
expect(res.status()).toBe(200);
```

## 7. Ghi nhớ thêm
| Lưu ý | Giải thích | 
|:------|:--------|
Base URL | Khai báo baseURL giúp code gọn hơn, không phải lặp lại URL dài dòng
Authentication | Sử dụng Authorization headers hoặc Cookies để kiểm thử API yêu cầu đăng nhập
Negative Testing | Bắt buộc kiểm tra case API trả lỗi (400, 401, 403, 500)
Chia nhỏ test | Mỗi API nên có 1 file riêng để dễ bảo trì
Kết hợp với UI Test | Dùng API để setup dữ liệu trước UI Test (Create, Update, Delete nhanh hơn UI)
