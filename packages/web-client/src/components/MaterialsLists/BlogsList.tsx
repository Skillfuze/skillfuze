import React from 'react';
import { Blog } from '@skillfuze/types';
import { ContentCard } from '@skillfuze/ui-components';
import config from '../../../config';

interface Props {
  blogs: Blog[];
  emptyLabel?: string;
}

const BlogsList: React.FC<Props> = (props: Props) => {
  return (
    <>
      {props.blogs.length > 0 ? (
        <div className="grid grid-flow-row md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 py-4">
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
        </div>
      ) : (
        <p className="pt-6 text-center text-sm">{props.emptyLabel}</p>
      )}
    </>
  );
};

BlogsList.defaultProps = {
  emptyLabel: 'No items here, try again later.',
};
export default BlogsList;
