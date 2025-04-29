# 🛠 Thao tác cơ bản trong Playwright (click, fill, press)

## 🎯 Mục tiêu

Giúp bạn hiểu và sử dụng các thao tác cơ bản nhất để tương tác với website tự động bằng Playwright.

---

## 🖱 `click()` – Nhấp chuột

Dùng để mô phỏng hành động người dùng nhấp chuột vào phần tử.

### 📌 Cú pháp:

```ts
await page.locator("selector").click();
```

### ✅ Ví dụ:

```ts
await page.locator('button[type="submit"]').click();
```

## ✍️ fill() – Nhập nội dung vào ô input

Dùng để nhập văn bản vào trường nhập liệu như input, textarea.

### 📌 Cú pháp:

```ts
await page.locator("selector").fill("nội dung cần nhập");
```

### ✅ Ví dụ:

```ts
await page.locator('input[name="username"]').fill("mni-linh");
```

## ⌨ press() – Gửi phím bàn phím

Dùng để mô phỏng việc nhấn một phím cụ thể như Enter, Tab, ArrowRight,...

### 📌 Cú pháp:

```ts
await page.locator("selector").press("TênPhím");
```

### ✅ Ví dụ:

```ts
await page.locator('input[name="search"]').press("Enter");
```
