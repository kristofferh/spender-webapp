// Group together array of objects by a given property.
// For example:
//  [
//    { date: "08/17/2018", amount: 10 },
//    { date: "08/17/2018", amount: 11 },
//    { date: "08/16/2018", amount: 100 }
//  ];
// Should return:
//  {
//    "08/17/2018": [
//      { date: "08/17/2018", amount: 10 },
//      { date: "08/17/2018", amount: 11 }
//    ],
//    "08/16/2018": [{ date: "08/16/2018", amount: 100 }]
//  };
export const groupBy = (values, property) => {
  return values.reduce((aggregate, current) => {
    if (aggregate[current[property]]) {
      aggregate[current[property]] = aggregate[current[property]].concat(
        current
      );
    } else {
      aggregate[current[property]] = [current];
    }
    return aggregate;
  }, {});
};
