/* eslint-disable */
const theme = require('@skillfuze/ui-components/tailwind.config').theme;

module.exports = {
  important: true,
  purge: [
    './src/pages/**/*.tsx',
    './src/components/**/*.tsx'
  ],
  theme,
  plugins: [
    require('tailwind-css-variables')(),
  ]
}
