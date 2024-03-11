import { COURSE_CONVERT_OBJECTS } from '@constants/course';

export default function convertSearchParamsToCourseObject(
  searchParams: Record<string, string | string[]>,
): Record<string, string> {
  return {
    filter_conditions: JSON.stringify({
      $and: Object.entries(searchParams).map(([key, value]) => {
        if (Array.isArray(value)) {
          return { $or: value.map((v) => COURSE_CONVERT_OBJECTS[key]?.(v)) };
        }
        return { $or: [COURSE_CONVERT_OBJECTS[key]?.(value)] };
      }),
    }),
  };
}
