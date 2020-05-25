import React, { useState, useEffect } from 'react';
import { Input, TagsInput, Button, SelectField } from '@skillfuze/ui-components';
import { Category } from '@skillfuze/types';

import withAuth from '../../../utils/withAuth/withAuth';
import Layout from '../../../components/Layout';
import LivestreamService from '../../../services/livestreams.service';
import { CategoriesService } from '../../../services/categories.service';
import config from '../../../../config/index';

const CreateLiveStream = () => {
  const livestreamService = new LivestreamService();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnailURL, setThumbnailURL] = useState('');
  const [tags, setTags] = useState([]);
  const [streamKey, setStreamKey] = useState('');
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState<any>();
  const [error, setError] = useState<any>({});
  const serverURL = config.streamingServerURL;

  useEffect(() => {
    const loadCategories = async () => {
      setCategories((await CategoriesService.getAll()).map(cat => ({ value: cat, label: cat.name })));
    };
    loadCategories();
  }, []);

  const handleSubmit = async (event): Promise<void> => {
    event.preventDefault();
    try {
      const stream = await livestreamService.create({
        title,
        description,
        thumbnailURL,
        category: category?.value as Category,
      });
      setStreamKey(stream.streamKey);
    } catch (err) {
      setError(err);
    }
  };

  return (
    <Layout title="New Livestream">
      <div className="flex flex-grow px-40 items-center justify-center h-full">
        <div className="flex flex-col items-center w-1/2">
          <div className="flex flex-col w-2/3 space-y-6">
            <h1 className="font-bold text-left">New Livestream</h1>
            <Input
              error={error.title}
              className="w-full"
              value={title}
              type="text"
              placeholder="Title"
              onChange={setTitle}
            />
            <Input
              error={error.description}
              className="w-full"
              value={description}
              type="text"
              placeholder="Description"
              onChange={setDescription}
              multiline
              rows={6}
            />
            <Input
              error={error.thumbnailURL}
              className="w-full"
              value={thumbnailURL}
              type="url"
              placeholder="Thumbnail URL"
              onChange={setThumbnailURL}
            />
            <SelectField
              placeholder="Select Category"
              onChange={setCategory}
              options={categories}
              error={error.category}
            />
            <TagsInput tags={tags} onChange={setTags} limit={5} className="w-full" />
            <Button className="mt-6 p-2 w-full" type="submit" onClick={handleSubmit}>
              Generate Key
            </Button>
          </div>
        </div>
        <div className="flex flex-col items-center w-1/2">
          <div className="w-2/3 ">
            <h3 className="font-bold text-xl mb-2">Guide:</h3>
            <p>Copy and paste the generated key and the server URL into your favorite streaming software</p>
            <h3 className="mt-8 mb-2 w-full font-semibold text-lg">Stream Key</h3>
            <Input value={streamKey} disabled type="text" />

            <h3 className="mt-6 mb-2 w-full font-semibold text-lg">Server URL</h3>
            <Input value={serverURL} disabled type="url" />
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default withAuth({
  redirectOnAuthFailure: '/login',
})(CreateLiveStream);
