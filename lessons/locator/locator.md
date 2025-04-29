# 🎯 Hiểu về Locators trong Playwright

## 📌 Locator là gì?

**Locator** là cách Playwright xác định và tương tác với phần tử trên trang web (như button, input, link, v.v.).
Locator giúp tìm đúng phần tử và thực hiện hành động như `click()`, `fill()`, `expect()`...

---

## 🧩 Các loại Locator phổ biến

### 1. `text=` (Tìm theo nội dung văn bản)

```ts
await page.locator("text=Login").click();
```

Tìm phần tử có nội dung là "Login".

---

### 2. CSS Selector

```ts
await page.locator(".btn-primary");
await page.locator("#username");
```

Giống với cú pháp CSS thông thường.

---

### 3. XPath

```ts
await page.locator('//button[text()="Submit"]');
```

Dùng cú pháp XPath để định vị.

Đọc thêm:

- https://minhphong306.wordpress.com/2020/06/26/automation-test-xpath-cho-nguoi-nong-dan/
- https://minhphong306.wordpress.com/2020/09/03/xpath-cho-nguoi-nong-dan-phan-2-tim-checkbox-son-tung-m-tp-voi-axes-method/

---

### 4. `getByRole()` (Tìm theo vai trò phần tử - phù hợp với accessibility)

```ts
await page.getByRole("button", { name: "Submit" });
```

Tìm button có tên là "Submit".

---

### 5. `getByTestId()` (Tìm theo test ID - khuyến khích dùng cho test ổn định)

```html
<button data-testid="submit-btn">Submit</button>
```

```ts
await page.getByTestId("submit-btn");
```

> 💡 Sử dụng `data-testid` giúp tách biệt UI và logic test, ít bị ảnh hưởng khi giao diện thay đổi.

---

## 📋 So sánh nhanh

| Loại Locator  | Ưu điểm                       | Nhược điểm                      |
| ------------- | ----------------------------- | ------------------------------- |
| `text=`       | Dễ hiểu, ngắn gọn             | Nhạy cảm khi text thay đổi      |
| CSS           | Linh hoạt, quen thuộc         | Dễ bị ảnh hưởng khi UI thay đổi |
| XPath         | Mạnh mẽ trong DOM phức tạp    | Khó đọc, dễ sai                 |
| `getByRole`   | Hỗ trợ accessibility tốt      | Cần đúng tên và role            |
| `getByTestId` | Ổn định, tách biệt logic & UI | Phải gắn thêm vào HTML          |

---

## 📌 Kết luận

Nên ưu tiên:

- `getByTestId()` cho test ổn định
- `getByRole()` cho accessibility tốt
- Tránh lạm dụng `text=` hoặc `CSS` nếu có cách khác ổn định hơn
