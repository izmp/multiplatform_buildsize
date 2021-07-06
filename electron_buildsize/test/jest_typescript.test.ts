import { exception } from "console";

function sum(a: number, b: number) {
  return a + b;
}

test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});

test("bool test", () => {
  const flagTrue = true;
  const flagFalse = false;

  expect(flagTrue).toBeTruthy();
  expect(flagFalse).toBeFalsy();
});

test("number bool test", () => {
  const zero = 0;

  expect(zero).toBeFalsy();
  expect(zero).not.toBeTruthy();
});

test("string regular expression", () => {
  const foo = "foo";

  expect(foo).toMatch(/fo/);
  expect(foo).not.toMatch(/bar/);
});

test("list contains", () => {
  const list = [1, 2, 3, 4, 5];
  expect(list).toContain(3);
  expect(list).not.toContain(6);
});

test("throw exception", () => {
  expect(() => {
    throw new Error("foo");
  }).toThrow();
  expect(() => {
    throw new Error("foo");
  }).toThrow(Error);

  // message
  expect(() => {
    throw new Error("foo");
  }).toThrow("foo");
  expect(() => {
    throw new Error("foo");
  }).toThrow(/fo/);
});
