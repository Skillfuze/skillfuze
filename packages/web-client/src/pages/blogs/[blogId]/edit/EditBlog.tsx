import React, { useEffect } from 'react';
import { User } from '@skillfuze/types';
import mixpanel from 'mixpanel-browser';
import EditorLayout from '../../../../components/BlogsEditor/Layout';
import NoSSR from '../../../../components/NoSSR';
import { BlogService, BlogState } from '../../../../services/blogs.service';
import withAuth from '../../../../utils/withAuth';
import { mixpanelEvents } from '../../../../../config/mixpanel.events';

interface Props {
  user: User;
  blogState: BlogState;
}

const EditBlog = (props: Props) => {
  useEffect(() => {
    mixpanel.identify(props.user?.id || 'GUEST');
    mixpanel.track(mixpanelEvents.EDIT_BLOG);
  }, []);

  return (
    <NoSSR>
      <EditorLayout blogState={props.blogState} user={props.user} />
    </NoSSR>
  );
};

EditBlog.getInitialProps = async (ctx) => {
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
