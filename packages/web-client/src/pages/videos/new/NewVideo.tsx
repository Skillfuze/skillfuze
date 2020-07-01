import React from 'react';
import { User } from '@skillfuze/types';
import Layout from '../../../components/Layout';
import withAuth from '../../../utils/withAuth';
import VideoData from '../../../components/VideoData';

const NewVideo = ({ user }: { user: User }) => {
  return (
    <Layout title="New Video" user={user}>
      <VideoData />
    </Layout>
  );
};

export default withAuth({ redirectOnAuthFailure: '/login' })(NewVideo);
