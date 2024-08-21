import type { CurrencyCode } from './balance';
import type { MinMaxValue } from './min-max-value';

type BaseCommissionedValue = {
  base: MinMaxValue;
  commissioned?: MinMaxValue;
}

export type Treasure = {
  name: string;
  type: string;
  subType: string;
  currency: CurrencyCode;
  reward: BaseCommissionedValue;
  emissary?: BaseCommissionedValue;
}
