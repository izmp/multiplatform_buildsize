// declare global の為に必要
export {};

window.addEventListener("DOMContentLoaded", () => {
  // const replaceText = (selector: any, text: any) => {
  //   const element = document.getElementById(selector);
  //   if (element) element.innerText = text;
  // };

  for (const dependency of ["chrome", "node", "electron"]) {
    repText(`${dependency}-version`, process.versions[dependency]);
  }
});

/**
 *
 * @param selector とりあえず明示的にany
 * @param text とりあえず明示的にany
 */
function repText(selector: any, text: any) {
  let element = document.getElementById(selector);
  if (element) element.innerText = text;
}

// window.electronRequire を使用するのに定義が必要
declare global {
  interface Window {
    electronRequire: any;
  }
}

// spectronでテストする時に ElectronAPI を使用する場合に必要
// テストの時のみ使用するコードなので、production 用のコードでは含まれないようにする
// webpack の TerserPlugin により production ではない時は minimize される
if (process.env.NODE_ENV !== "production") {
  window.electronRequire = require;
}
