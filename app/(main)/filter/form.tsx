'use client';

import React, { Fragment, Suspense } from 'react';
import FilterForm from '@forms/edu/FilterForm';
import { IOrgCourseListResponses } from '#types/course';
import { CoursesContext } from '@contexts/contexts';
import CourseCard from '@components/edu/body/CourseCard';
import Pagination from '@components/edu/pagination/Pagination';
import SectionWraper from '@components/edu/SectionWraper';
import BodyForm from '@forms/edu/BodyForm';

export default function Form(props: IOrgCourseListResponses) {
  const [courseObject, setCourseObject] = React.useState({
    courses: props.courses,
    courseCount: props.course_count,
  });

  const contextsValue = React.useMemo(
    () => ({ courseObject, setCourseObject }),
    [courseObject, setCourseObject],
  );

  React.useEffect(() => {
    setCourseObject({
      courses: props.courses,
      courseCount: props.course_count,
    });
  }, [props]);

  return (
    <Fragment>
      <Suspense>
        <FilterForm />
      </Suspense>
      <Suspense>
        <CoursesContext.Provider value={contextsValue}>
          <BodyForm />
        </CoursesContext.Provider>
      </Suspense>
    </Fragment>
  );
}
