import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IOrgCourse } from '#types/course';
import CardDescription from './CardDescription';
import CardIconText from './CardIconText';
import CardLabel from './CardLabel';
import CardTitle from './CardTitle';

export default function CourseCard(props: IOrgCourse) {
  const freeType = props.enroll_type ? '구독' : props.is_free ? '무료' : '유료';
  return (
    <Link
      href='/'
      className="brand:w-brand_card flex w-full cursor-pointer flex-col align-middle duration-300 hover:-translate-y-0.5 sm:w-sm_card md:w-md_card"
      target="_blank"
    >
      <div className="relative h-card w-full rounded-lg bg-white">
        <div className="px-6 pt-7">
          <CardLabel label={freeType ?? ''} />
          <CardTitle label={props.title} />
          <CardDescription label={props.short_description} />
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <CardIconText
                id={1}
                src="/images/difficulty.svg"
                label="난이도"
                value="미설정"
              />
              <CardIconText
                src="/images/class.svg"
                label="수업"
                value="온라인"
                id={2}
              />
              <CardIconText
                src="/images/period.svg"
                label="기간"
                value="무제한"
                id={3}
              />
            </div>            
          </div>
        </div>
        <div className="absolute bottom-0 w-full px-6 pb-7 pt-0">
          <div className="w-full border-t border-solid border-gray-200 pt-4">
            <span
              className={`inline-block text-base font-bold leading-normal ${freeType === '구독' ? 'text-brand' : freeType === '무료' ? 'text-green-500' : 'text-gray-900'}`}
            >
              {freeType ?? ''}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
