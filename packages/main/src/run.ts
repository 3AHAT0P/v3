import { ActionFromClient, ActionToClient } from '@text-game/shared/APIGatewayShared';
import { loginfo, logerror } from '@text-game/shared/Logger';

import { ClientRecord } from './ClientRecord';
import { sendMessageToClient, subscribeMessageFromClient, subscribeToSystemMessages } from './InternalTransport/index';
import { createMessageQueue } from './MessageQueue';
import { handshakeScenarioRun } from './scenarios/index';

const createOnMessageFromClientHandler = (
  userInfo: ClientRecord,
// eslint-disable-next-line arrow-body-style, function-paren-newline
): (clientMessage: ActionFromClient) => void => {
  return (clientMessage: ActionFromClient) => {
    loginfo('Run::OnMessageFromClient', '[x] Received ', clientMessage);
    userInfo.recievedMessageQueue.addMessage(clientMessage);
  };
};

const onConnect = async (clients: Map<ClientRecord['userId'], ClientRecord>, sessionId: string) => {
  loginfo('Run::OnSystemMessage:onConnect', sessionId, 'CONNECTED');

  const userInfo: ClientRecord = {
    sessionId,
    userId: sessionId,
    recievedMessageQueue: createMessageQueue<ActionFromClient>(),
    sendMessage: (message: ActionToClient) => sendMessageToClient(sessionId, message),
    userState: {},
  };

  await subscribeMessageFromClient(sessionId, createOnMessageFromClientHandler(userInfo));

  clients.set(sessionId, userInfo);

  await handshakeScenarioRun(userInfo);
};

const onDisconnect = (clients: Map<ClientRecord['userId'], ClientRecord>, sessionId: string) => {
  loginfo('Run::OnSystemMessage:onDisconnect', sessionId, 'DISCONNECTED');

  const client = clients.get(sessionId);
  if (client == null) {
    return logerror(
      'Run::OnSystemMessage:onDisconnect',
      `Client for session (#${sessionId}) is null`,
    );
  }

  client.recievedMessageQueue.destroy();
  clients.delete(sessionId);
};

export const run = async () => {
  const clients: Map<ClientRecord['userId'], ClientRecord> = new Map();

  await subscribeToSystemMessages(async (sessionId, message) => {
    switch (message) {
      case 'CONNECTED': {
        await onConnect(clients, sessionId);
        break;
      }
      case 'DISCONNECTED': {
        onDisconnect(clients, sessionId);
        break;
      }
      default: {
        logerror('Run::OnSystemMessage', 'Incorrect message');
        break;
      }
    }
  });
};
