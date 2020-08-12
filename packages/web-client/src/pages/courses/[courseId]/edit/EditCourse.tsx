import React, { useState, useEffect } from 'react';
import { Input, TagsInput, SelectField } from '@skillfuze/ui-components';
import { User, Course, AttachmentType } from '@skillfuze/types';
import { useRouter } from 'next/router';
import mixpanel from 'mixpanel-browser';
import Layout from '../../../../components/Layout';
import MultiStepForm, { Step } from '../../../../components/MultiStepForm';
import { CategoriesService } from '../../../../services/categories.service';
import Done from '../../../../../assets/icons/done.svg';
import { CoursesService } from '../../../../services/courses.service';
import withAuth from '../../../../utils/withAuth';
import CourseContentEditor from '../../../../components/CourseContentEditor/CourseContentEditor';
import { UsersService } from '../../../../services/users.service';
import UploadButton from '../../../../components/UploadButton';
import { mixpanelEvents } from '../../../../../config/mixpanel.events';

interface Props {
  user: User;
  course: Course;
}

const EditCourse = ({ user, course }: Props) => {
  const [title, setTitle] = useState(course.title ?? '');
  const [description, setDescription] = useState(course.description ?? '');
  const [tags, setTags] = useState(course.tags ?? []);
  const [thumbnailURL, setThumbnailURL] = useState(course.thumbnailURL ?? undefined);
  const [trailerURL, setTrailerURL] = useState(course.trailerURL ?? undefined);
  const [price, setPrice] = useState(course.price ? course.price.toString() : '0');
  const [category, setCategory] = useState<any>(
    course.category ? { value: course.category, label: course.category.name } : undefined,
  );
  const [lessons, setLessons] = useState(course.lessons ?? []);

  const [categories, setCategories] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [videos, setVideos] = useState([]);

  const [errors, setErrors] = useState<any>({});

  const [slug, setSlug] = useState(course.slug);

  useEffect(() => {
    const loadData = async () => {
      const [loadedCategories, loadedBlogs, loadedVideos] = await Promise.all([
        CategoriesService.getAll(),
        UsersService.getBlogs(user.username),
        UsersService.getVideos(user.username),
      ]);

      mixpanel.identify(user.id || 'GUEST');
      mixpanel.track(mixpanelEvents.EDIT_COURSE);

      setCategories(loadedCategories.map((cat) => ({ value: cat, label: cat.name })));
      setBlogs(loadedBlogs.data);
      setVideos(loadedVideos.data);
    };
    loadData();
  }, []);

  const router = useRouter();

  const onPageChange = async () => {
    const payload = {
      title,
      description,
      tags,
      thumbnailURL,
      trailerURL,
      price: parseFloat(price),
      category: category?.value,
      lessons,
    };

    if (Number.isNaN(payload.price)) {
      payload.price = (price as unknown) as number;
    }

    try {
      const { slug: newSlug } = await CoursesService.update(course.id, payload);
      setSlug(newSlug);
      return true;
    } catch (error) {
      setErrors(error);
      return false;
    }
  };

  const onPublish = async () => {
    await CoursesService.publish(course.id);
    router.push('/courses/[courseSlug]', `/courses/${slug}`);
  };

  return (
    <Layout title="Edit Course" user={user}>
      <div className="container flex max-w-screen-sm mx-auto items-center justify-center flex-grow flex-col p-6">
        <MultiStepForm onPageChange={onPageChange} onPublish={onPublish}>
          <Step
            title="What is your course about?"
            description="Give your course a cool title and description, you can always change
    them later"
          >
            <Input placeholder="Title..." value={title} onChange={setTitle} label="Title" />
            <Input
              placeholder="Description..."
              multiline
              rows={6}
              value={description}
              onChange={setDescription}
              label="Description"
            />
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
            <UploadButton
              label="Thumbnail"
              onUploadComplete={setThumbnailURL}
              accept="image/*"
              type={AttachmentType.COURSE_THUMBNAIL}
            />
            <UploadButton
              label="Promotional Video"
              onUploadComplete={setTrailerURL}
              accept="video/*"
              type={AttachmentType.COURSE_TRAILER}
            />
            <Input placeholder="Price" value={price} onChange={setPrice} label="Price" error={errors.price} />
          </Step>

          <Step
            title="What are you going to share with us?"
            description="Prepare your course content from your existing videos and blogs"
          >
            <CourseContentEditor lessons={lessons} onChangeLessons={setLessons} videos={videos} blogs={blogs} />
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

EditCourse.getInitialProps = async (context) => {
  const course = await CoursesService.get(context.query.courseId);
  return { course };
};

export default withAuth({
  redirectOnAuthFailure: '/login',
})(EditCourse);
