/* eslint-disable */
const glob = require("glob");
const path = require("path");
const fs = require("fs");

module.exports = {
  require: [
    './src/assets/css/tailwind.css',
    './src/assets/css/styleguidist.css'
  ],
  template: {
    head: {
      links: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css?family=Open+Sans:300,400,700,800&display=swap'
        }
      ]
    }
  },
  theme: {
    fontFamily: {
      base: '"Open Sans"'
    }
  },
  components: () => {
    return glob.sync("src/components/**/*.tsx").filter(file => {
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
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'postcss-loader']
        }
      ]
    }
  }
};
