import React, { useEffect } from 'react';
import { User } from '@skillfuze/types';
import mixpanel from 'mixpanel-browser';
import Layout from '../../../components/Layout';
import withAuth from '../../../utils/withAuth';
import VideoData from '../../../components/VideoData';
import { mixpanelEvents } from '../../../../config/mixpanel.events';

const NewVideo = ({ user }: { user: User }) => {
  useEffect(() => {
    mixpanel.identify(user?.id || 'GUEST');
    mixpanel.track(mixpanelEvents.NEW_VIDEO);
  }, []);

  return (
    <Layout title="New Video" user={user}>
      <VideoData />
    </Layout>
  );
};

export default withAuth({ redirectOnAuthFailure: '/login' })(NewVideo);
