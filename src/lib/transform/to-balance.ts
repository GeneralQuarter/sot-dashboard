import type { Balance } from '../../models/balance';
import type { SOTBalanceResponse } from '../sot-api/balance';

export default function toBalance(res: SOTBalanceResponse): Balance {
  return {
    'ancient-coins': res.ancientCoins,
    doubloons: res.doubloons,
    gold: res.gold,
  };
}
