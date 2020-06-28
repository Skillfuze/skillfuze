import React from 'react';
import Layout from '../../../components/Layout';
import withAuth from '../../../utils/withAuth';
import VideoData from '../../../components/VideoData';

const NewVideo = () => {
  return (
    <Layout title="New Video">
      <VideoData />
    </Layout>
  );
};

export default withAuth({ redirectOnAuthFailure: '/login' })(NewVideo);
