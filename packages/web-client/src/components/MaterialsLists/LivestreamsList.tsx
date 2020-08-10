import React from 'react';
import { Livestream } from '@skillfuze/types';
import { ContentCard, VideosTopBar } from '@skillfuze/ui-components';
import { useRouter } from 'next/router';

interface Props {
  livestreams: Livestream[];
  emptyLabel?: string;
}

const LivestreamsList: React.FC<Props> = (props: Props) => {
  const router = useRouter();
  return (
    <>
      {props.livestreams.length > 0 ? (
        <div className="grid grid-flow-row md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 py-4">
          {props.livestreams.map((livestream) => (
            <ContentCard
              key={livestream.id}
              className=""
              thumbnail={livestream.thumbnailURL}
              category={livestream.category.name}
              title={livestream.title}
              userName={`${livestream.streamer.firstName} ${livestream.streamer.lastName}`}
              userAvatar={livestream.streamer.avatarURL}
              createdAt={livestream.createdAt}
              // TODO: views
              topBar={<VideosTopBar isLive views={0} />}
              onClick={() => {
                router.push(`/livestreams/[livestreamId]`, `/livestreams/${livestream.id}`);
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

LivestreamsList.defaultProps = {
  emptyLabel: 'No items here, try again later.',
};
export default LivestreamsList;
