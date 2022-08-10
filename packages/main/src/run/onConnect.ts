import { ActionFromClient, ActionToClient } from '@text-game/shared/APIGatewayShared';
import { loginfo } from '@text-game/shared/Logger';

import { ClientRecord } from '../ClientRecord';
import { sendMessageToClient, subscribeMessageFromClient } from './InternalTransport/index';
import { onMessageFromClient } from './onMessageFromClient';
import { handshakeScenarioHandlers } from '../scenarios';

const entrypoint = handshakeScenarioHandlers.greeting;

export const onConnect = async (clients: Map<ClientRecord['userId'], ClientRecord>, sessionId: string) => {
  loginfo('OnSystemMessage:onConnect', sessionId, 'CONNECTED');

  const userInfo: ClientRecord = {
    sessionId,
    userId: sessionId,
    sendMessage(message: ActionToClient): Promise<void> {
      return sendMessageToClient(sessionId, message);
    },
    userState: {},
    handlers: {},
    registerHandler(handlerId: string, handler: (userInfo: ClientRecord) => Promise<ActionToClient>) {
      userInfo.handlers[handlerId] = handler;
    },
    clearHandlers() {
      userInfo.handlers = {};
    },
  };

  await subscribeMessageFromClient(
    sessionId,
    (clientMessage: ActionFromClient) => onMessageFromClient(userInfo, clientMessage),
  );

  clients.set(sessionId, userInfo);

  setTimeout(entrypoint, 10);
};
