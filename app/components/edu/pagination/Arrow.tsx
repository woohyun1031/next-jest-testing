import React from 'react';

export default function Arrow({
  isEnable = false,
  isLeft = false,
  onClick,
}: {
  isEnable?: boolean;
  isLeft?: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}) {
  return (
    <button
      type="button"
      className={`${isEnable ? 'cursor-pointer' : 'cursor-not-allowed'}`}
      onClick={onClick}
    >
      {isLeft ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 -960 960 960"
          width="24"
          className={`${isEnable ? 'fill-brand' : 'fill-arrow'}`}
        >
          <path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 -960 960 960"
          width="24"
          className={`${isEnable ? 'fill-brand' : 'fill-arrow'}`}
        >
          <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" />
        </svg>
      )}
    </button>
  );
}
