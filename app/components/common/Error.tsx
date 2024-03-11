'use client';

import React, { Fragment } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Error({ error }: { error: { message: string } }) {
  const router = useRouter();
  return (
    <Fragment>
      <div className="relative my-3 flex h-60 justify-center">
        <Image
          src="/images/error.png"
          alt="에러 이미지"
          fill
          style={{ objectFit: 'contain' }}
        />
      </div>
      <div className="my-10 flex flex-col items-center">
        <div className="flex justify-center">
          {error?.message ?? '페이지를 찾을 수 없습니다!'}
        </div>
        <button
          type="button"
          className="border-filter-50 group m-2 inline-flex h-10 min-w-8 cursor-pointer 
          items-center rounded-3xl  bg-filter-50 px-5  py-2 text-filter-950 duration-200  hover:font-bold"
          onClick={() => router.back()}
        >
          이전 페이지로 가기
        </button>
      </div>
    </Fragment>
  );
}
