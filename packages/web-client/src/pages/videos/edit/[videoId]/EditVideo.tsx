import React, { useEffect } from 'react';
import { Video, UserTokenPayload } from '@skillfuze/types';
import mixpanel from 'mixpanel-browser';
import Layout from '../../../../components/Layout';
import withAuth from '../../../../utils/withAuth';
import VideoData from '../../../../components/VideoData';
import { VideosService } from '../../../../services/videos.service';
import { mixpanelEvents } from '../../../../../config/mixpanel.events';

interface Props {
  video: Video;
  user?: UserTokenPayload;
}

const EditVideo = ({ user, video }: Props) => {
  useEffect(() => {
    mixpanel.identify(user?.id || 'GUEST');
    mixpanel.track(mixpanelEvents.EDIT_VIDEO);
  }, []);

  return (
    <Layout title="Edit Video" user={user}>
      <VideoData video={video} />
    </Layout>
  );
};
EditVideo.getInitialProps = async (ctx) => {
  const video = await VideosService.getOne(ctx.query.videoId.toString());
  return { video };
};
export default withAuth({ redirectOnAuthFailure: '/login' })(EditVideo);
