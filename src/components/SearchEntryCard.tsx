import { FC } from 'react';
import type { SearchEntry } from '../models/search-entry';
import CommendationProgress from './CommendationProgress';
import CurrencyDisplay from './CurrencyDisplay';
import formatMinMaxValue from '../lib/formatMinMaxValue';
import './SearchEntryCard.scss';

type SearchEntryCardProps = {
  entry: SearchEntry;
  emissaryMultiplier?: number;
};

const SearchEntryCard: FC<SearchEntryCardProps> = ({ entry, emissaryMultiplier }) => {
  return <div className={`search-entry-card${entry.type === 'commendation' && entry.commendation.completed ? ' search-entry-card--completed' : ''}`}>
    {entry.type === 'commendation' && <img loading='lazy' className='search-entry-card__image' src={entry.commendation.image} alt={entry.commendation.title} />}
    <div className='search-entry-card__content'>
      <span className='search-entry-card__breadcrumbs'>{entry.path.join(' / ')}</span>
      <h3 className='search-entry-card__title'>{entry.type === 'commendation' ? entry.commendation.title : entry.treasure.name}</h3>
      {entry.type === 'commendation' && <>
        <p className='search-entry-card__subtitle'>{entry.commendation.subtitle}</p>
        {entry.commendation.scalar && entry.commendation.scalar.maxValue !== 1 && 
          <CommendationProgress name={entry.commendation.title} scalar={entry.commendation.scalar}/>
        }
      </>}
    </div>
    {entry.type === 'treasure' && <div className='search-entry-card__end'>
      <div className='base-commissioned-values'>
        <CurrencyDisplay value={entry.treasure.reward.base} code={entry.treasure.currency} multiplier={emissaryMultiplier} />
        {entry.treasure.reward.commissioned && <CurrencyDisplay value={entry.treasure.reward.commissioned} code={entry.treasure.currency} multiplier={emissaryMultiplier} />}
      </div>
      {entry.treasure.emissary && <div className='base-commissioned-values'>
        <span>{formatMinMaxValue(entry.treasure.emissary.base, emissaryMultiplier)}</span>
        {entry.treasure.emissary.commissioned && <span>{formatMinMaxValue(entry.treasure.emissary.commissioned, emissaryMultiplier)}</span>}
      </div>}
    </div>}
  </div>;
}

export default SearchEntryCard;
