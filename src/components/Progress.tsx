import { CSSProperties, FC, ReactElement, useMemo } from 'react';
import './Progress.scss'
import formatNumber from '../lib/formatNumber';

export type ProgressMarker = {
  label: string;
  value: number;
  image?: string;
}

type ProgressMarkerProps = {
  label: string;
  value: number;
  currentValue: number;
  image?: string;
  max: number;
  hideMarkerLabel?: boolean;
}

type ProgressProps = {
  id: string;
  className?: string;
  startLabel: string | ReactElement;
  endLabel?: string | ReactElement;
  value: number;
  max: number;
  markers?: ProgressMarker[];
  hideMarkerLabels?: boolean;
};

interface MarkerCssProperties extends CSSProperties {
  '--marker-inset-inline-start'?: string;
  '--marker-tick-background-color'?: string;
}

const ProgressMarker: FC<ProgressMarkerProps> = ({ label, value, max, currentValue, image, hideMarkerLabel }) => {
  const style = useMemo<MarkerCssProperties>(() => {
    const s: MarkerCssProperties = {
      '--marker-inset-inline-start': `${(100*value)/max}%`
    };

    if (currentValue >= value) {
      s['--marker-tick-background-color'] = 'var(--progress-value-color)';
    }

    return s;
  }, [value, currentValue, max]);

  return <div className='progress__marker' style={style}>
    {image && <img loading='lazy' className='progress__marker-image' src={image} title={label} />}
    {!image && !hideMarkerLabel && <span>{label}</span>}
  </div>
}

const Progress: FC<ProgressProps> = ({ id, className: _className, startLabel, endLabel, value, max, markers = [], hideMarkerLabels = false }) => {
  const className = useMemo(() => ['progress', ...(_className?.split(' ') ?? [])].join(' '), [_className]);
  const markersId = useMemo(() => `${id}__markers`, [id]);
  const _markers = useMemo(() => {
    if (markers.length === 0) {
      return [
        {label: '', value: 0},
        ...(value !== 0 && !hideMarkerLabels ? [
          {label: formatNumber(value), value},
        ] : []),
        ...(max !== value ? [
          {label: formatNumber(max), value: max}
        ] : []),
      ]
    }

    return [
      {label: '', value: 0},
      ...markers
    ]
  }, [markers, max, value, hideMarkerLabels]);

  return <div className={className}>
    <label htmlFor={id} className='progress__label'>
      {typeof startLabel === 'string' ? <span>{startLabel}</span> : <>{startLabel}</>}
      {typeof endLabel === 'string' ? <span>{endLabel}</span> : <>{endLabel}</>}
    </label>
    <div className='progress__wrapper'>
      <progress id={id} className='progress__progress'  max={max} value={value} />
      <div id={markersId} className='progress__markers'>
        {_markers.map((marker) => <ProgressMarker key={marker.value} 
          label={marker.label} 
          value={marker.value}
          currentValue={value}
          max={max}
          image={marker.image}
          hideMarkerLabel={hideMarkerLabels}
        />)}
      </div>
    </div>
  </div>
}

export default Progress;
