import { ActionToClient } from '@text-game/shared/APIGatewayShared';

export interface ClientRecord {
  sessionId: string;
  userId: string;
  sendMessage: (message: ActionToClient) => Promise<void>;
  userState: any;
  handlers: Record<string, (userInfo: ClientRecord) => Promise<ActionToClient>>;
  registerHandler(handlerId: string, handler: (userInfo: ClientRecord) => Promise<ActionToClient>): void;
  clearHandlers(): void;
}
