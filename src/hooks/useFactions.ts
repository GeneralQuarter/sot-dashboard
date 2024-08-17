import { useCallback, useEffect, useState } from 'react';
import type { Faction } from '../models/faction';
import { getLedger, getReputations } from '../lib/sot-api';
import toFactions from '../lib/transform/to-factions';
import type { Ledger } from '../models/ledger';
import { toLedger } from '../lib/transform/to-ledger';

const ledgerFactionIds = [
  'OrderOfSouls',
  'GoldHoarders',
  'MerchantAlliance',
  'ReapersBones',
  'AthenasFortune',
];

type UseFactions = [Faction[], Ledgers, (force?: boolean) => Promise<void>, (force?: boolean) => Promise<void>];

type Ledgers = {[factionId: string]: Ledger};

export default function useFactions(): UseFactions {
  const [factions, setFactions] = useState<Faction[]>([]);
  const [guildIds, setGuildIds] = useState<string[]>([]);
  const [ledgers, setLedgers] = useState<Ledgers>({});

  const refreshReputations = useCallback(async (force = false) => {
    const reputations = await getReputations(force);
    setFactions(toFactions(reputations));
    setGuildIds(
      Object.entries(reputations)
        .filter(([, reputation]) => reputation.IsGuild)
        .map(([factionId]) => factionId)
    );
  }, []);

  const refreshLedgers = useCallback(async (force = false) => {
    const allLedgerFactionIds = guildIds.concat(ledgerFactionIds);
    const ledgers = await Promise.all(allLedgerFactionIds.map(id => getLedger(id, force)));
    setLedgers(ledgers.reduce((acc, l, i) => {
      const factionId = allLedgerFactionIds[i];
      acc[factionId] = toLedger(ledgerFactionIds.includes(factionId) ? factionId : 'Guilds', l);
      return acc;
    }, {} as Ledgers));
  }, [guildIds]);

  useEffect(() => {
    refreshReputations()
  }, [refreshReputations]);

  useEffect(() => {
    refreshLedgers()
  }, [refreshLedgers]);

  return [factions, ledgers, refreshReputations, refreshLedgers];
}
