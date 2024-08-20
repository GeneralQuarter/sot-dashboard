import type { Ledger, LedgerBand } from '../../models/ledger';
import type { SOTLedgerBand, SOTLedgerResponse } from '../sot-api/ledger';
import { getLedgerLevel, getLedgerMaxLevel } from './ledger-rewards';

function toLedgerBand(factionId: string, band: SOTLedgerBand): LedgerBand {
  const level = band.Entitlements.Current.Owned
    ? getLedgerMaxLevel(factionId)
    : getLedgerLevel(factionId, band.Index, band.Entitlements.Previous.Title);

  return {
    level,
    thresholdScore: band.Results[band.Results.length - 1].Score
  }
}

export function toLedger(factionIdOrGuild: string, ledger: SOTLedgerResponse): Ledger {
  return {
    maxLevel: getLedgerMaxLevel(factionIdOrGuild),
    score: ledger.current.global.user.score,
    rank: ledger.current.global.user.rank,
    bands: ledger.current.global.Bands.filter(b => !b.IsUnrankedBand).map(b => toLedgerBand(factionIdOrGuild, b)),
    endDate: new Date(ledger.current.global.EndDate),
  };
}
