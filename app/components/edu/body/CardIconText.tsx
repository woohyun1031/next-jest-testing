import Image from 'next/image';
import React from 'react';

export default function CardIconText({
  id,
  src,
  label,
  value,
}: {
  id: number;
  src: string;
  label: string;
  value: string;
}) {
  return (
    <div key={id} className="mb-1 flex items-center gap-x-2">
      <Image src={src} alt={label} width={24} height={24} />
      <div className="inline-block text-xs text-icon_text">
        {label}: {value}
      </div>
    </div>
  );
}
