- [Next Jest testing](#next-jest-testing)
  - [Purpose](#purpose)
  - [개발 환경](#개발-환경)
  - [로컬 실행](#로컬-실행)
  - [hook](#hook)
    - [useOnSubmit](#useonsubmit)
    - [useDebounce](#usedebounce)

# Next Jest testing

## Purpose

- Next.js와 Jest를 사용하여 다양한 조건속 testing 환경 구축하기

---

## 개발 환경

- **코어**: [Next.js App router v14.1.2](https://nextjs.org/), [TypeScript v5](https://www.typescriptlang.org/)

- **스타일링**: [Tailwind CSS v3.3.0](https://tailwindcss.com)

- **테스트**: [Jest](https://jestjs.io/)

---

## 로컬 실행

해당 어플리케이션은 `Node.js v18.17` 이상을 요구하고 있습니다.

```bash
git clone https://github.com/woohyun1031/next-jest-testing.git
cd my-app
yarn install
yarn run dev
```

---

## hook

jest와 @testing-library/react의 `renderHook`함수를 사용해서 테스트를 진행했습니다.

### useOnSubmit

```TypeScript
import React from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export type TOnSubmitReturn = {
  onSubmit: (key: string, values: string[] | number[]) => void;
};

export default function useOnSubmit(): TOnSubmitReturn {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const onSubmit = React.useCallback(
    (key: string, value: (string | number)[]) => {
      const params = new URLSearchParams(searchParams?.toString());
      params.delete(key);
      value.forEach((v) => params.append(key, String(v)));
      router.replace(`${pathname}?${params.toString()}`, {
        scroll: false,
      });
    },
    [pathname, router, searchParams],
  );

  return { onSubmit };
}
```

인자로 받은 key와 value를 현재의 url에 추가하는 훅입니다.  
`next/navigation`의 훅들을 mock으로 대체하여 진행했습니다.

```TypeScript
import { renderHook } from '@testing-library/react';
import useOnSubmit from '@hooks/useOnSubmit';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
  useSearchParams: jest.fn(),
}));

const replace = jest.fn();

describe('useOnSubmit 기능 테스트', () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockImplementation(() => ({ replace }));
    (usePathname as jest.Mock).mockReturnValue('example.com');
  });

  it('새로운 key를 추가할 수 있다.', () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      toString: () => 'price=29',
    });
    const { result } = renderHook(() => useOnSubmit());

    result.current.onSubmit('keyword', ['C언어']);
    expect(replace).toHaveBeenCalledWith(
      'example.com?price=29&keyword=C%EC%96%B8%EC%96%B4',
      { scroll: false },
    );
  });

  it('기존 key를 변경할 수 있다.', () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      toString: () => 'keyword=test1&key2=test2&price=29',
    });
    const { result } = renderHook(() => useOnSubmit());

    result.current.onSubmit('keyword', ['C언어']);
    expect(replace).toHaveBeenCalledWith(
      'example.com?price=29&keyword=C%EC%96%B8%EC%96%B4',
      { scroll: false },
    );
  });
});
```

### useDebounce

```TypeScript
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

```

인자로 받은 callback을 주어진 delay만큼 debounce를 걸어주는 훅입니다.  
`jest.useFakeTimers()`함수로 setTimeout을 대체하였습니다.

```TypeScript
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
  ): [jest.Mock, RenderHookResult<() => boolean | null, { delay: number }>] {
    const spy = jest.fn();
    return [
      spy,
      renderHook(({ delay = 300 }) => useDebounce(spy, delay), {
        initialProps: {
          delay,
        },
      }),
    ];
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
});

```
