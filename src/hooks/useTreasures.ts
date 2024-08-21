import { useEffect, useState } from 'react';
import { Treasure } from '../models/treasure';
import { getTreasures } from '../lib/treasures';

export default function useTreasures(): Treasure[] {
  const [treasures, setTreasures] = useState<Treasure[]>([]);

  useEffect(() => {
    (async () => {
      setTreasures(await getTreasures());
    })();
  }, []);

  return treasures;
}
