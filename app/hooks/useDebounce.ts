import React from 'react';

export default function useDebounce(fn: () => void, delay: number = 300) {
  const ready = React.useRef<boolean | null>(false);
  const isReady = React.useCallback(() => ready.current, [ready]);

  React.useEffect(() => {
    ready.current = false;
    const id = setTimeout(() => {
      ready.current = true;
      fn();
    }, delay);
    return () => {
      ready.current = null;
      clearTimeout(id);
    };
  }, [fn]);

  return isReady;
}
