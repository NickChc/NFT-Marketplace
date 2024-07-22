export function filterSearchParams(
  searchParams: string,
  filterFrom: string | string[]
) {
  const paramKeyValuePairs = searchParams.toString().split("&");
  const filteredSearchParams = paramKeyValuePairs.filter((pair) => {
    if (Array.isArray(filterFrom)) {
      if (filterFrom.some((filter) => pair.startsWith(filter))) return;
    } else {
      if (pair.startsWith(filterFrom)) return;
    }

    return pair;
  });

  const newSearchParams = filteredSearchParams.join("&");

  return newSearchParams;
}
