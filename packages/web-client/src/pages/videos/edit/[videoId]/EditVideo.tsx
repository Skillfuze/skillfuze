import React from 'react';
import { Video } from '@skillfuze/types';
import Layout from '../../../../components/Layout';
import withAuth from '../../../../utils/withAuth';
import VideoData from '../../../../components/VideoData';
import { VideosService } from '../../../../services/videos.service';

interface Props {
  video: Video;
}

const EditVideo = ({ video }: Props) => {
  return (
    <Layout title="Edit Video">
      <VideoData video={video} />
    </Layout>
  );
};
EditVideo.getInitialProps = async ctx => {
  const video = await VideosService.getOne(ctx.query.videoId.toString());
  return { video };
};
export default withAuth({ redirectOnAuthFailure: '/login' })(EditVideo);
