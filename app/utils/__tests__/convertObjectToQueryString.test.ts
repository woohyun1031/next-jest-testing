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
