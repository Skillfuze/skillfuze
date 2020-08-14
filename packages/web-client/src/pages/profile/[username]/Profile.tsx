import React, { useState, useEffect } from 'react';
import { User, Blog, Video, Course, PaginatedResponse, UserTokenPayload } from '@skillfuze/types';
import { Avatar, Button, MoreActions, ContentTabs, Tab } from '@skillfuze/ui-components';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import mixpanel from 'mixpanel-browser';
import Layout from '../../../components/Layout';
import { UsersService } from '../../../services/users.service';
import InDevelopment from '../../../components/InDevelopment';
import { VideosList, BlogsList, CoursesList } from '../../../components/MaterialsLists';
import { mixpanelEvents } from '../../../../config/mixpanel.events';
import withAuth from '../../../utils/withAuth';

interface Props {
  profile: User;
  user?: UserTokenPayload;
  initialBlogs: PaginatedResponse<Blog>;
  initialVideos: PaginatedResponse<Video>;
  initialCourses: PaginatedResponse<Course>;
  initialEnrolledCourses: PaginatedResponse<Course>;
}
const ProfilePage: NextPage<Props> = ({
  profile,
  user,
  initialBlogs,
  initialVideos,
  initialCourses,
  initialEnrolledCourses,
}: Props) => {
  const pageURL = typeof window === 'object' ? window.location.href : undefined;
  const router = useRouter();

  const [blogs, setBlogs] = useState(initialBlogs);
  const [videos, setVideos] = useState(initialVideos);
  const [courses, setCourses] = useState(initialCourses);
  const [enrolledCourses, setEnrolledCourses] = useState(initialEnrolledCourses);

  const handleLiveClick = (): void => {
    router.push(`/livestreams/${profile.livestreams[0].id}`);
  };

  const onEdit = (): void => {
    router.push('/profile/edit');
  };

  const videosLoadMore = async (): Promise<void> => {
    const res = await UsersService.getVideos(profile.username, { skip: videos.data.length });
    setVideos((prev) => ({ data: [...prev.data, ...res.data], count: res.count }));
  };

  const blogsLoadMore = async (): Promise<void> => {
    const res = await UsersService.getBlogs(profile.username, { skip: blogs.data.length });
    setBlogs((prev) => ({ data: [...prev.data, ...res.data], count: res.count }));
  };

  const coursesLoadMore = async (): Promise<void> => {
    const res = await UsersService.getCourses(profile.username, { skip: courses.data.length });
    setCourses((prev) => ({ data: [...prev.data, ...res.data], count: res.count }));
  };

  const enrolledCoursesLoadMore = async (): Promise<void> => {
    const res = await UsersService.getEnrolledCourses(profile.username, { skip: enrolledCourses.data.length });
    setEnrolledCourses((prev) => ({ data: [...prev.data, ...res.data], count: res.count }));
  };

  useEffect(() => {
    mixpanel.identify(user?.id || 'GUEST');
    mixpanel.track(mixpanelEvents.VIEW_PROFILE);
  }, []);

  return (
    <Layout title="Profile" user={user}>
      <div className="container flex flex-col flex-grow p-4 pt-8 max-w-screen-xl mx-auto space-y-16">
        <div className="flex lg:flex-no-wrap flex-wrap w-full lg:justify-between content-start">
          <div className="flex flex-col space-y-4 w-full lg:w-auto items-center mb-4">
            <Avatar className="w-32 h-32 mr-4" URL={profile.avatarURL} alt="userAvatar" />
            {profile.livestreams && (
              <Button onClick={handleLiveClick} color="warning">
                Live
              </Button>
            )}
          </div>
          <div className="flex flex-1 flex-col space-y-8 max-w-screen-lg">
            <div className="flex flex-wrap">
              <div className="space-y-2">
                <h1 className="font-bold">{`${profile.firstName} ${profile.lastName}`}</h1>
                <h5 className="text-grey-dark">{profile.email}</h5>
              </div>
              <div className="mt-1 flex-grow md:ml-20">
                <Button className="w-48" variant="outlined">
                  Follow
                </Button>
              </div>
              <MoreActions URL={pageURL} enableControls={user?.id === profile.id} onEdit={onEdit} />
            </div>
            <div className="flex">
              <p className="font-bold text-black-light">{`${0} followers`}</p>
              <p className="font-bold text-black-light ml-4">{`${0} following`}</p>
            </div>
            <p className="text-lg text-black-light">{profile.bio}</p>
          </div>
        </div>
        <ContentTabs className="py-4" tabs={['Courses', 'Videos', 'Blogs', 'Enrolled Courses', 'Bookmarks']}>
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
            enableMore={enrolledCourses.data.length < enrolledCourses.count}
            loadMore={enrolledCoursesLoadMore}
            title="Enrolled Courses"
          >
            <CoursesList enrolled courses={enrolledCourses.data} />
          </Tab>
          <Tab title="Bookmarks">
            <InDevelopment inDevelopmentItem="feature" />
          </Tab>
        </ContentTabs>
      </div>
    </Layout>
  );
};

ProfilePage.getInitialProps = async (ctx) => {
  const [profile, initialBlogs, initialVideos, initialCourses, initialEnrolledCourses] = await Promise.all([
    UsersService.getProfileInfo(ctx.query.username.toString()),
    UsersService.getBlogs(ctx.query.username.toString()),
    UsersService.getVideos(ctx.query.username.toString()),
    UsersService.getCourses(ctx.query.username.toString()),
    UsersService.getEnrolledCourses(ctx.query.username.toString()),
  ]);
  return { profile, initialBlogs, initialVideos, initialCourses, initialEnrolledCourses };
};

export default withAuth({})(ProfilePage);
