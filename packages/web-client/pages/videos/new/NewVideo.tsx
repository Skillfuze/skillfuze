/* eslint-disable react/jsx-boolean-value */
import React, { useState } from 'react';
import { Input, TagsInput, Button } from '@skillfuze/ui-components';
import { useRouter } from 'next/router';

import Layout from '../../../components/Layout';
import NoSSR from '../../../components/NoSSR';
import VideoUploader from '../../../components/VideoUploader';
import { VideosService } from '../../../services/videos.service';

const NewVideo = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnailURL, setThumbnailURL] = useState('');
  const [tags, setTags] = useState([]);
  const [videoURL, setVideoURL] = useState<string>(undefined);
  const [error, setError] = useState<any>({});
  const router = useRouter();

  const handlePublishVideo = async () => {
    try {
      const video = await VideosService.create({ title, description, thumbnailURL, tags, url: videoURL });
      router.push('/videos/[id]', `/videos/${video.id}`);
    } catch (err) {
      setError(err);
    }
  };
  const onUploadComplete = ({ successful }) => {
    const [video] = successful;
    if (video) {
      setVideoURL(video.uploadURL);
    }
  };

  return (
    <Layout>
      <div className="container flex flex-grow mx-auto flex-wrap-reverse">
        <div className="flex flex-1 flex-col p-6 justify-center">
          <NoSSR>
            <VideoUploader onComplete={onUploadComplete} />
          </NoSSR>
        </div>
        <div className="flex flex-1 flex-col p-6 justify-center space-y-6">
          <h1 className="font-bold">Upload New Video</h1>
          <Input error={error.title} placeholder="Title" onChange={setTitle} value={title} />
          <Input
            error={error.description}
            placeholder="Description"
            onChange={setDescription}
            value={description}
            multiline
            rows={6}
          />
          <Input
            error={error.thumbnailURL}
            placeholder="Thumbnail URL"
            onChange={setThumbnailURL}
            value={thumbnailURL}
          />
          <TagsInput onChange={setTags} tags={tags} />
          <Button onClick={handlePublishVideo} disabled={!videoURL}>
            PUBLISH
          </Button>
        </div>
      </div>
    </Layout>
  );
};
export default NewVideo;
