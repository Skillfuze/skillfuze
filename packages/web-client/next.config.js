/* eslint-disable */
const pkg = require('./package.json');
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  assetPrefix: isProd ? 'https://static.skillfuze.com' : '',
  generateBuildId: () => {
    return pkg.version;
  },
};
