import type { ActionFromClient, ActionToClient } from '@text-game/shared/APIGatewayShared';
import { loginfo } from '@text-game/shared/Logger';

import { ClientRecord } from '../ClientRecord';
import { sendMessageToClient, subscribeMessageFromClient } from '../InternalTransport/index';

import { onMessageFromClient } from './onMessageFromClient';

const entrypoint = 'HANDSHAKE.GREETING';

export const onConnect = async (clients: Map<ClientRecord['userId'], ClientRecord>, sessionId: string) => {
  loginfo('OnSystemMessage:onConnect', sessionId, 'CONNECTED');

  const userInfo: ClientRecord = new ClientRecord(
    { sessionId, userId: sessionId },
    (message: ActionToClient) => sendMessageToClient(sessionId, message),
  );

  userInfo.router.register('1', entrypoint);

  await subscribeMessageFromClient(
    sessionId,
    (clientMessage: ActionFromClient) => onMessageFromClient(userInfo, clientMessage),
  );

  clients.set(sessionId, userInfo);

  setTimeout(() => onMessageFromClient(userInfo, { action: '1' }), 10);
};
