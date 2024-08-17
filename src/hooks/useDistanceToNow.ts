import { formatDistanceToNow } from 'date-fns/formatDistanceToNow';
import { useCallback, useEffect, useState } from 'react';

function useDistanceToNow(date?: Date, intervalMs: number = 5000) {
  const [distance, setDistance] = useState<string>('');

  const updateDistance = useCallback(() => {
    setDistance(date ? formatDistanceToNow(date) : '');
  }, [date]);

  useEffect(() => {
    updateDistance();

    const interval = setInterval(() => {
      updateDistance();
    }, intervalMs);

    return () => {
      clearInterval(interval);
    };
  }, [updateDistance, intervalMs]);

  return distance;
}

export default useDistanceToNow;
