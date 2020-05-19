const config = {
  apiURL: process.env.REACT_APP_API_URL || 'http://localhost:3000',
  blogsClientUrl: process.env.BLOGS_CLIENT_URL || 'http://localhost:3002',
  streamingServerURL: process.env.RTMP_SERVER_URL || 'rtmp://localhost:1935/live',
  httpStreamingServerURL: process.env.STREAMING_SERVER_URL || 'http://localhost:8080',
  s3Bucket: 'https://skillfuze-s3.s3.me-south-1.amazonaws.com',
};
export default config;
