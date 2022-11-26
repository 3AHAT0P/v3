import { ActionFromClient, ActionToClient } from '@text-game/shared/APIGatewayShared';
import { loginfo, logerror } from '@text-game/shared/Logger';

import { ClientRecord } from '../ClientRecord';

export const onMessageFromClient = async (userInfo: ClientRecord, clientMessage: ActionFromClient): Promise<void> => {
  loginfo('OnMessageFromClient', '[x] Received ', clientMessage);

  try {
    const [handler, params] = userInfo.router.get(clientMessage.action);
    const message: ActionToClient = await handler(userInfo, params);
    await userInfo.sendMessage(message);
  } catch (error) {
    logerror('OnMessageFromClient', error, clientMessage);
  }
};
