import { getScenarioHandler, ScenarioHandlerName } from './scenarios';
import type { ScenarioHandler, ScenarioHandlerParams } from './scenarios/ScenarioHandler';

export class DynamicRouter {
  private _handlers: Record<string, [name: ScenarioHandlerName, params?: ScenarioHandlerParams]> = {};

  public register(handlerId: string, handler: ScenarioHandlerName, params?: ScenarioHandlerParams): void {
    this._handlers[handlerId] = [handler, params];
  }

  public clear(): void {
    this._handlers = {};
  }

  public get(handlerId: string): [handler: ScenarioHandler, params?: ScenarioHandlerParams] | never {
    if (handlerId in this._handlers) {
      const [name, params] = this._handlers[handlerId];
      return [getScenarioHandler(name), params];
    }

    throw new Error(
      'DynamicRouter::get - '
      + `handlerId is incorrect (${handlerId}). `
      + `Excpected one of ${Object.keys(this._handlers).join(', ')}`,
    );
  }
}
