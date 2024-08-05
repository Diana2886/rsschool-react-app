import { Book } from '../../services/bookApi/types';

export const generateSelectedItemsText = (count: number) => {
  return count === 1 ? '1 item is selected' : `${count} items are selected`;
};

export const generateCSVBlobUrl = (items: Book[]) => {
  const csvContent = [
    ['Title', 'Published Year', 'Number Of Pages', 'Details URL'],
    ...items.map((item) => [
      `"${item.title}"`,
      item.publishedYear,
      item.numberOfPages,
      `https://stapi.co/api/v2/rest/book/${item.uid}`,
    ]),
  ]
    .map((e) => e.join(','))
    .join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  return URL.createObjectURL(blob);
};
