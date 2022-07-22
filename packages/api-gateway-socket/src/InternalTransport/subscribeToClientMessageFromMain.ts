import { ActionToClient, MessageContainer } from '@text-game/shared/APIGatewayShared';
import { amqpAdapterInjectionToken } from '@text-game/shared/AMQP';
import { inject } from '@text-game/shared/DIContainer';
import { logerror } from '@text-game/shared/Logger';

const LOGGER_PLACE = 'IternalTransport::subscribeMessageFromClient';

export const subscribeToClientMessageFromMain = (
  sessionId: string,
  onMessageRecieve: (messageContainer: ActionToClient) => void,
): Promise<() => Promise<void>> => { // eslint-disable-line function-paren-newline
  const queueName = `ACTION_TO_CLIENT=>${sessionId}`;
  const adapter = inject(amqpAdapterInjectionToken);
  return adapter.subscribe(queueName, (messageContainer: MessageContainer): void => {
    if (messageContainer.messageType === 'TO_CLIENT') return onMessageRecieve(messageContainer.message);

    logerror(
      LOGGER_PLACE,
      `expected messageType is 'TO_CLIENT', but found ${messageContainer.messageType}`,
      messageContainer,
    );
  });
};
