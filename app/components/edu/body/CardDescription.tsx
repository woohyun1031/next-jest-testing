import React from 'react';

export default function CardDescription({ label }: { label: string }) {
  return (
    <div
      className="mb-2.5 line-clamp-2 overflow-hidden text-ellipsis p-0 text-sm 
      leading-card text-filter-950"
    >
      {label}
    </div>
  );
}
