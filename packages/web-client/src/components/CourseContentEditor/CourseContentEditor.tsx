import React, { useState, useEffect } from 'react';
import { SelectField, Input, Button } from '@skillfuze/ui-components';
import { CourseLesson, Video, Blog } from '@skillfuze/types';
import shortid from 'shortid';

interface CourseLessonEditorProps {
  data: CourseLesson;
  onChange: (number, CourseLesson) => void;
  onDelete: (number) => void;
  blogs: Blog[];
}

const CourseLessonEditor = ({ onChange, data, onDelete, blogs }: CourseLessonEditorProps) => {
  const [lessonName, setLessonName] = useState(data.title ?? '');
  const [selectedTab, setSelectedTab] = useState('Video');

  useEffect(() => {
    onChange(data.order, {
      ...data,
      title: lessonName,
      type: selectedTab,
    });
  }, [lessonName, selectedTab]);

  const onDeletePressed = () => {
    onDelete(data.order);
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
          options={blogs.map(blog => ({ label: blog.title, value: blog as any }))}
        />
      </div>
    </div>
  );
};

const createDefaultLesson = (order: number): CourseLessonElement =>
  ({
    key: shortid(),
    order,
    title: `Lesson ${order}`,
    type: 'Video',
  } as CourseLessonElement);

interface CourseLessonElement extends CourseLesson {
  key: string;
}

interface CourseContentEditorProps {
  lessons: CourseLesson[];
  onChangeLessons: (newLessons: CourseLesson[]) => void;
  videos: Video[];
  blogs: Blog[];
}

const CourseContentEditor: React.FC<CourseContentEditorProps> = ({
  lessons,
  onChangeLessons,
  blogs,
}: CourseContentEditorProps) => {
  const [lessonsElements, setLessonsElements] = useState<CourseLessonElement[]>(() => {
    if (lessons.length) {
      return lessons.map(lesson => ({ ...lesson, key: shortid() }));
    }

    return [createDefaultLesson(1)];
  });

  const onChange = (order: number, payload: CourseLessonElement) => {
    setLessonsElements(prev =>
      prev.map(lesson => {
        if (lesson.order === order) {
          return payload;
        }

        return lesson;
      }),
    );
  };

  useEffect(() => {
    onChangeLessons(lessonsElements.map(lesson => ({ ...lesson, key: undefined })));
  }, [lessonsElements]);

  const onDelete = (order: number) => {
    setLessonsElements(prev =>
      prev.filter(lesson => lesson.order !== order).map((lesson, index) => ({ ...lesson, order: index + 1 })),
    );
  };

  return (
    <div className="flex flex-col w-full space-y-3">
      {lessonsElements.map(lesson => (
        <CourseLessonEditor blogs={blogs} key={lesson.key} data={lesson} onChange={onChange} onDelete={onDelete} />
      ))}

      <Button
        className="self-start"
        variant="outlined"
        color="secondary"
        onClick={() => {
          setLessonsElements(prev => [...prev, createDefaultLesson(prev.length + 1)]);
        }}
      >
        +
      </Button>
    </div>
  );
};

export default CourseContentEditor;
