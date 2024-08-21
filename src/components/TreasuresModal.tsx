import { FC, Fragment, useMemo, useState } from 'react';
import Modal from './Modal';
import useTreasures from '../hooks/useTreasures';
import './TreasuresModal.scss';
import CurrencyDisplay from './CurrencyDisplay';
import formatMinMaxValue from '../lib/formatMinMaxValue';
import { Treasure } from '../models/treasure';

type TreasuresModalProps = {
  open: boolean;
  closeClick?: () => void;
};

const lowestToHighestPrice = (t1: Treasure, t2: Treasure): number => {
  const n1 = t1.reward.base.max ? t1.reward.base.max : t1.reward.base.min;
  const n2 = t2.reward.base.max ? t2.reward.base.max : t2.reward.base.min;

  return n1 - n2;
}

const emissaryMultipliers = [1, 1.33, 1.66, 2, 2.5];
const guildEmissaryMultipliers = [1, 1.15, 1.30, 1.45, 1.75];

const nameToFaction = (name: string): string => {
  return name.replace(' Treasure', '').replace(/( |')/g, '');
}

type TreasuresGroup = {
  name: string;
  treasures: Treasure[];
}

const filterGroupTreasures = (groupedTreasures: TreasuresGroup[], search: string) => {
  const n = search.toLowerCase().trim();

  return groupedTreasures.map((g) => ({
    ...g,
    treasures: g.treasures.filter(t => t.name.toLowerCase().includes(n))
  })).filter(g => g.treasures.length > 0);
}

const TreasuresModal: FC<TreasuresModalProps> = ({ open, closeClick }) => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [emissaryLevel, setEmissaryLevel] = useState<number>(0);
  const [isGuildEmissary, setIsGuildEmissary] = useState<boolean>(false);
  const treasures = useTreasures();
  const groupedTreasures = useMemo(() => {
    const g = treasures.reduce((acc, t) => {
      if (!acc[t.type]) {
        acc[t.type] = [];
      }

      acc[t.type].push(t);
      return acc;
    }, {} as { [key: string]: Treasure[] });

    return Object.entries(g).map(([name, treasures]) => ({
      name,
      treasures: treasures.sort(lowestToHighestPrice)
    }))
  }, [treasures]);
  const filteredGroupedTreasures = useMemo(() => filterGroupTreasures(groupedTreasures, searchValue), [searchValue, groupedTreasures])
  const emissaryMultiplier = useMemo(() => isGuildEmissary ? guildEmissaryMultipliers[emissaryLevel] : emissaryMultipliers[emissaryLevel], [emissaryLevel, isGuildEmissary]);

  return <Modal open={open} title='Treasures' className='modal treasures-modal' onCancel={() => closeClick?.()} header={
    <>
      <input className='treasures-modal__search' type='search' placeholder='Search' value={searchValue} onInput={(e) => setSearchValue(e.currentTarget.value)} />
      <label>
        Emissary level
        <input type="range" min={0} max={4} value={emissaryLevel} onChange={(e) => setEmissaryLevel(parseInt(e.currentTarget.value))}/>
      </label>
      <label>
        <input type="checkbox" checked={isGuildEmissary} onChange={() => setIsGuildEmissary(!isGuildEmissary)} />
        Guild Emissary
      </label>
    </>
  }>
    <table className='treasures-modal__table' cellSpacing="0" cellPadding="0">
      <thead>
        <tr>
          <th></th>
          <th>Type</th>
          <th>Price</th>
          <th>Emissary Value</th>
        </tr>
      </thead>
      <tbody>
        {filteredGroupedTreasures.map((treasureGroup) => (
          <Fragment key={treasureGroup.name}>
            <tr className={`treasure-type ${nameToFaction(treasureGroup.name)}`}>
              <th colSpan={4}>
                {treasureGroup.name}
              </th>
            </tr>
            {treasureGroup.treasures.map((treasure) => (
              <tr key={treasure.name}>
                <td>
                  <div className='base-commissioned-values'>
                    <span>{treasure.name}</span>
                    {treasure.reward.commissioned && <span>Commissioned</span>}
                  </div>
                </td>
                <td>
                  <div className='treasure-subtype'>
                    <span>{treasure.subType}</span>
                  </div>
                </td>
                <td>
                  <div className='base-commissioned-values'>
                    <CurrencyDisplay value={treasure.reward.base} code={treasure.currency} multiplier={emissaryMultiplier} />
                    {treasure.reward.commissioned && <CurrencyDisplay value={treasure.reward.commissioned} code={treasure.currency} multiplier={emissaryMultiplier} />}
                  </div>
                </td>
                <td>
                  {treasure.emissary && <div className='base-commissioned-values'>
                    <span>{formatMinMaxValue(treasure.emissary.base, emissaryMultiplier)}</span>
                    {treasure.emissary.commissioned && <span>{formatMinMaxValue(treasure.emissary.commissioned, emissaryMultiplier)}</span>}
                  </div>}
                </td>
              </tr>
            ))}
          </Fragment>
        ))}
      </tbody>
    </table>
  </Modal>;
}

export default TreasuresModal;
