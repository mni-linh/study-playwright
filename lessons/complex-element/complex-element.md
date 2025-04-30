# Xử lý các loại Phần tử phức tạp trong Playwright

Playwright hỗ trợ thao tác với các phần tử phức tạp như Dropdowns (menu chọn), Checkboxes (hộp chọn), Iframes (khung nhúng) và nội dung động (Dynamic content).
Dưới đây là hướng dẫn và ví dụ thực tế.

## 1. Dropdowns (Select Menu)

### HTML:

```html
<select id="dropdown">
  <option value="option1">Option 1</option>
  <option value="option2">Option 2</option>
</select>
```

### Script Playwright:

```ts
await page.selectOption("#dropdown", "option2");
```

---

## 2. Checkboxes

### HTML:

```html
<input type="checkbox" id="accept" /> <label for="accept">Accept Terms</label>
```

### Script Playwright:

```ts
await page.check("#accept"); // chọn
await page.uncheck("#accept"); // bỏ chọn
```

---

## 3. Iframes

### HTML:

```html
<iframe src="/iframe-content.html" id="my-frame"></iframe>
```

### Script Playwright:

```ts
const frame = page.frameLocator("#my-frame");
await frame.locator("text=Click Me").click();
```

---

## 4. Dynamic Content

### HTML (giả sử có một nút load nội dung động):

```html
<button id="load-content">Load Content</button>
<div id="content"></div>
<script>
  document.getElementById("load-content").onclick = () => {
    setTimeout(() => {
      document.getElementById("content").textContent = "Loaded!";
    }, 2000);
  };
</script>
```

### Script Playwright:

```ts
await page.click("#load-content");
await expect(page.locator("#content")).toHaveText("Loaded!");
```

---

## Ghi chú

- Luôn sử dụng `await` khi thao tác với phần tử.
- Với nội dung động, nên sử dụng `expect(...).toHaveText(...)` hoặc `await locator.waitFor(...)` để đảm bảo nội dung đã sẵn sàng.
