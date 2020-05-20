module.exports = {
  plugins: [`gatsby-plugin-typescript`, `gatsby-plugin-postcss`, `gatsby-plugin-react-helmet`, {
    resolve: "gatsby-plugin-react-svg",
    options: {
      rule: {
        include: /assets/
      }
    }
  }],
}
