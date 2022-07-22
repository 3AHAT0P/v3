import { ActionToClient } from '@text-game/shared/index';
import io, { Socket } from 'socket.io-client';

import { useSystemMessageStore } from '../store/SystemMessageStore';

export const createSocketConnection = (url: string = 'ws://localhost:8888') => {
  const systemMessageStore = useSystemMessageStore();

  const socket: Socket = io(url);

  socket.on('connect', () => {
    console.log('connect');
    systemMessageStore.onConnected();
  });

  socket.on('disconnect', () => {
    console.log('disconnect');
    systemMessageStore.onDisconnected();
  });

  socket.on('SYSTEM', (data: ActionToClient) => {
    console.log('SYSTEM', data);
    socket.emit('SYSTEM', 'Pong!');
  });

  socket.on('MESSAGE', (data: ActionToClient) => {
    systemMessageStore.onMessageFromServer(data);
  });
};
