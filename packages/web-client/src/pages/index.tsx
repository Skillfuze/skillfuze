import React from 'react';
import InDevelopment from '../components/InDevelopment';
import Layout from '../components/Layout';

const Home = (): JSX.Element => {
  return (
    <Layout title="Home">
      <InDevelopment />
    </Layout>
  );
};

export default Home;
