import { AMQPAdapter, amqpAdapterInjectionToken } from '@text-game/shared/AMQP';
import { provide } from '@text-game/shared/DIContainer';

export { AMQPAdapter, amqpAdapterInjectionToken };

export const init = async (connectionURL: string): Promise<void> => {
  const adapter = new AMQPAdapter({ connectionURL });

  await adapter.init();

  provide(amqpAdapterInjectionToken, adapter);
};
