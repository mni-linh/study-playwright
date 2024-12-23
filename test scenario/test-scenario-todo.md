# 1. Test Scenario: Add New Todo

## Scenario 1.1: Add Single Todo

- Mô tả: Kiểm tra người dùng có thể thêm một mục vào danh sách Todo.
- Các bước thực hiện:
  1. Mở trang Todo.
  2. Nhập buy some cheese vào ô nhập liệu.
  3. Nhấn "Enter" để thêm mục.
  4. Kiểm tra rằng danh sách Todo chỉ có một mục với tên là buy some cheese.

## Scenario 1.2: Add Multiple Todos

- Mô tả: Kiểm tra người dùng có thể thêm nhiều mục vào danh sách Todo.
- Các bước thực hiện:
  1. Nhập buy some cheese vào ô nhập liệu và nhấn "Enter".
  2. Kiểm tra danh sách Todo có một mục.
  3. Nhập feed the cat vào ô nhập liệu và nhấn "Enter".
  4. Kiểm tra danh sách Todo có hai mục.

## Scenario 1.3: Clear Input Field

- Mô tả: Kiểm tra trường nhập liệu có được làm trống sau khi một mục Todo mới được thêm vào.
- Các bước thực hiện:
  1. Nhập buy some cheese vào ô nhập liệu và nhấn "Enter".
  2. Kiểm tra rằng ô nhập liệu đã trống.

# 2. Test Scenario: Mark All Todos as Completed

## Scenario 2.1: Mark All Todos as Completed

- Mô tả: Kiểm tra người dùng có thể đánh dấu tất cả mục Todo là hoàn thành.
- Các bước thực hiện:
  1. Kiểm tra và đánh dấu "Mark all as complete".
  2. Kiểm tra rằng tất cả các mục Todo có class "completed".

## Scenario 2.2: Clear Completed State

- Mô tả: Kiểm tra người dùng có thể xóa trạng thái hoàn thành của tất cả các mục Todo.
- Các bước thực hiện:
  1. Đánh dấu "Mark all as complete".
  2. Hủy đánh dấu "Mark all as complete".
  3. Kiểm tra rằng không có mục Todo nào có class "completed".

# 3. Test Scenario: Mark Todo as Completed

## Scenario 3.1: Mark Individual Todo as Completed

- Mô tả: Kiểm tra người dùng có thể đánh dấu một mục Todo là hoàn thành.
- Các bước thực hiện:
  1. Tạo hai mục Todo.
  2. Đánh dấu mục Todo đầu tiên là hoàn thành.
  3. Kiểm tra rằng mục Todo đầu tiên có class "completed".

## Scenario 3.2: Un-mark Todo as Completed

- Mô tả: Kiểm tra người dùng có thể bỏ đánh dấu hoàn thành một mục Todo.
- Các bước thực hiện:
  1. Đánh dấu mục Todo đầu tiên là hoàn thành.
  2. Hủy đánh dấu mục Todo đầu tiên.
  3. Kiểm tra rằng mục Todo không có class "completed".

# 4. Test Scenario: Edit Todo

## Scenario 4.1: Edit Todo Item

- Mô tả: Kiểm tra người dùng có thể chỉnh sửa một mục Todo.
- Các bước thực hiện:
  1. Tạo một mục Todo.
  2. Chỉnh sửa mục Todo thành một tên khác.
  3. Kiểm tra mục Todo đã được sửa đổi thành công.

## Scenario 4.2: Save Edits on Blur

- Mô tả: Kiểm tra việc chỉnh sửa mục Todo sẽ được lưu lại khi mất focus.
- Các bước thực hiện:
  1. Chỉnh sửa mục Todo.
  2. Nhấn ra ngoài ô nhập liệu (blur).
  3. Kiểm tra mục Todo đã được lưu lại đúng.

## Scenario 4.3: Cancel Edits on Escape

- Mô tả: Kiểm tra chỉnh sửa mục Todo sẽ bị hủy nếu nhấn phím Escape.
- Các bước thực hiện:
  1. Chỉnh sửa mục Todo.
  2. Nhấn phím Escape.
  3. Kiểm tra mục Todo vẫn giữ nguyên giá trị ban đầu.

## Scenario 4.4: Trim Text Input

- Mô tả: Kiểm tra việc nhập văn bản có tự động cắt bỏ khoảng trắng dư thừa.
- Các bước thực hiện:
  1. Chỉnh sửa mục Todo và thêm khoảng trắng dư thừa.
  2. Nhấn Enter để lưu.
  3. Kiểm tra rằng mục Todo đã được lưu mà không có khoảng trắng dư thừa.

## Scenario 4.5: Remove Todo if Empty Text

- Mô tả: Kiểm tra mục Todo sẽ bị xóa nếu người dùng nhập chuỗi trống.
- Các bước thực hiện:

  1. Chỉnh sửa mục Todo và nhập chuỗi trống.
  2. Nhấn Enter để lưu.
  3. Kiểm tra rằng mục Todo đã bị xóa.

# 5. Test Scenario: Todo Counter

## Scenario 5.1: Display Current Todo Count

- Mô tả: Kiểm tra số lượng mục Todo hiện tại được hiển thị chính xác.
- Các bước thực hiện:
  1. Thêm một mục Todo.
  2. Kiểm tra rằng số lượng mục Todo hiển thị là 1.
  3. Thêm một mục Todo khác.
  4. Kiểm tra rằng số lượng mục Todo hiển thị là 2.
