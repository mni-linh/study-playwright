# ✅ Assertions cơ bản trong Playwright

## 🎯 Mục tiêu

Giúp bạn xác minh hành vi và trạng thái của trang web thông qua các hàm kiểm tra (`expect`).

---

## 🔍 `toBeVisible()`

Kiểm tra phần tử có hiển thị (visible) trên giao diện hay không.

### ✅ Ví dụ:

```ts
await expect(page.locator("#login-button")).toBeVisible();
```

## 📄 toHaveText()

Kiểm tra phần tử có đúng nội dung văn bản hay không.

### ✅ Ví dụ:

```ts
await expect(page.locator("h1")).toHaveText("Welcome");
```

## 🧾 toContainText()

Kiểm tra phần tử có chứa đoạn văn bản cụ thể.

### ✅ Ví dụ:

```ts
await expect(page.locator(".alert")).toContainText("Success");
```

## 🔗 toHaveAttribute()

Kiểm tra phần tử có chứa attribute với giá trị cụ thể.

### ✅ Ví dụ:

```ts
await expect(page.locator('input[type="email"]')).toHaveAttribute(
  "placeholder",
  "Enter your email"
);
```

## 🔢 toHaveCount()

Kiểm tra số lượng phần tử được tìm thấy.

### ✅ Ví dụ:

```ts
await expect(page.locator(".product-item")).toHaveCount(3);
```

## 🔠 toHaveValue()

Kiểm tra giá trị của input, select,...

### ✅ Ví dụ:

```ts
await expect(page.locator("#username")).toHaveValue("mni-linh");
```

## 🌐 toHaveURL()

Kiểm tra URL hiện tại của trang.

### ✅ Ví dụ:

```ts
await expect(page).toHaveURL("https://github.com/");
```

## 🧠 Ghi nhớ

Assertions có cơ chế auto-wait: sẽ tự đợi đến khi điều kiện đúng hoặc timeout.

Bạn có thể gắn timeout tùy chỉnh:

```ts
await expect(locator).toHaveText("Hello", { timeout: 7000 });
```
