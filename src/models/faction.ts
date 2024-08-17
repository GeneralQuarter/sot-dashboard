import { Campaign } from './campaign';
import type { Ledger } from './ledger';

export type Faction = {
  id: string;
  name: string;
  distinction: number;
  level: number;
  levelProgress: number; // 0 -> 1
  maxLevel: number;
  commendationsUnlocked: number;
  commendationsTotal: number;
  promotionsUnlocked: number;
  guild?: {
    iconId: string;
    themeId: string;
    swatchId: string;
  };
  ledger?: Ledger;
  campaigns: Campaign[];
}
