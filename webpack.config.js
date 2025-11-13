const path = require("path");
const webpack = require("webpack");
module.exports = {
  target: "node",
  entry: "./src/index.ts",
  mode: "production",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.wasm$/,
        type: "webassembly/async",
      },
      {
        test: /\.m?js$/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
    ],
  },
  optimization: { minimize: false },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json", ".mjs"],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  experiments: {
    asyncWebAssembly: true,
  },
  externals: {},
  plugins: [
    new webpack.ProvidePlugin({
      TextDecoder: ["util", "TextDecoder"],
      TextEncoder: ["util", "TextEncoder"],
    }),
  ],
};
