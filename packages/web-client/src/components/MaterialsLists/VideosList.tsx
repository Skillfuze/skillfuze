import React from 'react';
import { Video } from '@skillfuze/types';
import { ContentCard, VideosTopBar } from '@skillfuze/ui-components';
import { useRouter } from 'next/router';

interface Props {
  videos: Video[];
}

const VideosList: React.FC<Props> = (props: Props) => {
  const router = useRouter();
  return (
    <>
      {props.videos.map((video) => (
        <ContentCard
          key={video.id}
          className=""
          thumbnail={video.thumbnailURL}
          category={video.category.name}
          title={video.title}
          userName={`${video.uploader.firstName} ${video.uploader.lastName}`}
          userAvatar={video.uploader.avatarURL}
          createdAt={video.createdAt}
          // TODO: Video.views
          topBar={<VideosTopBar isLive={false} views={102} />}
          onClick={() => {
            router.push(`/videos/[videoId]`, `/videos/${video.id}`);
          }}
        />
      ))}
    </>
  );
};

export default VideosList;
