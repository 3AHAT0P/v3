import { ActionFromClient, ActionToClient } from '@text-game/shared/APIGatewayShared';

import { MessageQueue } from './MessageQueue';

export interface ClientRecord {
  sessionId: string;
  userId: string;
  recievedMessageQueue: MessageQueue<ActionFromClient>;
  sendMessage: (message: ActionToClient) => Promise<void>;
  userState: any;
}
