import { ActionType } from '@text-game/shared/Main/Action';

import type { DynamicRouter } from '@/DynamicRouter';

import { ScenarioHandlerParams } from '../ScenarioHandler';

import { MessageAnswer } from './MessageAnswer';

export const registerRouteAndReturnMessageAnswer = (router: DynamicRouter) => (
  index: number, routeName: string, params?: ScenarioHandlerParams,
) => {
  const stringIndex = index.toString();
  router.register(stringIndex, routeName, params);
  return (type: ActionType, actionName: string): MessageAnswer => [stringIndex, type, actionName];
};
