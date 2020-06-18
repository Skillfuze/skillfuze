import React, { useState, useRef, useEffect } from 'react';
import { Input, TagsInput, Button, SelectField } from '@skillfuze/ui-components';
import { EditorState } from 'draft-js';
import { useAlert, types } from 'react-alert';

import { stateFromHTML } from 'draft-js-import-html';

import { useRouter } from 'next/router';
import { CreateBlogDTO, User } from '@skillfuze/types';
import Editor from './Editor';
import PageLayout from '../Layout';
import { BlogService, BlogState } from '../../services/blogs.service';
import { CategoriesService } from '../../services/categories.service';
import { useInterval } from '../../utils/hooks/useInterval';
import config from '../../../config';

interface Props {
  user: User;
  blogState?: BlogState;
}

const EditorLayout: React.FC<Props> = (props: Props) => {
  const [title, setTitle] = useState(props.blogState?.title ?? '');
  const [description, setDescription] = useState(props.blogState?.description ?? '');
  const [thumbnailURL, setThumbnailURL] = useState(props.blogState?.thumbnailURL);
  const [tags, setTags] = useState(props.blogState?.tags ?? []);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState<any>();
  const [delay, setDelay] = useState(props.blogState?.url ? undefined : 30000);
  const [editorState, setEditorState] = useState(
    props.blogState?.editorState
      ? EditorState.createWithContent(stateFromHTML(props.blogState.editorState as string))
      : EditorState.createEmpty(),
  );
  const [error, setError] = useState<any>({});

  useEffect(() => {
    const loadCategories = async () => {
      setCategories((await CategoriesService.getAll()).map((cat) => ({ value: cat, label: cat.name })));
    };
    loadCategories();
  }, []);

  const prepareBlogState = (): BlogState => ({
    title,
    description,
    thumbnailURL,
    category: category?.value,
    tags,
    editorState,
  });

  const prepareBlogPayload = (): CreateBlogDTO => BlogService.blogStateToDTO(prepareBlogState());

  const alert = useAlert();
  const router = useRouter();
  const blogsService = useRef(new BlogService(prepareBlogState()));

  useInterval(async () => {
    if (blogsService.current.shouldUpdate(prepareBlogState())) {
      alert.show('Saving your draft...', { timeout: 2000, type: types.INFO });
      const mode = window.history.state.as.split('/').pop();
      try {
        if (mode === 'new') {
          const blog = await blogsService.current.create(prepareBlogPayload());
          router.push('/blogs/new', `/blogs/${blog.id}/edit`, { shallow: true });
        } else if (mode === 'edit') {
          const blogId = router.query.blogId ?? window.history.state.as.split('/')[2];
          await blogsService.current.update(blogId, prepareBlogPayload());
        }
      } catch (err) {
        setError(err);
      }
    }
  }, delay);

  const onPublish = async () => {
    try {
      const blogId = router.query.blogId ?? window.history.state.as.split('/')[2];
      if (blogsService.current.shouldUpdate(prepareBlogState())) {
        await blogsService.current.update(blogId, prepareBlogPayload());
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
    <PageLayout navControls={navControls} title={mode === 'edit' ? `Edit Blog` : 'New Blog'} user={props.user}>
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
          placeholder="Thumbnail URL"
          className="mb-4"
          type="url"
        />
        <SelectField placeholder="Select Category" onChange={setCategory} options={categories} error={error.category} />
        <TagsInput tags={tags} onChange={setTags} limit={5} className="my-4" />
        <Editor editorState={editorState} onChange={setEditorState} />
      </div>
    </PageLayout>
  );
};

export default EditorLayout;
