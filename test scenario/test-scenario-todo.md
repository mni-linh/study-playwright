# 1. Test Scenario: Add New Todo

## Scenario 1.1: Add Single Todo - Kiểm tra việc thêm một mục Todo duy nhất vào danh sách.

### Test Case 1.1.1: Add Single Todo

- ID: TC_001
- Mô tả: Kiểm tra người dùng có thể thêm một mục vào danh sách Todo.
- Dữ liệu đầu vào: "buy some cheese"
- Bước thực hiện:
  1. Mở trang Todo.
  2. Nhập buy some cheese vào ô nhập liệu.
  3. Nhấn "Enter" để thêm mục.
  4. Kiểm tra rằng danh sách Todo chỉ có một mục với tên là buy some cheese.
- Kết quả mong đợi: Danh sách Todo có một mục duy nhất là "buy some cheese".

## Scenario 1.2: Add Multiple Todos - Kiểm tra việc thêm nhiều mục Todo vào danh sách.

### Test Case 1.2.1: Add Multiple Todos

- ID: TC_002
- Mô tả: Kiểm tra người dùng có thể thêm nhiều mục vào danh sách Todo.
- Dữ liệu đầu vào: "buy some cheese", "feed the cat"
- Bước thực hiện:
  1. Nhập buy some cheese vào ô nhập liệu và nhấn "Enter".
  2. Kiểm tra danh sách Todo có một mục.
  3. Nhập feed the cat vào ô nhập liệu và nhấn "Enter".
  4. Kiểm tra danh sách Todo có hai mục.
- Kết quả mong đợi: Danh sách Todo có hai mục: "buy some cheese" và "feed the cat".

## Scenario 1.3: Clear Input Field - Kiểm tra trường nhập liệu có bị làm trống sau khi thêm một Todo mới.

### Test Case 1.3.1: Clear Input Field

- ID: TC_003
- Mô tả: Kiểm tra trường nhập liệu có được làm trống sau khi một mục Todo mới được thêm vào.
- Dữ liệu đầu vào: "buy some cheese"
- Bước thực hiện:
  1. Nhập "buy some cheese" vào ô nhập liệu và nhấn "Enter".
  2. Kiểm tra rằng ô nhập liệu đã trống.
- Kết quả mong đợi: Trường nhập liệu bị làm trống sau khi nhấn "Enter".

# 2. Test Scenario: Mark All Todos as Completed

## Scenario 2.1: Mark All Todos as Completed

### Test Case 2.1.1: Mark All Todos as Completed

- ID: TC_004
- Mô tả: Kiểm tra người dùng có thể đánh dấu tất cả mục Todo là hoàn thành.
- Dữ liệu đầu vào: None
- Bước thực hiện:

  1. Kiểm tra và đánh dấu "Mark all as complete".
  2. Kiểm tra rằng tất cả các mục Todo có class "completed".

- Kết quả mong đợi: Tất cả các mục Todo đều có class "completed".

## Scenario 2.2: Clear Completed State

### Test Case 2.2.1: Clear Completed State

- ID: TC_005
- Mô tả: Kiểm tra người dùng có thể xóa trạng thái hoàn thành của tất cả các mục Todo.
- Dữ liệu đầu vào: None
- Bước thực hiện:
  1. Đánh dấu "Mark all as complete".
  2. Hủy đánh dấu "Mark all as complete".
  3. Kiểm tra rằng không có mục Todo nào có class "completed".
- Kết quả mong đợi: Không có mục Todo nào có class "completed".

# 3. Test Scenario: Mark Todo as Completed

## Scenario 3.1: Mark Individual Todo as Completed

### Test Case 3.1.1: Mark Individual Todo as Completed

- ID: TC_006
- Mô tả: Kiểm tra người dùng có thể đánh dấu một mục Todo là hoàn thành.
- Dữ liệu đầu vào: "buy some cheese", "feed the cat"
- Bước thực hiện:

  1. Tạo hai mục Todo: "buy some cheese", "feed the cat".
  2. Đánh dấu mục Todo đầu tiên là hoàn thành.
  3. Kiểm tra rằng mục Todo đầu tiên có class "completed".

- Kết quả mong đợi: Mục Todo đầu tiên có class "completed".

## Scenario 3.2: Un-mark Todo as Completed

### Test Case 3.2.1: Un-mark Todo as Completed

