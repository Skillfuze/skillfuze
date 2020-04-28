import React from 'react';
import EditorLayout from '../../../../components/BlogsEditor/Layout';
import NoSSR from '../../../../components/NoSSR';

const EditBlog = () => {
  return (
    <NoSSR>
      <EditorLayout />
    </NoSSR>
  );
};

EditBlog.getInitialProps = () => {
  return {};
};

export default EditBlog;
