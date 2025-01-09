# TYPESCRIPT: Mã Hóa Caesar 📜

### Câu chuyện

Julius Caesar đã sử dụng một phương pháp mã hóa đơn giản để gửi các thông điệp bí mật. Phương pháp này dịch chuyển mỗi chữ cái trong bảng chữ cái một số vị trí nhất định. Ví dụ, với độ dịch là 3:

- 'A' -> 'D'
- 'B' -> 'E'
- 'Z' -> 'C'

### Yêu cầu:

- **Tên hàm:** `caesarCipher`
- **Tham số:**
  - `messages: string[]` - Mảng các thông điệp cần mã hóa
  - `shift: number` - Số vị trí cần dịch chuyển (1-25)
- **Kết quả:**
  - Trả về mảng các thông điệp đã được mã hóa

### Quy tắc:

1. Chỉ mã hóa chữ cái (a-z, A-Z)
2. Giữ nguyên chữ hoa/thường
3. Các ký tự khác (số, dấu câu, khoảng trắng) giữ nguyên
4. Nếu shift là số âm, dịch chuyển về bên trái
5. Nếu shift > 25, lấy phần dư khi chia cho 26

### Ví dụ:

```typescript
console.log(caesarCipher(["Hello World!", "CAESAR"], 3));
// ["Khoor Zruog!", "FDHVDU"]

console.log(caesarCipher(["abc", "xyz"], 1));
// ["bcd", "yza"]
```

### Test Cases Phổ biến:

1. **Shift bình thường:**

```typescript
console.log(caesarCipher(["Happy coding!"], 3));
// ["Kdssb frglqj!"]
```

2. **Shift âm:**

```typescript
console.log(caesarCipher(["HELLO"], -1));
// ["GDKKN"]
```

3. **Shift lớn hơn 26:**

```typescript
console.log(caesarCipher(["test"], 27));
// Tương đương shift = 1
// ["uftu"]
```

4. **Các ký tự đặc biệt:**

```typescript
console.log(caesarCipher(["Hello, World 123!"], 1));
// ["Ifmmp, Xpsme 123!"]
```

### Mở rộng:

1. **Thêm chức năng giải mã:**

   ```typescript
   function caesarDecipher(messages: string[], shift: number): string[] {
     return caesarCipher(messages, -shift);
   }
   ```

2. **Thêm tính năng tự động đoán shift:**

   ```typescript
   function breakCaesar(encodedMessage: string): number {
     // Phân tích tần suất chữ cái để đoán shift
   }
   ```

3. **Thêm các phương pháp mã hóa khác:**
   - Vigenère cipher
   - ROT13
   - Substitution cipher

### Test cases:

1. **Test case 1:**

```typescript
console.log(decodeVault([123, 456, 789]));
// [444, 1111, 1578]
// Giải thích:
// 123 -> 321: 123 + 321 = 444
// 456 -> 654: 456 + 654 = 1111
// 789 -> 987: 789 + 987 = 1578
```

2. **Test case 2:**

```typescript
console.log(decodeVault([100, 200, 1000]));
// [101, 202, 1001]
// Giải thích:
// 100 -> 1: 100 + 1 = 101
// 200 -> 2: 200 + 2 = 202
// 1000 -> 1: 1000 + 1 = 1001
```

3. **Test case 3:**

```typescript
console.log(decodeVault([5, 10, 99]));
// [10, 11, 198]
```

### Phiên bản nâng cao:

1. Thêm validation:
   - Kiểm tra input có phải là mảng
   - Kiểm tra các phần tử có phải là số nguyên dương
2. Xử lý các trường hợp đặc biệt:
   - Số 0
   - Số có nhiều chữ số 0 ở cuối
3. Tối ưu hiệu năng cho số lớn
4. Xử lý lỗi gracefully

### Các trường hợp cần chú ý:

1. Số có các chữ số 0 ở cuối (100 -> 1)
2. Số đơn chữ số (5 -> 5)
3. Số đối xứng (99 -> 99)
4. Số lớn (cần xử lý tràn số)
5. Input không hợp lệ (số âm, số thập phân)
