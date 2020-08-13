import React, { useState, useEffect } from 'react';
import { PaginatedResponse, Course, UserTokenPayload } from '@skillfuze/types';
import { Button, Loading } from '@skillfuze/ui-components';
import Layout from '../../components/Layout';
import { CoursesList } from '../../components/MaterialsLists';
import { CoursesService } from '../../services/courses.service';
import withAuth from '../../utils/withAuth';

interface Props {
  initialCourses: PaginatedResponse<Course>;
  user?: UserTokenPayload;
}
const CoursesPage = ({ initialCourses, user }: Props) => {
  const [courses, setCourses] = useState(initialCourses);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setCourses(initialCourses);
  }, [initialCourses]);

  const coursesLoadMore = async (): Promise<void> => {
    setIsLoading(true);
    const res = await CoursesService.getAllCourses({ skip: courses.data.length });
    setCourses((prev) => ({ data: [...prev.data, ...res.data], count: res.count }));
    setIsLoading(false);
  };

  return (
    <Layout user={user} title="All Courses">
      <div className="container flex flex-col flex-grow p-4 max-w-screen-xl mx-auto">
        <h1>All Courses</h1>
        <hr className="opacity-50 text-grey-dark mt-2" />
        <CoursesList courses={courses.data} />
        {courses.data.length < courses.count && (
          <Button className="self-center" variant="outlined" onClick={coursesLoadMore} disabled={isLoading}>
            {isLoading ? <Loading /> : 'Load More'}
          </Button>
        )}
      </div>
    </Layout>
  );
};

CoursesPage.getInitialProps = async () => {
  const initialCourses = await CoursesService.getAllCourses();
  return { initialCourses };
};

export default withAuth({})(CoursesPage);
