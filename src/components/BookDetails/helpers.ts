import { Entries } from './types';

export const hasEntries = (entries: Entries) => entries && entries.length > 0;

export const getEntriesString = (entries: Entries) => {
  if (hasEntries(entries)) {
    return entries.map((entry) => entry.name).join(', ');
  }
  return '';
};
