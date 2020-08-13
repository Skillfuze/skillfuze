import React, { useState, useEffect } from 'react';
import { PaginatedResponse, Blog, UserTokenPayload } from '@skillfuze/types';
import { Button, Loading } from '@skillfuze/ui-components';
import Layout from '../../components/Layout';
import { BlogsList } from '../../components/MaterialsLists';
import { BlogService } from '../../services/blogs.service';
import withAuth from '../../utils/withAuth';

interface Props {
  initialBlogs: PaginatedResponse<Blog>;
  user?: UserTokenPayload;
}
const BlogsPage = ({ initialBlogs, user }: Props) => {
  const [blogs, setBlogs] = useState(initialBlogs);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setBlogs(initialBlogs);
  }, [initialBlogs]);

  const blogsLoadMore = async (): Promise<void> => {
    setIsLoading(true);
    const res = await BlogService.getAllBlogs({ skip: blogs.data.length });
    setBlogs((prev) => ({ data: [...prev.data, ...res.data], count: res.count }));
    setIsLoading(false);
  };

  return (
    <Layout user={user} title="All Blogs">
      <div className="container flex flex-col flex-grow p-4 max-w-screen-xl mx-auto">
        <h1>All Blogs</h1>
        <hr className="opacity-50 text-grey-dark mt-2" />
        <BlogsList blogs={blogs.data} />
        {blogs.data.length < blogs.count && (
          <Button className="self-center" variant="outlined" onClick={blogsLoadMore} disabled={isLoading}>
            {isLoading ? <Loading /> : 'Load More'}
          </Button>
        )}
      </div>
    </Layout>
  );
};

BlogsPage.getInitialProps = async () => {
  const initialBlogs = await BlogService.getAllBlogs();
  return { initialBlogs };
};

export default withAuth({})(BlogsPage);
