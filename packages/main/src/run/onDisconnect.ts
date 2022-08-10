import { loginfo, logerror } from '@text-game/shared/Logger';

import { ClientRecord } from '../ClientRecord';

export const onDisconnect = (clients: Map<ClientRecord['userId'], ClientRecord>, sessionId: string) => {
  loginfo('Run::OnSystemMessage:onDisconnect', sessionId, 'DISCONNECTED');

  const client = clients.get(sessionId);
  if (client == null) {
    return logerror(
      'Run::OnSystemMessage:onDisconnect',
      `Client for session (#${sessionId}) is null`,
    );
  }

  clients.delete(sessionId);
};
