/* eslint-disable */
const glob = require("glob");
const path = require("path");
const fs = require("fs");

module.exports = {
  components: () => {
    return glob.sync("src/**/*.tsx").filter(file => {
      if (file.match(/connect.tsx$/)) {
        return true
      }

      const pathObject = path.parse(file);
      pathObject.ext = `.connect${pathObject.ext}`
      const { root, dir, ext, name } = pathObject;
      return !fs.existsSync(path.format({ root, dir, ext, name }));
    });
  },
  propsParser: require("react-docgen-typescript").withCustomConfig('./tsconfig.json').parse,
  webpackConfig: {
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          loader: "ts-loader"
        }
      ]
    }
  }
};
