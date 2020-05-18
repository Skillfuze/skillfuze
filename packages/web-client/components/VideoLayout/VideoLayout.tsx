import React from 'react';
import moment from 'moment';
import { Avatar, Button, TagsView } from '@skillfuze/ui-components';
import VideoPlayer from '../VideoPlayer';
import More from '../../assets/icons/More.svg';

interface Props {
  isLive: boolean;
  user: any;
  video: any;
  url: string;
  videoType: string;
}

const VideoLayout: React.FC<Props> = ({ isLive, user, video, url, videoType }: Props) => {
  const onClickMore = () => {
    console.log('More');
  };

  return (
    <div className="container flex flex-grow mx-auto flex-col max-w-screen-lg p-2 pb-4 space-y-4">
      <VideoPlayer url={url} videoType={videoType} />
      <h1 className="test text-lg font-semibold">{video.title}</h1>
      <p className={isLive ? 'text-warning text-sm' : 'text-grey-dark text-sm'}>
        {isLive ? 'LIVE' : moment(video.createdAt).format('MMM D, YYYY')}
      </p>
      <hr className="text-grey" />

      <div className="test flex items-center space-x-3">
        {/* TODO */}
        <Avatar URL={undefined} alt="Profile Picture" />
        <p className="font-semibold flex-grow text-sm">{`${user.firstName} ${user.lastName}`}</p>
        <Button size="small" variant="outlined">
          Follow
        </Button>
        <More className="cursor-pointer" onClick={onClickMore} />
      </div>

      <div className="ml-12 pl-3 space-y-4">
        <h2 className="text-grey-dark text-sm">{video.description}</h2>
        <TagsView className="text-sm" tags={video.tags} />
      </div>

      <style jsx>
        {`
          .test {
            margin-bottom: -0.6rem !important;
          }
        `}
      </style>
    </div>
  );
};
export default VideoLayout;
