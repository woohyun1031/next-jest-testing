import React, { createContext } from 'react';

import { IOrgCourse } from '#types/course';

type TCourseObject = {
  courses: IOrgCourse[];
  courseCount: number,
}
interface CoursesContextType {
  courseObject: TCourseObject,
  setCourseObject: React.Dispatch<React.SetStateAction<TCourseObject>>  
}

export const CoursesContext = createContext<CoursesContextType>({
  courseObject: {
    courses: [],
    courseCount: 0,
  },
  setCourseObject: () => {},  
});

export const PaginationContext = createContext<{
  offset: number;
  setOffset: React.Dispatch<React.SetStateAction<number>>;
}>({
  offset: 0,
  setOffset: () => {},
});
