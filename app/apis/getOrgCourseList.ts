import { PAGINATION } from '@constants/pagination';
import convertObjectToQueryString from '@utils/convertObjectToQueryString';
import convertSearchParamsToCourseObject from '@utils/convertSearchParamsToCourse';

export default async function getOrgCourseList(
  searchParams: Record<string, string | string[]>,
  offset?: number,
): Promise<Response> {
  const courseObject = convertSearchParamsToCourseObject(searchParams);
  const queryString = convertObjectToQueryString({
    ...courseObject,
    offset: `${offset ?? 0}`,
    count: `${PAGINATION.PAGES_LIMIT}`,
  });

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/getOrgCourseList?${queryString}`,
    { next: { revalidate: 0 } },
  );

  return response;
}
