const extractValuesForKey = require("./task3");

it("returns map with one instance in the main level ", () => {
  const expected = new Map();
  expected.set("", 1);
  expect(
    extractValuesForKey({ uuid: 1, innerOne: { someKey: "some text" } }, "uuid")
  ).toEqual(expected);
});

it("returns map with one instance in the main level and 2 in the second one ", () => {
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

it("returns map with one instance in the main level,  2 in the second one and 1 on the third one ", () => {
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

it("returns map with one instance in the main level, 2 in the second one and 1 on the third one, including the object name when given ", () => {
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
