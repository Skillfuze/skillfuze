import React from 'react';
import { Video, User } from '@skillfuze/types';

import { useRouter } from 'next/router';
import Layout from '../../../components/Layout';
import VideoLayout from '../../../components/VideoLayout';
import { VideosService } from '../../../services/videos.service';
import withAuth from '../../../utils/withAuth';

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
