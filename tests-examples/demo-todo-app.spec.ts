import { test, expect, type Page } from "@playwright/test";

// beforeEach là 1 test hook trong Playwright. Nó được chạy trước mỗi bài test trong cùng một file test.
test.beforeEach(async ({ page }) => {
  await page.goto("https://demo.playwright.dev/todomvc");
});

const TODO_ITEMS = [
  "buy some cheese",
  "feed the cat",
  "book a doctors appointment",
] as const;

/* Gr Test: Todo mới */
// test.describe được sử dụng để nhóm các bài test liên quan với nhau
test.describe("New Todo", () => {
  // Test: Người dùng có thể thêm các mục vào danh sách todo
  test("should allow me to add todo items", async ({ page }) => {
    // create a new todo locator
    const newTodo = page.getByPlaceholder("What needs to be done?");

    // Create 1st todo.
    await newTodo.fill(TODO_ITEMS[0]);
    await newTodo.press("Enter");

    // Make sure the list only has one todo item.
    // page.getByTestId("todo-title"): Tìm phần tử có data-testid là "todo-title", đại diện cho danh sách các mục todo hiển thị trên giao diện.
    // toHaveText([TODO_ITEMS[0]]): Kiểm tra rằng danh sách hiện tại chỉ chứa đúng một mục, với nội dung là phần tử đầu tiên trong TODO_ITEMS.
    await expect(page.getByTestId("todo-title")).toHaveText([TODO_ITEMS[0]]);

    // Create 2nd todo.
    await newTodo.fill(TODO_ITEMS[1]);
    await newTodo.press("Enter");

    // Make sure the list now has two todo items.
    await expect(page.getByTestId("todo-title")).toHaveText([
      TODO_ITEMS[0],
      TODO_ITEMS[1],
    ]);

    await checkNumberOfTodosInLocalStorage(page, 2);
  });

  // Test: kiểm tra liệu trường nhập liệu có được làm trống khi một mục todo mới được thêm vào không.
  test("should clear text input field when an item is added", async ({
    page,
  }) => {
    // create a new todo locator: Tạo một locator cho trường nhập liệu
    const newTodo = page.getByPlaceholder("What needs to be done?");

    // Create one todo item. Điền và thêm một mục todo mới
    await newTodo.fill(TODO_ITEMS[0]);
    await newTodo.press("Enter");

    // Check that input is empty.
    // Kiểm tra rằng trường nhập liệu trống sau khi thêm
    await expect(newTodo).toBeEmpty();
    // Kiểm tra số lượng mục trong Local Storage
    await checkNumberOfTodosInLocalStorage(page, 1);
  });

  // Test: kiểm tra rằng các mục mới được thêm vào cuối danh sách.
  test("should append new items to the bottom of the list", async ({
    page,
  }) => {
    // Create 3 items.
    await createDefaultTodos(page);

    // create a todo count locator
    const todoCount = page.getByTestId("todo-count");

    // Check test using different methods.
    await expect(page.getByText("3 items left")).toBeVisible(); // method 1
    await expect(todoCount).toHaveText("3 items left"); // method 2
    await expect(todoCount).toContainText("3"); // method 3
    await expect(todoCount).toHaveText(/3/); // method 4

    // Check all items in one call.
    await expect(page.getByTestId("todo-title")).toHaveText(TODO_ITEMS);
    await checkNumberOfTodosInLocalStorage(page, 3);
  });
});

