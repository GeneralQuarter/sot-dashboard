import { FC, useMemo } from 'react';
import './CurrencyDisplay.scss';
import { useConfig } from '../contexts/config';

type CurrencyDisplayProps = {
  code: string;
  value: number
};

const CurrencyDisplay: FC<CurrencyDisplayProps> = ({ code, value }) => {
  const config = useConfig();
  const formattedAmount = useMemo(() => new Intl.NumberFormat().format(value), [value]);
  const imageSrc = useMemo(() => config && `${config.cdnUrl}/assets/profilev2/${code}.svg`, [code, config]);

  return <div className='currency-display'>
    <span className='currency-display__amount'>{formattedAmount}</span>
    {imageSrc && <img className='currency-display__icon' src={imageSrc} alt={code} />}
  </div>;
}

export default CurrencyDisplay;
