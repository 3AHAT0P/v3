import { provide, InjectionToken } from '@text-game/shared/DIContainer';
import data from '../../.env.json';

export interface Config {
  messageBrokerPath: string;
  wsPort: number;
  clientLocation: string;
}

export const configInjectionToken: InjectionToken<Config> = {
  id: Symbol('Config'),
  guard(value: unknown): value is Config {
    return typeof value === 'object' && value != null && 'messageBrokerPath' in value && 'wsPort' in value;
  },
};

export const init = (): void => {
  const config: Config = {
    messageBrokerPath: data.messageBrokerPath,
    wsPort: data.wsPort,
    clientLocation: data.clientLocation,
  };

  provide(configInjectionToken, config);
};
