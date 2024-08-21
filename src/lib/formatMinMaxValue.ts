import { MinMaxValue } from '../models/min-max-value';
import formatNumber from './formatNumber';

export default function formatMinMaxValue(value: number | MinMaxValue, multiplier: number = 1): string {
  if (typeof value === 'number') {
    return formatNumber(Math.round(value * multiplier));
  }

  return `${formatNumber(Math.round(value.min * multiplier))}${value.max ? ` - ${formatNumber(Math.round(value.max * multiplier))}` : ''}`;
}
