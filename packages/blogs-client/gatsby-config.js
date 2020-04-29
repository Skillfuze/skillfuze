module.exports = {
  plugins: [`gatsby-plugin-typescript`, `gatsby-plugin-postcss`, {
    resolve: "gatsby-plugin-react-svg",
    options: {
      rule: {
        include: /assets/
      }
    }
  }],
}
