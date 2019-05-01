const webpack = require("webpack");
const path = require("path");

let base = {
  entry: {
    app: ["./src/client/scripts/app.js"]
  },
  output: {
    path: path.resolve(__dirname, "dist/public"),
    filename: "[name].[hash].js",
    chunkFilename: "[name].[chunkhash].js",
    publicPath: "/"
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          name: "vendor",
          chunks: "initial",
          enforce: true
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /(node_modules)/,
        use: "babel-loader"
      },
      {
        test: /\.(css|scss)$/,
        exclude: /(node_modules)/,
        use: [
          "style-loader",
          "css-loader",
          "postcss-loader",
          "sass-loader",
          "./webpack.loader.global"
        ]
      },
      {
        test: /\.(woff(2)?|ttf|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]"
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // Only load English locale for moment.js.
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en/),
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    modules: [path.resolve("./src/"), "node_modules"],
    extensions: [".ts", ".tsx", ".js", ".css", ".scss"]
  }
};

module.exports = env => {
  let plugins = base.plugins;
  if (env && env.analyze) {
    const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
      .BundleAnalyzerPlugin;
    plugins.unshift(new BundleAnalyzerPlugin());
  }
  return Object.assign({}, base, {
    plugins
  });
};
