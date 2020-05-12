const config = {
  blogsClientUrl: process.env.BLOGS_CLIENT_URL || 'http://localhost:3002',
  streamingServerURL: process.env.RTMP_SERVER_URL || 'rtmp://localhost:1935/live',
  httpStreamingServerURL: process.env.STREAMING_SERVER_URL || 'http://localhost:8080/live',
};
export default config;
