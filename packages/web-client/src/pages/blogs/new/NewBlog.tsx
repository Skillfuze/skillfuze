import React from 'react';
import { User } from '@skillfuze/types';
import EditorLayout from '../../../components/BlogsEditor/Layout';
import NoSSR from '../../../components/NoSSR';
import withAuth from '../../../utils/withAuth';

const NewBlog = ({ user }: { user: User }) => {
  return (
    <NoSSR>
      <EditorLayout user={user} />
    </NoSSR>
  );
};

export default withAuth({
  redirectOnAuthFailure: '/login',
})(NewBlog);
