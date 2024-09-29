import { Commendation } from './commendation';
import { Treasure } from './treasure';

export type BaseSearchEntry = {
  id: string;
  normalizedValue: string;
  path: string[];
};

export type TreasureSearchEntry = {
  type: 'treasure';

  treasure: Treasure;
} & BaseSearchEntry;

export type CommendationSearchEntry = {
  type: 'commendation';
  commendation: Commendation;
} & BaseSearchEntry;

export type SearchEntry = (TreasureSearchEntry | CommendationSearchEntry);
export type SearchEntries = SearchEntry[];
