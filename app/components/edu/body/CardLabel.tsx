import React from 'react';

export default function CardLabel({ label }: { label: string }) {
  return (
    <div className="mb-2 max-h-5 p-0 text-xs font-bold leading-relaxed text-label">
      {label}
    </div>
  );
}
