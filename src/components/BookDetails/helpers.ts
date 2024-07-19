import { Entries } from './types';

export const getEntriesString = (entries: Entries) => {
  if (entries.length === 0) {
    return '';
  }
  return entries.map((entry) => entry.name).join(', ');
};

export const hasEntries = (entries: Entries) => entries.length > 0;
