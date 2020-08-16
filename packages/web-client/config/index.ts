const config = {
  apiURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  blogsClientUrl: process.env.NEXT_PUBLIC_BLOGS_CLIENT || 'http://localhost:8000',
  streamingServerURL: process.env.NEXT_PUBLIC_RTMP_SERVER_URL || 'rtmp://localhost:1935/live',
  httpStreamingServerURL: process.env.NEXT_PUBLIC_STREAMING_SERVER_URL || 'http://localhost:8080',
  s3Bucket: 'https://skillfuze-s3.s3.me-south-1.amazonaws.com',
  googleClientId:
    process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ||
    '623669060817-hi9sdj0ugvo5je38pfivq9pqht0kk12v.apps.googleusercontent.com',
};

export default config;
