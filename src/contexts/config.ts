import { createContext, useContext } from 'react';
import { Config } from '../models/config';

export const ConfigContext = createContext<Config | undefined>(undefined);
export const useConfig = () => useContext(ConfigContext);
