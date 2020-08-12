import React, { useEffect } from 'react';
import { Button, Avatar, MoreActions } from '@skillfuze/ui-components';
import moment from 'moment';
import { Helmet } from 'react-helmet';
import { navigate } from '@reach/router';
import cookie from 'react-cookies';
import { Disqus } from 'gatsby-plugin-disqus';

import axios from 'axios';
import Bookmark from '../../../assets/icons/bookmark.svg';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require('../../../config');

interface Props {
  pageContext: { blog: any };
}

const DisplayPage: React.FC<Props> = ({ pageContext: { blog } }: Props) => {
  const pageURL = typeof window !== 'undefined' ? window.location.href : '';

  useEffect(() => {
    async function addView() {
      await axios.post(`${config.API_URL}/api/v1/blogs/${blog.id}/view`);
    }
    addView();
  }, []);

  const onClickBookmark = () => {
    console.log('Bookmarked');
  };

  const onEdit = () => {
    navigate(`${config.webClientUrl}/blogs/${blog.id}/edit`);
  };

  const onDelete = async () => {
    const authConfig = {
      headers: { Authorization: `Bearer ${cookie.load('token')}` },
    };
    try {
      await axios.delete(`${config.API_URL}/api/v1/blogs/${blog.id}`, authConfig);
    } finally {
      navigate(`${config.webClientUrl}/`);
    }
  };

  const disqusConfig = {
    identifier: blog.id,
    title: blog.title,
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
      <article className="flex flex-col max-w-screen-md mx-auto h-full">
        <img className="flex-auto h-64 w-full border-solid" src={blog.thumbnailURL} alt={blog.name} />
        <h1 className="flex text-left mt-8 font-bold" style={{ fontSize: '2.5rem' }}>
          {blog.title}
        </h1>
        <h4 className="flex text-left mt-6 text-grey-dark">{blog.description}</h4>
        <div className="flex flex-row mt-6 h-16 items-center ">
          <Avatar URL={blog.user.avatarURL} alt="user photo" />
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
              <MoreActions URL={pageURL} enableControls onEdit={onEdit} onDelete={onDelete} />
            </div>
            <p className="text-left text-xs text-grey-dark">{moment(blog.publishedAt).format('ll')}</p>
          </div>
        </div>
        <article
          className="text-left mt-8"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
        <hr className="opacity-50 mt-20" />
        <Disqus className="mt-6 mb-6" config={disqusConfig} />
      </article>
    </>
  );
};

export default DisplayPage;
