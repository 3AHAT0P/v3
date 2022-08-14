import { ActionToClient } from '@text-game/shared/APIGatewayShared';
import { provide, InjectionToken } from '@text-game/shared/DIContainer';
import { ClientRecord } from '@/ClientRecord';

export type ScenarioHandler = (userInfo: ClientRecord) => Promise<ActionToClient>;

export interface ScenarioHandlerRegistry {
  get(name: string): ScenarioHandler | never;
  register(name: string, handler: ScenarioHandler): void;
}

export const scenarioHandlerRegistryInjectionToken: InjectionToken<ScenarioHandlerRegistry> = {
  id: Symbol('ScenarioHandlerRegistry'),
  guard(value: unknown): value is ScenarioHandlerRegistry {
    return typeof value === 'object' && value != null && 'get' in value && 'register' in value;
  },
};

export const init = (): void => {
  const registry: Record<string, ScenarioHandler> = {};
  const registryAccestors: ScenarioHandlerRegistry = {
    get(name) {
      if (name in registry) return registry[name];

      throw new Error('name is incorrect');
    },
    register(name: string, handler: ScenarioHandler): void {
      registry[name] = handler;
    },
  };

  provide(scenarioHandlerRegistryInjectionToken, registryAccestors);
};
