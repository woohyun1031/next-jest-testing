import React from 'react';

export default function useDebounce(
  fn: () => void,
  delay: number,
  condition?: boolean,
) {
  const ready = React.useRef<boolean | null>(false);
  const timer = React.useRef<NodeJS.Timeout>();

  const isReady = React.useCallback(() => ready.current, [ready]);
  const isCondition = typeof condition === 'boolean' ? condition : true;

  React.useEffect(() => {
    ready.current = false;
    if (isCondition) {
      timer.current = setTimeout(() => {
        ready.current = true;
        fn();
      }, delay);
    }
    return () => {
      ready.current = null;
      clearTimeout(timer.current);
    };
  }, [fn]);

  return isReady;
}
