import React, { useState, useEffect } from 'react';
import { Input, TagsInput, Button, SelectField } from '@skillfuze/ui-components';
import { Category, Livestream } from '@skillfuze/types';

import { LivestreamService } from '../../services/livestreams.service';
import { CategoriesService } from '../../services/categories.service';
import config from '../../../config/index';

const LivestreamData = ({ livestream }: { livestream?: Livestream }) => {
  const editMode = Boolean(livestream);
  const serverURL = config.streamingServerURL;

  const [title, setTitle] = useState(editMode ? livestream.title : '');
  const [description, setDescription] = useState(editMode ? livestream.description : '');
  const [thumbnailURL, setThumbnailURL] = useState(editMode ? livestream.thumbnailURL : undefined);
  const [tags, setTags] = useState(editMode ? livestream.tags : []);
  const [streamKey, setStreamKey] = useState(editMode ? livestream.streamKey : '');
  const [category, setCategory] = useState<any>(
    editMode ? { value: livestream.category, label: livestream.category.name } : undefined,
  );
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState<any>({});

  useEffect(() => {
    const loadCategories = async () => {
      setCategories((await CategoriesService.getAll()).map((cat) => ({ value: cat, label: cat.name })));
    };
    loadCategories();
  }, []);

  const handleOnClick = async (event): Promise<void> => {
    event.preventDefault();
    if (!editMode) {
      try {
        const stream = await LivestreamService.create({
          title,
          description,
          thumbnailURL,
          tags,
          category: category?.value as Category,
        });
        setStreamKey(stream.streamKey);
      } catch (err) {
        setError(err);
      }
    } else {
      try {
        await LivestreamService.update(livestream.id, {
          title,
          description,
          thumbnailURL: thumbnailURL === '' ? undefined : thumbnailURL,
          tags,
          category: category?.value as Category,
        });
      } catch (err) {
        setError(err);
      }
    }
  };

  return (
    <>
      <div className="flex flex-grow px-40 items-center justify-center h-full">
        <div className="flex flex-col items-center w-1/2">
          <div className="flex flex-col w-2/3 space-y-6">
            <h1 className="font-bold text-left">{editMode ? 'Edit Livestream' : 'New Livestream'}</h1>
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
              defaultValue={category}
            />
            <TagsInput tags={tags} onChange={setTags} limit={5} className="w-full" />
            <Button className="mt-6 p-2 w-full" type="submit" onClick={handleOnClick}>
              {editMode ? 'Submit' : 'Generate Key'}
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
    </>
  );
};
export default LivestreamData;
