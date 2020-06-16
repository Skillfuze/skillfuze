/* eslint-disable */
const theme = require('@skillfuze/ui-components/tailwind.config').theme;

module.exports = {
  important: true,
  theme,
  plugins: [
    require('tailwind-css-variables')(),
  ]
}
