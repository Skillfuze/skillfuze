import React from 'react';
import EditorLayout from '../../../../components/BlogsEditor/Layout';
import NoSSR from '../../../../components/NoSSR';
import { BlogService, BlogState } from '../../../../services/blogs.service';

interface Props {
  blogState: BlogState;
}

const EditBlog = (props: Props) => {
  return (
    <NoSSR>
      <EditorLayout blogState={props.blogState} />
    </NoSSR>
  );
};

EditBlog.getInitialProps = async ctx => {
  const blog = await BlogService.get(ctx.query.blogId);
  const blogState: BlogState = {
    title: blog.title,
    description: blog.description,
    thumbnailURL: blog.thumbnailURL,
    tags: blog.tags,
    editorState: blog.content,
  };
  return { blogState };
};

export default EditBlog;
