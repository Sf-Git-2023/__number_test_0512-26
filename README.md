# 猜數字遊戲 (Number Guessing Game)

這是一個使用 Vite、React、TypeScript 和 Tailwind CSS 建立的互動式猜數字遊戲。玩家需要在 1 到 100 之間猜出系統隨機產生的數字。

## 功能特點
- 互動式 UI（使用 Framer Motion 動畫）
- 即時反饋
- 紀錄嘗試次數
- 響應式設計

## 如何在本機運行

**先決條件：** Node.js

1.  **安裝依賴項目：**
    ```bash
    npm install
    ```

2.  **設定環境變數：**
    複製 `.env.example` 並更名為 `.env.local`：
    ```bash
    cp .env.example .env.local
    ```
    然後在 `.env.local` 中填入你的 `GEMINI_API_KEY`（如果未來需要使用 AI 功能）。

3.  **啟動開發伺服器：**
    ```bash
    npm run dev
    ```

4.  **建置專案：**
    ```bash
    npm run build
    ```

## 授權
Apache-2.0
