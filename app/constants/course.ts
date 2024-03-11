import { EssentialCourseKeys } from '#types/course';

export const COURSE_CONVERT_OBJECTS: Record<
  string,
  (v: string) => Record<string, Object> | undefined
> = {
  keyword: (value) => {
    return { title: `%${value}%` };
  },
  price: (value) => {
    switch (value) {
      case '29':
        return { enroll_type: 0, is_free: true };
      case '30':
        return { enroll_type: 0, is_free: false };
      default:
        return;
    }
  },
};

export const ESSENTIAL_COURSE_KEYS: EssentialCourseKeys = [
  'id',
  'title',
  'logo_file_url',
  'short_description',
  'enroll_type',
  'is_free',
  'tags',
];
