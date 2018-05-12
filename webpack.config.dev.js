const base = require("./webpack.config.base");

module.exports = env => {
  let plugins = base.plugins;
  if (env && env.analyze) {
    const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
      .BundleAnalyzerPlugin;
    plugins.unshift(new BundleAnalyzerPlugin());
  }
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
