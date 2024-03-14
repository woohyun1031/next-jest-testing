import React from 'react';
import {
  ReadonlyURLSearchParams,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';

export type TOnSubmitReturn = {
  onSubmit: (key: string, values: string[] | number[]) => void;
  searchParams?: ReadonlyURLSearchParams | null;
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

  return { onSubmit, searchParams };
}
