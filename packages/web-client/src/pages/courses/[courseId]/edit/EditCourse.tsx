import React, { useState, useEffect } from 'react';
import { Input, TagsInput, SelectField } from '@skillfuze/ui-components';
import { User } from '@skillfuze/types';
import Layout from '../../../../components/Layout';
import MultiStepForm, { Step } from '../../../../components/MultiStepForm';
import { CategoriesService } from '../../../../services/categories.service';

interface Props {
  user: User;
}

const EditCourse = ({ user }: Props) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState([]);
  const [thumbnailURL, setThumbnailURL] = useState('');
  // TODO
  const [trailer, setTrailer] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const loadCategories = async () => {
      setCategories((await CategoriesService.getAll()).map(cat => ({ value: cat, label: cat.name })));
    };
    loadCategories();
  }, []);

  const onNext = () => {
    console.log('Hello from next');
    return true; // Create -> GetInitialProps (API POST -> C_ID) -> Redirect (Edit/C_ID)
  };
  return (
    <Layout title="New Course" user={user}>
      <div className="container flex max-w-screen-sm mx-auto items-center justify-center flex-grow flex-col p-6">
        <MultiStepForm onNext={onNext}>
          <Step
            title="What is your course about?"
            description="Give your course a cool title and description, you can always change
    them later"
          >
            <Input placeholder="Title" value={title} onChange={setTitle} />
            <Input placeholder="Description" multiline rows={6} value={description} onChange={setDescription} />
          </Step>

          <Step
            title="What category fits you best?"
            description="Choose a category that fits your course content and some related
    tags to the field"
          >
            <SelectField placeholder="Select Category" onChange={setCategory} options={categories} />
            <TagsInput tags={tags} onChange={setTags} limit={10} />
          </Step>

          <Step
            title="Time for promotions and price"
            description="Upload a promotional video and add a thumbnail to your course,
    also don’t forget to choose your pricing."
          >
            <Input placeholder="Thumbnail URL" value={thumbnailURL} onChange={setThumbnailURL} />
            <Input placeholder="Promotional Video" />
            <Input placeholder="Price" value={price} onChange={setPrice} />
          </Step>

          <Step
            title="What are you going to share with us?"
            description="Prepare your course content from your existing videos and blogs"
          >
            <h2>Step 4</h2>
          </Step>

          <Step title="" description="">
            <div className="flex flex-col items-center -mt-10">
              <Done width="120" />
              <h1 className="mt-10">You made it to the final step</h1>
              <h3 className="text-xl text-grey leading-tight">You can now publish your course</h3>
            </div>
          </Step>
        </MultiStepForm>
      </div>
    </Layout>
  );
};

export default EditCourse;
