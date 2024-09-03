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
  const commendationProgressId = useMemo(() => `${faction.id}-commendation-progress`, [faction.id]);
  const ledgerProgressId = useMemo(() => `${faction.id}-ledger-progress`, [faction.id]);

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
    if (faction.maxLevel <= 100 || faction.maxLevel > 1000) {
      return [];
    }

    return generateDistinctionMarkers(faction.maxLevel);
  }, [faction.maxLevel]);

  const ledgerMax = useMemo(() => {
    return ledger ? Math.max(ledger.bands[0].thresholdScore, ledger.score) : 0;
  }, [ledger]);

  const ledgerMarkers = useMemo(() => {
    if (!ledger || !config) {
      return [];
    }

    const m: ProgressMarker[] = ledger.bands.map((band, i) => ({
      value: band.thresholdScore,
      label: `Threshold Score: ${formatNumber(band.thresholdScore)}\nCompleted ${band.level} times out of ${ledger.maxLevel}`,
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

  const ledgerDiff = useMemo(() => {
    if (!ledger) {
      return '';
    }

    const diff = ledger.score - ledger.bands[0].thresholdScore;

    return `${diff > 0 ? '+' : ''}${formatNumber(diff)}`;
  }, [ledger]);

  const ledgerRank = useMemo(() => `${ledger && ledger.rank > 0 ? `Rank ${formatNumber(ledger.rank)}` : ''}`, [ledger]);

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
        {distinctionMarkers.length > 0 && <Progress id={distinctionProgressId} startLabel='Distinctions' max={faction.maxLevel} value={faction.level} markers={distinctionMarkers}/>}
        <Progress id={commendationProgressId} startLabel='Commendations' max={faction.commendationsTotal} value={faction.commendationsUnlocked}/>
        {ledger && <Progress id={ledgerProgressId}
          className='ledger-progress'
          startLabel={<div className='ledger-label'><span>Ledger</span>{ledgerRank && <span className='ledger-label__secondary'>{ledgerRank}</span>}</div>}
          endLabel={<div className='ledger-label'><span className='ledger-label__secondary'>{ledgerDiff}</span><span>{formatNumber(ledger.score)}</span></div>}
          max={ledgerMax}
          value={ledger.score}
          markers={ledgerMarkers}
        />}
      </div>
    </button>
    <CommendationsModal id={faction.id} open={commendationModalOpen} title={faction.name} closeClick={() => setCommendationModalOpen(false)} campaigns={faction.campaigns} />
  </div>;
}

export default Faction;
