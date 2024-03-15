import { renderHook, RenderHookResult } from '@testing-library/react';
import useDebounce from '@hooks/useDebounce';

jest.useFakeTimers();

describe('useDebounce 기능 테스트', () => {
  it('should be defined', () => {
    expect(useDebounce).toBeDefined();
  });

  it('should be return boolean', () => {
    const { result } = renderHook(() => useDebounce(() => {}, 300));
    expect(typeof result.current).toBe('function');
  });

  function getHook(
    delay: number = 300,
    condition: boolean = true,
  ): [
    jest.Mock,
    RenderHookResult<
      () => boolean | null,
      { delay: number; condition?: boolean }
    >,
  ] {
    const spy = jest.fn();
    return [spy, renderHook(() => useDebounce(spy, delay, condition))];
  }

  it('should call passed function after given amount of time', () => {
    const [spy] = getHook();
    expect(spy).not.toHaveBeenCalled();
    jest.advanceTimersByTime(300);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should cancel function call on unmount', () => {
    const [spy, hook] = getHook();

    expect(spy).not.toHaveBeenCalled();
    hook.unmount();
    jest.advanceTimersByTime(300);
    expect(spy).not.toHaveBeenCalled();
  });

  it('isReady function should return actual state of debounce', () => {
    let [, hook] = getHook();
    let isReady = hook.result.current;
    expect(isReady()).toBe(false);
    hook.unmount();
    expect(isReady()).toBe(null);

    [, hook] = getHook();
    isReady = hook.result.current;
    jest.advanceTimersByTime(300);
    expect(isReady()).toBe(true);
  });

  it('isReady function should return actual state of debounce with condition', () => {
    let [, hook] = getHook(300, false);
    let isReady = hook.result.current;
    jest.advanceTimersByTime(300);
    expect(isReady()).toBe(false);
    hook.unmount();
    expect(isReady()).toBe(null);

    [, hook] = getHook(300, true);
    isReady = hook.result.current;
    jest.advanceTimersByTime(300);
    expect(isReady()).toBe(true);
    hook.unmount();
    expect(isReady()).toBe(null);
  });
});
