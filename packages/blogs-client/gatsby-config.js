module.exports = {
  plugins: [`gatsby-plugin-typescript`, `gatsby-plugin-postcss`, `gatsby-plugin-react-helmet`, {
    resolve: `gatsby-plugin-purgecss`,
    options: {
      printRejected: false,
      tailwind: true,
      develop: false,
      content: ['./src/**/*.tsx', 'node_modules/@skillfuze/ui-components/**/*.tsx'],
      ignore: ['openSans.css', 'typography.css']
    }
  }, {
    resolve: "gatsby-plugin-react-svg",
    options: {
      rule: {
        include: /assets/
      }
    }
  }],
}
