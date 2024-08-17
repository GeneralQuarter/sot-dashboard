import { CSSProperties, FC, useMemo, useState } from 'react';
import './Faction.scss';
import Progress, { ProgressMarker } from './Progress';
import type { Faction as FactionType } from '../models/faction';
import generateDistinctionMarkers from '../lib/generateDistinctionMarkers';
import formatNumber from '../lib/formatNumber';
import CommendationsModal from './CommendationsModal';
import type { Ledger } from '../models/ledger';
import { useConfig } from '../contexts/config';
import factionBackgroundImagePath from '../lib/factionBackgroundImagePath';
import guildIconUrl from '../lib/guildIconUrl';
import ledgerBandImagePath from '../lib/ledgerBandImagePath';

type FactionProps = {
  faction: FactionType
  ledger?: Ledger;
};

interface FactionProgressionCssProperties extends CSSProperties {
  '--progression-image'?: string;
}

const Faction: FC<FactionProps> = ({ faction, ledger }) => {
  const config = useConfig();
  const factionIdOrGuild = useMemo(() => faction.guild ? 'Guilds' : faction.id, [faction.guild, faction.id]);
  const [commendationModalOpen, setCommendationModalOpen] = useState<boolean>(false);
  const distinctionProgressId = useMemo(() => `${faction.id}-distinction-progress`, [faction.id]);
  const levelProgressId = useMemo(() => `${faction.id}-level-progress`, [faction.id]);
  const commendationProgressId = useMemo(() => `${faction.id}-commendation-progress`, [faction.id]);
  const ledgerProgressId = useMemo(() => `${faction.id}-ledger-progress`, [faction.id]);
  const ledgerCompletionProgressId = useMemo(() => `${faction.id}-ledger-completion-progress`, [faction.id]);

  const className = useMemo(() => `faction ${faction.id}${faction.guild ? ' Guilds' : ''}`, [faction.id, faction.guild]);
  const style = useMemo<FactionProgressionCssProperties>(() => {
    if (!config) {
      return {};
    }

    return {
      '--progression-image': `url('${config.cdnUrl}${factionBackgroundImagePath(faction)}')`
    }
  }, [config, faction]);

  const distinctionMarkers = useMemo<ProgressMarker[]>(() => {
    if (faction.guild) {
      if (!config) {
        return [];
      }

      return [
        {
          label: '15',
          value: 15,
          image: `${config.cdnUrl}${ledgerBandImagePath(factionIdOrGuild, 3)}`
        },
        {
          label: 'I',
          value: 100,
        }
      ]
    }

    if (faction.maxLevel <= 100 || faction.maxLevel > 500) {
      return [];
    }

    return generateDistinctionMarkers();
  }, [faction.maxLevel, faction.guild, config, factionIdOrGuild]);

  const ledgerMax = useMemo(() => {
    return ledger ? Math.max(ledger.bands[0].thresholdScore, ledger.score) : 0;
  }, [ledger]);

  const ledgerMarkers = useMemo(() => {
    if (!ledger || !config) {
      return [];
    }

    const m: ProgressMarker[] = ledger.bands.map((band, i) => ({
      value: band.thresholdScore,
      label: formatNumber(band.thresholdScore),
      image: `${config.cdnUrl}${ledgerBandImagePath(factionIdOrGuild, i)}`
    }));

    if (ledger.score > ledger.bands[0].thresholdScore) {
      m.push({
        value: ledger.score,
        label: ''
      });
    }

    return m;
  }, [ledger, factionIdOrGuild, config]);

  const ledgerCompletionMakers = useMemo(() => {
    if (!ledger || !config) {
      return [];
    }

    const ms: ProgressMarker[] = [];
    let currentLevel = 0;

    for (let i = 0; i < ledger.bands.length; i++) {
      const band = ledger.bands[i];

      if (currentLevel === band.level) {
        continue;
      }

      currentLevel = band.level;

      ms.push({
        label: band.level.toFixed(),
        value: band.level,
        image: `${config.cdnUrl}${ledgerBandImagePath(factionIdOrGuild, i)}`
      });
    }

    if (currentLevel !== ledger.maxLevel) {
      ms.push({
        label: ledger.maxLevel.toFixed(),
        value: ledger.maxLevel,
      })
    }

    return ms;
  }, [ledger, factionIdOrGuild, config]);

  const onFactionClick = () => {
    setCommendationModalOpen(true);
  }

  return <div className='faction-wrapper'>
    <button className={className} onClick={() => onFactionClick()}>
      <div className='faction-progression' style={style}>
        {faction.guild && <img className='faction-progression__guild-icon' src={guildIconUrl(faction.guild.iconId)} alt='Guild icon' />}
        {faction.maxLevel !== 0 && <span className='faction-progression__level'>{faction.level}</span>}
      </div>
      <div className='faction__progress-bars'>
        {faction.maxLevel > 50 && faction.maxLevel <= 500 && <Progress id={distinctionProgressId} startLabel='Distinctions' max={faction.maxLevel} value={faction.level} markers={distinctionMarkers}/>}
        {!faction.guild && <Progress id={commendationProgressId} startLabel='Commendations' max={faction.commendationsTotal} value={faction.commendationsUnlocked}/>}
        {faction.guild && <Progress id={levelProgressId} startLabel='Level Progress' max={100} value={faction.levelProgress * 100} hideMarkerLabels />}
        {ledger && <Progress id={ledgerProgressId} startLabel='Ledger' endLabel={<span>{formatNumber(ledger.score)}</span>} max={ledgerMax} value={ledger.score} markers={ledgerMarkers} />}
        {ledger && <Progress id={ledgerCompletionProgressId} startLabel='Ledger Times Completed' max={ledger.maxLevel} value={ledger.bands[0].level} markers={ledgerCompletionMakers} />}
      </div>
    </button>
    <CommendationsModal id={faction.id} open={commendationModalOpen} title={faction.name} closeClick={() => setCommendationModalOpen(false)} campaigns={faction.campaigns} />
  </div>;
}

export default Faction;
