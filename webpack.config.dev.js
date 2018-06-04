const webpack = require("webpack");

const base = require("./webpack.config.base");

module.exports = env => {
  let plugins = base.plugins;
  if (env && env.analyze) {
    const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
      .BundleAnalyzerPlugin;
    plugins.unshift(new BundleAnalyzerPlugin());
  }
  plugins.unshift(new webpack.DefinePlugin({
    API_URL: JSON.stringify("http://localhost:3000"),
    SESSION_COOKIE: JSON.stringify("spender-session"),
    SECURE_COOKIE: false
  }))
  return Object.assign({}, base, {
    plugins,
    mode: "development",
    devtool: "eval-source-map",
    devServer: {
      contentBase: "./dist",
      hot: true,
      historyApiFallback: true
    }
  });
};
