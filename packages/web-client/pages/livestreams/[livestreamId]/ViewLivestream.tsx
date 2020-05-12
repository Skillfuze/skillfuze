import React from 'react';
import { Avatar, Button, TagsView } from '@skillfuze/ui-components';
import { ILivestream } from '@skillfuze/types';

import Layout from '../../../components/Layout';
import LivestreamService from '../../../services/livestreams.service';
import More from '../../../assets/icons/More.svg';

interface Props {
  stream: ILivestream;
}

const ViewLivestream = ({ stream }: Props) => {
  const onClickMore = () => {
    console.log('More');
  };
  return (
    <Layout>
      <div className="flex flex-col flex-grow h-screen items-center">
        {/* video player */}
        <div className="flex flex-grow text-center h-64 w-5/6 bg-black" />

        <h1 className="flex text-left w-5/6 mt-4">{stream.title}</h1>
        <p className="text-left  text-warning w-5/6 mt-2 ml-2">Live Now</p>
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

          <h4 className="flex text-left w-3/5  ml-16 text-grey-dark">{stream.description}</h4>
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
