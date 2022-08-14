import { getScenarioHandler, ScenarioHandlerName } from './scenarios';
import type { ScenarioHandler } from './scenarios/ScenarioHandler';

export class DynamicRouter {
  private _handlers: Record<string, ScenarioHandlerName> = {};

  public register(handlerId: string, handler: ScenarioHandlerName): void {
    this._handlers[handlerId] = handler;
  }

  public clear(): void {
    this._handlers = {};
  }

  public get(handlerId: string): ScenarioHandler | never {
    if (handlerId in this._handlers) return getScenarioHandler(this._handlers[handlerId]);

    throw new Error(
      'DynamicRouter::get - '
      + `handlerId is incorrect (${handlerId}). `
      + `Excpected one of ${Object.keys(this._handlers).join(', ')}`,
    );
  }
}
