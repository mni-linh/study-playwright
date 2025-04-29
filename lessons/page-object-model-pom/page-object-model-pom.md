# 🎯 Page Object Model (POM) trong Playwright

## ✅ Giới thiệu

**Page Object Model (POM)** là một design pattern (mẫu thiết kế) được sử dụng trong kiểm thử tự động để **tách biệt phần logic test ra khỏi phần tương tác giao diện**.

👉 Lợi ích khi áp dụng POM:

- **Dễ đọc**
- **Dễ bảo trì**
- **Tái sử dụng code**
- **Giảm duplication code**

---

## 🧠 Nguyên lý của POM

- Mỗi **Page** (hoặc component lớn) sẽ tương ứng với một **class**.
- Trong class đó:
  - Định nghĩa **locators** cho các phần tử (buttons, input, link, ...).
  - Định nghĩa **hành động** (methods) để tương tác với các phần tử đó.
- Các **Test case** chỉ gọi các **hành động** này, **không** thao tác locator trực tiếp nữa.

---

## 🛠 Cách tổ chức POM

Thông thường sẽ tổ chức thư mục như sau:

```
tests/
  └── login.spec.ts
pages/
  └── LoginPage.ts
```

## 📋 So sánh: Không dùng POM vs Dùng POM
| Không dùng POM                                | Dùng POM                                         |
|------------------------------------------------|--------------------------------------------------|
| Test lặp đi lặp lại thao tác locator           | Locator gọn, viết 1 lần xài nhiều lần             |
| Khi UI thay đổi -> sửa nhiều nơi               | Khi UI thay đổi -> chỉ sửa trong file Page Object |
| Code test dài, khó bảo trì                     | Code test sạch, dễ đọc, dễ mở rộng                |

