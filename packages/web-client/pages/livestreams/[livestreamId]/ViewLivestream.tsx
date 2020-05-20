import React from 'react';
import { Avatar, Button, TagsView } from '@skillfuze/ui-components';
import { ILivestream } from '@skillfuze/types';

import Layout from '../../../components/Layout';
import LivestreamService from '../../../services/livestreams.service';
import More from '../../../assets/icons/More.svg';
import VideoPlayer from '../../../components/VideoPlayer';

interface Props {
  stream: ILivestream;
}

const ViewLivestream = ({ stream }: Props) => {
  const onClickMore = () => {
    console.log('More');
  };
  return (
    <Layout title={stream.title}>
      <div className="flex flex-col flex-grow items-center px-10">
        <div className="flex flex-grow text-center w-5/6 mt-3">
          <VideoPlayer stream={stream} />
        </div>

        <h1 className="flex text-left w-5/6 mt-4">{stream.title}</h1>
        <p className="text-left text-warning w-5/6 mt-2 ml-2">Live Now</p>
        <hr className="flex w-5/6 mt-6 text-grey" />

        <div className=" text-center bg-gray w-5/6 p-1">
          <div className="flex flex-row h-16 items-center ">
            <Avatar URL={/* TODO: Add Streamer Avatar  */ undefined} alt="streamer photo" />
            <div className="ml-4 flex-col flex-auto">
              <div className="flex flex-row items-center">
                <div className="flex flex-row flex-grow">
                  <p className="self-center inline-block font-bold">{`${stream.streamer.firstName} ${stream.streamer.lastName}`}</p>
                </div>
                <Button className="m-4" size="small" variant="outlined">
                  Follow
                </Button>
                <More onClick={onClickMore} style={{ cursor: 'pointer' }} />
              </div>
            </div>
          </div>

          <h5 className="flex text-left w-3/5 ml-16 text-grey-dark">{stream.description}</h5>
          <div className="flex text-left w-3/5 mt-4 ml-16">
            <TagsView tags={stream.tags} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

ViewLivestream.getInitialProps = async ctx => {
  const livestreamService = new LivestreamService();
  const stream = await livestreamService.getOne(ctx.query.livestreamId.toString());
  return { stream };
};

export default ViewLivestream;
