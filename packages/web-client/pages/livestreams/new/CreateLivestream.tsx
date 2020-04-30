import React, { useState } from 'react';
import { Button, Input } from '@skillfuze/ui-components';
import withAuth from '../../../utils/withAuth/withAuth';
import Layout from '../../../components/Layout';
import LivestreamService from '../../../services/livestreams.service';
import config from '../../../config/index';

const CreateLiveStream = () => {
  const livestreamService = new LivestreamService();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnailURL, setThumbnailURL] = useState('');
  /* TAGSS TO DOO */
  const [tags, setTags] = useState('');
  const [streamKey, setStreamKey] = useState('');
  const [error, setError] = useState<any>({});
  const serverURL = config.streamingServerURL;
  const handleSubmit = async (event): Promise<void> => {
    event.preventDefault();
    try {
      const stream = await livestreamService.create({ title, description, thumbnailURL });
      setStreamKey(stream.streamKey);
    } catch (err) {
      setError(err);
    }
  };
  return (
    <Layout>
      <div className="flex flex-grow px-40 items-center justify-center h-full">
        <div className="flex flex-col items-center w-1/2">
          <form className="flex flex-col w-2/3" onSubmit={handleSubmit}>
            <h1 className="text-2xl font-bold text-left">New Livestream</h1>
            <Input className="mt-8 w-full" value={title} type="text" placeholder="Title" onChange={setTitle} />
            <Input
              error={error.title}
              className="mt-8 w-full"
              value={description}
              type="text"
              placeholder="Description"
              onChange={setDescription}
            />
            <Input
              className="mt-8 w-full"
              value={thumbnailURL}
              type="url"
              placeholder="ThumbnilURL"
              onChange={setThumbnailURL}
            />
            <Input className="mt-8 w-full" value={tags} type="text" placeholder="tags" onChange={setTags} />
            <Button className="mt-6 p-2 w-full" type="submit">
              Generate Key
            </Button>
          </form>
        </div>
        <div className="flex flex-col items-center w-1/2">
          <div className="w-2/3 ">
            <h3 className="font-bold text-xl mb-2">Guide:</h3>
            <p>Copy and paste the generated key and the server URL into your favorite streaming software</p>
            <h3 className=" mt-8 mb-2 w-full font-semibold text-lg">Stream Key</h3>
            <Input value={streamKey} type="text" />

            <h3 className=" mt-6 mb-2 w-full font-semibold text-lg">Server URL</h3>
            <Input value={serverURL} type="url" />
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default withAuth({
  // redirectOnAuthFailure: '/login',
})(CreateLiveStream);
