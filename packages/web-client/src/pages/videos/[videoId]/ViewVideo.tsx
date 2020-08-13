import React, { useEffect } from 'react';
import { Video, User } from '@skillfuze/types';

import { useRouter } from 'next/router';
import mixpanel from 'mixpanel-browser';
import Layout from '../../../components/Layout';
import VideoLayout from '../../../components/VideoLayout';
import { VideosService } from '../../../services/videos.service';
import withAuth from '../../../utils/withAuth';
import { mixpanelEvents } from '../../../../config/mixpanel.events';

interface Props {
  video: Video;
  user: User;
}

const ViewVideo = ({ video, user }: Props) => {
  const router = useRouter();
  const onDelete = async () => {
    await VideosService.delete(video.id);
    router.push(`/`);
  };

  useEffect(() => {
    mixpanel.identify(user?.id || 'GUEST');
    mixpanel.track(mixpanelEvents.VIEW_VIDEO);

    async function addView() {
      await VideosService.addView(video.id);
    }
    addView();
  }, []);

  return (
    <Layout title={video.title} user={user}>
      <VideoLayout
        isLive={false}
        user={video.uploader}
        content={video}
        url={video.url}
        videoType="video/mp4"
        onDelete={onDelete}
      />
    </Layout>
  );
};

ViewVideo.getInitialProps = async (ctx) => {
  const video = await VideosService.getOne(ctx.query.videoId.toString());
  return { video };
};

export default withAuth({})(ViewVideo);
