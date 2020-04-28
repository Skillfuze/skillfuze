import React, { useState, useRef } from 'react';
import { Input, TagsInput } from '@skillfuze/ui-components';
import { EditorState } from 'draft-js';

import { useRouter } from 'next/router';
import Editor from './Editor';
import PageLayout from '../Layout';
import { BlogService } from '../../services/blogs.service';
import { useInterval } from '../../utils/hooks/useInterval';

const EditorLayout = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState([]);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const router = useRouter();
  const blogsService = useRef(new BlogService({ title, description, tags, editorState }));

  useInterval(async () => {
    if (blogsService.current.shouldUpdate({ title, description, tags, editorState })) {
      const mode = window.history.state.as.split('/').pop();
      if (mode === 'new') {
        const blog = await blogsService.current.create({ title, description, tags, editorState });
        router.push('/blogs/new', `/blogs/${blog.id}/edit`, { shallow: true });
      } else if (mode === 'edit') {
        const blogId = router.query.blogId ?? window.history.state.as.split('/')[2];
        await blogsService.current.update(blogId, { title, description, tags, editorState });
      }
    }
  }, 5000);

  return (
    <PageLayout>
      <div className="flex flex-grow flex-col py-16 max-w-screen-md w-full self-center align-center">
        <Input value={title} onChange={setTitle} placeholder="Title" className="text-3xl font-bold" borderless />
        <Input
          value={description}
          onChange={setDescription}
          placeholder="Description"
          className="mb-2 text-base text-grey-dark"
          borderless
        />
        <TagsInput tags={tags} onChange={setTags} limit={5} className="mb-8" />
        <Editor editorState={editorState} onChange={setEditorState} />
      </div>
    </PageLayout>
  );
};

export default EditorLayout;
