import React, { useState, useEffect } from 'react';
import axios from 'axios';

import DisplayPage from '../templates/displayPage';
import NotFoundIllustration from '../../assets/illustrations/NotFound.svg';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require('../../config');

const NotFoundPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [blog, setBlog] = useState();

  useEffect(() => {
    const loadBlog = async () => {
      const blogUrl = window.location.pathname.slice(1);

      try {
        const { data } = await axios.get(`${config.API_URL}/api/v1/blogs/${blogUrl}`);
        setBlog(data);
      } finally {
        setIsLoading(false);
      }
    };
    loadBlog();
  }, []);

  if (isLoading) {
    return (
      <div className="container flex flex-col mx-auto h-screen items-center justify-center">
        <h1>Trying to fetch the blog</h1>
        <p className="text-grey-dark mt-2">Please Wait...</p>
      </div>
    );
  }

  if (blog) {
    return <DisplayPage pageContext={{ blog }} />;
  }

  return (
    <div className="container flex flex-col mx-auto max-w-screen-sm h-screen items-center justify-center space-y-8 p-4">
      <NotFoundIllustration />
      <div className="space-y-3">
        <h1 className="font-semibold text-primary-dark">Oops! Page not found.</h1>
        <p className="text-grey-dark text-lg text-center">
          The link you clicked may be broken,
          <br />
          or the page may have been removed.
        </p>
      </div>
    </div>
  );
};

export default NotFoundPage;
