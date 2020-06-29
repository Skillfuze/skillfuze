/* eslint-disable react/jsx-boolean-value */
import React, { useState, useEffect } from 'react';
import { Input, TagsInput, Button, SelectField } from '@skillfuze/ui-components';
import { Video, Category } from '@skillfuze/types';
import { useRouter } from 'next/router';

import NoSSR from '../NoSSR';
import VideoUploader from '../VideoUploader';
import { CategoriesService } from '../../services/categories.service';
import config from '../../../config';
import { VideosService } from '../../services/videos.service';

interface Props {
  video?: Video;
}

const VideoData: React.FC<Props> = ({ video }: Props) => {
  const editMode = Boolean(video);

  const [title, setTitle] = useState(editMode ? video.title : '');
  const [description, setDescription] = useState(editMode ? video.description : '');
  const [thumbnailURL, setThumbnailURL] = useState(editMode ? video.thumbnailURL : undefined);
  const [tags, setTags] = useState(editMode ? video.tags : []);
  const [videoURL, setVideoURL] = useState<string>();
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState<any>(
    editMode ? { value: video.category, label: video.category.name } : undefined,
  );
  const [error, setError] = useState<any>({});
  const router = useRouter();

  useEffect(() => {
    const loadCategories = async () => {
      setCategories((await CategoriesService.getAll()).map((cat) => ({ value: cat, label: cat.name })));
    };
    loadCategories();
  }, []);

  const onUploadComplete = ({ successful }) => {
    const [uplaodedVideo] = successful;
    if (uplaodedVideo) {
      const file = uplaodedVideo.uploadURL.split('/').pop();
      const isProd = process.env.NODE_ENV === 'production';
      setVideoURL(isProd ? `${config.s3Bucket}/videos/${file}` : `${config.httpStreamingServerURL}/videos/${file}`);
    }
  };

  const handleOnClick = async () => {
    if (!editMode) {
      try {
        const uplaodedVideo = await VideosService.create({
          title,
          description,
          thumbnailURL,
          tags,
          url: videoURL,
          category: category?.value as Category,
        });
        router.push('/videos/[videoId]', `/videos/${uplaodedVideo.id}`);
      } catch (err) {
        setError(err);
      }
    } else {
      try {
        await VideosService.update(video.id, {
          title,
          description,
          thumbnailURL: thumbnailURL === '' ? undefined : thumbnailURL,
          tags,
          category: category?.value as Category,
        });
        router.push('/videos/[videoId]', `/videos/${video.id}`);
      } catch (err) {
        setError(err);
      }
    }
  };
  return (
    <>
      <div
        className={
          editMode
            ? 'container flex flex-grow mx-auto flex-wrap-reverse max-w-screen-sm'
            : 'container flex flex-grow mx-auto flex-wrap-reverse'
        }
      >
        {!editMode && (
          <div className="flex sub-container overflow-auto flex-col p-6 justify-center">
            <NoSSR>
              <VideoUploader onComplete={onUploadComplete} />
            </NoSSR>
          </div>
        )}
        <div className="flex sub-container flex-col p-6 justify-center space-y-6">
          <h1 className="font-bold">{video ? 'Edit Video' : 'Upload New Video'}</h1>
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
          <SelectField
            placeholder="Select Category"
            onChange={setCategory}
            options={categories}
            error={error.category}
            defaultValue={category}
          />
          <TagsInput onChange={setTags} tags={tags} />
          <Button onClick={handleOnClick} disabled={!videoURL && !editMode}>
            {editMode ? 'Submit' : 'publish'}
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
    </>
  );
};

export default VideoData;
