type SOTLedgerUser = {
  band: number,
  rank: number,
  score: number,
  toNextRank: number
}

type SOTLedgerBandEntitlement = {
  Owned: boolean;
  Title: string;
}

type SOTLedgerBandEntitlements = {
  Next: SOTLedgerBandEntitlement;
  Current: SOTLedgerBandEntitlement;
  Previous: SOTLedgerBandEntitlement;
}

type SOTLedgerBandResult = {
  Score: number;
}

export type SOTLedgerBand = {
  Index: number;
  IsUnrankedBand?: boolean;
  Entitlements: SOTLedgerBandEntitlements;
  Results: SOTLedgerBandResult[];
}

type SOTLedger = {
  Bands: SOTLedgerBand[];
  user: SOTLedgerUser;
  EndDate: string; // ISO 8601
}

type SOTLedgers = {
  global: SOTLedger;
  friends: SOTLedger;
  top: SOTLedger;
}

export type SOTLedgerResponse = {
  current: SOTLedgers;
  previous: SOTLedgers;
}
