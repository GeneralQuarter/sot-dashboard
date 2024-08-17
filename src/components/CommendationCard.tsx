import { FC, useMemo } from 'react';
import type { Commendation } from '../models/commendation';
import Progress, { ProgressMarker } from './Progress';
import formatNumber from '../lib/formatNumber';
import romanize from '../lib/romanize';
import './CommendationCard.scss';

type CommendationCardProps = {
  commendation: Commendation;
};

const CommendationCard: FC<CommendationCardProps> = ({ commendation }) => {
  const className = useMemo(() => `commendation-card${commendation.completed ? ' commendation-card--completed' : ''}`, [commendation.completed])
  const markers = useMemo<ProgressMarker[] | undefined>(() => {
    if (!commendation.scalar || !commendation.scalar.grades) {
      return;
    }

    return commendation.scalar.grades.map((g, i) => ({
      label: romanize(i + 1),
      value: g
    }));
  }, [commendation.scalar]);

  const endLabel = useMemo(() => {
    if (!commendation.scalar) {
      return '';
    }

    if (commendation.scalar.value === commendation.scalar.maxValue) {
      return formatNumber(commendation.scalar.maxValue);
    }

    return `${formatNumber(commendation.scalar.value)}/${formatNumber(commendation.scalar.maxValue)}`;
  }, [commendation.scalar])

  return <article className={className}>
    <div className='commendation-card__content'>
      <img loading="lazy" className='commendation-card__image' src={commendation.image} alt={commendation.title} />
      <div className='commendation-card__description'>
        <h3 className='commendation-card__title'>{commendation.title}</h3>
        <p className='commendation-card__subtitle'>{commendation.subtitle}</p>
      </div>
    </div>
    {commendation.scalar && commendation.scalar.maxValue !== 1 && <Progress 
        id={`${commendation.title}-progress`} 
        max={commendation.scalar.maxValue}
        startLabel=''
        endLabel={<span>{endLabel}</span>}
        value={commendation.scalar.value}
        markers={markers}
      />}
  </article>;
}

export default CommendationCard;
