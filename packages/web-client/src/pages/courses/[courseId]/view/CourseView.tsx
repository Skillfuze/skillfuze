import React from 'react';
import { UserTokenPayload } from '@skillfuze/types';
import { NextPage } from 'next';
import { Button, TagsView, Avatar } from '@skillfuze/ui-components';
import Layout from '../../../../components/Layout';
import withAuth from '../../../../utils/withAuth';
import VideoPlayer from '../../../../components/VideoPlayer';

interface CourseViewProps {
  user: UserTokenPayload;
}

const CourseView: NextPage<CourseViewProps> = ({ user }: CourseViewProps) => {
  const course = {
    title: 'The Complete Web Developer in 2020: Zero to Mastery',
    description: `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore
    et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
    Stet clita kasd gubergren, no sea`,
    creator: {
      firstName: 'John',
      lastName: 'Doe',
      bio: `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore
      et dolore magna aliquyam erat, sed diam voluptua`,
    },
    price: 0,
    tags: ['Tag1', 'Tag2', 'Tag3'],
  };

  return (
    <Layout title="COURSE NAME LE7AD MA NGEEB NAME" user={user}>
      <div className="flex flex-grow flex-col space-y-3">
        <div className="flex-wrap bg-secondary flex p-8">
          <div className="flex flex-col lg:w-1/2 items-start text-white lg:pr-20">
            <h1 className="font-bold mb-8">{course.title}</h1>
            <p className="leading-tight text-xl mb-8">{course.description}</p>
            <p className="mb-8">
              {'Created by '}
              <span className="font-bold">{`${course.creator.firstName} ${course.creator.lastName}`}</span>
            </p>
            <p className="text-3xl font-bold mb-2">{course.price === 0 ? 'FREE' : `$${course.price}`}</p>
            <Button className="px-8 py-3 mb-2">Enroll</Button>
            <p>
              <span className="font-bold">30,000</span>
              {' already enrolled'}
            </p>
          </div>
          <div className="w-full mt-8 lg:mt-0 lg:w-1/2">
            <VideoPlayer url="" videoType="video/mp4" />
          </div>
        </div>
        <div className="flex container p-6 mx-auto justify-between">
          <div>
            <p className="font-bold text-xl">Skills you will gain</p>
            <TagsView className="mt-6 text-sm" tags={course.tags} />
          </div>
          <div className="w-1/3">
            <p className="font-bold text-xl">About the Author</p>
            <div className="flex mt-6 mb-3">
              <Avatar className="mr-3" URL="" alt="" size="large" />
              <div className="space-y-1">
                <p className="font-bold">{`${course.creator.firstName} ${course.creator.lastName}`}</p>
                <p>
                  <span className="font-bold">4</span>
                  {' Courses'}
                </p>
                <p>
                  <span className="font-bold">40,000</span>
                  {' Learners'}
                </p>
              </div>
            </div>
            <p>{course.creator.bio}</p>
          </div>
        </div>
        <div className="bg-grey-light">
          <div className="container mx-auto px-6 ">
            <div className="rounded-lg shadow-xl -mt-4 bg-white">
              <p>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
                labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et
                ea rebum. Stet clita kasd gubergren, no seaLorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero
                eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no seaLorem ipsum dolor sit
                amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna
                aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita
                kasd gubergren, no seaLorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
                tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et
                justo duo dolores et ea rebum. Stet clita kasd gubergren, no seaLorem ipsum dolor sit amet, consetetur
                sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed
                diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no
                seaLorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
                labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et
                ea rebum. Stet clita kasd gubergren, no seaLorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero
                eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no seaLorem ipsum dolor sit
                amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna
                aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita
                kasd gubergren, no sea
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default withAuth({})(CourseView);
