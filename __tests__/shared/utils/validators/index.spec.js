import { required, number } from "shared/utils/validators";

describe("validation functions", () => {
  describe("required", () => {
    it("should return error on string with only spaces", () => {
      expect(required(" ")).toBeDefined();
    });

    it("should succeed on non-empty string", () => {
      expect(required(" hi ")).toBeUndefined();
    });

    it("should return error on empty array", () => {
      expect(required([])).toBeDefined();
    });

    it("should succeed on non-empty array", () => {
      expect(required(["hi", "brill murray"])).toBeUndefined();
    });

    it("should return error on empty object", () => {
      expect(required({})).toBeDefined();
    });

    it("should succeed on non-empty object", () => {
      expect(required({ Bill: "Murray" })).toBeUndefined();
    });

    it("should return error on null object", () => {
      const obj = null;
      expect(required(obj)).toBeDefined();
    });

    it("should succeed on other non-primitives: function", () => {
      expect(required(() => {})).toBeUndefined();
    });

    it("should succeed on other non-primitives: number", () => {
      expect(required(0)).toBeUndefined();
    });

    it("should succeed on other non-primitives: number", () => {
      expect(required(11)).toBeUndefined();
    });

    it("should succeed on other non-primitives: boolean", () => {
      expect(required(true)).toBeUndefined();
    });

    it("should return error message on false", () => {
      expect(required(false)).toBeDefined();
    });
  });

  describe("number", () => {
    it("should return error on non-numeric string", () => {
      expect(number("not a number")).toBeDefined();
    });

    it("should succeed on number-like string", () => {
      expect(number("1")).toBeUndefined();
    });

    it("should succeed on number", () => {
      expect(number(1)).toBeUndefined();
    });

    it("should succeed on negative number", () => {
      expect(number(-1)).toBeUndefined();
    });
  });
});
