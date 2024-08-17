import type { ProgressMarker } from '../components/Progress';
import romanize from './romanize';

export default function generateDistinctionMarkers(): ProgressMarker[] {
  return [1, 2, 3, 4, 5].map((n) => ({
    label: romanize(n),
    value: n * 100
  }));
}
