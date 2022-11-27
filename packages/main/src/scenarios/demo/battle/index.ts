import type { ScenarioHandler } from '../../ScenarioHandler';
import type { RouteResolver } from '../../RouteResolver';

import { showEnemiesForExamine } from './showEnemiesForExamine';
import { mainLoop } from './mainLoop';
import { start } from './start';
import { showEnemiesForAttack } from './showEnemiesForAttack';
import { userAttack } from './userAttack';
import { userExamine } from './userExamine';
import { tryToLeave } from './tryToLeave';

const registry: Readonly<Record<string, ScenarioHandler>> = {
  START: start,
  MAIN: mainLoop,
  SHOW_ENEMIES_FOR_ATTACK: showEnemiesForAttack,
  SHOW_ENEMIES_FOR_EXAMINE: showEnemiesForExamine,
  USER_ATTACK: userAttack,
  USER_EXAMINE: userExamine,
  TRY_TO_LEAVE: tryToLeave,
};

export const resolver: RouteResolver = (name: string): ScenarioHandler => {
  if (name in registry) return registry[name];

  throw new Error(`Handler name is incorrect (${name})`);
};
