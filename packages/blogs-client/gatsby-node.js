// eslint-disable-next-line @typescript-eslint/no-var-requires
const axios = require('axios');

exports.createPages = async ({ actions: { createPage } }) => {   
   const {data: {data: blogs} }  = await axios.get('http://localhost:3000/api/v1/blogs');
    blogs.forEach(blog => 
    createPage({
      path: `/${blog.id}`,
      component: require.resolve("./src/templates/displayPage/index.tsx"),
      context: { blog },
    })
    );
  }