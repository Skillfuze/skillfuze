import React from 'react';
import { NextPage, NextPageContext } from 'next';
import Router from 'next/router';
import withAuth from '../../../utils/withAuth';
import { CoursesService } from '../../../services/courses.service';

const NewCourse: NextPage = () => {
  return <div />;
};

NewCourse.getInitialProps = async (context: NextPageContext) => {
  const { id } = await CoursesService.create();
  if (context.req) {
    context.res.writeHead(302, { Location: `/courses/${id}/edit` });
    context.res.end();
  } else {
    Router.push(`/courses/${id}/edit`);
  }
};

export default withAuth({
  redirectOnAuthFailure: '/login',
})(NewCourse);
