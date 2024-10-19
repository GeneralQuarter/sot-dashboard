import { FC, useMemo } from 'react';
import { CommendationScalar } from '../models/commendation';
import Progress, { ProgressMarker } from './Progress';
import romanize from '../lib/romanize';
import formatNumber from '../lib/formatNumber';

type CommendationProgressProps = {
  name: string;
  scalar: CommendationScalar;
};

const CommendationProgress: FC<CommendationProgressProps> = ({ name, scalar }) => {
  const markers = useMemo<ProgressMarker[] | undefined>(() => {
    if (!scalar || !scalar.grades) {
      return;
    }

    return scalar.grades.map((g, i) => ({
      label: romanize(i + 1),
      value: g
    }));
  }, [scalar]);

  const endLabel = useMemo(() => {
    if (!scalar || !scalar.grades) {
      return '';
    }

    if (scalar.value === scalar.maxValue) {
      return formatNumber(scalar.maxValue);
    }

    return `${formatNumber(scalar.value)}/${formatNumber(scalar.maxValue)}`;
  }, [scalar])

  return <Progress 
    id={`${name}-progress`} 
    max={scalar.maxValue}
    startLabel=''
    endLabel={<span>{endLabel}</span>}
    value={scalar.value}
    markers={markers}
  />;
}

export default CommendationProgress;
