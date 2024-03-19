export interface IOrgCourse {
  id: number;
  title: string;
  logo_file_url: null | string;
  short_description: string;
  enroll_type: number;
  is_free: boolean;
  tags: string[];
}

export interface IEliceResponse {
  _result: { status: 'ok' | 'fail'; reason: string };
}
export interface IOrgCourseListResponses extends IEliceResponse {
  message?: string;
  course_count: number;
  courses: IOrgCourse[];
}

export interface IErrorResponses extends IEliceResponse {
  fail_code: string;
  fail_message: string;
}

export interface IOrgCourseListRequests {
  course_count: number;
  courses: IOrgCourse[];
}

export type EssentialCourseKeys = (keyof IOrgCourse)[];
