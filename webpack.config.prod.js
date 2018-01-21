const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: {
    app: "./src/client/scripts/app.js"
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name]-min.js",
    publicPath: "/"
  },
  devtool: "eval-source-map",
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
        // Extract styles out into an external stylesheet (defined in plugin
        // section of webpack.config.[dev|prod].js). It runs through these
        // loaders first -- in reverse array order (starting with
        // webpack.loader.global, which adds a few global SASS imports, then
        // sass-loader, etc).
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: "css-loader",
              query: {
                url: false
              }
            },
            "postcss-loader",
            "sass-loader"
          ]
        })
      }
    ]
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new ExtractTextPlugin("[name]-min.css"),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        dead_code: true
      },
      comments: false
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.ejs",
      hash: true
    })
  ],
  resolve: {
    modules: [path.resolve("./src/"), "node_modules"],
    extensions: [".js", ".css", ".scss"]
  }
};
