'use client';

import React from 'react';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 flex h-16 w-full justify-center bg-white px-6 py-3">
      <div className="mx-2 flex w-full flex-wrap items-center justify-between">
        <Link
          href="/edu"
          className="relative mr-6 flex h-full w-40 flex-shrink-0 cursor-pointer items-center"
        >
          Next-Jest-Testing          
        </Link>
      </div>
    </header>
  );
}
