import { Treasure } from '../models/treasure';

export function getTreasures(): Promise<Treasure[]> {
  return fetch('/treasures.json')
    .then(res => res.json());
}
