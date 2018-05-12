const base = require("./webpack.config.base");

module.exports = () => {
  return Object.assign({}, base, {
    devtool: "source-map",
    mode: "production"
  });
};
