import React from 'react';
import EditorLayout from '../../../components/BlogsEditor/Layout';
import NoSSR from '../../../components/NoSSR';
import withAuth from '../../../utils/withAuth';

const NewBlog = () => {
  return (
    <NoSSR>
      <EditorLayout />
    </NoSSR>
  );
};

export default withAuth({
  redirectOnAuthFailure: '/login',
})(NewBlog);
