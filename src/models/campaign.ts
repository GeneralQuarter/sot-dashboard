import type { Commendation } from './commendation';

export type Campaign = {
  id: string;
  title: string;
  commendationsUnlocked: number;
  commendationsTotal: number;
  commendations: Commendation[];
}
