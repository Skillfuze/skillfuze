import React, { useState, useEffect } from 'react';
import { Livestream, PaginatedResponse, Blog, Video, Course, UserTokenPayload } from '@skillfuze/types';
import { ContentTabs, Tab } from '@skillfuze/ui-components';
import { CategoriesService } from '../../../services/categories.service';
import Layout from '../../../components/Layout';
import { VideosList, BlogsList, CoursesList } from '../../../components/MaterialsLists';
import LivestreamsList from '../../../components/MaterialsLists/LivestreamsList';
import { slugToTitle } from '../../../utils/slugToTitle';
import withAuth from '../../../utils/withAuth';

interface Props {
  slug: string;
  user?: UserTokenPayload;
  initialBlogs: PaginatedResponse<Blog>;
  initialVideos: PaginatedResponse<Video>;
  initialCourses: PaginatedResponse<Course>;
  initialLivestreams: PaginatedResponse<Livestream>;
}
const CategoriesContent = ({ user, slug, initialBlogs, initialVideos, initialCourses, initialLivestreams }: Props) => {
  const [blogs, setBlogs] = useState(initialBlogs);
  const [videos, setVideos] = useState(initialVideos);
  const [courses, setCourses] = useState(initialCourses);
  const [livestreams, setLivestreams] = useState(initialLivestreams);

  useEffect(() => {
    setBlogs(initialBlogs);
    setVideos(initialVideos);
    setCourses(initialCourses);
    setLivestreams(initialLivestreams);
  }, [initialBlogs, initialVideos, initialCourses, initialLivestreams]);

  const videosLoadMore = async (): Promise<void> => {
    const res = await CategoriesService.getVideos(slug, { skip: videos.data.length });
    setVideos((prev) => ({ data: [...prev.data, ...res.data], count: res.count }));
  };

  const blogsLoadMore = async (): Promise<void> => {
    const res = await CategoriesService.getBlogs(slug, { skip: blogs.data.length });
    setBlogs((prev) => ({ data: [...prev.data, ...res.data], count: res.count }));
  };

  const coursesLoadMore = async (): Promise<void> => {
    const res = await CategoriesService.getCourses(slug, { skip: courses.data.length });
    setCourses((prev) => ({ data: [...prev.data, ...res.data], count: res.count }));
  };

  const livestreamsLoadMore = async (): Promise<void> => {
    const res = await CategoriesService.getLivestreams(slug, { skip: livestreams.data.length });
    setLivestreams((prev) => ({ data: [...prev.data, ...res.data], count: res.count }));
  };
  return (
    <Layout title="Categories Content" user={user}>
      <div className="container flex flex-col flex-grow p-4 max-w-screen-xl mx-auto">
        <h1 className="font-bold">{slugToTitle(slug)}</h1>
        <ContentTabs className="py-4 mt-2" tabs={['Courses', 'Videos', 'Blogs', 'Livestreams']}>
          <Tab enableMore={courses.data.length < courses.count} loadMore={coursesLoadMore} title="Courses">
            <CoursesList courses={courses.data} />
          </Tab>
          <Tab enableMore={videos.data.length < videos.count} loadMore={videosLoadMore} title="Videos">
            <VideosList videos={videos.data} />
          </Tab>
          <Tab enableMore={blogs.data.length < blogs.count} loadMore={blogsLoadMore} title="Blogs">
            <BlogsList blogs={blogs.data} />
          </Tab>
          <Tab
            enableMore={livestreams.data.length < livestreams.count}
            loadMore={livestreamsLoadMore}
            title="Livestreams"
          >
            <LivestreamsList livestreams={livestreams.data} />
          </Tab>
        </ContentTabs>
      </div>
    </Layout>
  );
};

CategoriesContent.getInitialProps = async (ctx) => {
  const [initialBlogs, initialVideos, initialCourses, initialLivestreams] = await Promise.all([
    CategoriesService.getBlogs(ctx.query.slug.toString()),
    CategoriesService.getVideos(ctx.query.slug.toString()),
    CategoriesService.getCourses(ctx.query.slug.toString()),
    CategoriesService.getLivestreams(ctx.query.slug.toString()),
  ]);
  return { slug: ctx.query.slug.toString(), initialBlogs, initialVideos, initialCourses, initialLivestreams };
};

export default withAuth({})(CategoriesContent);
