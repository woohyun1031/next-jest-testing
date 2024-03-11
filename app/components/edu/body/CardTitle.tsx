import React from 'react';

export default function CardTitle({ label }: { label: string }) {
  return (
    <div className="max-h-15 mb-2 line-clamp-2 overflow-hidden text-ellipsis p-0 text-lg font-bold leading-card text-black">
      {label}
    </div>
  );
}
