export type CurrencyCode = 'gold' | 'doubloons' | 'ancient-coins';

export type Balance = {
  [key in CurrencyCode]: number;
}
