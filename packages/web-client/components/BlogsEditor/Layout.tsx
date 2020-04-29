import React, { useState, useRef } from 'react';
import { Input, TagsInput, Button } from '@skillfuze/ui-components';
import { EditorState } from 'draft-js';
import { useAlert, types } from 'react-alert';

import { stateFromHTML } from 'draft-js-import-html';

import { useRouter } from 'next/router';
import Editor from './Editor';
import PageLayout from '../Layout';
import { BlogService, BlogState } from '../../services/blogs.service';
import { useInterval } from '../../utils/hooks/useInterval';
import config from '../../config';

interface Props {
  blogState?: BlogState;
}

const EditorLayout: React.FC<Props> = (props: Props) => {
  const [title, setTitle] = useState(props.blogState?.title ?? '');
  const [description, setDescription] = useState(props.blogState?.description ?? '');
  const [thumbnailURL, setThumbnailURL] = useState(props.blogState?.thumbnailURL ?? '');
  const [tags, setTags] = useState(props.blogState?.tags ?? []);
  const [editorState, setEditorState] = useState(
    props.blogState?.editorState
      ? EditorState.createWithContent(stateFromHTML(props.blogState.editorState as string))
      : EditorState.createEmpty(),
  );

  const alert = useAlert();
  const router = useRouter();
  const blogsService = useRef(new BlogService({ title, description, thumbnailURL, tags, editorState }));

  useInterval(async () => {
    if (blogsService.current.shouldUpdate({ title, description, thumbnailURL, tags, editorState })) {
      alert.show('Saving your draft...', { timeout: 2000, type: types.INFO });
      const mode = window.history.state.as.split('/').pop();
      if (mode === 'new') {
        const blog = await blogsService.current.create({ title, thumbnailURL, description, tags, editorState });
        router.push('/blogs/new', `/blogs/${blog.id}/edit`, { shallow: true });
      } else if (mode === 'edit') {
        const blogId = router.query.blogId ?? window.history.state.as.split('/')[2];
        await blogsService.current.update(blogId, { title, thumbnailURL, description, tags, editorState });
      }
    }
  }, 30000);

  const onPublish = async () => {
    if (blogsService.current.shouldUpdate({ title, description, thumbnailURL, tags, editorState })) {
      await blogsService.current.update(router.query.blogId as string, {
        title,
        description,
        thumbnailURL,
        tags,
        editorState,
      });
    }
    const blog = await BlogService.publish(router.query.blogId as string);
    window.open(`${config.blogsClientUrl}/${blog.url}`);

    // TODO: EDITING PUBLISHED BLOGS SHOULD UPDATE NOT RE-PUBLISH
  };

  const navControls = (
    <Button variant="primary" onClick={onPublish}>
      Publish
    </Button>
  );

  return (
    <PageLayout navControls={navControls}>
      <div className="flex flex-grow flex-col py-16 max-w-screen-md w-full self-center align-center">
        <Input value={title} onChange={setTitle} placeholder="Title" className="text-3xl font-bold" borderless />
        <Input
          value={description}
          onChange={setDescription}
          placeholder="Description"
          className="mb-2 text-base text-grey-dark"
          borderless
        />
        <Input value={thumbnailURL} onChange={setThumbnailURL} placeholder="Thumbnail Url" className="mb-4" />
        <TagsInput tags={tags} onChange={setTags} limit={5} className="mb-4" />
        <Editor editorState={editorState} onChange={setEditorState} />
      </div>
    </PageLayout>
  );
};

export default EditorLayout;
