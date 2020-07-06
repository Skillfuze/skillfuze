import React, { useState, useEffect } from 'react';
import { SelectField, Input } from '@skillfuze/ui-components';
import { CourseLesson, Video, Blog } from '@skillfuze/types';

interface CourseLessonEditorProps {
  data: CourseLesson;
  onChange: (number, CourseLesson) => void;
  onDelete: (number) => void;
  blogs: Blog[];
  videos: Video[];
}

const CourseLessonEditor = ({ onChange, data, onDelete, blogs, videos }: CourseLessonEditorProps) => {
  const [lessonName, setLessonName] = useState(data.title ?? '');
  const [selectedTab, setSelectedTab] = useState(data.type ?? 'Video');
  const [materialId, setMaterialId] = useState(data.materialId ?? '');

  const [mappedVideos] = useState(() => videos.map((video) => ({ label: video.title, value: video as any })));
  const [mappedBlogs] = useState(() => blogs.map((blog) => ({ label: blog.title, value: blog as any })));

  const getMaterial = (id) => {
    for (let i = 0; i < blogs.length; i += 1) {
      if (blogs[i].id === id) {
        return { value: blogs[i] as any, label: blogs[i].title };
      }
    }
    for (let i = 0; i < videos.length; i += 1) {
      if (videos[i].id === id) {
        return { value: videos[i] as any, label: videos[i].title };
      }
    }
    return undefined;
  };

  useEffect(() => {
    onChange(data.order, {
      ...data,
      title: lessonName,
      type: selectedTab,
      material: { id: materialId },
    });
  }, [lessonName, selectedTab, materialId]);

  const onDeletePressed = () => {
    onDelete(data.order);
  };

  const onSelect = (material: any) => {
    setMaterialId(material.value.id);
  };

  return (
    <div className="flex w-full flex-col rounded border border-solid border-grey">
      <div className="flex justify-between border-b border-solid border-grey pl-4">
        <Input
          className="font-semibold"
          placeholder="Lesson Name..."
          borderless
          value={lessonName}
          onChange={setLessonName}
        />
        <div className="flex">
          <button
            className={`font-semibold text-sm border-b border-solid outline-none px-4 -m-px ${
              selectedTab === 'Video' ? `border-primary text-primary` : `border-grey text-black`
            } `}
            onClick={() => {
              setSelectedTab('Video');
            }}
          >
            Video
          </button>
          <button
            className={`font-semibold text-sm  border-b border-solid outline-none px-4 -m-px ${
              selectedTab === 'Blog' ? `border-primary text-primary` : `border-grey text-black`
            }`}
            onClick={() => {
              setSelectedTab('Blog');
            }}
          >
            Blog
          </button>
          <button className="px-4 text-grey outline-none" onClick={onDeletePressed}>
            x
          </button>
        </div>
      </div>
      <div className="p-4">
        <SelectField
          placeholder="Select from existing content..."
          options={selectedTab === 'Blog' ? mappedBlogs : mappedVideos}
          onChange={onSelect}
          defaultInputValue={getMaterial(materialId)?.label}
        />
      </div>
    </div>
  );
};

export default CourseLessonEditor;
