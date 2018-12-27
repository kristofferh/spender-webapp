import { cssToJs, kebabToCamel } from "shared/utils/strings";

describe("string utilities", () => {
  describe("kebabToCamel", () => {
    it("should convert a CSS string to a JS object", () => {
      expect(kebabToCamel("hello-You")).toEqual("helloYou");
    });
  });

  describe("cssToJS", () => {
    const css = `
    position: absolute;
    color: #888;
    background-color: blue
  `;

    const js = {
      color: "#888",
      backgroundColor: "blue",
      position: "absolute"
    };

    it("should convert a CSS string to a JS object", () => {
      expect(cssToJs(css)).toEqual(js);
    });
  });
});
