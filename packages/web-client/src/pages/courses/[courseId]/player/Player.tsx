/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { UserTokenPayload, GetCourseLessonResponseDTO, Course } from '@skillfuze/types';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { DiscussionEmbed } from 'disqus-react';

import mixpanel from 'mixpanel-browser';
import withAuth from '../../../../utils/withAuth';
import Layout from '../../../../components/Layout';
import { CoursesService } from '../../../../services/courses.service';
import VideoPlayer from '../../../../components/VideoPlayer';
import NoSSR from '../../../../components/NoSSR';
import { mixpanelEvents } from '../../../../../config/mixpanel.events';

interface CoursePlayerProps {
  user?: UserTokenPayload;
}
const CoursePlayer: NextPage<CoursePlayerProps> = ({ user }: CoursePlayerProps) => {
  const router = useRouter();

  const [lesson, setLesson] = useState<GetCourseLessonResponseDTO>();
  const [course, setCourse] = useState<Course>();
  const [content, setContent] = useState<React.ReactChild>();
  const [isLoadingData, setIsLoadingData] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const { courseId, lesson: lessonId } = router.query;

      const courseData = await CoursesService.get(courseId.toString());

      if (!lessonId) {
        router.push(
          `/courses/[courseId]/player?lesson=${courseData.lessons[0].id}`,
          `/courses/${courseId}/player?lesson=${courseData.lessons[0].id}`,
        );
      }

      setCourse(courseData);
    };

    loadData();
  }, []);

  useEffect(() => {
    const loadLesson = async () => {
      const { courseId, lesson: lessonId } = router.query;

      if (lessonId) {
        try {
          setLesson(await CoursesService.getCourseLesson(courseId.toString(), lessonId.toString()));
          setIsLoadingData(false);
        } catch (error) {
          if (error.response?.status === 403) {
            router.push('/courses/[courseId]', `/courses/${courseId}`);
          }
        }
      }
    };

    loadLesson();
  }, [router.query.lesson]);

  useEffect(() => {
    mixpanel.identify(user.id || 'GUEST');
    mixpanel.track(mixpanelEvents.VIEW_COURSE_PLAYER);
  }, []);

  useEffect(() => {
    if (lesson) {
      const newContent =
        lesson.type === 'Video' ? (
          <VideoPlayer key={lesson.id} url={lesson.url} videoType="video/mp4" />
        ) : (
          // eslint-disable-next-line react/no-danger
          <div key={lesson.id} dangerouslySetInnerHTML={{ __html: lesson.content }} />
        );
      setContent(newContent);
    }
  }, [lesson]);

  if (isLoadingData) {
    return (
      <Layout title="Course Player" user={user}>
        <div className="flex w-full flex-grow items-center justify-center">
          <p>Loading...</p>
        </div>
      </Layout>
    );
  }

  return (
    <NoSSR>
      <Layout title={course.title} user={user}>
        <div className="flex w-full flex-grow flex-wrap">
          <div
            className={`md:w-3/4 w-full flex-col ${
              lesson.type === 'Video' ? 'bg-white flex' : 'p-4 container max-w-screen-lg mx-auto'
            }`}
          >
            {content}
            <div className="p-6">
              <DiscussionEmbed
                shortname="skillfuze"
                config={{
                  identifier: lesson.id,
                  title: lesson.title,
                }}
              />
            </div>
          </div>
          <div className="md:w-1/4 w-full shadow">
            <div className="p-4 bg-primary">
              <p className="text-white font-bold">Table of Contents</p>
            </div>
            <div className="px-4 py-6 space-y-6">
              {course?.lessons.map(({ id, title }) => (
                <div>
                  <Link
                    href={{ pathname: `/courses/[courseId]/player`, query: { lesson: id } }}
                    as={`/courses/${router.query.courseId}/player?lesson=${id}`}
                  >
                    <a className={router.query.lesson?.toString() === id ? 'text-primary outline-none' : undefined}>
                      {title}
                    </a>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    </NoSSR>
  );
};

export default withAuth({
  redirectOnAuthFailure: '/login',
})(CoursePlayer);
