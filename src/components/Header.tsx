import { FC, PropsWithChildren, useMemo } from 'react';
import './Header.scss';
import CurrencyDisplay from './CurrencyDisplay';
import { Balance } from '../models/balance';

type HeaderProps = {
  balance: Balance;
}

const Header: FC<PropsWithChildren<HeaderProps>> = ({ balance, children }) => {
  const currencies = useMemo(() => {
    if (!balance) {
      return []
    }

    return Object.entries(balance).map(([code, value]) => ({
      code,
      value
    }));
  }, [balance]);

  return <header className='header'>
    {children}
    <section className='currencies'>
      {currencies.map(currency => (
        <CurrencyDisplay key={currency.code} {...currency} />
      ))}
    </section>
  </header>;
}

export default Header;
