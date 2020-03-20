/* eslint-disable @typescript-eslint/explicit-function-return-type */
module.exports = {
    webpack(config) {
      config.module.rules.push({
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      });
  
      return config;
    }
  };