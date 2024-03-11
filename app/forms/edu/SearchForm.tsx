'use client';

import React, { Fragment } from 'react';
import { useSearchParams } from 'next/navigation';
import SearchBox from '@components/edu/search/SearchBox';
import useOnSubmit from '@hooks/useOnSubmit';
import useDebounce from '@hooks/useDebounce';

export default function SearchForms() {
  const { onSubmit } = useOnSubmit();
  const searchParams = useSearchParams();

  const initValue = searchParams?.get('keyword') ?? '';
  const [value, setValue] = React.useState(`${initValue}`);
  const targetValue = useDebounce(value ?? '', 300);

  React.useEffect(() => {
    onSubmit('keyword', [targetValue]);
  }, [targetValue, onSubmit]);

  return (
    <Fragment>
      <SearchBox value={value} onChange={setValue} />
    </Fragment>
  );
}
