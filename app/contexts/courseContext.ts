import React from 'react';
import { IOrgCourse } from '#types/course';

export type TCourseObject = {
  courses: IOrgCourse[];
  courseCount: number;
};

interface TActions {
  type: string;
  courseGroup: TCourseObject;
}

interface ICourseContext {
  courseState: TCourseObject;
  courseDispatch: React.Dispatch<TActions>;
}

export const initialState = {
  courseCount: 0,
  courses: [],
};

export const courseReducer = (state: TCourseObject, action: TActions) => {
  switch (action.type) {
    case 'update':
      return {
        ...state,
        courses: action.courseGroup.courses,
        courseCount: action.courseGroup.courseCount,
      };
    default:
      return state;
  }
};

export const CourseDispatch = React.createContext<ICourseContext>({
  courseState: initialState,
  courseDispatch: () => {},
});
