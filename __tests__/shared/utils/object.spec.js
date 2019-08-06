import { omit } from "shared/utils/object";

describe("object utility methods", () => {
  describe("omit", () => {
    const testObject = {
      val: "Cool",
      name: "Brill Murray",
      age: 34,
      another: "yeah"
    };

    const testObject2 = {
      greeting: "hello"
    };

    const emptyObj = {};

    it("returns the original object", () => {
      expect(omit(testObject)).toEqual(testObject);
    });

    it("returns an object with name omitted", () => {
      expect(omit(testObject, "name")).toEqual({
        val: "Cool",
        another: "yeah",
        age: 34
      });
    });

    it("returns an object with name and age omitted", () => {
      expect(omit(testObject, "name", "age")).toEqual({
        val: "Cool",
        another: "yeah"
      });
    });

    it("returns an object with age omitted with an parameter that does not exist in the object", () => {
      expect(omit(testObject, "name", "color")).toEqual({
        val: "Cool",
        another: "yeah",
        age: 34
      });
    });

    it("returns an empty object when the only key is omitted", () => {
      expect(omit(testObject2, "greeting")).toEqual(emptyObj);
    });

    it("returns an empty object, from an empty object", () => {
      expect(omit(emptyObj, "boo")).toEqual(emptyObj);
    });
  });
});
