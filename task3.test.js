const extractValuesForKey = require("./task3");

it("works for the main level of depth", () => {
  const expected = new Map();
  expected.set("", 1);
  expect(
    extractValuesForKey({ uuid: 1, innerOne: { someKey: "some text" } }, "uuid")
  ).toEqual(expected);
});

it("works for 1 level of depth ", () => {
  const expected = new Map();
  expected.set("", 1);
  expected.set("innerOne", 2);
  expected.set("innerTwo", 3);
  expect(
    extractValuesForKey(
      {
        uuid: 1,
        innerOne: { someKey: "some text", uuid: 2 },
        innerTwo: { someKey: "some value", uuid: 3 },
      },
      "uuid"
    )
  ).toEqual(expected);
});

it("works for 2 levels of depth ", () => {
  const expected = new Map();
  expected.set("", 1);
  expected.set("innerOne", 2);
  expected.set("innerTwo", 3);
  expected.set("innerThree/anotherKey", 4);
  expect(
    extractValuesForKey(
      {
        uuid: 1,
        innerOne: { someKey: "some text", uuid: 2 },
        innerTwo: { someKey: "some value", uuid: 3 },
        innerThree: { someKey: "some value", anotherKey: { uuid: 4 } },
      },
      "uuid"
    )
  ).toEqual(expected);
});

it("works for 3 levels of depth, and adds the object name if passed", () => {
  const expected = new Map();
  expected.set("newObject", 1);
  expected.set("newObject/innerOne", 2);
  expected.set("newObject/innerTwo", 3);
  expected.set("newObject/innerThree/anotherKey", 4);
  const newObject = {
    uuid: 1,
    innerOne: { someKey: "some text", uuid: 2 },
    innerTwo: { someKey: "some value", uuid: 3 },
    innerThree: { someKey: "some value", anotherKey: { uuid: 4 } },
  };
  expect(extractValuesForKey({ newObject }, "uuid")).toEqual(expected);
});

it("works for when searchKey value is an object", () => {
  const expected = new Map();
  expected.set("newObject", 1);
  expected.set("newObject/innerOne", 2);
  expected.set("newObject/innerTwo", 3);
  expected.set("newObject/innerThree/anotherKey", 4);
  expected.set("newObject/innerFour", { hola: 63, uuid: 98 });
  expected.set("newObject/innerFour/uuid", 98);
  const newObject = {
    uuid: 1,
    innerOne: { someKey: "some text", uuid: 2 },
    innerTwo: { someKey: "some value", uuid: 3 },
    innerThree: { someKey: "some value", anotherKey: { uuid: 4 } },
    innerFour: { uuid: { hola: 63, uuid: 98 } },
  };
  expect(extractValuesForKey({ newObject }, "uuid")).toEqual(expected);
});
