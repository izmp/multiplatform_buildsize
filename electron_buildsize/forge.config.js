const path = require("path");
const fs = require("fs");

const projectrootdir = path.resolve();

module.exports = {
  packagerConfig: {
    ignore: [
      ".vscode",
      "src",
      "README.md",
      "tsconfig.json",
      "webpack.config.js",
      ".eslintrc.json",
      ".gitignore",
      ".prettierrc",
      "node_modules",
      "forge.config.js",
      //"package.json",
      "app",
    ],
  },
  makers: [
    {
      name: "@electron-forge/maker-squirrel",
      config: {
        name: "electron_buildsize",
      },
    },
    {
      name: "@electron-forge/maker-zip",
      platforms: ["darwin"],
    },
    {
      name: "@electron-forge/maker-deb",
      config: {},
    },
    {
      name: "@electron-forge/maker-rpm",
      config: {},
    },
  ],
};
