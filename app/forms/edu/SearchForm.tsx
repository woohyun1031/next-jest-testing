'use client';

import React, { Fragment } from 'react';
import SearchBox from '@components/edu/search/SearchBox';
import useOnSubmit from '@hooks/useOnSubmit';
import useDebounce from '@hooks/useDebounce';

export default function SearchForms() {
  const { onSubmit, searchParams } = useOnSubmit();

  const init = React.useMemo(
    () => `${searchParams?.get('keyword') ?? ''}`,
    [searchParams],
  );

  const [value, setValue] = React.useState(`${init}`);
  const isReady = useDebounce(() => {
    if (init !== value) {
      onSubmit('keyword', [value]);
    }
  }, 300);

  console.log(isReady);

  return (
    <Fragment>
      <SearchBox value={value} onChange={setValue} />
    </Fragment>
  );
}

function PropsAreEqual(prev: { init: string }, next: { init: string }) {
  return JSON.stringify(prev.init) === JSON.stringify(next.init);
}

React.memo(SearchForms, PropsAreEqual);
