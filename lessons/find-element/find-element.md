# 🔍 Tìm phần tử với `page.locator` trong Playwright

## 🧠 Giới thiệu

Trong Playwright, `page.locator()` là phương thức dùng để **xác định vị trí của phần tử trên trang web**. Nó mạnh hơn `page.$` vì hỗ trợ auto-waiting và retry logic.

---

## ✅ Cú pháp cơ bản

```ts
const element = page.locator("css-selector");
```

Ví dụ:

```ts
const loginButton = page.locator('button[type="submit"]');
await loginButton.click();
```

## 💡 Tại sao dùng `locator()` thay vì `page.$()`?

| `page.locator()`                | `page.$()`                       |
| ------------------------------- | -------------------------------- |
| Hỗ trợ auto-waiting             | Không hỗ trợ auto-wait           |
| Có thể thao tác chuỗi phần tử   | Không mạnh trong chuỗi hành động |
| Dễ kiểm thử, retry nếu thất bại | Dễ fail nếu phần tử chưa render  |

## 🔍 Các cách định vị phổ biến

| Loại Locator | Ví dụ                                     | Ghi chú                     |
| ------------ | ----------------------------------------- | --------------------------- |
| **CSS**      | `'input[name="username"]'`                | Dễ viết, phổ biến           |
| **Text**     | `'text=Login'`                            | Dựa theo nội dung văn bản   |
| **Role**     | `getByRole('button', { name: 'Submit' })` | Tiêu chuẩn ARIA, dễ đọc     |
| **XPath**    | `locator('//button[text()="Submit"]')`    | Dùng khi CSS không hiệu quả |
| **Test ID**  | `[data-testid="submit-button"]`           | Tốt cho test ổn định        |

## 🧪 Ví dụ thực tế

```ts
test("Tìm và click nút Login", async ({ page }) => {
  await page.goto("https://example.com");
  const loginBtn = page.locator("text=Login");
  await loginBtn.click();
});
```

## 🎯 Chuỗi hành động

```ts
  await page.locator('form').locator('input[name="email"]').fill('user@example.com');
```
