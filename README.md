- [Next Jest testing](#next-jest-testing)
  - [Purpose](#purpose)
  - [개발 환경](#개발-환경)
  - [로컬 실행](#로컬-실행)
  - [hook](#hook)
    - [useOnSubmit](#useonsubmit)
    - [useDebounce](#usedebounce)
  - [utils](#utils)
    - [convertObjectToQueryString](#convertObjectToQueryString)
    - [convertSearchParamsToCourseObject](#convertSearchParamsToCourseObject)

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

## utils

searchParams를 파싱할 때 사용하는 utils 함수들을 테스트하였습니다.

### convertObjectToQueryString

```TypeScript
export default function convertObjectToQueryString(
  searchParams: Record<string, string | string[]>,
) {
  const result = new URLSearchParams(
    Object.entries(searchParams)
      .reduce<string[]>((acc, [key, val]) => {
        if (Array.isArray(val)) {
          return [...acc, ...val.map((v) => `${key}=${v}`)];
        }
        return [...acc, `${key}=${val}`];
      }, [])
      .join('&'),
  );
  return result.toString();
}
```

객체 형태의 searchParams를 받아 올바르게 query string 형태로  
반환하는지를 중점으로 테스트를 진행하였습니다.

```TypeScript
import convertObjectToQueryString from '../convertObjectToQueryString';

describe('convertObjectToQueryString', () => {
  it('should return empty string for empty object', () => {
    const searchParams = {};
    const expected = '';
    const actual = convertObjectToQueryString(searchParams);
    expect(actual).toBe(expected);
  });

  it('should return correct query string for single key-value pair', () => {
    const searchParams = {
      name: 'John Doe',
    };
    const expected = 'name=John+Doe';
    const actual = convertObjectToQueryString(searchParams);
    expect(actual).toBe(expected);
  });

  it('should return correct query string for multiple key-value pairs', () => {
    const searchParams = {
      name: 'John Doe',
      age: '30',
      city: 'Seoul',
    };
    const expected = 'name=John+Doe&age=30&city=Seoul';
    const actual = convertObjectToQueryString(searchParams);
    expect(actual).toBe(expected);
  });

  it('should return correct query string for array value', () => {
    const searchParams = {
      tags: ['javascript', 'typescript', 'react'],
    };
    const expected = 'tags=javascript&tags=typescript&tags=react';
    const actual = convertObjectToQueryString(searchParams);
    expect(actual).toBe(expected);
  });

  it('should use URLSearchParams and toString()', () => {
    const searchParams = {
      name: 'John Doe',
    };
    const spy = jest.spyOn(URLSearchParams.prototype, 'toString');
    convertObjectToQueryString(searchParams);
    expect(spy).toHaveBeenCalledTimes(1);
  });
});

```

### convertSearchParamsToCourseObject

```TypeScript
import { COURSE_CONVERT_OBJECTS } from '@constants/course';

export default function convertSearchParamsToCourseObject(
  searchParams: Record<string, string | string[]>,
): Record<string, string> {
  return {
    filter_conditions: JSON.stringify({
      $and: Object.entries(searchParams)
        .filter(([key]) => key in COURSE_CONVERT_OBJECTS)
        .map(([key, value]) => {
          if (Array.isArray(value)) {
            return { $or: value.map((v) => COURSE_CONVERT_OBJECTS[key]?.(v)) };
          }
          return { $or: [COURSE_CONVERT_OBJECTS[key]?.(value)] };
        }),
    }),
  };
}
```

COURSE_CONVERT_OBJECTS를 mock으로 사용하여 테스트를 진행하였습니다.  
올바른 포멧을 내보내는지 테스트하였습니다.

```TypeScript
import { COURSE_CONVERT_OBJECTS } from '@constants/course';
import convertSearchParamsToCourseObject from '../convertSearchParamsToCourseObject';

jest.mock('@constants/course', () => ({
  COURSE_CONVERT_OBJECTS: {
    keyword: jest.fn((value) => ({ title: `%${value}%` })),
    price: jest.fn((value) => {
      switch (value) {
        case '29':
          return { enroll_type: 0, is_free: true };
        case '30':
          return { enroll_type: 0, is_free: false };
        default:
          return undefined;
      }
    }),
  },
}));

describe('convertSearchParamsToCourseObject 기능 테스트', () => {
  it('should return empty object for empty search params', () => {
    const searchParams = {};
    const expected = {
      filter_conditions: JSON.stringify({ $and: [] }),
    };
    const actual = convertSearchParamsToCourseObject(searchParams);
    expect(actual).toEqual(expected);
  });

  it('should convert keyword search param', () => {
    const searchParams = {
      keyword: 'javascript',
    };
    const expected = {
      filter_conditions: JSON.stringify({
        $and: [{ $or: [{ title: '%javascript%' }] }],
      }),
    };
    const actual = convertSearchParamsToCourseObject(searchParams);
    expect(actual).toEqual(expected);
    expect(COURSE_CONVERT_OBJECTS.keyword).toHaveBeenCalledWith('javascript');
  });

  it('should convert price search param (free)', () => {
    const searchParams = {
      price: '29',
    };
    const expected = {
      filter_conditions: JSON.stringify({
        $and: [{ $or: [{ enroll_type: 0, is_free: true }] }],
      }),
    };
    const actual = convertSearchParamsToCourseObject(searchParams);
    expect(actual).toEqual(expected);
    expect(COURSE_CONVERT_OBJECTS.price).toHaveBeenCalledWith('29');
  });

  it('should convert price search param (paid)', () => {
    const searchParams = {
      price: '30',
    };
    const expected = {
      filter_conditions: JSON.stringify({
        $and: [{ $or: [{ enroll_type: 0, is_free: false }] }],
      }),
    };
    const actual = convertSearchParamsToCourseObject(searchParams);
    expect(actual).toEqual(expected);
    expect(COURSE_CONVERT_OBJECTS.price).toHaveBeenCalledWith('30');
  });

  it('should convert multiple search params', () => {
    const searchParams = {
      keyword: 'javascript',
      price: '29',
    };
    const expected = {
      filter_conditions: JSON.stringify({
        $and: [
          { $or: [{ title: '%javascript%' }] },
          { $or: [{ enroll_type: 0, is_free: true }] },
        ],
      }),
    };
    const actual = convertSearchParamsToCourseObject(searchParams);
    expect(actual).toEqual(expected);
    expect(COURSE_CONVERT_OBJECTS.keyword).toHaveBeenCalledWith('javascript');
    expect(COURSE_CONVERT_OBJECTS.price).toHaveBeenCalledWith('30');
  });

  it('should handle unsupported search params', () => {
    const searchParams = {
      unknown: 'value',
    };
    const expected = {
      filter_conditions: JSON.stringify({ $and: [] }),
    };
    const actual = convertSearchParamsToCourseObject(searchParams);
    expect(actual).toEqual(expected);
  });

  it('should call JSON.stringify with correct argument', () => {
    JSON.stringify = jest.fn();

    const searchParams = {
      keyword: 'javascript',
    };
    convertSearchParamsToCourseObject(searchParams);
    expect(JSON.stringify).toHaveBeenCalledWith({
      $and: [{ $or: [{ title: '%javascript%' }] }],
    });
  });
});

```
