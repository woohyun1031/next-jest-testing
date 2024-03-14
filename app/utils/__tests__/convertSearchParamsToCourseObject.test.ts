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
