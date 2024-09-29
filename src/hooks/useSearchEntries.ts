import { useMemo } from 'react';
import type { Faction } from '../models/faction';
import type { Treasure } from '../models/treasure';
import type { CommendationSearchEntry, SearchEntries, SearchEntry, TreasureSearchEntry } from '../models/search-entry';
import type { Commendation } from '../models/commendation';

function normalize(str: string): string {
  return str.trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

function factionToSearchEntries(faction: Faction): SearchEntries {
  return Object.values(faction.campaigns)
    .flatMap(campaign => campaign.commendations
      .map(commendation => commendationToCommendationSearchEntry(commendation, ['Commendation', faction.name].concat(campaign.title ? [campaign.title] : [])))
    );
}

function commendationToCommendationSearchEntry(commendation: Commendation, path: string[]): CommendationSearchEntry {
  return {
    id: commendation.title,
    normalizedValue: normalize(commendation.title),
    path,
    commendation,
    type: 'commendation',
  };
}

function treasureToTreasureSearchEntry(treasure: Treasure): TreasureSearchEntry {
  return {
    id: `${treasure.type}-${treasure.subType}-${treasure.name}`,
    normalizedValue: normalize(treasure.name),
    path: [treasure.type, treasure.subType],
    treasure,
    type: 'treasure',
  }
}

export default function useSearchEntries(factions: Faction[], treasures: Treasure[], searchValue: string = '') {
  const allSearchEntries = useMemo<SearchEntries>(() => {
    return treasures.flatMap<SearchEntry>(treasureToTreasureSearchEntry)
      .concat(factions.filter(f => !f.guild).flatMap(factionToSearchEntries));
  }, [factions, treasures]);

  const normalizedSearchValue = useMemo(() => normalize(searchValue), [searchValue]);

  const searchEntries = useMemo<SearchEntries>(() => {
    if (normalizedSearchValue === '' || normalizedSearchValue.length < 3) {
      return [];
    }

    return allSearchEntries.filter(s => s.normalizedValue.includes(normalizedSearchValue));
  }, [normalizedSearchValue, allSearchEntries]);

  return searchEntries;
}
