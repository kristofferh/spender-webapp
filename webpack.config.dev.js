const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const base = require("./webpack.config.base");

module.exports = env => {
  let baseParams = base(env);
  let plugins = baseParams.plugins.concat([
    new webpack.DefinePlugin({
      API_URL: JSON.stringify("http://localhost:3000"),
      SESSION_COOKIE: JSON.stringify("spender-session"),
      SECURE_COOKIE: false,
      S3_BUCKET: JSON.stringify("spender-api"),
      CLOUDFRONT_URL: JSON.stringify("https://d3hlgnxjqn5bbq.cloudfront.net")
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.ejs"
    })
  ]);
  return Object.assign({}, baseParams, {
    plugins,
    mode: "development",
    devtool: "eval-source-map",
    devServer: {
      contentBase: "./dist/public",
      hot: true,
      historyApiFallback: true
    }
  });
};
