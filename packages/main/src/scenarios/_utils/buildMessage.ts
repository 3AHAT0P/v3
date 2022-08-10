import { ActionToClient } from '@text-game/shared/APIGatewayShared';
import { UserAction } from '@text-game/shared/Main/Action';

export const buildMessage = (text: string, userActLayout?: UserAction[][]): ActionToClient => ({
  text,
  needAnswer: userActLayout != null,
  userActLayout: userActLayout ?? [],
});
