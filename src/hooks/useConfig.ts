import { useCallback, useEffect, useState } from 'react';
import toConfig from '../lib/transform/to-config';
import { getConfig } from '../lib/sot-api';
import { Config } from '../models/config';

export default function useConfig(): [config: Config | undefined, refreshConfig: (force?: boolean) => void] {
  const [config, setConfig] = useState<Config | undefined>(undefined);

  const refreshConfig = useCallback(async (force = false) => {
    const config = await getConfig(force);
    setConfig(toConfig(config));
  }, []);

  useEffect(() => {
    refreshConfig(import.meta.env.PROD);
  }, [refreshConfig]);

  return [config, refreshConfig];
}
