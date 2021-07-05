const path = require("path");

module.exports = [
  // main process
  function (env, argv) {
    return {
      entry: "./src/index.ts",
      mode: env.production ? "production" : "development",
      devtool: false, // env.production ? "source-map" : "eval",
      output: {
        path: path.resolve(__dirname, "js"),
        filename: "index.js",
      },
      resolve: {
        extensions: [".tsx", ".ts", ".js"],
        fallback: { path: false },
      },
      target: "electron-main",
    };
  },
  // main preload process
  function (env, argv) {
    return {
      entry: "./src/preload.ts",
      mode: env.production ? "production" : "development",
      devtool: false, // env.production ? "source-map" : "eval",
      output: {
        path: path.resolve(__dirname, "js"),
        filename: "preload.js",
      },
      resolve: {
        extensions: [".tsx", ".ts", ".js"],
        fallback: { path: false },
      },
    };
  },
  // renderer process
  function (env, argv) {
    return {
      entry: "./src/renderer.ts",
      mode: env.production ? "production" : "development",
      devtool: false, // env.production ? "source-map" : "eval",
      output: {
        path: path.resolve(__dirname, "js"),
        filename: "renderer.js",
      },
      resolve: {
        extensions: [".tsx", ".ts", ".js"],
      },
    };
  },
];
