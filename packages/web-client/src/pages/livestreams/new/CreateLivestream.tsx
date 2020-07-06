import React from 'react';
import { User } from '@skillfuze/types';
import withAuth from '../../../utils/withAuth/withAuth';
import Layout from '../../../components/Layout';
import LivestreamData from '../../../components/LivestreamData';

const CreateLiveStream = ({ user }: { user: User }) => {
  return (
    <Layout title="New Livestream" user={user}>
      <LivestreamData />
    </Layout>
  );
};

export default withAuth({
  redirectOnAuthFailure: '/login',
})(CreateLiveStream);
