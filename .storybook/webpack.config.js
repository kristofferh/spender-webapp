const path = require("path");

module.exports = ({ config }) => {
  config.resolve.modules = [
    ...(config.resolve.modules || []),
    path.resolve("./src")
  ];
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    exclude: /(node_modules)/,
    use: "babel-loader"
  });
  config.resolve.extensions.push(".ts", ".tsx");
  return config;
};
