export type LedgerBand = {
  level: number;
  thresholdScore: number;
}

export type Ledger = {
  bands: LedgerBand[];
  maxLevel: number;
  score: number;
  rank: number;
  endDate: Date;
}
