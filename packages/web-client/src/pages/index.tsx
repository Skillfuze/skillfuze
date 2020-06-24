import React from 'react';
import { NextPage } from 'next';
import { Button, Carousel, ContentCard, VideosTopBar, CourseInfoBar } from '@skillfuze/ui-components';
import { HomeResponseDTO, User } from '@skillfuze/types';
import { useRouter } from 'next/router';
import HomeSVG from '../../assets/illustrations/home.svg';
import Layout from '../components/Layout';
import { HomeService } from '../services/home.service';
import RecommendationCarousel from '../components/RecommendationCarousel';
import config from '../../config';
import withAuth from '../utils/withAuth';

interface Props {
  recommendations: HomeResponseDTO;
  user?: User;
}

const Home: NextPage<Props> = ({ recommendations, user }: Props) => {
  const router = useRouter();
  const LoadLivestreams = (
    <Carousel className="">
      {recommendations.livestreams.map(livestream => (
        <ContentCard
          key={livestream.id}
          className=""
          thumbnail={livestream.thumbnailURL}
          category={livestream.category.name}
          title={livestream.title}
          userName={`${livestream.streamer.firstName} ${livestream.streamer.lastName}`}
          userAvatar="https://www.w3schools.com/w3images/avatar2.png"
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
      <p>Courses</p>
      {recommendations.courses.map(course => (
        <ContentCard
          className=""
          key={course.id}
          thumbnail={course.thumbnailURL}
          category={course.category.name}
          title={course.title}
          userName={course.creator.username}
          userAvatar="https://www.w3schools.com/w3images/avatar2.png"
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
      {recommendations.videos.map(video => (
        <ContentCard
          key={video.id}
          className=""
          thumbnail={video.thumbnailURL}
          category={video.category.name}
          title={video.title}
          userName={`${video.uploader.firstName} ${video.uploader.lastName}`}
          userAvatar="https://www.w3schools.com/w3images/avatar2.png"
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
      {recommendations.blogs.map(blog => (
        <ContentCard
          key={blog.id}
          className=""
          thumbnail={blog.thumbnailURL}
          category={blog.category.name}
          title={blog.title}
          userName={`${blog.user.firstName} ${blog.user.lastName}`}
          userAvatar="https://www.w3schools.com/w3images/avatar2.png"
          createdAt={blog.publishedAt}
          onClick={() => {
            // eslint-disable-next-line no-restricted-globals
            location.href = `${config.blogsClientUrl}/${blog.url}`;
          }}
        />
      ))}
    </Carousel>
  );
  return (
    <Layout title="Home" user={user}>
      <div className="h-screen w-full bg-gradient p-4 flex justify-center items-center">
        <div className="flex container items-center h-full justify-center">
          <div className="flex flex-col h-full justify-center">
            <h1 className="text-8xl font-bold text-left text-white pb-4">
              Learning
              <br />
              For Everyone
              <br />
              By Everyone
              <br />
              About Anything
            </h1>
            <div className="pt-4">
              <Button variant="outlined" color="white" size="large">
                CONTINUE LEARNING
              </Button>
            </div>
          </div>
        </div>
        <div className="flex container flex-col justify-center items-center p-4">
          <HomeSVG />
        </div>
        <style jsx>
          {`
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
        />
        <RecommendationCarousel
          title="Top Courses Recommended For You"
          moreText="ALL COURSES"
          carousel={LoadCourses}
          moreHref="/courses"
        />
        <RecommendationCarousel
          title="Top Videos Recommended For You"
          moreText="ALL VIDEOS"
          carousel={LoadVideos}
          moreHref="/videos"
        />
        <RecommendationCarousel
          title="Top Blogs Recommended For You"
          moreText="ALL BLOGS"
          carousel={LoadBlogs}
          moreHref="/blogs"
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
