import React from 'react';
import { Livestream, User } from '@skillfuze/types';
import { SocketIOProvider } from '@khaled-hamam/use-socketio';

import Layout from '../../../components/Layout';
import LivestreamService from '../../../services/livestreams.service';
import VideoLayout from '../../../components/VideoLayout';
import config from '../../../../config';
import withAuth from '../../../utils/withAuth';

interface Props {
  stream: Livestream;
  user?: User;
}

const ViewLivestream = ({ stream, user }: Props) => {
  return (
    <SocketIOProvider
      url={`${config.apiURL}/livestreams`}
      opts={{ query: { streamId: stream.id }, transports: ['websocket'], rememberUpgrade: true }}
    >
      <Layout title={stream.title}>
        <VideoLayout
          isLive
          user={stream.streamer}
          video={stream}
          url={`${config.httpStreamingServerURL}/live/${stream.streamKey}/playlist.m3u8`}
          videoType="application/x-mpegURL"
          viewer={user}
        />
      </Layout>
    </SocketIOProvider>
  );
};

ViewLivestream.getInitialProps = async ctx => {
  const livestreamService = new LivestreamService();
  const stream = await livestreamService.getOne(ctx.query.livestreamId.toString());
  return { stream };
};

export default withAuth({})(ViewLivestream);
