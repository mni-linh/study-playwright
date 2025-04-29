# 📊 Data-Driven Testing (DDT) trong Playwright

## Data-Driven Testing (DDT) là gì?
- Là phương pháp **chạy cùng một test nhiều lần** với **dữ liệu khác nhau**.
- Giúp kiểm thử dễ dàng hơn với nhiều bộ dữ liệu mà không cần viết lại nhiều đoạn mã.

---

## ✅ Lợi ích
- Tiết kiệm thời gian viết test.
- Test case **dễ bảo trì** và **mở rộng**.
- Tăng độ bao phủ kiểm thử với nhiều bộ dữ liệu.

---

## 🛠 Cách thực hiện DDT trong Playwright

### Cách 1: Dùng `test.each()`
### Cách 2: Dùng `test.describe() + test()` bên trong

## 🔥 Kết hợp thêm
Dữ liệu có thể lấy từ file ngoài như:

.json

.csv

.xlsx

hoặc gọi API để lấy dữ liệu test.
