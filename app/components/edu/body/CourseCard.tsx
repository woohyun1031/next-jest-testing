import React from 'react';
import Link from 'next/link';
import { IOrgCourse } from '#types/course';
import CardDescription from './CardDescription';
import CardLabel from './CardLabel';
import CardTitle from './CardTitle';

export default function CourseCard(props: IOrgCourse) {
  const freeType = props.enroll_type ? '구독' : props.is_free ? '무료' : '유료';
  return (
    <Link
      href="/"
      className="flex w-full cursor-pointer flex-col align-middle duration-300 hover:-translate-y-0.5 sm:w-sm_card md:w-md_card brand:w-brand_card"
      target="_blank"
    >
      <div className="relative h-card w-full rounded-lg bg-white">
        <div className="px-6 pt-7">
          <CardLabel label={freeType ?? ''} />
          <CardTitle label={props.title} />
          <CardDescription label={props.short_description} />
        </div>
      </div>
    </Link>
  );
}
