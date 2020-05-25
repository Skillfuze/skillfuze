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
import config from '../../../config';

interface Props {
  blogState?: BlogState;
}

const EditorLayout: React.FC<Props> = (props: Props) => {
  const [title, setTitle] = useState(props.blogState?.title ?? '');
  const [description, setDescription] = useState(props.blogState?.description ?? '');
  const [thumbnailURL, setThumbnailURL] = useState(props.blogState?.thumbnailURL);
  const [tags, setTags] = useState(props.blogState?.tags ?? []);
  const [delay, setDelay] = useState(props.blogState?.url ? undefined : 30000);
  const [editorState, setEditorState] = useState(
    props.blogState?.editorState
      ? EditorState.createWithContent(stateFromHTML(props.blogState.editorState as string))
      : EditorState.createEmpty(),
  );
  const [error, setError] = useState<any>({});

  const alert = useAlert();
  const router = useRouter();
  const blogsService = useRef(new BlogService({ title, description, thumbnailURL, tags, editorState }));

  useInterval(async () => {
    if (blogsService.current.shouldUpdate({ title, description, thumbnailURL, tags, editorState })) {
      alert.show('Saving your draft...', { timeout: 2000, type: types.INFO });
      const mode = window.history.state.as.split('/').pop();
      try {
        if (mode === 'new') {
          const blog = await blogsService.current.create({ title, thumbnailURL, description, tags, editorState });
          router.push('/blogs/new', `/blogs/${blog.id}/edit`, { shallow: true });
        } else if (mode === 'edit') {
          const blogId = router.query.blogId ?? window.history.state.as.split('/')[2];
          await blogsService.current.update(blogId, { title, thumbnailURL, description, tags, editorState });
        }
      } catch (err) {
        setError(err);
      }
    }
  }, delay);

  const onPublish = async () => {
    try {
      const blogId = router.query.blogId ?? window.history.state.as.split('/')[2];
      if (blogsService.current.shouldUpdate({ title, description, thumbnailURL, tags, editorState })) {
        await blogsService.current.update(blogId, {
          title,
          description,
          thumbnailURL,
          tags,
          editorState,
        });
      }

      if (!props.blogState?.url) {
        const blog = await BlogService.publish(blogId);
        setDelay(undefined);
        window.open(`${config.blogsClientUrl}/${blog.url}`);
      } else {
        window.open(`${config.blogsClientUrl}/${props.blogState.url}`);
      }
    } catch (err) {
      setError(err);
    }
  };

  const mode = window.history.state.as.split('/').pop();

  const navControls = (
    <Button variant="primary" onClick={onPublish} disabled={mode === 'new'}>
      {props.blogState?.url ? 'Save' : 'Publish'}
    </Button>
  );

  return (
    <PageLayout navControls={navControls} title={mode === 'edit' ? `Edit Blog` : 'New Blog'}>
      <div className="flex flex-grow flex-col py-16 max-w-screen-md w-full self-center align-center">
        <Input
          value={title}
          onChange={setTitle}
          placeholder="Title"
          className="font-bold"
          style={{ fontSize: '2.5rem' }}
          borderless
        />
        <Input
          value={description}
          onChange={setDescription}
          placeholder="Description"
          className="mb-2 text-2xl text-grey-dark"
          borderless
        />
        <Input
          error={error.thumbnailURL}
          value={thumbnailURL}
          onChange={setThumbnailURL}
          placeholder="Thumbnail Url"
          type="url"
        />
        <TagsInput tags={tags} onChange={setTags} limit={5} className="my-4" />
        <Editor editorState={editorState} onChange={setEditorState} />
      </div>
    </PageLayout>
  );
};

export default EditorLayout;
