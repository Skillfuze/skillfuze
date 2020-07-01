import React from 'react';
import { Livestream } from '@skillfuze/types';
import Layout from '../../../../components/Layout';
import withAuth from '../../../../utils/withAuth';
import LivestreamData from '../../../../components/LivestreamData';
import { LivestreamService } from '../../../../services/livestreams.service';

interface Props {
  stream: Livestream;
}

const EditLivestream = ({ stream }: Props) => {
  return (
    <Layout title="Edit Livestream">
      <LivestreamData livestream={stream} />
    </Layout>
  );
};
EditLivestream.getInitialProps = async (ctx) => {
  const stream = await LivestreamService.getOne(ctx.query.livestreamId.toString());
  return { stream };
};
export default withAuth({ redirectOnAuthFailure: '/login' })(EditLivestream);
