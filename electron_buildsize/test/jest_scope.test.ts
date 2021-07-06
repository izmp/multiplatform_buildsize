beforeEach(() => {
  console.log("beforeEach:");
});

beforeAll(() => {
  console.log("beforeAll");
});

afterEach(() => {
  console.log("afterEach");
});

afterAll(() => {
  console.log("afterAll");
});

test("root scope test", () => {
  console.log("root scope test");
});

describe("sub scope", () => {
  beforeEach(() => {
    console.log("subscope.beforeEach:");
  });

  beforeAll(() => {
    console.log("subscope.beforeAll");
  });

  afterEach(() => {
    console.log("subscope.afterEach");
  });

  afterAll(() => {
    console.log("subscope.afterAll");
  });

  test("sub scope test", () => {
    console.log("sub scope test");
  });
});
