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
