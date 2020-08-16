import React, { useEffect } from 'react';
import { NextPage } from 'next';
import { Button, Carousel, ContentCard, VideosTopBar, CourseInfoBar } from '@skillfuze/ui-components';
import { HomeResponseDTO, User } from '@skillfuze/types';
import { useRouter } from 'next/router';
import Link from 'next/link';
import mixpanel from 'mixpanel-browser';
import HomeSVG from '../../assets/illustrations/home.svg';
import Layout from '../components/Layout';
import { HomeService } from '../services/home.service';
import RecommendationCarousel from '../components/RecommendationCarousel';
import config from '../../config';
import withAuth from '../utils/withAuth';
import { mixpanelEvents } from '../../config/mixpanel.events';

interface Props {
  recommendations: HomeResponseDTO;
  user?: User;
}

const Home: NextPage<Props> = ({ recommendations, user }: Props) => {
  useEffect(() => {
    mixpanel.identify(user?.id || 'GUEST');
    mixpanel.track(mixpanelEvents.HOMEPAGE);
  }, []);
  const router = useRouter();
  const LoadLivestreams = (
    <Carousel className="">
      {recommendations.livestreams.map((livestream) => (
        <ContentCard
          key={livestream.id}
          className="h-full"
          thumbnail={livestream.thumbnailURL}
          category={livestream.category.name}
          title={livestream.title}
          userName={`${livestream.streamer.firstName} ${livestream.streamer.lastName}`}
          userAvatar={livestream.streamer.avatarURL}
          topBar={<VideosTopBar isLive views={livestream.watchingNow} />}
          onClick={() => {
            router.push(`/livestreams/[livestreamId]`, `/livestreams/${livestream.id}`);
          }}
        />
      ))}
    </Carousel>
  );

  const LoadCourses = (
    <Carousel className="">
      {recommendations.courses.map((course) => (
        <ContentCard
          className="h-full"
          key={course.id}
          thumbnail={course.thumbnailURL}
          category={course.category?.name || ''}
          title={course.title}
          userName={`${course.creator.firstName} ${course.creator.lastName}`}
          userAvatar={course.creator.avatarURL}
          createdAt={course.createdAt}
          infoBar={<CourseInfoBar rate={4.5} price={course.price} />}
          callToActionButton={<Button>ENROLL</Button>}
          onClick={() => {
            router.push(`/courses/[courseId]`, `/courses/${course.id}`);
          }}
        />
      ))}
    </Carousel>
  );

  const LoadVideos = (
    <Carousel className="">
      {recommendations.videos.map((video) => (
        <ContentCard
          key={video.id}
          className="h-full"
          thumbnail={video.thumbnailURL}
          category={video.category.name}
          title={video.title}
          userName={`${video.uploader.firstName} ${video.uploader.lastName}`}
          userAvatar={video.uploader.avatarURL}
          createdAt={video.createdAt}
          topBar={<VideosTopBar isLive={false} views={video.views} />}
          onClick={() => {
            router.push(`/videos/[videoId]`, `/videos/${video.id}`);
          }}
        />
      ))}
    </Carousel>
  );

  const LoadBlogs = (
    <Carousel className="">
      {recommendations.blogs.map((blog) => (
        <ContentCard
          key={blog.id}
          className="h-full"
          thumbnail={blog.thumbnailURL}
          category={blog.category.name}
          title={blog.title}
          userName={`${blog.user.firstName} ${blog.user.lastName}`}
          userAvatar={blog.user.avatarURL}
          createdAt={blog.publishedAt}
          onClick={() => {
            // eslint-disable-next-line no-restricted-globals
            location.href = `${config.blogsClientUrl}/${blog.url}`;
          }}
        />
      ))}
    </Carousel>
  );

  const isLoggedIn = user !== undefined;
  const callToActionText = isLoggedIn ? 'CONTINUE LEARNING' : 'JOIN NOW';
  const callToActionHref = isLoggedIn ? `/profile/[username]` : '/register';
  const callToActionAs = isLoggedIn ? `/profile/${user.username}` : '/register';

  return (
    <Layout title="Home" user={user}>
      <div className="min-h-screen w-full bg-gradient p-4 flex justify-around items-center flex-wrap">
        <div className="flex flex-col items-start h-full justify-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white">
            Learning
            <br />
            For Everyone
            <br />
            By Everyone
            <br />
            About Anything
          </h1>
          <div className="mt-8 call-to-action-btn">
            <Button variant="outlined" color="white" size="large" className="w-full">
              <Link as={callToActionAs} href={callToActionHref}>
                <a>{callToActionText}</a>
              </Link>
            </Button>
          </div>
        </div>
        <HomeSVG height="500" />
        <style jsx>
          {`
            .call-to-action-btn {
              min-width: 14rem;
            }

            .bg-gradient {
              background-image: linear-gradient(
                117deg,
                var(--color-secondary-light),
                #4d90e5 45%,
                var(--color-primary-dark) 100%
              );
            }
          `}
        </style>
      </div>
      <div className="container p-4 mx-auto space-y-4">
        <RecommendationCarousel
          title="Trending Livestreams"
          moreText="ALL LIVESTREAMS"
          carousel={LoadLivestreams}
          moreHref="/livestreams"
          hidden={recommendations.livestreams.length === 0}
        />
        <RecommendationCarousel
          title="Top Courses Recommended For You"
          moreText="ALL COURSES"
          carousel={LoadCourses}
          moreHref="/courses"
          hidden={recommendations.courses.length === 0}
        />
        <RecommendationCarousel
          title="Top Videos Recommended For You"
          moreText="ALL VIDEOS"
          carousel={LoadVideos}
          moreHref="/videos"
          hidden={recommendations.videos.length === 0}
        />
        <RecommendationCarousel
          title="Top Blogs Recommended For You"
          moreText="ALL BLOGS"
          carousel={LoadBlogs}
          moreHref="/blogs"
          hidden={recommendations.blogs.length === 0}
        />
      </div>
    </Layout>
  );
};

Home.getInitialProps = async () => {
  const recommendations = await HomeService.getAll();
  return { recommendations };
};

export default withAuth({})(Home);
