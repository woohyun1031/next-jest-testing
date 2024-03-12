import type { NextApiRequest, NextApiResponse } from 'next';
import type { IOrgCourseListResponses } from '#types/course';
import { ESSENTIAL_COURSE_KEYS } from '@constants/course';
import { isAxiosError } from 'axios';
import { api } from './index';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const response = await api.get<IOrgCourseListResponses>('', {
      params: {
        ...req.query,
      },
    });
    const result = {
      course_count: response.data.course_count,
      courses: response.data.courses.map((course) => {
        return ESSENTIAL_COURSE_KEYS.reduce((acc, cur) => {
          return { ...acc, [cur]: course[cur] };
        }, {});
      }),
    };

    res.status(200).json(result);
  } catch (e) {
    if (isAxiosError(e)) {
      res
        .status(e.response?.status ?? 500)
        .json({ course_count: 0, courses: [], message: e.message ?? 'error' });
    }
    res.status(200).json({ course_count: 0, courses: [] });
  }
}
