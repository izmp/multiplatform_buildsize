const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = [
  // main process
  function (env, argv) {
    return {
      entry: "./src/index.ts",
      mode: env.production ? "production" : "development",
      devtool: "source-map", // env.production ? "source-map" : "source-map",
      output: {
        path: path.resolve(__dirname, "js"),
        filename: "index.js",
      },
      resolve: {
        extensions: [".tsx", ".ts", ".js"],
        fallback: { path: false },
      },
      target: "electron-main",
      module: {
        rules: [{ test: /\.ts$/, use: "ts-loader" }],
      },
      optimization: {
        minimize: env.production,
        minimizer: [
          new TerserPlugin({
            terserOptions: {
              format: {
                comments: false,
              },
            },
          }),
        ],
      },
    };
  },
  // main preload process
  function (env, argv) {
    return {
      entry: "./src/preload.ts",
      mode: env.production ? "production" : "development",
      devtool: "source-map", // env.production ? "source-map" : "eval",
      output: {
        path: path.resolve(__dirname, "js"),
        filename: "preload.js",
      },
      resolve: {
        extensions: [".tsx", ".ts", ".js"],
        fallback: { path: false },
      },
      module: {
        rules: [{ test: /\.ts$/, use: "ts-loader" }],
      },
      target: "electron-main",
      optimization: {
        minimize: env.production,
        minimizer: [
          new TerserPlugin({
            terserOptions: {
              format: {
                comments: false,
              },
            },
          }),
        ],
      },
    };
  },
  // renderer process
  function (env, argv) {
    return {
      entry: "./src/renderer.ts",
      mode: env.production ? "production" : "development",
      devtool: "source-map", // env.production ? "source-map" : "eval",
      output: {
        path: path.resolve(__dirname, "js"),
        filename: "renderer.js",
      },
      resolve: {
        extensions: [".tsx", ".ts", ".js"],
      },
      module: {
        rules: [{ test: /\.ts$/, use: "ts-loader" }],
      },
      target: "electron-main",
      optimization: {
        minimize: env.production,
        minimizer: [
          new TerserPlugin({
            terserOptions: {
              format: {
                comments: false,
              },
            },
          }),
        ],
      },
    };
  },
];
