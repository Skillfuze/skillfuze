import React from 'react';
import { Course } from '@skillfuze/types';
import { ContentCard, CourseInfoBar, Button } from '@skillfuze/ui-components';
import { useRouter } from 'next/router';

interface Props {
  courses: Course[];
  enrolled?: boolean;
}

const CoursesList: React.FC<Props> = (props: Props) => {
  const router = useRouter();
  return (
    <>
      {props.courses.map((course) => (
        <ContentCard
          className=""
          key={course.id}
          thumbnail={course.thumbnailURL}
          category={course.category.name}
          title={course.title}
          userName={`${course.creator.firstName} ${course.creator.lastName}`}
          userAvatar={course.creator.avatarURL}
          createdAt={course.createdAt}
          infoBar={<CourseInfoBar rate={4.5} price={course.price} />}
          callToActionButton={!props.enrolled && <Button>ENROLL</Button>}
          onClick={() => {
            router.push(`/courses/[courseId]`, `/courses/${course.id}`);
          }}
        />
      ))}
    </>
  );
};

export default CoursesList;
