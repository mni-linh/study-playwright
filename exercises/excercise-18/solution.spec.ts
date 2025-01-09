/* PLAYWRIGHT */
import { test, expect } from "@playwright/test";
import WebSocket from "ws";

test("WebSocket test: send and receive message", async () => {
  // Kết nối đến WebSocket
  const ws = new WebSocket("wss://echo.websocket.org");

  // Lắng nghe khi WebSocket mở kết nối
  ws.on("open", () => {
    console.log("WebSocket connection opened");
    // Gửi tin nhắn "hello"
    ws.send("hello");
  });

  // Lắng nghe sự kiện nhận tin nhắn
  ws.on("message", (data) => {
    console.log("Message received:", data.toString());
    // Xác nhận rằng tin nhắn nhận được là "hello"
    expect(data.toString()).toBe("hello");

    // Đóng WebSocket
    ws.close();
  });

  // Lắng nghe khi WebSocket đóng kết nối
  ws.on("close", () => {
    console.log("WebSocket connection closed");
  });
});
