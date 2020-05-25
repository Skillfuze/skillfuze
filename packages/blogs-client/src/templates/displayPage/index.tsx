import React from 'react';
import { Button, Avatar } from '@skillfuze/ui-components';
import moment from 'moment';
import { Helmet } from 'react-helmet';

import Bookmark from '../../../assets/icons/bookmark.svg';
import More from '../../../assets/icons/More.svg';

interface Props {
  pageContext: { blog: any };
}

const DisplayPage: React.FC<Props> = ({ pageContext: { blog } }: Props) => {
  const onClickBookmark = () => {
    console.log('Bookmarked');
  };

  const onClickMore = () => {
    console.log('More');
  };

  return (
    <>
      <Helmet title={`${blog.title} - Skillfuze`}>
        <link
          rel="preload"
          as="font"
          href="/fonts/open-sans-v17-latin-regular.woff2"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          as="font"
          href="/fonts/open-sans-v17-latin-700.woff2"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          as="font"
          href="/fonts/open-sans-v17-latin-600.woff2"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </Helmet>
      <article className="flex flex-col w-full h-full items-center">
        <img className="flex-auto h-64 w-full border-solid" src={blog.thumbnailURL} alt={blog.name} />
        <h1 className="flex text-left mt-8 w-1/2 font-bold" style={{ fontSize: '2.5rem' }}>
          {blog.title}
        </h1>
        <h4 className="flex text-left mt-6 w-1/2 text-grey-dark">{blog.description}</h4>
        <div className="flex flex-row mt-6 w-1/2 h-16 items-center ">
          <Avatar URL={blog.user.avatar} alt="user photo" />
          <div className="ml-4 flex-col flex-auto">
            <div className="flex flex-row items-center">
              <div className="flex flex-row flex-grow">
                <p className="text-sm self-center inline-block ">{`${blog.user.firstName} ${blog.user.lastName}`}</p>
                <Button className="ml-4" size="small" variant="outlined">
                  Follow
                </Button>
              </div>
              <div className="mr-4">
                <Bookmark onClick={onClickBookmark} style={{ cursor: 'pointer' }} />
              </div>
              <More onClick={onClickMore} style={{ cursor: 'pointer' }} />
            </div>
            <p className="text-left text-xs text-grey-dark">{moment(blog.publishedAt).format('ll')}</p>
          </div>
        </div>
        <article
          className="text-left mt-8 w-1/2"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </article>
    </>
  );
};

export default DisplayPage;
