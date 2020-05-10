const config = {
  blogsClientUrl: process.env.NEXT_PUBLIC_BLOGS_CLIENT_URL || 'http://localhost:3002',
  streamingServerURL: process.env.NEXT_PUBLIC_STREAMING_SERVER_URL || 'http://localhost:3002',
};
export default config;
