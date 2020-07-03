import React from 'react';
import { Blog } from '@skillfuze/types';
import { ContentCard } from '@skillfuze/ui-components';
import config from '../../../config';

interface Props {
  blogs: Blog[];
}

const BlogsList: React.FC<Props> = (props: Props) => {
  return (
    <>
      {props.blogs.map((blog) => (
        <ContentCard
          key={blog.id}
          className=""
          thumbnail={blog.thumbnailURL}
          category={blog.category.name}
          title={blog.title}
          userName={`${blog.user.firstName} ${blog.user.lastName}`}
          userAvatar={blog.user.avatarURL}
          createdAt={blog.publishedAt}
          onClick={() => {
            // eslint-disable-next-line no-restricted-globals
            location.href = `${config.blogsClientUrl}/${blog.url}`;
          }}
        />
      ))}
    </>
  );
};

export default BlogsList;
