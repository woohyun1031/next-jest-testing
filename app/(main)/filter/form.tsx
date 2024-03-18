'use client';

import React, { Fragment, Suspense } from 'react';
import FilterForm from '@forms/edu/FilterForm';
import { IOrgCourseListResponses } from '#types/course';
import BodyForm from '@forms/edu/BodyForm';
import { useSearchParams } from 'next/navigation';
import { CourseDispatch, courseReducer } from '@contexts/courseContext';
import {
  PaginationDispatch,
  paginationInitialState,
  paginationReducer,
} from '@contexts/paginationContext';

export default function Form(props: IOrgCourseListResponses) {
  const searchParams = useSearchParams();

  const [courseState, courseDispatch] = React.useReducer(courseReducer, {
    courses: props.courses,
    courseCount: props.course_count,
  });

  const [paginationState, paginationDispatch] = React.useReducer(
    paginationReducer,
    paginationInitialState,
  );

  const courseContextValue = React.useMemo(
    () => ({ courseState, courseDispatch }),
    [courseState, courseDispatch],
  );

  const paginationContextValue = React.useMemo(
    () => ({ paginationState, paginationDispatch }),
    [paginationState, paginationDispatch],
  );

  React.useEffect(() => {
    paginationDispatch({
      type: 'update',
      offsetCnt: 0,
    });
  }, [searchParams]);

  React.useEffect(() => {
    courseDispatch({
      type: 'update',
      courseGroup: {
        courses: props.courses,
        courseCount: props.course_count,
      },
    });
  }, [props]);

  return (
    <Fragment>
      <Suspense>
        <FilterForm />
      </Suspense>
      <Suspense>
        <CourseDispatch.Provider value={courseContextValue}>
          <PaginationDispatch.Provider value={paginationContextValue}>
            <BodyForm />
          </PaginationDispatch.Provider>
        </CourseDispatch.Provider>
      </Suspense>
    </Fragment>
  );
}
