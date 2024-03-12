'use client';

import React, { Fragment, Suspense } from 'react';
import BodyForm from '@forms/edu/BodyForm';
import SearchForm from '@forms/edu/SearchForm';

import { IOrgCourseListResponses } from '#types/course';
import { CoursesContext } from '@contexts/contexts';
import CourseCard from '@components/edu/body/CourseCard';
import Pagination from '@components/edu/pagination/Pagination';
import SectionWraper from '@components/edu/SectionWraper';

export default function Form(props: IOrgCourseListResponses) {
  const [courses, setCourses] = React.useState(props.courses);
  const [courseCount, setCourseCount] = React.useState(props.course_count);

  const contextsValue = React.useMemo(
    () => ({ courses, setCourses, courseCount, setCourseCount }),
    [courses, courseCount, setCourses, setCourseCount],
  );

  React.useEffect(() => {
    setCourses(props.courses);
    setCourseCount(props.course_count);
  }, [props]);

  return (
    <Fragment>
      <Suspense>
        <SearchForm />
      </Suspense>
      <Suspense>
        <CoursesContext.Provider value={contextsValue}>
          <SectionWraper>
            <div
              className={`${
                courseCount ? 'border-b border-solid border-gray-200' : ''
              }  py-3`}
            >
              <div className="inline-block text-xs font-semibold">
                전체 {courseCount}개
              </div>
            </div>
          </SectionWraper>
          <SectionWraper className="flex flex-wrap gap-4">
            {courses.map((course) => (
              <CourseCard key={course.id} {...course} />
            ))}
          </SectionWraper>
          <SectionWraper className="mt-6 flex justify-center">
            <Pagination total={courseCount} courseLength={courses.length} />
          </SectionWraper>
        </CoursesContext.Provider>
      </Suspense>
    </Fragment>
  );
}
