'use client';

import React, { Fragment } from 'react';
import CourseCard from '@components/edu/body/CourseCard';
import Pagination from '@components/edu/pagination/Pagination';
import SectionWraper from '@components/edu/SectionWraper';
import { IOrgCourseListResponses } from '#types/course';
import Image from 'next/image';

export default function BodyForm({
  course_count,
  courses = [],
}: IOrgCourseListResponses) {
  return (
    <Fragment>
      {course_count ? (
        <Fragment>
          <SectionWraper>
            <div
              className={`${course_count ? 'border-b border-solid border-gray-200' : ''}  py-3`}
            >
              <div className="inline-block text-xs font-semibold">
                전체 {course_count}개
              </div>
            </div>
          </SectionWraper>
          <SectionWraper className="flex flex-wrap gap-4">
            {courses.map((course) => (
              <CourseCard key={course.id} {...course} />
            ))}
          </SectionWraper>
          <SectionWraper className="mt-6 flex justify-center">
            <Pagination total={course_count} courseLength={courses.length} />
          </SectionWraper>
        </Fragment>
      ) : (
        <SectionWraper className="mt-6 flex flex-col items-center gap-4">
          <Image
            src="/images/nosearch.png"
            alt="검색결과없음"
            width={74}
            height={74}
            style={{ objectFit: 'contain' }}
          />
          <div className="inline-block text-base text-filter-600">
            검색 결과가 없습니다.
          </div>
        </SectionWraper>
      )}
    </Fragment>
  );
}
