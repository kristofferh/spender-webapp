import { groupBy } from "shared/utils/arrays";

describe("array utilities", () => {
  describe("groupby", () => {
    const input = [
      { date: "08/17/2018", amount: 10 },
      { date: "08/17/2018", amount: 11 },
      { date: "08/16/2018", amount: 100 }
    ];

    const output = {
      "08/17/2018": [
        { date: "08/17/2018", amount: 10 },
        { date: "08/17/2018", amount: 11 }
      ],
      "08/16/2018": [{ date: "08/16/2018", amount: 100 }]
    };

    it("should group an array by date", () => {
      expect(groupBy(input, "date")).toEqual(output);
    });
  });
});
