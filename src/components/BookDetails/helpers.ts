import { Entries } from './types';

export const getEntriesString = (entries: Entries) => {
  if (entries.length) {
    return entries.map((entry) => entry.name).join(', ');
  }

  return '';
};

export const hasEntries = (entries: Entries) => entries && entries.length > 0;
