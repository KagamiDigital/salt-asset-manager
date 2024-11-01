const path = require('path');
const webpack = require('webpack');
module.exports = {
    target:"node",
  entry: './src/index.ts',
  mode:"production",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.wasm$/,
        type: 'webassembly/async',
      },
    ],
  },
  optimization: {minimize: false},
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.wasm'],
    fallback: {
        "path": require.resolve("path-browserify"),
        "crypto": require.resolve("crypto-browserify"),
        "stream": require.resolve("stream-browserify"),
        "buffer": require.resolve("buffer-browserify"),
        "os": require.resolve("os-browserify/browser"),
        "vm": require.resolve("vm-browserify"),
        "assert": require.resolve("assert-browserify"),
    }
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  experiments: {
    asyncWebAssembly: true,
  },
  externals: {
    bufferutil: "bufferutil",
    "utf-8-validate": "utf-8-validate",
  },
  plugins: [
    new webpack.ProvidePlugin({
      TextDecoder: ['util', 'TextDecoder'],
      TextEncoder: ['util', 'TextEncoder'],
    }),
  ],
};