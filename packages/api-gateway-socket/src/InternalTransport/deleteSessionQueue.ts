import { amqpAdapterInjectionToken } from '@text-game/shared/AMQP';
import { inject } from '@text-game/shared/DIContainer';
import { logerror } from '@text-game/shared/Logger';

const LOGGER_PLACE = 'IternalTransport::deleteSessionQueue';

export const deleteSessionQueue = async (sessionId: string): Promise<void> => {
  const queueName = `ACTION_FROM_CLIENT=>${sessionId}`;
  try {
    const adapter = inject(amqpAdapterInjectionToken);
    await adapter.deleteQueue(queueName);
  } catch (error) {
    logerror(LOGGER_PLACE, error);
  }
};
