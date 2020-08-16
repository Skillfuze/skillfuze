import React from 'react';
import { Course } from '@skillfuze/types';
import { ContentCard, CourseInfoBar, Button } from '@skillfuze/ui-components';
import { useRouter } from 'next/router';

interface Props {
  courses: Course[];
  enrolled?: boolean;
  emptyLabel?: string;
}

const CoursesList: React.FC<Props> = (props: Props) => {
  const router = useRouter();
  return (
    <>
      {props.courses.length > 0 ? (
        <div className="grid grid-flow-row md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 py-4">
          {props.courses.map((course) => (
            <ContentCard
              className=""
              key={course.id}
              thumbnail={course.thumbnailURL}
              category={course.category?.name || ''}
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
        </div>
      ) : (
        <p className="pt-6 text-center text-sm">{props.emptyLabel}</p>
      )}
    </>
  );
};

CoursesList.defaultProps = {
  emptyLabel: 'No items here, try again later.',
};
export default CoursesList;
