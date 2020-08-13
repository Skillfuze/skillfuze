import React, { useEffect } from 'react';
import { User } from '@skillfuze/types';
import mixpanel from 'mixpanel-browser';
import withAuth from '../../../utils/withAuth/withAuth';
import Layout from '../../../components/Layout';
import LivestreamData from '../../../components/LivestreamData';
import { mixpanelEvents } from '../../../../config/mixpanel.events';

const CreateLiveStream = ({ user }: { user: User }) => {
  useEffect(() => {
    mixpanel.identify(user?.id || 'GUEST');
    mixpanel.track(mixpanelEvents.NEW_LIVESTREAM);
  }, []);

  return (
    <Layout title="New Livestream" user={user}>
      <LivestreamData />
    </Layout>
  );
};

export default withAuth({
  redirectOnAuthFailure: '/login',
})(CreateLiveStream);
