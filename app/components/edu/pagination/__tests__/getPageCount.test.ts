import { getPageCount } from '../Pagination';
import * as constants from '@constants/pagination';

jest.mock('@constants/pagination');

describe('getPageCount', () => {
  it('현재 페이지가 1일 때 올바른 페이지 카운트 배열을 반환', () => {
    jest.mocked(constants).PAGINATION.SHOW = 9;
    const pages = getPageCount(20, 1);
    expect(pages).toStrictEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  it('현재 페이지가 마지막 페이지일 때 올바른 페이지 카운트 배열을 반환', () => {
    jest.mocked(constants).PAGINATION.SHOW = 9;
    const pages = getPageCount(20, 20);
    expect(pages).toStrictEqual([12, 13, 14, 15, 16, 17, 18, 19, 20]);
  });

  it('PAGINATION.SHOW에 알맞은 수의 배열을 반환', () => {
    jest.mocked(constants).PAGINATION.SHOW = 6;
    const pages = getPageCount(20, 12);
    expect(pages).toStrictEqual([9, 10, 11, 12, 13, 14]);
  });

  it('페이지 수가 PAGINATION.SHOW보다 적을 때 올바른 페이지 카운트 배열을 반환', () => {
    jest.mocked(constants).PAGINATION.SHOW = 5;
    const pages = getPageCount(3, 2);
    expect(pages).toStrictEqual([1, 2, 3]);
  });
});
