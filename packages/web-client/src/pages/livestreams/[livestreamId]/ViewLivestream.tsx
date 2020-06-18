import React from 'react';
import { Livestream } from '@skillfuze/types';

import Layout from '../../../components/Layout';
import LivestreamService from '../../../services/livestreams.service';
import VideoLayout from '../../../components/VideoLayout';
import config from '../../../../config';

interface Props {
  stream: Livestream;
}

const ViewLivestream = ({ stream }: Props) => {
  return (
    <Layout title={stream.title}>
      <VideoLayout
        isLive
        user={stream.streamer}
        video={stream}
        url={`${config.httpStreamingServerURL}/live/${stream.streamKey}/playlist.m3u8`}
        videoType="application/x-mpegURL"
      />
    </Layout>
  );
};

ViewLivestream.getInitialProps = async (ctx) => {
  const livestreamService = new LivestreamService();
  const stream = await livestreamService.getOne(ctx.query.livestreamId.toString());
  return { stream };
};

export default ViewLivestream;
