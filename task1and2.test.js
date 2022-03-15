const { expect, beforeEach, afterAll } = require("@jest/globals");
const sum = require("./task1and2");

const printFunction = (result) => {
  console.log("->", result);
};

beforeEach(() => {
  console.log = jest.fn(); // create a new mock function for each test
});

afterAll(() => {
  console.log = console.log; // restore original console.log after all tests
});

it("returns ->, 0 when called with only printFunction ", () => {
  sum(printFunction);
  expect(console.log).toHaveBeenCalledWith("->", 0);
});

it("returns ->, 1 when called with only 1 and printFunction ", () => {
  sum(1)(printFunction);
  expect(console.log).toHaveBeenCalledWith("->", 1);
});

it("returns  ->, 3 when called with 1, 2 and printFunction ", () => {
  sum(1)(2)(printFunction);
  expect(console.log).toHaveBeenCalledWith("->", 3);
});

it("returns ->, 7 when called with 1, 2, 4 and printFunction ", () => {
  sum(1)(2)(4)(printFunction);
  expect(console.log).toHaveBeenCalledWith("->", 7);
});

it("returns ->, 21 when called with a large set of numbers and printFunction ", () => {
  sum(1)(2)(3)(4)(5)(6)(printFunction);
  expect(console.log).toHaveBeenCalledWith("->", 21);
});

it("returns ->, 145 when called with a larger set of numbers and printFunction ", () => {
  sum(1)(2)(4)(9)(8)(12)(45)(8)(7)(4)(2)(5)(6)(7)(8)(3)(2)(1)(5)(6)(
    printFunction
  );
  expect(console.log).toHaveBeenCalledWith("->", 145);
});
