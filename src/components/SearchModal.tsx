import { FC, useEffect, useState } from 'react';
import Modal from './Modal';
import type { Faction } from '../models/faction';
import type { Treasure } from '../models/treasure';
import useSearchEntries from '../hooks/useSearchEntries';
import SearchEntryCard from './SearchEntryCard';
import './SearchModal.scss';
import EmissaryFlagInput from './EmissaryFlagInput';

type SearchModalProps = {
  open: boolean;
  onCloseClick?: () => void;
  factions: Faction[];
  treasures: Treasure[];
};

const SearchModal: FC<SearchModalProps> = ({ open, onCloseClick, factions, treasures }) => {
  const [searchValue, setSearchValue] = useState<string>('');
  const searchEntries = useSearchEntries(factions, treasures, searchValue);
  const [emissaryMultiplier, setEmissaryMultiplier] = useState<number>(1);

  useEffect(() => {
    if (!open) {
      setSearchValue('');
    }
  }, [open])

  return <Modal open={open} onCancel={() => onCloseClick?.()} title='' className='search-modal' header={
    <>
      <input className='modal__search' type='search' placeholder='Search...' value={searchValue} onInput={(e) => setSearchValue(e.currentTarget.value)}/>
      <EmissaryFlagInput onEmissaryMultiplierChange={setEmissaryMultiplier} />
    </>
  }>
    <main className='search-modal__main'>
      {searchEntries.map(entry => (
        <SearchEntryCard key={entry.id} entry={entry} emissaryMultiplier={emissaryMultiplier} />
      ))}
    </main>
  </Modal>;
}

export default SearchModal;
