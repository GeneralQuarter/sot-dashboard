import { FC, useMemo } from 'react';
import './CurrencyDisplay.scss';
import { useConfig } from '../contexts/config';
import { MinMaxValue } from '../models/min-max-value';
import formatMinMaxValue from '../lib/formatMinMaxValue';

type CurrencyDisplayProps = {
  code: string;
  value: number | MinMaxValue;
  multiplier?: number;
};

const CurrencyDisplay: FC<CurrencyDisplayProps> = ({ code, value, multiplier = 1 }) => {
  const config = useConfig();
  const formattedAmount = useMemo(() => formatMinMaxValue(value, multiplier), [value, multiplier]);
  const imageSrc = useMemo(() => config && `${config.cdnUrl}/assets/profilev2/${code}.svg`, [code, config]);

  return <div className='currency-display'>
    <span className='currency-display__amount'>{formattedAmount}</span>
    {imageSrc && <img className='currency-display__icon' src={imageSrc} alt={code} />}
  </div>;
}

export default CurrencyDisplay;