/* Gr Test: Đánh dấu rằng tất cả todo đã được hoàn thành */
test.describe("Mark all as completed", () => {
  test.beforeEach(async ({ page }) => {
    await createDefaultTodos(page);
    await checkNumberOfTodosInLocalStorage(page, 3);
  });

  test.afterEach(async ({ page }) => {
    await checkNumberOfTodosInLocalStorage(page, 3);
  });

  // Test: Kiểm tra đánh dấu tất cả các mục Todo là đã hoàn thành
  test("should allow me to mark all items as completed", async ({ page }) => {
    // Complete all todos.
    await page.getByLabel("Mark all as complete").check();

    // Ensure all todos have 'completed' class.
    await expect(page.getByTestId("todo-item")).toHaveClass([
      "completed",
      "completed",
      "completed",
    ]);
    await checkNumberOfCompletedTodosInLocalStorage(page, 3);
  });

  // Test: Kiểm tra chức năng hủy trạng thái hoàn thành của tất cả các mục Todo
  test("should allow me to clear the complete state of all items", async ({
    page,
  }) => {
    const toggleAll = page.getByLabel("Mark all as complete");
    // Check and then immediately uncheck.
    await toggleAll.check();
    await toggleAll.uncheck();

    // Should be no completed classes.
    await expect(page.getByTestId("todo-item")).toHaveClass(["", "", ""]);
  });

  // Test: Kiểm tra xem checkbox All có tự động cập nhật trạng thái khi các checkbox Todo item được đánh dấu hoàn thành hoặc bỏ đánh dấu
  test("complete all checkbox should update state when items are completed / cleared", async ({
    page,
  }) => {
    const toggleAll = page.getByLabel("Mark all as complete");
    await toggleAll.check();
    await expect(toggleAll).toBeChecked();
    await checkNumberOfCompletedTodosInLocalStorage(page, 3);

    // Uncheck first todo.
    const firstTodo = page.getByTestId("todo-item").nth(0);
    await firstTodo.getByRole("checkbox").uncheck();

    // Reuse toggleAll locator and make sure its not checked.
    await expect(toggleAll).not.toBeChecked();

    await firstTodo.getByRole("checkbox").check();
    await checkNumberOfCompletedTodosInLocalStorage(page, 3);

    // Assert the toggle all is checked again.
    await expect(toggleAll).toBeChecked();
  });
});

/* Gr Test:  */
test.describe("Item", () => {
  // Test: Kiểm tra xem người dùng có thể đánh dấu các mục Todo là hoàn thành và trạng thái hoàn thành có được phản ánh chính xác không
  test("should allow me to mark items as complete", async ({ page }) => {
    // create a new todo locator
    const newTodo = page.getByPlaceholder("What needs to be done?");

    // Create two items.
    /*slice(start, end)
    - start: Chỉ số (index) bắt đầu cắt từ mảng ban đầu.
    - end: Chỉ số kết thúc, nhưng không bao gồm phần tử tại chỉ số này.

    Mảng gốc TODO_ITEMS không bị thay đổi. Phương thức slice() chỉ tạo một bản sao (copy) của phần tử được chọn, không thay đổi mảng ban đầu.
    
    */
    for (const item of TODO_ITEMS.slice(0, 2)) {
      await newTodo.fill(item);
      await newTodo.press("Enter");
    }

    // Check first item.
    const firstTodo = page.getByTestId("todo-item").nth(0);
    await firstTodo.getByRole("checkbox").check();
    await expect(firstTodo).toHaveClass("completed");

    // Check second item.
    const secondTodo = page.getByTestId("todo-item").nth(1);
    await expect(secondTodo).not.toHaveClass("completed");
    await secondTodo.getByRole("checkbox").check();

    // Assert completed class.
    await expect(firstTodo).toHaveClass("completed");
    await expect(secondTodo).toHaveClass("completed");
  });

  // Test: Kiểm tra xem người dùng có thể bỏ đánh dấu hoàn thành các mục Todo hay không và trạng thái có được phản ánh chính xác trong giao diện và trong localStorage
  test("should allow me to un-mark items as complete", async ({ page }) => {
    // create a new todo locator
    const newTodo = page.getByPlaceholder("What needs to be done?");

    // Create two items.
    for (const item of TODO_ITEMS.slice(0, 2)) {
      await newTodo.fill(item);
      await newTodo.press("Enter");
    }

    const firstTodo = page.getByTestId("todo-item").nth(0);
    const secondTodo = page.getByTestId("todo-item").nth(1);
    const firstTodoCheckbox = firstTodo.getByRole("checkbox");

    await firstTodoCheckbox.check();
    await expect(firstTodo).toHaveClass("completed");
    await expect(secondTodo).not.toHaveClass("completed");
    await checkNumberOfCompletedTodosInLocalStorage(page, 1);

    await firstTodoCheckbox.uncheck();
    await expect(firstTodo).not.toHaveClass("completed");
    await expect(secondTodo).not.toHaveClass("completed");
    await checkNumberOfCompletedTodosInLocalStorage(page, 0);
  });

  // Test:  Kiểm tra chức năng cho phép người dùng chỉnh sửa một mục Todo trong danh sách.
  test("should allow me to edit an item", async ({ page }) => {
    await createDefaultTodos(page);

    const todoItems = page.getByTestId("todo-item");
    const secondTodo = todoItems.nth(1);
    await secondTodo.dblclick();
    await expect(secondTodo.getByRole("textbox", { name: "Edit" })).toHaveValue(
      TODO_ITEMS[1]
    );
    await secondTodo
      .getByRole("textbox", { name: "Edit" })
      .fill("buy some sausages");
    await secondTodo.getByRole("textbox", { name: "Edit" }).press("Enter");

    // Explicitly assert the new text value.
    await expect(todoItems).toHaveText([
      TODO_ITEMS[0],
      "buy some sausages",
      TODO_ITEMS[2],
    ]);
    await checkTodosInLocalStorage(page, "buy some sausages");
  });
});

