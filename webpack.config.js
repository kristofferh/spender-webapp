const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  entry: {
    app: "./src/client/scripts/app.js"
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js"
  },
  devtool: "eval-source-map",
  devServer: {
    contentBase: "./dist",
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /(node_modules)/,
        use: "babel-loader"
      },
      {
        test: /\.(css|scss)$/,
        exclude: /(node_modules)/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            query: {
              url: false
            }
          },
          "postcss-loader",
          "sass-loader"
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.ejs"
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    modules: [path.resolve("./src/client/scripts/"), "node_modules"],
    extensions: [".js", ".css", ".scss"]
  }
};
