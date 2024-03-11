import React from 'react';

export default function PageNum({
  value,
  isEnable,
  onClick,
}: {
  value: number;
  isEnable: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className={`h-6 w-6 cursor-pointer rounded duration-300 hover:bg-body hover:text-brand
       ${isEnable ? 'bg-brand text-white' : 'text-page'}`}
      onClick={onClick}
    >
      {value}
    </button>
  );
}
