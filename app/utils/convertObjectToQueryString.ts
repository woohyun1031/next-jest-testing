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
