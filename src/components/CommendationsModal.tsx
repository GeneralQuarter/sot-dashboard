import { FC, MouseEvent as ReactMouseEvent, useMemo, useState } from 'react';
import Modal from './Modal';
import './CommendationsModal.scss';
import CommendationCard from './CommendationCard';
import type { Campaign } from '../models/campaign';

type CommendationsModalProps = {
  id: string;
  title: string;
  open: boolean;
  campaigns: Campaign[];
  closeClick?: () => void;
};

const filterButtons = [
  { label: 'In Progress', value: 'not-completed' },
  { label: 'Completed', value: 'completed' },
  { label: 'All', value: 'all' },
]

const filterCampaigns = (campaigns: Campaign[], completed?: boolean, searchValue?: string): Campaign[] => {
  return campaigns
    .map(ca => ({
      ...ca,
      commendations: ca.commendations.filter(co =>
        (typeof completed !== 'boolean' || co.completed === completed)
        && (!searchValue || co.title.toLowerCase().includes(searchValue.toLowerCase()) || co.subtitle.toLowerCase().includes(searchValue.toLowerCase())))
    }))
    .filter(ca => ca.commendations.length > 0);
}

const CommendationsModal: FC<CommendationsModalProps> = ({ id, title, open, campaigns, closeClick }) => {
  const [filterValue, setFilterValue] = useState<string>('not-completed');
  const [searchValue, setSearchValue] = useState<string>('');
  const filteredCampaigns = useMemo(() => {
    switch (filterValue) {
      case 'all':
        return filterCampaigns(campaigns, undefined, searchValue);
      case 'completed':
        return filterCampaigns(campaigns, true, searchValue);
      case 'not-completed':
        return filterCampaigns(campaigns, false, searchValue);
    }

    return [];
  }, [filterValue, campaigns, searchValue]);

  const smoothScroll = (e: ReactMouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();

    const href = e.currentTarget.getAttribute('href');

    if (!href) {
      return;
    }

    document.querySelector(href)?.scrollIntoView({
      behavior: 'smooth'
    });
  }

  return <Modal open={open} title={title} className='commendations-modal' onCancel={() => closeClick?.()} header={
    <>
      <div className='commendations-modal__filters'>
        {filterButtons.map(fb => (
          <label key={fb.value} className='commendation-modal-filter'>
            <span>{fb.label}</span>
            <input type='radio'
              name={`${id}-commendation-filters`}
              value={fb.value}
              checked={filterValue === fb.value}
              onChange={() => setFilterValue(fb.value)}
            />
          </label>
        ))}
      </div>
      <input className='modal__search' type='search' placeholder='Search' value={searchValue} onInput={(e) => setSearchValue(e.currentTarget.value)} />
    </>
  }
  >
    {campaigns.length > 1 && <aside className='commendations-modal__sidebar'>
      {filteredCampaigns.map(c => (
        <a key={c.id} href={`#${c.id}`} className='campaign-anchor' onClick={smoothScroll}>
          <span className='campaign-anchor__title'>{c.title}</span>
          <span className='campaign-anchor__completion'>{c.commendationsUnlocked}/{c.commendationsTotal}</span>
        </a>
      ))}
    </aside>}
    <main className='commendations-modal__main'>
      {filteredCampaigns.map(campaign => (
        <div key={campaign.id} className='campaign' id={campaign.id}>
          {campaign.title && <h2 className='campaign__title'>{campaign.title}</h2>}
          <div className='campaign__commendation-grid'>
            {campaign.commendations.map(c => (
              <CommendationCard key={c.title} commendation={c} />
            ))}
          </div>
        </div>
      ))}
    </main>
  </Modal>;
}

export default CommendationsModal;