- ID: TC_007
- Mô tả: Kiểm tra người dùng có thể bỏ đánh dấu hoàn thành một mục Todo.
- Dữ liệu đầu vào: "buy some cheese"
- Bước thực hiện:

  1. Đánh dấu mục Todo đầu tiên là hoàn thành.
  2. Hủy đánh dấu mục Todo đầu tiên.
  3. Kiểm tra rằng mục Todo không có class "completed".

- Kết quả mong đợi: Mục Todo đầu tiên không có class "completed".

# 4. Test Scenario: Edit Todo

## Scenario 4.1: Edit Todo Item

### Test Case 4.1.1: Edit Todo Item

- ID: TC_008
- Mô tả: Kiểm tra người dùng có thể chỉnh sửa một mục Todo.
- Dữ liệu đầu vào: "buy some cheese" (chỉnh sửa thành "buy some sausages")
- Bước thực hiện:
  1. Tạo một mục Todo: "buy some cheese".
  2. Chỉnh sửa mục Todo thành "buy some sausages".
  3. Kiểm tra mục Todo đã được sửa đổi thành công.
- Kết quả mong đợi: Mục Todo được sửa thành "buy some sausages".

## Scenario 4.2: Save Edits on Blur

### Test Case 4.2.1: Save Edits on Blur

- ID: TC_009
- Mô tả: Kiểm tra việc chỉnh sửa mục Todo sẽ được lưu lại khi mất focus.
- Dữ liệu đầu vào: "buy some sausages"
- Bước thực hiện:
  1. Chỉnh sửa mục Todo.
  2. Nhấn ra ngoài ô nhập liệu (blur).
  3. Kiểm tra mục Todo đã được lưu lại đúng.
- Kết quả mong đợi: Mục Todo được lưu lại sau khi mất focus.

## Scenario 4.3: Cancel Edits on Escape

### Test Case 4.3.1: Cancel Edits on Escape

- ID: TC_010
- Mô tả: Kiểm tra chỉnh sửa mục Todo sẽ bị hủy nếu nhấn phím Escape.
- Dữ liệu đầu vào: "buy some sausages"
- Bước thực hiện:
  1. Chỉnh sửa mục Todo thành "buy some sausages".
  2. Nhấn phím Escape.
  3. Kiểm tra mục Todo vẫn giữ nguyên giá trị ban đầu.
- Kết quả mong đợi: Mục Todo không thay đổi và giữ nguyên giá trị ban đầu.

## Scenario 4.4: Trim Text Input

### Test Case 4.4.1: Trim Text Input

- ID: TC_011
- Mô tả: Kiểm tra việc nhập văn bản có tự động cắt bỏ khoảng trắng dư thừa.
- Dữ liệu đầu vào: " buy some sausages "
- Bước thực hiện:

  1. Chỉnh sửa mục Todo và thêm khoảng trắng dư thừa.
  2. Nhấn Enter để lưu.
  3. Kiểm tra rằng mục Todo đã được lưu mà không có khoảng trắng dư thừa.

- Kết quả mong đợi: Mục Todo được lưu mà không có khoảng trắng dư thừa.

## Scenario 4.5: Remove Todo if Empty Text

### Test Case 4.5.1: Remove Todo if Empty Text

- ID: TC_012
- Mô tả: Kiểm tra mục Todo sẽ bị xóa nếu người dùng nhập chuỗi trống.
- Dữ liệu đầu vào: ""
- Bước thực hiện:
  1. Chỉnh sửa mục Todo và nhập chuỗi trống.
  2. Nhấn Enter để lưu.
  3. Kiểm tra rằng mục Todo đã bị xóa.
- Kết quả mong đợi: Mục Todo bị xóa khỏi danh sách.

# 5. Test Scenario: Todo Counter

## Scenario 5.1: Display Current Todo Count

### Test Case 5.1.1: Display Current Todo Count

- ID: TC_013
- Mô tả: Kiểm tra số lượng mục Todo hiện tại được hiển thị chính xác.
- Dữ liệu đầu vào: "buy some cheese", "feed the cat"
- Bước thực hiện:
  1. Thêm mục Todo "buy some cheese".
  2. Kiểm tra rằng số lượng mục Todo hiển thị là 1.
  3. Thêm mục Todo "feed the cat".
  4. Kiểm tra rằng số lượng mục Todo hiển thị là 2.
- Kết quả mong đợi: Số lượng mục Todo hiển thị đúng là 2.
