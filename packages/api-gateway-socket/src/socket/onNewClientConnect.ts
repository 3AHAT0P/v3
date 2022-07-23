import { ActionFromClient, ActionToClient } from '@text-game/shared/APIGatewayShared';
import { logerror, loginfo, logwarn } from '@text-game/shared/Logger';
import { Socket } from 'socket.io';

import {
  deleteSessionQueue,
  sendFromClientMessageToMain, sendSystemMessageToMain,
  subscribeToClientMessageFromMain,
} from '../InternalTransport';

interface ClientConnection {
  socket: Socket;
}

const clients: Map<string, ClientConnection> = new Map();

export const onNewClientConnect = async (socket: Socket) => {
  const sessionId = socket.id;
  clients.set(sessionId, { socket });

  socket.on('SYSTEM', (data: ActionFromClient) => logwarn('Socket::onSystemMessage', 'SYSTEM', sessionId, data));
  socket.on('MESSAGE', async (data: ActionFromClient) => {
    loginfo('Socket::onMessage', sessionId, data);
    try {
      await sendFromClientMessageToMain(sessionId, data);
    } catch (error) {
      logerror('Socket::onMessage', error);
    }
  });

  const unsubscribe = await subscribeToClientMessageFromMain(sessionId, (message: ActionToClient) => {
    socket.emit('MESSAGE', message);
  });
  await sendSystemMessageToMain(sessionId, 'CONNECTED');

  socket.on('disconnect', async (reason: string) => {
    try {
      clients.delete(sessionId);
      await unsubscribe();
      await sendSystemMessageToMain(sessionId, 'DISCONNECTED');
      await deleteSessionQueue(sessionId);
      logwarn('Socket::disconnect', `Client is disconnected with reason: ${reason}`);
    } catch (error) {
      logerror('Socket::disconnect', error);
    }
  });
};
