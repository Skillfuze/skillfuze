import React from 'react';
import Layout from '../../../components/Layout';

const NewBlog = () => {
  return (
    <Layout>
      <div className="flex flex-grow px-40">
        <h1>Hello Blog</h1>
      </div>
    </Layout>
  );
};

export default NewBlog;

/*

 2 Pages: New / Edit
 -> Control Layout:
 --> Header with Controls
 --> Title
 --> Description
 --> Tags
 --> Editor (content)

 -> BlogsControl
 --> Layout.tsx
 --> Editor.tsx

 import BlogsEditorLayout from '../components/BlogsEditor/Layout';
 import Editor from '../components/BlogsEditor/Editor';

*/
