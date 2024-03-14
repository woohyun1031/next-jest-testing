'use client';

import React, { Fragment, Suspense } from 'react';
import FilterForm from '@forms/edu/FilterForm';
import { IOrgCourseListResponses } from '#types/course';
import { CoursesContext } from '@contexts/contexts';
import CourseCard from '@components/edu/body/CourseCard';
import Pagination from '@components/edu/pagination/Pagination';
import SectionWraper from '@components/edu/SectionWraper';

export default function Form(props: IOrgCourseListResponses) {
  const [courseObject, setCourseObject] = React.useState({
    courses: props.courses,
    courseCount: props.course_count
  });  

  const contextsValue = React.useMemo(
    () => ({ courseObject, setCourseObject }),
    [courseObject, setCourseObject],
  );

  React.useEffect(() => {
    setCourseObject({
        courses: props.courses, 
        courseCount: props.course_count
      })    
  }, [props]);

  return (
    <Fragment>
      <Suspense>
        <FilterForm />
      </Suspense>
      <Suspense>
        <CoursesContext.Provider value={contextsValue}>
          <SectionWraper>
            <div
              className={`${
                courseObject.courseCount ? 'border-b border-solid border-gray-200' : ''
              }  py-3`}
            >
              <div className="inline-block text-xs font-semibold">
                전체 {courseObject.courseCount}개
              </div>
            </div>
          </SectionWraper>
          <SectionWraper className="flex flex-wrap gap-4">
            {courseObject.courses.map((course) => (
              <CourseCard key={course.id} {...course} />
            ))}
          </SectionWraper>
          <SectionWraper className="mt-6 flex justify-center">
            <Pagination total={courseObject.courseCount} courseLength={courseObject.courses.length} />
          </SectionWraper>
        </CoursesContext.Provider>
      </Suspense>
    </Fragment>
  );
}
