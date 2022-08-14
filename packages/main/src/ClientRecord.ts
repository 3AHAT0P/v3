import type { ActionToClient } from '@text-game/shared/APIGatewayShared';

import type { DynamicRouter } from './DynamicRouter';

export interface ClientRecord {
  sessionId: string;
  userId: string;
  sendMessage: (message: ActionToClient) => Promise<void>;
  userState: any;
  router: DynamicRouter;
}
