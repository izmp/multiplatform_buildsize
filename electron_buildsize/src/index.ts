// fix: ブロック スコープの変数 'BrowserWindow' を再宣言することはできません。ts(2451)
export {};

const { app, BrowserWindow } = require("electron");
const path = require("path");

const startPageHtml = "index.html";

/**
 * ウィンドウ生成
 */
function createWindow() {
  const win = new BrowserWindow({
    width: 640,
    height: 320,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      //nodeIntegration: true, // process.env.NODE_ENV === "test",
    },
  });

  win.loadFile(startPageHtml);

  // デバッグ用chrome developer tool
  // win.webContents.openDevTools();
}

// 準備ができたらウィンドウ生成
app.whenReady().then(() => {
  createWindow();
});

// すべてのウィンドウが閉じられた時に終了
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

// これがあると npm start で実行した時に、一度終了してももう一度実行されてしまう。
// TODO: macOSの時のapp.whenReady() について要検証
// Open a window if none are open (macOS)
// app.whenReady().then(() => {
//   createWindow();

//   app.on("activate", function () {
//     if (BrowserWindow.getAllWindows().length === 0) createWindow();
//   });
// });
