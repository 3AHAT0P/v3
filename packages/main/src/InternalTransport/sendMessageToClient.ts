import { ActionToClient } from '@text-game/shared/APIGatewayShared';
import { amqpAdapterInjectionToken } from '@text-game/shared/AMQP';
import { inject } from '@text-game/shared/DIContainer';
import { logerror, logwarn } from '@text-game/shared/Logger';

const LOGGER_PLACE = 'IternalTransport::sendMessageToClient';

export const sendMessageToClient = async (sessionId: string, message: ActionToClient): Promise<void> => {
  const queueName = `ACTION_TO_CLIENT=>${sessionId}`;
  try {
    const adapter = inject(amqpAdapterInjectionToken);
    const readyToNext = await adapter.sendMessage(queueName, {
      sessionId,
      message,
      messageType: 'TO_CLIENT',
    });

    if (!readyToNext) logwarn(LOGGER_PLACE, `Queue ${queueName} is not ready`);
  } catch (error) {
    logerror(LOGGER_PLACE, error);
  }
};
