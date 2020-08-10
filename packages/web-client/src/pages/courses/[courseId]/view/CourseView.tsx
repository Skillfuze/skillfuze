import React, { useState } from 'react';
import { UserTokenPayload, CourseLesson, Course } from '@skillfuze/types';
import { NextPage } from 'next';
import { Button, TagsView, Avatar } from '@skillfuze/ui-components';
import { useAlert } from 'react-alert';

import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '../../../../components/Layout';
import withAuth from '../../../../utils/withAuth';
import VideoPlayer from '../../../../components/VideoPlayer';
import { CoursesService } from '../../../../services/courses.service';
import { UsersService } from '../../../../services/users.service';

interface LessonItemProps {
  courseSlug: string;
  lesson: CourseLesson;
}

const LessonItem: React.FC<LessonItemProps> = ({ lesson, courseSlug }: LessonItemProps) => (
  <Link href="/courses/[courseId]/player" as={`/courses/${courseSlug}/player?lesson=${lesson.id}`}>
    <a>
      <div className="p-6 flex flex-col items-start space-y-3 border-solid border-t border-grey-light">
        <div className="rounded px-2 py-1 text-white bg-secondary">
          <p className="text-xs">{lesson.type}</p>
        </div>
        <p className="font-bold">{lesson.title}</p>
      </div>
    </a>
  </Link>
);

interface CourseViewProps {
  course: Course;
  creatorCoursesCount: number;
  user?: UserTokenPayload;
}

const CourseView: NextPage<CourseViewProps> = ({ user, course, creatorCoursesCount }: CourseViewProps) => {
  const router = useRouter();
  const alert = useAlert();
  const [isEnrolled] = useState(() => {
    if (user === undefined) {
      return false;
    }

    return course.enrolled.filter((enrolled) => enrolled.id === user.id).length === 1;
  });

  const handlePrimaryAction = async () => {
    if (isEnrolled === false) {
      if (user === undefined) {
        router.push('/login');
      } else {
        try {
          await CoursesService.enroll(course.id);
          router.push('/courses/[courseId]/player', `/courses/${course.slug}/player`);
        } catch (error) {
          alert.show("Couldn't enroll, try again later!", { timeout: 2000, type: 'warning' });
        }
      }
    } else {
      router.push('/courses/[courseId]/player', `/courses/${course.slug}/player`);
    }
  };

  return (
    <Layout title={course.title} user={user}>
      <div className="flex flex-grow flex-col">
        <div className="flex-wrap bg-secondary flex p-8">
          <div className="flex flex-col lg:w-1/2 items-start text-white lg:pr-20">
            <h1 className="font-bold mb-8">{course.title}</h1>
            <p className="leading-tight text-xl mb-8">{course.description}</p>
            <p className="mb-8">
              {'Created by '}
              <span className="font-bold">
                <Link href="/profile/[username]" as={`/profile/${course.creator.username}`}>
                  <a>{`${course.creator.firstName} ${course.creator.lastName}`}</a>
                </Link>
              </span>
            </p>
            <p className="text-3xl font-bold mb-2">{course.price === 0 ? 'FREE' : `$${course.price}`}</p>
            <Button className="px-8 py-3 mb-2" onClick={handlePrimaryAction}>
              {isEnrolled ? 'Go to Course' : 'Enroll'}
            </Button>
            <p>
              <span className="font-bold">{course.enrolled.length}</span>
              {' already enrolled'}
            </p>
          </div>
          <div className="w-full mt-8 lg:mt-0 lg:w-1/2">
            <VideoPlayer thumbnail={course.thumbnailURL} url={course.trailerURL} videoType="video/mp4" />
          </div>
        </div>
        <div className="flex flex-wrap container p-6 mx-auto justify-between mt-3">
          <div className="lg:w-2/3 w-full">
            <p className="font-bold text-xl">Skills You Will Gain</p>
            <TagsView className="mt-6 text-sm" tags={course.tags} />
          </div>
          <div className="lg:w-1/3 w-full mt-8 lg:mt-0">
            <p className="font-bold text-xl">About the Author</p>
            <div className="mt-6 mb-3">
              <Link href="/profile/[username]" as={`/profile/${course.creator.username}`}>
                <a className="flex">
                  <Avatar className="mr-3" URL={course.creator.avatarURL} alt="" size="large" />
                  <div>
                    <p className="font-bold">{`${course.creator.firstName} ${course.creator.lastName}`}</p>
                    <p className="text-grey-dark mt-1">{`@${course.creator.username}`}</p>
                    <p className="mt-3">
                      <span className="font-bold">{creatorCoursesCount}</span>
                      {' Courses'}
                    </p>
                  </div>
                </a>
              </Link>
            </div>
            <p>{course.creator.bio}</p>
          </div>
        </div>
        <div className="content-bg mt-16 pb-12">
          <div className="container mx-auto px-6">
            <div className="rounded-lg card-shadow -mt-12 bg-white">
              <div className="flex items-center justify-center h-12">
                <div className="arrow">
                  <span />
                  <span />
                </div>
              </div>
              {course.lessons.map((lesson) => (
                <LessonItem key={lesson.id} lesson={lesson} courseSlug={router.query.courseId.toString()} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .content-bg {
            background-color: #ededed;
          }
          .card-shadow {
            box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.12);
          }

          .arrow {
            margin-bottom: 10px;
            margin-top: 5px;
          }

          .arrow span {
            display: block;
            width: 20px;
            height: 20px;
            border-bottom: 5px solid var(--color-primary);
            border-right: 5px solid var(--color-primary);
            transform: rotate(45deg);
            margin: -10px;
            animation: animate 1.5s infinite;
          }

          .arrow span:nth-child(2) {
            animation-delay: -0.2s;
          }

          @keyframes animate {
            0% {
              opacity: 0;
              transform: rotate(45deg) translate(-5px, -5px);
            }
            50% {
              opacity: 1;
            }
            100% {
              opacity: 0;
              transform: rotate(45deg) translate(0px, 0px);
            }
          }
        `}
      </style>
    </Layout>
  );
};

CourseView.getInitialProps = async (context) => {
  const course = await CoursesService.get(context.query.courseId.toString());
  const creatorCourses = await UsersService.getCourses(course.creator.username);
  const creatorCoursesCount = creatorCourses.count;

  return { course, creatorCoursesCount };
};

export default withAuth({})(CourseView);
