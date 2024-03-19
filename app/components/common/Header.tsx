'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathName = usePathname();
  const pathNames = pathName?.split('/') ?? [];

  return (
    <header className="sticky top-0 z-50 flex h-16 w-full justify-center bg-white px-6 py-3">
      <div className="mx-2 flex w-full flex-wrap items-center justify-start">
        <Link
          href="/edu"
          className={`relative mr-6 flex h-full flex-shrink-0 cursor-pointer items-center ${
            pathNames.includes('edu') ? 'underline underline-offset-4' : ''
          }`}
        >
          Next-Jest-Testing
        </Link>

        <Link
          href="/search"
          className={`relative mr-6 flex h-full flex-shrink-0 cursor-pointer items-center ${
            pathNames.includes('search') ? 'underline underline-offset-4' : ''
          }`}
        >
          Search
        </Link>

        <Link
          href="/filter"
          className={`relative mr-6 flex h-full flex-shrink-0 cursor-pointer items-center ${
            pathNames.includes('filter') ? 'underline underline-offset-4' : ''
          }`}
        >
          Filter
        </Link>
      </div>
    </header>
  );
}
