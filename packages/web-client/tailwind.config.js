/* eslint-disable */
module.exports = {
  important: true,
  theme: {
    colors: {
      primary: {
        default: '#2e49e5',
        light: '#3251ff',
        dark: '#1e285d'
      },
      secondary: {
        default: '#66cacc',
        light: '#72e3e5',
        dark: '#59b1b2'
      },
      warning: {
        default: '#cc3d3d',
        light: '#E54444',
        dark: '#B23535'
      },
      white: '#fdfffc',
      black: {
        default: '#191919',
        light: '#191919',
      },
      grey: {
        default: '#bfbfbf',
        dark: '#707070',
      },
    },
  },
  plugins: [
    require('tailwind-css-variables')(),
  ]
}
