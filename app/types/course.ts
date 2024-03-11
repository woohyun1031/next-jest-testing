export interface IOrgCourse {
  id: number;
  title: string;
  logo_file_url: null | string;
  short_description: string;
  enroll_type: number;
  is_free: boolean;
  tags: string[];
}

export interface IOrgCourseListResponses {
  message?: string;
  course_count: number;
  courses: IOrgCourse[];
}

export interface IOrgCourseListRequests {
  course_count: number;
  courses: IOrgCourse[];
}

export type EssentialCourseKeys = (keyof IOrgCourse)[];
