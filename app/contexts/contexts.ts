import React, { createContext } from 'react';

import { IOrgCourse } from '#types/course';

interface CoursesContextType {
  courses: IOrgCourse[];
  setCourses: React.Dispatch<React.SetStateAction<IOrgCourse[]>>;
  courseCount: number;
  setCourseCount: React.Dispatch<React.SetStateAction<number>>;
}

export const CoursesContext = createContext<CoursesContextType>({
  courses: [],
  setCourses: () => {},
  courseCount: 0,
  setCourseCount: () => {},
});

export const PaginationContext = createContext<{
  offset: number;
  setOffset: React.Dispatch<React.SetStateAction<number>>;
}>({
  offset: 0,
  setOffset: () => {},
});
