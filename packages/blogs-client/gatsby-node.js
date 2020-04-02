exports.createPages = async ({ actions: { createPage } }) => {   
    const blogs = [
        {
        id: 1,
        title : "Build-a-React-Component-Library-with-Ant-Design-and-Styleguidist",
        desc: "Learn-how-to-build-a-React-Component-Library-from-zero-to-hero ",
        content: "<strong>ABCCCCC</strong> this should be strong.",
        thumbnailURL: "https://timelinecovers.pro/facebook-cover/download/life-cycle-facebook-cover.jpg",
        createdAt: "2020-03-29T23:17:12.328Z",
        updatedAt: "Mar-1-2016-4-min-read",
        publishedAt: "Mar-1-2016-4-min-read",
        author: {name: "Kimo Rano", avatar: "https://www.w3schools.com/w3images/avatar2.png"}
    },
    {
        id: 2,
        title : "This is Title to show how long title will appear This is Title to show how long title will appear This is Title to show how long title will appear",
        desc: "this is description bae this is description bae this is description bae this is description bae this is description bae this is description bae this is description bae",
        content:
        "<!DOCTYPE html><html><body><h1>My First Heading</h1><br><p>My first paragraph.</p> </body></html>",
        thumbnailURL: "https://homepages.cae.wisc.edu/~ece533/images/airplane.png",
        createdAt: "2020-03-29T23:17:12.328Z",
        updatedAt: "2020-03-29T23:17:12.328Z",
        publishedAt: "2020-03-29T23:17:12.328Z",
        author: {name: "Mariam Kamel", avatar: "https://www.w3schools.com/w3images/avatar4.png"}
    }
];
    blogs.forEach(blog => 
    createPage({
      path: `/${blog.id}`,
      component: require.resolve("./src/templates/displayPage/index.tsx"),
      context: { blog },
    })
    );
  }