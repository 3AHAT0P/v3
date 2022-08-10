import { ActionFromClient, ActionToClient } from '@text-game/shared/APIGatewayShared';
import { loginfo, logerror } from '@text-game/shared/Logger';

import { ClientRecord } from '../ClientRecord';

export const onMessageFromClient = async (userInfo: ClientRecord, clientMessage: ActionFromClient): Promise<void> => {
  loginfo('OnMessageFromClient', '[x] Received ', clientMessage);

  if (clientMessage.action in userInfo.handlers) {
    const message: ActionToClient = await userInfo.handlers[clientMessage.action](userInfo);
    await userInfo.sendMessage(message);
    return;
  }

  logerror('OnMessageFromClient', 'clientMessage.action is incorrect', clientMessage);
};
