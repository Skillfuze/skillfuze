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
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_BLOGS_CLIENT: process.env.NEXT_PUBLIC_BLOGS_CLIENT,
    NEXT_PUBLIC_RTMP_SERVER_URL: process.env.NEXT_PUBLIC_RTMP_SERVER_URL,
    NEXT_PUBLIC_STREAMING_SERVER_URL: process.env.NEXT_PUBLIC_STREAMING_SERVER_URL
  },
  assetPrefix: isProd ? 'https://static.skillfuze.com' : '',
  generateBuildId: () => {
    return pkg.version;
  },
};
