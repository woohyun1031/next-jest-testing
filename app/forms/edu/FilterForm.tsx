'use client';

import React, { Fragment } from 'react';
import Filter from '@components/edu/filter/Filter';
import SectionWraper from '@components/edu/SectionWraper';
import { filters } from '@mocks/index';
import { IFilter } from '#types/filter';

export default function FilterForm() {
  return (
    <Fragment>
      <SectionWraper className="border border-solid border-filter">
        {filters.map((filter: IFilter) => (
          <Filter key={filter.id} {...filter} />
        ))}
      </SectionWraper>
    </Fragment>
  );
}
