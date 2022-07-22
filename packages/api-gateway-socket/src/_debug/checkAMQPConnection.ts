import { MessageContainer } from '@text-game/shared/APIGatewayShared';
import { inject } from '@text-game/shared/DIContainer';
import { loginfo } from '@text-game/shared/Logger';

import { amqpAdapterInjectionToken } from '../providers/amqp';

const sendMessage = async (queueName: string, message: MessageContainer) => {
  const adapter = inject(amqpAdapterInjectionToken);
  const readyToNext = await adapter.sendMessage(queueName, message);
  loginfo('sendMessage', " [x] Sent '%s'", message, readyToNext);
};

export const checkAMQPConnection = () => {
  const queueName = 'ACTION_FROM_CLIENT';
  const message = <const>{ sessionId: '123', messageType: 'FROM_CLIENT', message: { action: 'SOME_ACTION' } };

  setTimeout(sendMessage, 1000, queueName, message);
};
