import type { ProgressMarker } from '../components/Progress';
import romanize from './romanize';

export default function generateDistinctionMarkers(maxLevel: number): ProgressMarker[] {
  const numberOfDistinctions = Math.round(maxLevel / 100);
  return Array.from({length: numberOfDistinctions}, (_, i) => i + 1).map((n) => ({
    label: romanize(n),
    value: n * 100
  }));
}
