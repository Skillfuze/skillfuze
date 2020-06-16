/* eslint-disable */
module.exports = {
  plugins: [
    require('tailwindcss')('./tailwind.config.js'),
    require('autoprefixer'),
    require('@fullhuman/postcss-purgecss')({
      content: ['./src/components/**/*.tsx', './src/components/**/*.md', 'node_modules/react-multi-carousel/**/*.js']
    })
  ]
}