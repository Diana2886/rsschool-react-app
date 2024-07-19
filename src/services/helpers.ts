import { Params } from './types';

const getParams = (params: Params): Record<string, string | number> => {
  const { pageNumber, pageSize, bookId } = params;
  const result: Record<string, string | number> = {};

  if (pageNumber !== undefined) {
    result.pageNumber = pageNumber - 1;
  }

  if (pageSize !== undefined) {
    result.pageSize = pageSize;
  }

  if (bookId !== undefined) {
    result.uid = bookId;
  }

  return result;
};

export const setUrl = (url: string, params: Params) => {
  const queryParams = getParams(params);
  const urlObj = new URL(url);
  Object.keys(queryParams).forEach((key) => urlObj.searchParams.append(key, `${queryParams[key]}`));
  return urlObj;
};
