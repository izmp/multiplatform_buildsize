import path from "path";
// spectronが見つからなかったので、 tsconfig.json "moduleResolution": "node", を追加
import { Application } from "spectron";

// import では electronPath を取得する方法がわからない。 require で electron/index.js を取得すると出来る。
const electronPath = require("electron/index.js");

/**
 * app.client.waitUntilWindowLoaded() で起こる例外を回避するために、
 * 例外を出している部分を類似コードに書き換えた関数
 *
 * app.webContents.isLoading() と app.client.isLoading() が同じ挙動をすると仮定した場合のコード。
 * 要確認
 * @param app
 * @param timeout
 * @returns
 */
function isSpectronWindowLoaded(
  app: Application,
  timeout: WebdriverIO.WaitUntilOptions | undefined = undefined
) {
  return app.client
    .waitUntil(function () {
      // app.webContents.isLoading() -> app.client.isLoading()
      return app.client.isLoading().then(function (loading) {
        return !loading;
      });
    }, timeout)
    .then(
      function () {},
      function (error) {
        error.message = "waitUntilWindowLoaded " + error.message;
        throw error;
      }
    );
}

describe("application launch", () => {
  jest.setTimeout(60000);

  // this.app は出来ないのでこのブロックで変数を定義
  let app: Application | undefined;

  console.log(path.resolve("./"));
  console.log(path.resolve("./js/"));

  beforeEach(() => {
    if (!app) {
      app = new Application({
        path: electronPath,
        // args は、package.json のパスと、main process/preload process/renderer process のスクリプトがあるパスを指定する
        args: [path.join(__dirname, "../"), path.join(__dirname, "../js/")],
        // require window を spectron に公開する方法で ElectronAPI へアクセスする場合
        //requireName: "electronRequire",
      });
    }

    return app.start();
  }, 30000); // beforeEach の timeout 時間を多めに取る。デフォルトだとtimeoutになる。

  afterEach(async () => {
    console.log("afterEach");
    if (app && app.isRunning()) {
      console.log("close");
      // app.stop() を使うと、複数のtestがある場合に afterEachの後に RequestError: read ECONNRESET 例外を出す。
      // app.client.closeWindow() ならば出ない。
      await app.client.closeWindow();

      // 念の為に解放する
      app = undefined;
    }
  }, 30000);

  // test("shows an initial window", () => {
  //   expect(app).not.toBeUndefined();
  //   expect(app?.client).not.toBeUndefined();

  //   return app?.client.getWindowCount().then((count) => {
  //     expect(count).toBe(1);
  //     // openDevTools() が実行されている場合は 2 になる。
  //     // win.webContents.openDevTools();
  //     // expect(count).toBe(2);
  //   });
  // });

  test("app.client test", async () => {
    // index.html上でjavascriptを実行し、その結果を得る
    let num = await app?.client.execute("return 1+1");
    expect(num).toBe(2);

    // index.html に含まれる要素の id を指定して表示されているかどうかを調べる
    let displayed = await app?.client.isElementDisplayed("chrome-version");
    expect(displayed).toBeTruthy();

    // isElementDisplayed() が bool以外を帰す場合。
    // 存在しない id に対して実行すると、オブジェクトが帰ってくる。
    // {error: string, }
    // typescript 的には boolean | undefined を想定しているので、any で受け取るしか無い。
    let errordisplayed: any = await app?.client.isElementDisplayed(
      "not_exists_id"
    );
    expect(errordisplayed.error).toMatch(/no such element/);
  });

  // TODO: app.client.waitUntilWindowLoaded() を正しく動作させる方法を調べる。
  // 正しく動作させられないので skip する
  it.skip("app.client.waitUntilWindowLoaded() test", () => {
    // nodeIntegration: false (default) の場合、例外を出す
    // nodeIntegration: true の場合は動作する？
    // https://qiita.com/nomuyoshi/items/9091abd9dc3b05c85f44
    // if (app) {
    //   return isSpectronWindowLoaded(app);
    // }
    // return app?.client.waitUntilWindowLoaded();
    // return app?.client.waitUntilWindowLoaded().catch((e: Error) => {
    //   console.log(e.message);
    //   expect(e.message).toMatch(
    //     /waitUntilWindowLoaded Cannot read property 'isLoading' of undefined/
    //   );
    // });
    // try {
    //
    //   return app.client.waitUntilWindowLoaded();
    // } catch (e) {
    //   return Promise.reject(e);
    // }
    //   .catch((e) => {
    //     console.log(e);
    //     return Promise.reject(e);
    //   })
    //   .then(() => {
    //     expect(app.browserWindow.isMinimized).toBeFalsy();
    //     // expect(app.browserWindow.isVisible).toBeTruthy();
    //     // expect(app.browserWindow.isFocused).toBeTruthy();
    //     // expect(app.browserWindow.getBounds()).toHaveProperty("height");
    //     // expect(app.browserWindow.getBounds().height).toBeGreaterThan(0);
    //     // expect(app.browserWindow.getBounds()).toHaveProperty("width");
    //     // expect(app.browserWindow.getBounds().width).toBeGreaterThan(0);
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //     return Promise.reject(e);
    //   });
  });
});
