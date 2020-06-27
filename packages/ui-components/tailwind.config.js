/* eslint-disable */
module.exports = {
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
      success: {
        default: '#3bb54a',
      },
      warning: {
        default: '#cc3d3d',
        light: '#E54444',
        dark: '#B23535'
      },
      white: '#fdfffc',
      black: {
        default: '#191919',
        light: '#1c1c1c',
      },
      grey: {
        default: '#bfbfbf',
        light: '#e2e2e2',
        dark: '#707070',
      }
    },
  },
  plugins: [
    require('tailwind-css-variables')(),
  ]
}
