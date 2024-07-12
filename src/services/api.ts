export const api = {
  fetchData: async (pageNumber: number, pageSize: number) => {
    const url: URL = new URL('https://stapi.co/api/v2/rest/book/search');
    const params: { [key: string]: number } = {
      pageNumber,
      pageSize,
    };
    Object.keys(params).forEach((key) => url.searchParams.append(key, `${params[key]}`));
    return await fetch(url);
  },
  fetchBookDetails: async (bookId: string) => {
    const url: URL = new URL('https://stapi.co/api/v2/rest/book');
    url.searchParams.append('uid', bookId);
    return await fetch(url);
  },
};
