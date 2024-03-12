import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IOrgCourse } from '#types/course';
import CardDescription from './CardDescription';
import CardIconText from './CardIconText';
import CardLabel from './CardLabel';
import CardTitle from './CardTitle';

export default function CourseCard(props: IOrgCourse) {
  return (
    <Link
      href="/"
      className="flex w-full cursor-pointer flex-col align-middle duration-300 hover:-translate-y-0.5 sm:w-sm_card md:w-md_card brand:w-brand_card"
      target="_blank"
    >
      <div className="relative h-card w-full rounded-lg bg-white">
        <div className="px-6 pt-7">
          <CardLabel label="미설정" />
          <CardTitle label={props.title} />
          <CardDescription label={props.short_description} />
        </div>
      </div>
    </Link>
  );
}
