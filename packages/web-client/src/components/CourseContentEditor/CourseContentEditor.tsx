import React, { useState, useEffect } from 'react';
import { Button } from '@skillfuze/ui-components';
import { CourseLesson, Video, Blog } from '@skillfuze/types';
import shortid from 'shortid';
import CourseLessonEditor from './CourseLessonEditor';

const createDefaultLesson = (order: number): CourseLessonElement =>
  ({
    key: shortid(),
    order,
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
  videos,
}: CourseContentEditorProps) => {
  const [lessonsElements, setLessonsElements] = useState<CourseLessonElement[]>(() => {
    if (lessons.length) {
      return lessons.map((lesson) => ({ ...lesson, key: shortid() }));
    }

    return [createDefaultLesson(1)];
  });

  const onChange = (order: number, payload: CourseLessonElement) => {
    setLessonsElements((prev) =>
      prev.map((lesson) => {
        if (lesson.order === order) {
          return payload;
        }

        return lesson;
      }),
    );
  };

  useEffect(() => {
    onChangeLessons(lessonsElements.map((lesson) => ({ ...lesson, key: undefined })));
  }, [lessonsElements]);

  const onDelete = (order: number) => {
    setLessonsElements((prev) =>
      prev.filter((lesson) => lesson.order !== order).map((lesson, index) => ({ ...lesson, order: index + 1 })),
    );
  };

  return (
    <div className="flex flex-col w-full space-y-3">
      {lessonsElements.map((lesson) => (
        <CourseLessonEditor
          blogs={blogs}
          videos={videos}
          key={lesson.key}
          data={lesson}
          onChange={onChange}
          onDelete={onDelete}
        />
      ))}

      <Button
        className="self-start"
        variant="outlined"
        color="secondary"
        onClick={() => {
          setLessonsElements((prev) => [...prev, createDefaultLesson(prev.length + 1)]);
        }}
      >
        +
      </Button>
    </div>
  );
};

export default CourseContentEditor;
