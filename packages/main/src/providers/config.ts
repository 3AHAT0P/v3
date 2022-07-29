import { provide, InjectionToken } from '@text-game/shared/DIContainer';

import type { Config } from '../../.env';
import data from '../../.env.json';

export const configInjectionToken: InjectionToken<Config> = {
  id: Symbol('Config'),
  guard(value: unknown): value is Config {
    return typeof value === 'object' && value != null && 'messageBrokerPath' in value;
  },
};

export const init = (): void => {
  const config: Config = {
    messageBrokerPath: data.messageBrokerPath,
  };

  provide(configInjectionToken, config);
};
