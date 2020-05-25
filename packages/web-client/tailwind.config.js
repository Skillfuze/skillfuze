/* eslint-disable */
const theme = require('@skillfuze/ui-components/tailwind.config').theme;

module.exports = {
  important: true,
  purge: [
    './pages/**/*.tsx',
    './components/**/*.tsx'
  ],
  theme,
  plugins: [
    require('tailwind-css-variables')(),
  ]
}
