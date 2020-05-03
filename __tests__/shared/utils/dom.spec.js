import { getVisibleFit } from "shared/utils/dom";

describe("dom utilities", () => {
  describe("getVisibleFit", () => {
    it("calculates full visibility when content is fully enclosed by container", () => {
      const content = { top: 25, right: 50, bottom: 50, left: 25 };
      const container = { top: 0, right: 500, bottom: 500, left: 0 };
      expect(getVisibleFit(content, container)).toBe(1);
    });

    it("calculates full visibility when container is the same size", () => {
      const content = { top: 25, right: 50, bottom: 50, left: 25 };
      const container = { top: 25, right: 50, bottom: 50, left: 25 };
      expect(getVisibleFit(content, container)).toBe(1);
    });

    it("calculates partial visibility when content overflows out of container", () => {
      const content = { top: -5, right: 5, bottom: 5, left: -5 };
      const container = { top: 0, right: 10, bottom: 10, left: 0 };
      expect(getVisibleFit(content, container)).toBe(0.25);
    });

    it("calculates zero visibility when content is not in the container", () => {
      const content = { top: -10, right: -5, bottom: -5, left: -10 };
      const container = { top: 0, right: 10, bottom: 10, left: 0 };
      expect(getVisibleFit(content, container)).toBe(0);
    });
  });
});