/* Gr Test:  Các case khi edit todo*/
test.describe("Editing", () => {
  test.beforeEach(async ({ page }) => {
    await createDefaultTodos(page);
    await checkNumberOfTodosInLocalStorage(page, 3);
  });

  // Test: Kiểm tra xem các checkbox có bị ẩn khi todo item đang chỉnh sửa hay không
  test("should hide other controls when editing", async ({ page }) => {
    const todoItem = page.getByTestId("todo-item").nth(1);
    await todoItem.dblclick();
    await expect(todoItem.getByRole("checkbox")).not.toBeVisible();
    await expect(
      todoItem.locator("label", {
        hasText: TODO_ITEMS[1],
      })
    ).not.toBeVisible();
    await checkNumberOfTodosInLocalStorage(page, 3);
  });

  // Test: Lưu lại các chỉnh sửa khi rời khỏi trường nhập
  test("should save edits on blur", async ({ page }) => {
    const todoItems = page.getByTestId("todo-item");
    await todoItems.nth(1).dblclick();
    await todoItems
      .nth(1)
      .getByRole("textbox", { name: "Edit" })
      .fill("buy some sausages");
    await todoItems
      .nth(1)
      .getByRole("textbox", { name: "Edit" })
      .dispatchEvent("blur");

    await expect(todoItems).toHaveText([
      TODO_ITEMS[0],
      "buy some sausages",
      TODO_ITEMS[2],
    ]);
    await checkTodosInLocalStorage(page, "buy some sausages");
  });

  // Test: Cắt bỏ khoảng trắng thừa khi nhập văn bản
  test("should trim entered text", async ({ page }) => {
    const todoItems = page.getByTestId("todo-item");
    await todoItems.nth(1).dblclick();
    await todoItems
      .nth(1)
      .getByRole("textbox", { name: "Edit" })
      .fill("    buy some sausages    ");
    await todoItems
      .nth(1)
      .getByRole("textbox", { name: "Edit" })
      .press("Enter");

    await expect(todoItems).toHaveText([
      TODO_ITEMS[0],
      "buy some sausages",
      TODO_ITEMS[2],
    ]);
    await checkTodosInLocalStorage(page, "buy some sausages");
  });

  // Test: Xóa todo item nếu nhập chuỗi trống
  test("should remove the item if an empty text string was entered", async ({
    page,
  }) => {
    const todoItems = page.getByTestId("todo-item");
    await todoItems.nth(1).dblclick();
    await todoItems.nth(1).getByRole("textbox", { name: "Edit" }).fill("");
    await todoItems
      .nth(1)
      .getByRole("textbox", { name: "Edit" })
      .press("Enter");

    await expect(todoItems).toHaveText([TODO_ITEMS[0], TODO_ITEMS[2]]);
  });

  // Test: Hủy bỏ thay đổi khi nhấn Escape
  test("should cancel edits on escape", async ({ page }) => {
    const todoItems = page.getByTestId("todo-item");
    await todoItems.nth(1).dblclick();
    await todoItems
      .nth(1)
      .getByRole("textbox", { name: "Edit" })
      .fill("buy some sausages");
    await todoItems
      .nth(1)
      .getByRole("textbox", { name: "Edit" })
      .press("Escape");
    await expect(todoItems).toHaveText(TODO_ITEMS);
  });
});

