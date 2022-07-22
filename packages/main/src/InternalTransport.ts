import { ActionFromClient, ActionToClient, MessageContainer } from '@text-game/shared/APIGatewayShared';
import { amqpAdapterInjectionToken } from '@text-game/shared/AMQP';
import { inject } from '@text-game/shared/DIContainer';
import { logerror, logwarn } from '@text-game/shared/Logger';

export const sendMessageToClient = async (sessionId: string, message: ActionToClient): Promise<void> => {
  const queueName = `ACTION_TO_CLIENT=>${sessionId}`;
  const adapter = inject(amqpAdapterInjectionToken);
  const readyToNext = await adapter.sendMessage(queueName, {
    sessionId,
    message,
    messageType: 'TO_CLIENT',
  });

  if (!readyToNext) logwarn('IternalTransport::sendFromClientMessageToMain', `Queue ${queueName} is not ready`);
};

export const subscribeToSystemMessages = (
  onSystemMessageRecieve: (messageContainer: 'CONNECTED' | 'DISCONNECTED') => void,
): Promise<() => Promise<void>> => { // eslint-disable-line function-paren-newline
  const queueName = 'SYSTEM';
  const adapter = inject(amqpAdapterInjectionToken);
  return adapter.subscribe(queueName, (messageContainer: MessageContainer): void => {
    if (messageContainer.messageType === 'SYSTEM') return onSystemMessageRecieve(messageContainer.message);

    logerror(
      'IternalTransport::subscribeMessageFromClient',
      `expected messageType is 'SYSTEM', but found ${messageContainer.messageType}`,
      messageContainer,
    );
  });
};

export const subscribeMessageFromClient = (
  sessionId: string,
  onMessageRecieve: (action: ActionFromClient) => void,
): Promise<() => Promise<void>> => { // eslint-disable-line function-paren-newline
  const queueName = `ACTION_FROM_CLIENT=>${sessionId}`;
  const adapter = inject(amqpAdapterInjectionToken);
  return adapter.subscribe(queueName, (messageContainer: MessageContainer): void => {
    if (messageContainer.messageType === 'FROM_CLIENT') return onMessageRecieve(messageContainer.message);

    logerror(
      'IternalTransport::subscribeMessageFromClient',
      `expected messageType is 'FROM_CLIENT', but found ${messageContainer.messageType}`,
      messageContainer,
    );
  });
};
