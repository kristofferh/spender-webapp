const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const base = require("./webpack.config.base");

module.exports = env => {
  let baseParams = base(env);
  let plugins = baseParams.plugins.concat([
    new webpack.DefinePlugin({
      API_URL: JSON.stringify("https://spender-dev.herokuapp.com"),
      SESSION_COOKIE: JSON.stringify("spender-session"),
      SECURE_COOKIE: false,
      S3_BUCKET: JSON.stringify("spender-api"),
      CLOUDFRONT_URL: JSON.stringify("https://d3hlgnxjqn5bbq.cloudfront.net")
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.ejs",
      minify: true
    })
  ]);
  return Object.assign({}, baseParams, {
    plugins,
    devtool: "source-map",
    mode: "production"
  });
};
