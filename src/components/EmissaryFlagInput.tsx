import { FC, useEffect, useMemo, useState } from 'react';
import './EmissaryFlagInput.scss';
import wikiImage from '../lib/wikiImage';

type EmissaryFlagInputProps = {
  onEmissaryMultiplierChange?: (multiplier: number) => void;
};

const guildIcon = '/5/58/Guild_icon.png';
const sovereignsIcon = '/8/85/Sovereigns_icon.png';
const emissaryMultipliers = [1, 1.33, 1.66, 2, 2.5];
const guildEmissaryMultipliers = [1, 1.15, 1.30, 1.45, 1.75];


const EmissaryFlagInput: FC<EmissaryFlagInputProps> = ({ onEmissaryMultiplierChange }) => {
  const [isGuildEmissaryFlag, setIsGuildEmissaryFlag] = useState<boolean>(false);
  const [grade, setGrade] = useState<number>(1);

  const emissaryGrades = useMemo(() => Array.from({ length: 5 }, (_e, i) => i + 1), []);
  const emissaryMultiplier = useMemo(
    () => (isGuildEmissaryFlag ? guildEmissaryMultipliers : emissaryMultipliers)[grade - 1], 
    [grade, isGuildEmissaryFlag]
  );
  const emissaryFlagImage = useMemo<string>(() => wikiImage(isGuildEmissaryFlag ? guildIcon : sovereignsIcon), [isGuildEmissaryFlag]);

  useEffect(() => {
    onEmissaryMultiplierChange?.(emissaryMultiplier);
  }, [onEmissaryMultiplierChange, emissaryMultiplier]);

  return <div className='emissary-flag-input'>
    <input
      className='emissary-flag-switcher'
      type='checkbox'
      aria-label='Guild emissary flag'
      checked={isGuildEmissaryFlag}
      onChange={() => setIsGuildEmissaryFlag(!isGuildEmissaryFlag)}
    />
    <img className='emissary-flag-switcher__icon' src={emissaryFlagImage} alt='' />
    <fieldset className='emissary-flag-grade'>
      {emissaryGrades.map(emissaryGrade => (
        <input 
          key={emissaryGrade}
          name='emissary-flag-grade' 
          type='radio'
          className={`emissary-flag-grade__input${emissaryGrade <=  grade ? ' emissary-flag-grade__input--active' : ''}`}
          value={emissaryGrade}
          checked={grade === emissaryGrade}
          aria-label={`Emissary flag grade ${emissaryGrade}`}
          onChange={() => setGrade(emissaryGrade)}
        />
      ))}
    </fieldset>
    <span className='emissary-flag-input__multiplier'>x{emissaryMultiplier.toFixed(2)}</span>
  </div>;
}

export default EmissaryFlagInput;
