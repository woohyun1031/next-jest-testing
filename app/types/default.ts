export interface IDefaultPageProps<
  TSearchParams = Record<string, string | string[]>,
> {
  searchParams: TSearchParams;
}
