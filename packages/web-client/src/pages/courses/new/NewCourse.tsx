import React from 'react';
import { Input } from '@skillfuze/ui-components';
import Layout from '../../../components/Layout';
import MultiStepForm, { Step } from '../../../components/MultiStepForm';

const NewCourse = () => {
  return (
    <Layout title="New Course">
      <div className="container flex max-w-screen-sm mx-auto items-center justify-center flex-grow flex-col p-6">
        <MultiStepForm>
          <Step
            title="What is your course about?"
            description="Give your course a cool title and description, you can always change
them later"
          >
            <Input placeholder="Title" />
            <Input placeholder="Description" multiline rows={6} />
          </Step>
          <Step title="Title 2" description="Description for Title 2">
            <h2>Step 2</h2>
          </Step>
          <Step title="Title 3" description="Description for Title 3">
            <h2>Step 3</h2>
          </Step>
          <Step title="Title 4" description="Description for Title 4">
            <h2>Step 4</h2>
          </Step>
          <Step title="Title 5" description="Description for Title 5">
            <h2>Step 5</h2>
          </Step>
          <Step title="Title 6" description="Description for Title 6">
            <h2>Step 6</h2>
          </Step>
        </MultiStepForm>
      </div>
    </Layout>
  );
};

export default NewCourse;
