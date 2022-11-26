import type { ScenarioHandler } from './ScenarioHandler';
import type { RouteResolver } from './RouteResolver';

import { resolver as handshakeResolver } from './handshake';

import { resolver as demoResolver } from './demo';

const registry: Readonly<Record<string, RouteResolver>> = {
  HANDSHAKE: handshakeResolver,
  DEMO: demoResolver,
};

export type ScenarioHandlerName = string;

export const getScenarioHandler = (fullname: ScenarioHandlerName): ScenarioHandler => {
  const [name, ...otherNames] = fullname.split('.');
  if (name in registry) return registry[name](...otherNames);

  throw new Error(`Handler name is incorrect (${name})`);
};
