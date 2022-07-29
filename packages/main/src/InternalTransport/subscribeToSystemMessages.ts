import { MessageContainer } from '@text-game/shared/APIGatewayShared';
import { amqpAdapterInjectionToken } from '@text-game/shared/AMQP';
import { inject } from '@text-game/shared/DIContainer';
import { logerror } from '@text-game/shared/Logger';

const LOGGER_PLACE = 'IternalTransport::subscribeMessageFromClient';
const queueName = 'SYSTEM';

export const subscribeToSystemMessages = (
  onSystemMessageRecieve: (sessionId: string, message: 'CONNECTED' | 'DISCONNECTED') => void,
): Promise<() => Promise<void>> => { // eslint-disable-line function-paren-newline
  const adapter = inject(amqpAdapterInjectionToken);

  return adapter.subscribe(queueName, (messageContainer: MessageContainer): void => {
    if (messageContainer.messageType === 'SYSTEM') {
      return onSystemMessageRecieve(messageContainer.sessionId, messageContainer.message);
    }

    logerror(
      LOGGER_PLACE,
      `expected messageType is 'SYSTEM', but found ${messageContainer.messageType}`,
      messageContainer,
    );
  });
};
