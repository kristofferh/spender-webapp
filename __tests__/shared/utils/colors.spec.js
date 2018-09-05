import { hexToRGBA } from "shared/utils/colors";

describe("color functions", () => {
  describe("hexToRGBA", () => {
    it("should throw on empty input", () => {
      expect(hexToRGBA).toThrow("Not a valid hex color");
    });

    it("should throw on invalid input", () => {
      expect(() => hexToRGBA("#GOB")).toThrow("Not a valid hex color");
    });

    it("should return an RGB string from a hex value", () => {
      expect(hexToRGBA("#111111")).toEqual("rgb(17, 17, 17)");
    });

    it("should return an RGBA string from a hex value", () => {
      expect(hexToRGBA("#111111", 0.2)).toEqual("rgba(17, 17, 17, 0.2)");
    });

    it("should return an RGB string from a short hex color", () => {
      expect(hexToRGBA("#111")).toEqual("rgb(17, 17, 17)");
    });

    it("should return an RGBA string from a short hex color", () => {
      expect(hexToRGBA("#ef3", 0.2)).toEqual("rgba(238, 255, 51, 0.2)");
    });
  });
});
