import React from 'react';
import { UserTokenPayload } from '@skillfuze/types';
import { NextPage } from 'next';
import { Button } from '@skillfuze/ui-components';
import Layout from '../../../../components/Layout';
import withAuth from '../../../../utils/withAuth';

interface CourseViewProps {
  user: UserTokenPayload;
}

const CourseView: NextPage<CourseViewProps> = ({ user }: CourseViewProps) => {
  const course = {
    title: 'The Complete Web Developer in 2020: Zero to Mastery',
    description: `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore
    et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
    Stet clita kasd gubergren, no sea takimata.`,
    creator: {
      firstName: 'John',
      lastName: 'Doe',
    },
    price: 0,
  };

  return (
    <Layout title="COURSE NAME LE7AD MA NGEEB NAME" user={user}>
      <div className="flex flex-grow flex-col">
        <div className="bg-secondary flex p-6">
          <div className="flex flex-col items-start text-white space-y-6">
            <h1 className="font-bold">{course.title}</h1>
            <p className="text-xl">{course.description}</p>
            <p>
              {'Created by '}
              <span className="font-bold">{`${course.creator.firstName} ${course.creator.lastName}`}</span>
            </p>
            <p className="text-3xl font-bold">{course.price === 0 ? 'FREE' : `$${course.price}`}</p>
            <Button className="px-8">Enroll</Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default withAuth({})(CourseView);
