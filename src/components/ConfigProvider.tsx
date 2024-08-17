import { FC, PropsWithChildren } from 'react';
import type { Config } from '../models/config';
import { ConfigContext } from '../contexts/config';

type ConfigProviderProps = {
  config?: Config;
}

const ConfigProvider: FC<PropsWithChildren<ConfigProviderProps>> = ({ children, config }) => {
  return <ConfigContext.Provider value={config}>
    {children}
  </ConfigContext.Provider>
}

export default ConfigProvider;
