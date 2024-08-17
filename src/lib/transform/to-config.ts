import type { Config } from '../../models/config';
import type { SOTConfigResponse } from '../sot-api/config';

export default function toConfig(config: SOTConfigResponse): Config {
  return {
    cdnUrl: config.cdnUrl
  };
}
