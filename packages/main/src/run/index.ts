import { logerror } from '@text-game/shared/Logger';

import { ClientRecord } from '../ClientRecord';
import { subscribeToSystemMessages } from '../InternalTransport/index';
import { onSystemMessage } from './onSystemMessage';

export const run = async () => {
  const clients: Map<ClientRecord['userId'], ClientRecord> = new Map();

  try {
    await subscribeToSystemMessages(
      (sessionId, message) => onSystemMessage(clients, sessionId, message),
    );
  } catch (error) {
    logerror('Run', error);
  }
};
