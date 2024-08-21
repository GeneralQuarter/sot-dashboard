import { Treasure } from '../models/treasure';

export function getTreasures(): Promise<Treasure[]> {
  return fetch(`${import.meta.env.BASE_URL}treasures.json`)
    .then(res => res.json());
}
