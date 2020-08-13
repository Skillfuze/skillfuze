import React, { useState, useEffect } from 'react';
import { PaginatedResponse, Video, UserTokenPayload } from '@skillfuze/types';
import { Button, Loading } from '@skillfuze/ui-components';
import Layout from '../../components/Layout';
import { VideosList } from '../../components/MaterialsLists';
import { VideosService } from '../../services/videos.service';
import withAuth from '../../utils/withAuth';

interface Props {
  initialVideos: PaginatedResponse<Video>;
  user?: UserTokenPayload;
}
const VideosPage = ({ initialVideos, user }: Props) => {
  const [videos, setVideos] = useState(initialVideos);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setVideos(initialVideos);
  }, [initialVideos]);

  const videosLoadMore = async (): Promise<void> => {
    setIsLoading(true);
    const res = await VideosService.getAllVideos({ skip: videos.data.length });
    setVideos((prev) => ({ data: [...prev.data, ...res.data], count: res.count }));
    setIsLoading(false);
  };

  return (
    <Layout user={user} title="All Videos">
      <div className="container flex flex-col flex-grow p-4 max-w-screen-xl mx-auto">
        <h1 className="mb-4 font-bold">All Videos</h1>
        <VideosList videos={videos.data} />
        {videos.data.length < videos.count && (
          <Button className="self-center" variant="outlined" onClick={videosLoadMore} disabled={isLoading}>
            {isLoading ? <Loading /> : 'Load More'}
          </Button>
        )}
      </div>
    </Layout>
  );
};

VideosPage.getInitialProps = async () => {
  const initialVideos = await VideosService.getAllVideos();
  return { initialVideos };
};

export default withAuth({})(VideosPage);
