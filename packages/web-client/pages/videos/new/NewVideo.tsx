/* eslint-disable react/jsx-boolean-value */
import React, { useState } from 'react';
import { Input, TagsInput, Button } from '@skillfuze/ui-components';
import { useRouter } from 'next/router';

import Layout from '../../../components/Layout';
import NoSSR from '../../../components/NoSSR';
import VideoUploader from '../../../components/VideoUploader';
import { VideosService } from '../../../services/videos.service';
import config from '../../../config';
import withAuth from '../../../utils/withAuth';

const NewVideo = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnailURL, setThumbnailURL] = useState();
  const [tags, setTags] = useState([]);
  const [videoURL, setVideoURL] = useState<string>();
  const [error, setError] = useState<any>({});
  const router = useRouter();

  const handlePublishVideo = async () => {
    try {
      const video = await VideosService.create({ title, description, thumbnailURL, tags, url: videoURL });
      router.push('/videos/[videoId]', `/videos/${video.id}`);
    } catch (err) {
      setError(err);
    }
  };

  const onUploadComplete = ({ successful }) => {
    const [video] = successful;
    if (video) {
      const file = video.uploadURL.split('/').pop();
      const isProd = process.env.NODE_ENV === 'production';
      setVideoURL(isProd ? `${config.s3Bucket}/videos/${file}` : `${config.httpStreamingServerURL}/videos/${file}`);
    }
  };

  return (
    <Layout title="New Video">
      <div className="container flex flex-grow mx-auto flex-wrap-reverse">
        <div className="flex sub-container overflow-auto flex-col p-6 justify-center">
          <NoSSR>
            <VideoUploader onComplete={onUploadComplete} />
          </NoSSR>
        </div>
        <div className="flex sub-container flex-col p-6 justify-center space-y-6">
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
      <style jsx>
        {`
          .sub-container {
            flex: 1 0 50%;
          }
        `}
      </style>
    </Layout>
  );
};

export default withAuth({ redirectOnAuthFailure: '/login' })(NewVideo);
