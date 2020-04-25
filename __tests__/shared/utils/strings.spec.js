import { cssToJs, kebabToCamel } from "shared/utils/strings";

describe("string utilities", () => {
  describe("kebabToCamel", () => {
    it("should convert kebab string to camel", () => {
      expect(kebabToCamel("hello-you")).toEqual("helloYou");
    });

    it("should convert kebab string to camel with a starting dash", () => {
      expect(kebabToCamel("-hello-You")).toEqual("helloYou");
    });

    it("should convert kebab string to camel with leading and trailing spaces", () => {
      expect(kebabToCamel("  hello-You ")).toEqual("helloYou");
    });

    it("should convert kebab string to camel with duplicate dashes", () => {
      expect(kebabToCamel("Hello--you-hI")).toEqual("helloYouHi");
    });

    it("should convert kebab string to camel with dashes and underscore", () => {
      expect(kebabToCamel("hello-_You")).toEqual("helloYou");
    });

    it("should convert kebab string to camel with dashes and underscores and spaces", () => {
      expect(kebabToCamel("_hello-_       You")).toEqual("helloYou");
    });

    it("should convert kebab string to camel with trailing dash", () => {
      expect(kebabToCamel("hello-")).toEqual("hello");
    });
  });

  describe("cssToJS", () => {
    const css = `
      position: absolute;
      color:#888; box-shadow: 0 0 1px 1px (0, 0, 0, 0.2);
      background-color: blue;
    `;

    const js = {
      color: "#888",
      backgroundColor: "blue",
      position: "absolute",
      boxShadow: "0 0 1px 1px (0, 0, 0, 0.2)"
    };

    it("should convert a CSS string to a JS object", () => {
      expect(cssToJs(css)).toEqual(js);
    });
  });
});
