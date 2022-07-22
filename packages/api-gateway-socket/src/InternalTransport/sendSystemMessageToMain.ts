import { amqpAdapterInjectionToken } from '@text-game/shared/AMQP';
import { inject } from '@text-game/shared/DIContainer';
import { logwarn, logerror } from '@text-game/shared/Logger';

const LOGGER_PLACE = 'IternalTransport::sendSystemMessageToMain';
const queueName = 'SYSTEM';

export const sendSystemMessageToMain = async (sessionId: string, message: 'CONNECTED' | 'DISCONNECTED'): Promise<void> => {
  try {
    const adapter = inject(amqpAdapterInjectionToken);
    const readyToNext = await adapter.sendMessage(queueName, {
      sessionId,
      message,
      messageType: 'SYSTEM',
    });
    if (!readyToNext) logwarn(LOGGER_PLACE, `Queue ${queueName} is not ready`);
  } catch (error) {
    logerror(LOGGER_PLACE, error);
  }
};
