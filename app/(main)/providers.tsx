'use client';

import React, { Suspense } from 'react';
import { Footer, Header } from '@components/common';

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <Suspense>
      <Header />
      {children}
      <Footer />
    </Suspense>
  );
}
