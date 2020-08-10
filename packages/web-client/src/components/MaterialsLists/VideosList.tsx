import React from 'react';
import { Video } from '@skillfuze/types';
import { ContentCard, VideosTopBar } from '@skillfuze/ui-components';
import { useRouter } from 'next/router';

interface Props {
  videos: Video[];
  emptyLabel?: string;
}

const VideosList: React.FC<Props> = (props: Props) => {
  const router = useRouter();
  return (
    <>
      {props.videos.length > 0 ? (
        <div className="grid grid-flow-row md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 py-4">
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
        </div>
      ) : (
        <p className="pt-6 text-center text-sm">{props.emptyLabel}</p>
      )}
    </>
  );
};

VideosList.defaultProps = {
  emptyLabel: 'No items here, try again later.',
};
export default VideosList;
