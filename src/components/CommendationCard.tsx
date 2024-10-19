import { FC, useMemo } from 'react';
import type { Commendation } from '../models/commendation';
import './CommendationCard.scss';
import CommendationProgress from './CommendationProgress';

type CommendationCardProps = {
  commendation: Commendation;
};

const CommendationCard: FC<CommendationCardProps> = ({ commendation }) => {
  const className = useMemo(() => `commendation-card${commendation.completed ? ' commendation-card--completed' : ''}`, [commendation.completed])

  return <article className={className}>
    <div className='commendation-card__content'>
      <img loading="lazy" className='commendation-card__image' src={commendation.image} alt={commendation.title} />
      <div className='commendation-card__description'>
        <h3 className='commendation-card__title'>{commendation.title}</h3>
        <p className='commendation-card__subtitle'>{commendation.subtitle}</p>
      </div>
    </div>
    {commendation.scalar && 
      <CommendationProgress name={commendation.title} scalar={commendation.scalar} />
    }
  </article>;
}

export default CommendationCard;
