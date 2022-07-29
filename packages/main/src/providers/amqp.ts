import { AMQPAdapter, amqpAdapterInjectionToken } from '@text-game/shared/AMQP';
import { provide, inject } from '@text-game/shared/DIContainer';

import { configInjectionToken } from './config';

export { AMQPAdapter, amqpAdapterInjectionToken };

export const init = async (): Promise<void> => {
  const config = inject(configInjectionToken);
  const adapter = new AMQPAdapter({ connectionURL: config.messageBrokerPath });

  await adapter.init();

  provide(amqpAdapterInjectionToken, adapter);
};