/* Gr Test:  Kiểm tra hiển thị số lượng todo items hiện tại*/
test.describe("Counter", () => {
  test("should display the current number of todo items", async ({ page }) => {
    // create a new todo locator
    const newTodo = page.getByPlaceholder("What needs to be done?");

    // create a todo count locator
    const todoCount = page.getByTestId("todo-count");

    await newTodo.fill(TODO_ITEMS[0]);
    await newTodo.press("Enter");

    await expect(todoCount).toContainText("1");

    await newTodo.fill(TODO_ITEMS[1]);
    await newTodo.press("Enter");
    await expect(todoCount).toContainText("2");

    await checkNumberOfTodosInLocalStorage(page, 2);
  });
});

/* Gr Test:  */ //loadingggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg
test.describe("Clear completed button", () => {
  test.beforeEach(async ({ page }) => {
    await createDefaultTodos(page);
  });

  test("should display the correct text", async ({ page }) => {
    await page.locator(".todo-list li .toggle").first().check();
    await expect(
      page.getByRole("button", { name: "Clear completed" })
    ).toBeVisible();
  });

  test("should remove completed items when clicked", async ({ page }) => {
    const todoItems = page.getByTestId("todo-item");
    await todoItems.nth(1).getByRole("checkbox").check();
    await page.getByRole("button", { name: "Clear completed" }).click();
    await expect(todoItems).toHaveCount(2);
    await expect(todoItems).toHaveText([TODO_ITEMS[0], TODO_ITEMS[2]]);
  });

  test("should be hidden when there are no items that are completed", async ({
    page,
  }) => {
    await page.locator(".todo-list li .toggle").first().check();
    await page.getByRole("button", { name: "Clear completed" }).click();
    await expect(
      page.getByRole("button", { name: "Clear completed" })
    ).toBeHidden();
  });
});

/* Gr Test:  */
test.describe("Persistence", () => {
  test("should persist its data", async ({ page }) => {
    // create a new todo locator
    const newTodo = page.getByPlaceholder("What needs to be done?");

    for (const item of TODO_ITEMS.slice(0, 2)) {
      await newTodo.fill(item);
      await newTodo.press("Enter");
    }

    const todoItems = page.getByTestId("todo-item");
    const firstTodoCheck = todoItems.nth(0).getByRole("checkbox");
    await firstTodoCheck.check();
    await expect(todoItems).toHaveText([TODO_ITEMS[0], TODO_ITEMS[1]]);
    await expect(firstTodoCheck).toBeChecked();
    await expect(todoItems).toHaveClass(["completed", ""]);

    // Ensure there is 1 completed item.
    await checkNumberOfCompletedTodosInLocalStorage(page, 1);

    // Now reload.
    await page.reload();
    await expect(todoItems).toHaveText([TODO_ITEMS[0], TODO_ITEMS[1]]);
    await expect(firstTodoCheck).toBeChecked();
    await expect(todoItems).toHaveClass(["completed", ""]);
  });
});

