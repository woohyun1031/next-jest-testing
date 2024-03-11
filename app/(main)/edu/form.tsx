'use client';

import React, { Fragment, Suspense } from 'react';
import BodyForm from 'app/forms/edu/BodyForm';
import FilterForm from 'app/forms/edu/FilterForm';
import SearchForm from 'app/forms/edu/SearchForm';

import { IOrgCourseListResponses } from '#types/course';
import { CoursesContext } from '@contexts/contexts';

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
        <FilterForm />
      </Suspense>
      <Suspense>
        <CoursesContext.Provider value={contextsValue}>
          <BodyForm {...{ course_count: courseCount, courses }} />
        </CoursesContext.Provider>
      </Suspense>
    </Fragment>
  );
}
