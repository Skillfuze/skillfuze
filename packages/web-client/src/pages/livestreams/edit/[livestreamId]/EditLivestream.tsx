import React, { useEffect } from 'react';
import { Livestream, UserTokenPayload } from '@skillfuze/types';
import mixpanel from 'mixpanel-browser';
import Layout from '../../../../components/Layout';
import withAuth from '../../../../utils/withAuth';
import LivestreamData from '../../../../components/LivestreamData';
import { LivestreamService } from '../../../../services/livestreams.service';
import { mixpanelEvents } from '../../../../../config/mixpanel.events';

interface Props {
  stream: Livestream;
  user?: UserTokenPayload;
}

const EditLivestream = ({ user, stream }: Props) => {
  useEffect(() => {
    mixpanel.identify(user.id || 'GUEST');
    mixpanel.track(mixpanelEvents.EDIT_LIVESTREAM);
  }, []);

  return (
    <Layout title="Edit Livestream" user={user}>
      <LivestreamData livestream={stream} />
    </Layout>
  );
};
EditLivestream.getInitialProps = async (ctx) => {
  const stream = await LivestreamService.getOne(ctx.query.livestreamId.toString());
  return { stream };
};
export default withAuth({ redirectOnAuthFailure: '/login' })(EditLivestream);
