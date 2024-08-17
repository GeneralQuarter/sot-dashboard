import { useEffect, useState } from 'react';

type UseRefreshDate = [Date | undefined, () => void];

export default function useRefreshDate(storageKey: string): UseRefreshDate {
  const [refreshDate, setRefreshDate] = useState<Date | undefined>();

  const update = () => {
    const now = new Date();
    localStorage.setItem(storageKey, now.toISOString());
    setRefreshDate(now);
  };

  useEffect(() => {
    const refreshDateISO = localStorage.getItem(storageKey);

    if (!refreshDateISO) {
      return;
    }

    setRefreshDate(new Date(refreshDateISO));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [refreshDate, update];
}
