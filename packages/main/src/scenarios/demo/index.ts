import { ScenarioHandler } from '../ScenarioHandler';
import { RouteResolver } from '../RouteResolver';

import { resolver as demoStoryResolver } from './story';
import { resolver as demoBattleResolver } from './battle';

const registry: Readonly<Record<string, RouteResolver>> = {
  STORY: demoStoryResolver,
  BATTLE: demoBattleResolver,
};

export const resolver: RouteResolver = (name: string, ...otherNames: string[]): ScenarioHandler => {
  if (name in registry) return registry[name](...otherNames);

  throw new Error(`Handler name is incorrect (${name})`);
};

export const demoList: Array<[routeName: string, actionName: string]> = [
  ['DEMO.STORY.START', 'Попробовать демо сюжет'],
  ['DEMO.BATTLE.START', 'Попробовать демо бой'],
  // ['DEMO.??.START', 'Попробовать демо общение с NPC'],
  // ['DEMO.??.START', 'Попробовать демо локацию'],
];
