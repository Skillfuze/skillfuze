/* eslint-disable react/prop-types */
import '../../../assets/css/reset.css';
import '../../../assets/css/tailwind.css';
import '../../../assets/css/openSans.css';

import React from 'react';
import { Button, Avatar } from '@skillfuze/ui-components';
import moment from 'moment';

import Bookmark from '../../../assets/icons/bookmark.svg';
import More from '../../../assets/icons/More.svg';

interface Props {
  pageContext: object;
  blog: object;
}

const DisplayPage: React.FC<Props> = ({ pageContext: { blog } }) => {
  const onClickBookmark = () => {
    console.log('Bookmarked');
  };

  const onClickMore = () => {
    console.log('More');
  };

  return (
    <article className="flex flex-col w-full h-full items-center">
      <img className="flex-auto h-48 w-full border-solid" src={blog.thumbnailURL} alt={blog.name} />
      <p className="flex text-left mt-8 w-1/2 font-bold text-xl">{blog.title}</p>
      <p className="flex text-left mt-6 w-1/2 text-xs text-darkGrey">{blog.desc}</p>
      <div className="flex flex-row mt-6 w-1/2 h-16 items-center ">
        <Avatar URL={blog.author.avatar} alt="user photo" />
        <div className="ml-4 flex-col flex-auto">
          <div className="flex flex-row items-center">
            <div className="flex flex-row flex-grow">
              <p className="text-sm self-center inline-block ">{blog.author.name}</p>
              <Button className="ml-4" size="small" variant="outlined">
                Follow
              </Button>
            </div>
            <div className="mr-4">
              <Bookmark onClick={onClickBookmark} style={{ cursor: 'pointer' }} />
            </div>
            <More onClick={onClickMore} style={{ cursor: 'pointer' }} />
          </div>
          <p className="flex mt-2 text-left text-xs text-darkGrey">{moment(blog.createdAt).format('ll')}</p>
        </div>
      </div>
      <article
        className="flex text-left mt-8 w-1/2 "
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
    </article>
  );
};

export default DisplayPage;
