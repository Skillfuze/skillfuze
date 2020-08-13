/* eslint-disable @typescript-eslint/no-var-requires */
const axios = require('axios');
const config = require('./config');

exports.createPages = async ({ actions: { createPage } }) => {
  const {data: {data: blogs} }  = await axios.get(`${config.API_URL}/api/v1/blogs`);
  blogs.forEach(blog => 
    createPage({
      path: `/${blog.url}`,
      component: require.resolve("./src/templates/displayPage/index.tsx"),
      context: { blog },
    })
  );
}