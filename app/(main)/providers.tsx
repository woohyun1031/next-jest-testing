'use client';

import React, { Suspense } from 'react';
import { Footer, Header } from '@components/common';
import { useSearchParams } from 'next/navigation';
import { PaginationContext } from '@contexts/contexts';

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  const searchParams = useSearchParams();
  const [offsetCnt, setOffsetCnt] = React.useState(0);

  const contextsValue = React.useMemo(
    () => ({ offset: offsetCnt, setOffset: setOffsetCnt }),
    [offsetCnt, setOffsetCnt],
  );

  React.useEffect(() => {
    setOffsetCnt(0);
  }, [searchParams]);

  return (
    <Suspense>
      <PaginationContext.Provider value={contextsValue}>
        <Header />
        {children}
        <Footer />
      </PaginationContext.Provider>
    </Suspense>
  );
}
