import React from 'react';
import { User } from '@skillfuze/types';
import EditorLayout from '../../../../components/BlogsEditor/Layout';
import NoSSR from '../../../../components/NoSSR';
import { BlogService, BlogState } from '../../../../services/blogs.service';
import withAuth from '../../../../utils/withAuth';

interface Props {
  user: User;
  blogState: BlogState;
}

const EditBlog = (props: Props) => {
  return (
    <NoSSR>
      <EditorLayout blogState={props.blogState} user={props.user} />
    </NoSSR>
  );
};

EditBlog.getInitialProps = async ctx => {
  const blog = await BlogService.get(ctx.query.blogId);
  const blogState: BlogState = {
    ...blog,
    editorState: blog.content,
  };
  return { blogState };
};

export default withAuth({
  redirectOnAuthFailure: '/login',
})(EditBlog);
