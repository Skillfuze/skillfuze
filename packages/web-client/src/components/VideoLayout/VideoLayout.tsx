/* eslint-disable no-restricted-globals */
import React from 'react';
import moment from 'moment';
import { Avatar, Button, TagsView, MoreActions } from '@skillfuze/ui-components';
import { useRouter } from 'next/router';
import { DiscussionEmbed } from 'disqus-react';

import { User, Video, Livestream } from '@skillfuze/types';
import VideoPlayer from '../VideoPlayer';
import WatchingNow from './WatchingNow';
import LiveChat from './LiveChat';

interface Props {
  isLive: boolean;
  user: User;
  content: Video | Livestream;
  url: string;
  videoType: string;
  viewer?: User;
  onDelete: any;
}

const VideoLayout: React.FC<Props> = ({ isLive, user, content, url, videoType, viewer, onDelete }: Props) => {
  const router = useRouter();
  const pageURL = typeof window === 'object' ? window.location.href : undefined;

  const onEdit = () => {
    if (isLive) {
      router.push(`/livestreams/edit/${content.id}`);
    } else {
      router.push(`/videos/edit/${content.id}`);
    }
  };

  return (
    <div className="container flex flex-grow mx-auto flex-col max-w-screen-xl p-2 pb-4 space-y-4">
      <VideoPlayer thumbnail={content.thumbnailURL} url={url} videoType={videoType} />
      <div className="flex lg:flex-no-wrap flex-wrap-reverse lg:space-x-4 lg:space-y-0 space-y-reverse space-y-4">
        <div className="space-y-4 flex-grow">
          <h1 className="sub-container text-lg font-semibold">{content.title}</h1>
          <p className={isLive ? 'text-warning text-sm' : 'text-grey-dark text-sm'}>
            {isLive ? <WatchingNow /> : moment(content.createdAt).format('MMM D, YYYY')}
          </p>
          <hr className="text-grey" />
          <div className="sub-container flex items-center space-x-3">
            <Avatar URL={user.avatarURL} alt="Profile Picture" />
            <p className="font-semibold flex-grow text-sm">{`${user.firstName} ${user.lastName}`}</p>
            <Button size="small" variant="outlined">
              Follow
            </Button>
            <MoreActions URL={pageURL} enableControls onEdit={onEdit} onDelete={onDelete} />
          </div>
          <div className="ml-12 pl-3 space-y-4">
            <h2 className="text-grey-dark text-sm leading-normal">{content.description}</h2>
            <TagsView className="text-sm" tags={content.tags} />
          </div>
        </div>
        {isLive && <LiveChat user={viewer} />}
      </div>
      {!isLive && (
        <div className="my-10">
          <DiscussionEmbed
            shortname="skillfuze"
            config={{
              url,
              identifier: content.id,
              title: content.title,
            }}
          />
        </div>
      )}

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
