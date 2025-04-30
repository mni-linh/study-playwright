
# Xử lý Dialogs (Alerts, Confirms, Prompts) trong Playwright

Trong Playwright, các dialog như `alert`, `confirm`, và `prompt` có thể được xử lý thông qua sự kiện `'dialog'` của trang.

## 📌 Lý thuyết

Playwright cho phép bạn lắng nghe các hộp thoại (`dialog`) và xử lý chúng bằng `.on('dialog', callback)` hoặc `page.once('dialog', callback)`.

Các loại hộp thoại:
- `alert`: Hiển thị thông báo (chỉ có nút OK)
- `confirm`: Xác nhận hành động (OK/Cancel)
- `prompt`: Nhập giá trị (input)

---

## ✅ Ví dụ HTML

```html
<!DOCTYPE html>
<html>
  <body>
    <button onclick="alert('This is an alert!')">Alert</button>
    <button onclick="confirm('Are you sure?')">Confirm</button>
    <button onclick="prompt('Enter your name:')">Prompt</button>
  </body>
</html>
```

---

## 🧪 Script Playwright

```ts
import { test, expect } from '@playwright/test';

test('Xử lý alert dialog', async ({ page }) => {
  await page.goto('https://example.com');

  page.once('dialog', async (dialog) => {
    expect(dialog.message()).toBe('This is an alert!');
    await dialog.accept();
  });

  await page.click('text=Alert');
});

test('Xử lý confirm dialog', async ({ page }) => {
  await page.goto('https://example.com');

  page.once('dialog', async (dialog) => {
    expect(dialog.message()).toBe('Are you sure?');
    await dialog.accept(); // hoặc dialog.dismiss() nếu muốn Cancel
  });

  await page.click('text=Confirm');
});

test('Xử lý prompt dialog', async ({ page }) => {
  await page.goto('https://example.com');

  page.once('dialog', async (dialog) => {
    expect(dialog.message()).toBe('Enter your name:');
    await dialog.accept('Linh'); // nhập giá trị 'Linh'
  });

  await page.click('text=Prompt');
});
```

---

## 📘 Ghi chú
- Bạn nên dùng `.once()` thay vì `.on()` nếu chỉ xử lý một lần.
- `dialog.accept()` và `dialog.dismiss()` đều trả về Promise nên cần `await`.
