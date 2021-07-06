/**
 * https://jestjs.io/ja/docs/mock-functions
 */

/**
 *
 * @param items
 * @param callback
 */
function forEach(items: Array<number>, callback: any) {
  for (let index = 0; index < items.length; index++) {
    callback(items[index]);
  }
}

test("mock test", () => {
  // モックの作成
  const mockCallback = jest.fn((x) => 42 + x);

  // モックを渡して関数の実行
  forEach([0, 1], mockCallback);

  // 以下実行結果に対して確認する。
  // 実行結果は mockObject.mock に含まれる

  // The mock function is called twice
  expect(mockCallback.mock.calls.length).toBe(2);

  // The first argument of the first call to the function was 0
  expect(mockCallback.mock.calls[0][0]).toBe(0);

  // The first argument of the second call to the function was 1
  expect(mockCallback.mock.calls[1][0]).toBe(1);

  // The return value of the first call to the function was 42
  expect(mockCallback.mock.results[0].value).toBe(42);
});
