'use client';

import React from 'react';

interface IChipProps {
  id: string;
  label: string;
  isActive: boolean;
  onChange: (id: string) => void;
}
export default function Chip({ id, label, isActive, onChange }: IChipProps) {
  return (
    <button
      key={id}
      type="button"
      className={`
        border-filter-50 group m-2 inline-flex h-10 min-w-8 cursor-pointer 
        items-center rounded-3xl  px-5 py-2  duration-200          
        ${isActive ? 'bg-brand text-filter-50' : 'bg-filter-50 text-filter-950 hover:bg-filter-100 hover:font-bold '}`}
      onClick={() => onChange(id)}
    >
      <span>{label ?? ''}</span>
    </button>
  );
}
