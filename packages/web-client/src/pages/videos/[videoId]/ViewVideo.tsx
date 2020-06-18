import React from 'react';
import { Video } from '@skillfuze/types';

import Layout from '../../../components/Layout';
import VideoLayout from '../../../components/VideoLayout';
import { VideosService } from '../../../services/videos.service';

interface Props {
  video: Video;
}

const ViewVideo = ({ video }: Props) => {
  return (
    <Layout>
      <VideoLayout isLive={false} user={video.uploader} video={video} url={video.url} videoType="video/mp4" />
    </Layout>
  );
};

ViewVideo.getInitialProps = async (ctx) => {
  const video = await VideosService.getOne(ctx.query.videoId.toString());
  return { video };
};

export default ViewVideo;
