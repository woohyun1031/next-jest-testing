'use client';

import React from 'react';
import Chip from '@components/edu/filter/Chip';
import useOnSubmit from '@hooks/useOnSubmit';
import { IChip } from '#types/filter';
import useDebounce from '@hooks/useDebounce';

interface IFilterProps {
  id: string;
  label: string;
  chips: IChip[];
}

export default function Filter({ id: filterId, label, chips }: IFilterProps) {
  const { onSubmit, searchParams } = useOnSubmit();
  const initChips = searchParams?.getAll(filterId) ?? [];
  const [activeChips, setActiveChips] = React.useState<string[]>([
    ...initChips,
  ]);

  const handleOnChange = (id: string) => {
    if (activeChips.some((i) => i === id)) {
      setActiveChips((prev) => prev.filter((i) => id !== i));
    } else {
      setActiveChips((prev) => [...prev, id]);
    }
  };

  const isReady = useDebounce(() => {
    if (
      activeChips.length !== initChips.length ||
      !activeChips.every((c) => initChips.includes(c)) ||
      !initChips.every((c) => activeChips.includes(c))
    ) {
      onSubmit(filterId, activeChips);
    }
  }, 300);

  console.log(isReady);

  return (
    <div
      key={filterId}
      className="border-filter-50 flex w-full border-b border-solid bg-white"
    >
      <div className="min-w-24 border-r border-solid border-filter bg-filter_header px-4 py-5">
        <div className="text-xs font-bold leading-normal text-filter-950">
          {label ?? ''}
        </div>
      </div>
      <div className="flex flex-wrap px-2 align-middle">
        {chips.map((chip) => (
          <Chip
            {...chip}
            key={chip.id}
            isActive={activeChips.some((i) => i === chip.id)}
            onChange={handleOnChange}
          />
        ))}
      </div>
    </div>
  );
}
