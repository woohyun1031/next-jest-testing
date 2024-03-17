'use client';

import getOrgCourseList from '@apis/getOrgCourseList';
import { COURSE_CONVERT_OBJECTS } from '@constants/course';
import { PAGINATION } from '@constants/pagination';
import { CoursesContext, PaginationContext } from '@contexts/contexts';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import Arrow from './Arrow';
import PageNum from './PageNum';

export const getPageCount = (endPage: number, currentPage: number) => {
  if (!currentPage) return [];
  const slicePoint = Math.floor(PAGINATION.SHOW / 2);
  const startShow = Math.max(currentPage - slicePoint, 1);
  const newPages = new Array(PAGINATION.SHOW).fill(0);

  if (startShow + PAGINATION.SHOW - 1 >= endPage) {
    return newPages
      .map((_, i) => endPage - i)
      .filter((v) => v >= 1)
      .sort((a, b) => a - b);
  }
  return newPages.map((_, i) => startShow + i).filter((v) => v <= endPage);
};

export default function Pagination({
  total,
  courseLength,
}: {
  total: number;
  courseLength: number;
}) {
  const { offset, setOffset } = React.useContext(PaginationContext);
  const { setCourseObject } = React.useContext(CoursesContext);
  const searchParams = useSearchParams();
  const currentPage = courseLength
    ? Math.floor(offset / PAGINATION.PAGES_LIMIT) + 1
    : 0;
  const endPage = Math.ceil(total / PAGINATION.PAGES_LIMIT);
  const pages = getPageCount(endPage, currentPage);

  async function handleOnClick(num: number) {
    const query = new URLSearchParams(searchParams?.toString());
    const paramsObject = Object.keys(COURSE_CONVERT_OBJECTS).reduce(
      (acc, cur) => {
        return { ...acc, [cur]: query.getAll(cur) };
      },
      {},
    );
    const response = await getOrgCourseList(
      paramsObject,
      (num - 1) * PAGINATION.PAGES_LIMIT,
    );

    if (response.ok) {
      const result = await response.json();
      setOffset((num - 1) * PAGINATION.PAGES_LIMIT);
      setCourseObject({
        courses: result.courses,
        courseCount: result.course_count,
      });
      window.scrollTo(0, 0);
    }
  }

  return (
    <div className="flex justify-center">
      <Arrow
        isEnable={currentPage > 1}
        isLeft
        onClick={() => handleOnClick(currentPage - 1)}
      />
      {pages.map((num) => (
        <PageNum
          key={num}
          value={num}
          isEnable={num === currentPage}
          onClick={() => handleOnClick(num)}
        />
      ))}
      <Arrow
        isEnable={currentPage < endPage}
        onClick={() => handleOnClick(currentPage + 1)}
      />
    </div>
  );
}
