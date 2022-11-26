import { ActionType } from '@text-game/shared/Main/Action';

import type { DynamicRouter } from '@/DynamicRouter';
import { MessageAnswer } from './MessageAnswer';

export const registerRouteAndReturnMessageAnswer = (router: DynamicRouter) => (index: number, routeName: string) => {
  const stringIndex = index.toString();
  router.register(stringIndex, routeName);
  return (type: ActionType, actionName: string): MessageAnswer => [stringIndex, type, actionName];
};
