'use client';

import React from 'react';
import Image from 'next/image';

interface ISearchBoxProps {
  value?: string;
  onChange: (value: string) => void;
}

export default function SearchBox({ value, onChange }: ISearchBoxProps) {
  const [isFocus, setIsFocus] = React.useState(false);

  const handleFocus = () => {
    setIsFocus(true);
  };

  const handleBlur = () => {
    setIsFocus(false);
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="my-3 w-full">
      <div
        className={`${
          isFocus ? 'border-brand' : 'border-search'
        } flex w-full flex-row rounded 
        border border-solid bg-search transition duration-300`}
      >
        <div className="flex align-middle">
          <Image
            src="/images/search.svg"
            alt="Search.svg"
            width={16}
            height={16}
            priority
            className={`${
              isFocus ? 'border-brand' : 'border-search'
            } m-4 transition duration-300`}
          />
        </div>
        <div className="relative mx-4 flex w-full overflow-hidden">
          <input
            value={value}
            onChange={handleOnChange}
            placeholder="배우고 싶은 언어, 기술을 검색해 보세요"
            className="w-full py-3 text-sm placeholder:text-css_gray focus:outline-none"
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </div>
      </div>
    </div>
  );
}