/* Gr Test:  */
test.describe("Routing", () => {
  test.beforeEach(async ({ page }) => {
    await createDefaultTodos(page);
    // make sure the app had a chance to save updated todos in storage
    // before navigating to a new view, otherwise the items can get lost :(
    // in some frameworks like Durandal
    await checkTodosInLocalStorage(page, TODO_ITEMS[0]);
  });

  test("should allow me to display active items", async ({ page }) => {
    const todoItem = page.getByTestId("todo-item");
    await page.getByTestId("todo-item").nth(1).getByRole("checkbox").check();

    await checkNumberOfCompletedTodosInLocalStorage(page, 1);
    await page.getByRole("link", { name: "Active" }).click();
    await expect(todoItem).toHaveCount(2);
    await expect(todoItem).toHaveText([TODO_ITEMS[0], TODO_ITEMS[2]]);
  });

  test("should respect the back button", async ({ page }) => {
    const todoItem = page.getByTestId("todo-item");
    await page.getByTestId("todo-item").nth(1).getByRole("checkbox").check();

    await checkNumberOfCompletedTodosInLocalStorage(page, 1);

    await test.step("Showing all items", async () => {
      await page.getByRole("link", { name: "All" }).click();
      await expect(todoItem).toHaveCount(3);
    });

    await test.step("Showing active items", async () => {
      await page.getByRole("link", { name: "Active" }).click();
    });

    await test.step("Showing completed items", async () => {
      await page.getByRole("link", { name: "Completed" }).click();
    });

    await expect(todoItem).toHaveCount(1);
    await page.goBack();
    await expect(todoItem).toHaveCount(2);
    await page.goBack();
    await expect(todoItem).toHaveCount(3);
  });

  test("should allow me to display completed items", async ({ page }) => {
    await page.getByTestId("todo-item").nth(1).getByRole("checkbox").check();
    await checkNumberOfCompletedTodosInLocalStorage(page, 1);
    await page.getByRole("link", { name: "Completed" }).click();
    await expect(page.getByTestId("todo-item")).toHaveCount(1);
  });

  test("should allow me to display all items", async ({ page }) => {
    await page.getByTestId("todo-item").nth(1).getByRole("checkbox").check();
    await checkNumberOfCompletedTodosInLocalStorage(page, 1);
    await page.getByRole("link", { name: "Active" }).click();
    await page.getByRole("link", { name: "Completed" }).click();
    await page.getByRole("link", { name: "All" }).click();
    await expect(page.getByTestId("todo-item")).toHaveCount(3);
  });

  test("should highlight the currently applied filter", async ({ page }) => {
    await expect(page.getByRole("link", { name: "All" })).toHaveClass(
      "selected"
    );

    //create locators for active and completed links
    const activeLink = page.getByRole("link", { name: "Active" });
    const completedLink = page.getByRole("link", { name: "Completed" });
    await activeLink.click();

    // Page change - active items.
    await expect(activeLink).toHaveClass("selected");
    await completedLink.click();

    // Page change - completed items.
    await expect(completedLink).toHaveClass("selected");
  });
});

// Common function
async function createDefaultTodos(page: Page) {
  // create a new todo locator
  const newTodo = page.getByPlaceholder("What needs to be done?");

  for (const item of TODO_ITEMS) {
    await newTodo.fill(item);
    await newTodo.press("Enter");
  }
}

async function checkNumberOfTodosInLocalStorage(page: Page, expected: number) {
  return await page.waitForFunction((e) => {
    return JSON.parse(localStorage["react-todos"]).length === e;
  }, expected);
}

async function checkNumberOfCompletedTodosInLocalStorage(
  page: Page,
  expected: number
) {
  return await page.waitForFunction((e) => {
    return (
      JSON.parse(localStorage["react-todos"]).filter(
        (todo: any) => todo.completed
      ).length === e
    );
  }, expected);
}

async function checkTodosInLocalStorage(page: Page, title: string) {
  return await page.waitForFunction((t) => {
    return JSON.parse(localStorage["react-todos"])
      .map((todo: any) => todo.title)
      .includes(t);
  }, title);
}
