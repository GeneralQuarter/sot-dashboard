import { useCallback, useEffect, useState } from 'react';
import type { Balance } from '../models/balance';
import { getBalance } from '../lib/sot-api';
import toBalance from '../lib/transform/to-balance';

type UseBalance = [Balance, (force?: boolean) => Promise<void>]

export default function useBalance(): UseBalance {
  const [balance, setBalance] = useState<Balance>({'ancient-coins': 0, doubloons: 0, gold: 0});

  const fetchBalance = async (force = false) => {
    const _balance = await getBalance(force);
    setBalance(toBalance(_balance));
  }

  const refresh = useCallback(async (force = false) => fetchBalance(force), []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return [balance, refresh]
}
