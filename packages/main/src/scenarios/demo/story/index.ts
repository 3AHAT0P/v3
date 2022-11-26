import { ScenarioHandler } from '../../ScenarioHandler';
import { RouteResolver } from '../../RouteResolver';

import { start } from './start';
import { takeSword } from './takeSword';
import { chop } from './chop';
import { lookAround } from './lookAround';

const registry: Readonly<Record<string, ScenarioHandler>> = {
  START: start,
  TAKE_SWORD: takeSword,
  CHOP: chop,
  LOOK_AROUND: lookAround,
};

export const resolver: RouteResolver = (name: string): ScenarioHandler => {
  if (name in registry) return registry[name];

  throw new Error(`Handler name is incorrect (${name})`);
};
