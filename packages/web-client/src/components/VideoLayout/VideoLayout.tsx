import React from 'react';
import moment from 'moment';
import { Avatar, Button, TagsView } from '@skillfuze/ui-components';

import { User } from '@skillfuze/types';
import VideoPlayer from '../VideoPlayer';
import More from '../../../assets/icons/More.svg';
import WatchingNow from './WatchingNow';
import LiveChat from './LiveChat';

interface Props {
  isLive: boolean;
  user: any;
  video: any;
  url: string;
  videoType: string;
  viewer?: User;
}

const VideoLayout: React.FC<Props> = ({ isLive, user, video, url, videoType, viewer }: Props) => {
  const onClickMore = () => {
    console.log('More');
  };

  return (
    <div className="container flex flex-grow mx-auto flex-col max-w-screen-xl p-2 pb-4 space-y-4">
      <VideoPlayer url={url} videoType={videoType} />
      <div className="flex lg:flex-no-wrap flex-wrap-reverse lg:space-x-4 lg:space-y-0 space-y-reverse space-y-4">
        <div className="space-y-4 flex-grow">
          <h1 className="sub-container text-lg font-semibold">{video.title}</h1>
          <p className={isLive ? 'text-warning text-sm' : 'text-grey-dark text-sm'}>
            {isLive ? <WatchingNow /> : moment(video.createdAt).format('MMM D, YYYY')}
          </p>
          <hr className="text-grey" />

          <div className="sub-container flex items-center space-x-3">
            {/* TODO */}
            <Avatar URL={undefined} alt="Profile Picture" />
            <p className="font-semibold flex-grow text-sm">{`${user.firstName} ${user.lastName}`}</p>
            <Button size="small" variant="outlined">
              Follow
            </Button>
            <More className="cursor-pointer" onClick={onClickMore} />
          </div>

          <div className="ml-12 pl-3 space-y-4">
            <h2 className="text-grey-dark text-sm leading-normal">{video.description}</h2>
            <TagsView className="text-sm" tags={video.tags} />
          </div>
        </div>
        {isLive && <LiveChat user={viewer} />}
      </div>

      <style jsx>
        {`
          .sub-container {
            margin-bottom: -0.6rem !important;
          }
        `}
      </style>
    </div>
  );
};
export default VideoLayout;
