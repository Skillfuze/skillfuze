import React from 'react';
import { User } from '@skillfuze/types';
import InDevelopment from '../components/InDevelopment';
import Layout from '../components/Layout';
import withAuth from '../utils/withAuth';

const Home = ({ user }: { user: User | undefined }): JSX.Element => {
  return (
    <Layout title="Home" user={user}>
      <InDevelopment />
    </Layout>
  );
};

export default withAuth({})(Home);
