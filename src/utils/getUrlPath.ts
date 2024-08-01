export const getUrlPath = (pageNumber: number | string, searchTerm: string, details?: string) => {
  return `/?page=${pageNumber}${searchTerm ? `&search=${searchTerm}` : ''}${details ? `&details=${details}` : ''}`;
};
