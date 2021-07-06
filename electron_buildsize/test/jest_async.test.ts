/**
 * https://jestjs.io/ja/docs/asynchronous
 */

const fetchMessage = "peanut butter";

/**
 * callback function に fetchMessage を渡して実行する非同期関数
 * @param params callback function (string) 呼び出される callback関数
 */
async function fetchWithParam(params: Function): Promise<void> {
  await params(fetchMessage);
}

/**
 * callback function に fetchMessage を渡して実行する非同期関数
 */
async function fetchPromise(): Promise<string> {
  return new Promise((resolve) => {
    resolve(fetchMessage);
  });
}

/**
 * 非同期中に失敗する
 */
async function fetchPromiseError(): Promise<string> {
  return new Promise((_, reject) => {
    reject("error");
  });
}

test("callback: the data is peanut butter", (done) => {
  function callback(data: string) {
    try {
      expect(data).toBe("peanut butter");
      done();
    } catch (error) {
      done(error);
    }
  }

  fetchWithParam(callback);
});

test("promise: the data is peanut butter", () => {
  return fetchPromise().then((data) => {
    expect(data).toBe("peanut butter");
  });
});

test("await: the data is peanut butter", async () => {
  const data = await fetchPromise();
  expect(data).toBe("peanut butter");
});

test("await .resolves: the data is peanut butter", async () => {
  await expect(fetchPromise()).resolves.toBe("peanut butter");
});

test("await .rejects: the fetch fails with an error", async () => {
  await expect(fetchPromiseError()).rejects.toMatch("error");
});
