import { logerror } from '@text-game/shared/Logger';

import { ClientRecord } from '../ClientRecord';

import { onConnect } from './onConnect';
import { onDisconnect } from './onDisconnect';

export const onSystemMessage = async (
  clients: Map<ClientRecord['userId'], ClientRecord>,
  sessionId: string,
  message: 'CONNECTED' | 'DISCONNECTED',
) => {
  try {
    if (message === 'CONNECTED') return await onConnect(clients, sessionId);
    if (message === 'DISCONNECTED') return onDisconnect(clients, sessionId);

    logerror('Run::OnSystemMessage', 'Incorrect message');
  } catch (error) {
    logerror('Run::OnSystemMessage', sessionId, message, error);
  }
};
