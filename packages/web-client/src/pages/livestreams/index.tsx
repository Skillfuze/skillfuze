import React, { useState, useEffect } from 'react';
import { PaginatedResponse, Livestream, UserTokenPayload } from '@skillfuze/types';
import { Button, Loading } from '@skillfuze/ui-components';
import Layout from '../../components/Layout';
import { LivestreamsList } from '../../components/MaterialsLists';
import { LivestreamService } from '../../services/livestreams.service';
import withAuth from '../../utils/withAuth';

interface Props {
  initialLivestreams: PaginatedResponse<Livestream>;
  user?: UserTokenPayload;
}
const LivestreamsPage = ({ initialLivestreams, user }: Props) => {
  const [livestreams, setLivestreams] = useState(initialLivestreams);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setLivestreams(initialLivestreams);
  }, [initialLivestreams]);

  const livestreamsLoadMore = async (): Promise<void> => {
    setIsLoading(true);
    const res = await LivestreamService.getAllLivestreams({ skip: livestreams.data.length });
    setLivestreams((prev) => ({ data: [...prev.data, ...res.data], count: res.count }));
    setIsLoading(false);
  };

  return (
    <Layout user={user} title="All Livestreams">
      <div className="container flex flex-col flex-grow p-4 max-w-screen-xl mx-auto">
        <h1 className="mb-4 font-bold">All Livestreams</h1>
        <LivestreamsList livestreams={livestreams.data} />
        {livestreams.data.length < livestreams.count && (
          <Button className="self-center" variant="outlined" onClick={livestreamsLoadMore} disabled={isLoading}>
            {isLoading ? <Loading /> : 'Load More'}
          </Button>
        )}
      </div>
    </Layout>
  );
};

LivestreamsPage.getInitialProps = async () => {
  const initialLivestreams = await LivestreamService.getAllLivestreams();
  return { initialLivestreams };
};

export default withAuth({})(LivestreamsPage);
