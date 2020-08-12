import React, { useEffect } from 'react';
import { User } from '@skillfuze/types';
import mixpanel from 'mixpanel-browser';
import EditorLayout from '../../../components/BlogsEditor/Layout';
import NoSSR from '../../../components/NoSSR';
import withAuth from '../../../utils/withAuth';
import { mixpanelEvents } from '../../../../config/mixpanel.events';

const NewBlog = ({ user }: { user: User }) => {
  useEffect(() => {
    mixpanel.identify(user.id || 'GUEST');
    mixpanel.track(mixpanelEvents.NEW_BLOG);
  }, []);

  return (
    <NoSSR>
      <EditorLayout user={user} />
    </NoSSR>
  );
};

export default withAuth({
  redirectOnAuthFailure: '/login',
})(NewBlog);
