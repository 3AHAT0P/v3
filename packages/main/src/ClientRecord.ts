import type { ActionToClient } from '@text-game/shared/APIGatewayShared';

import { DynamicRouter } from './DynamicRouter';

export interface UserInfo {
  sessionId: string;
  userId: string;
}

export class ClientRecord {
  private _userInfo: UserInfo;

  private _onMessageSend: (message: ActionToClient) => Promise<void>;

  public readonly router: DynamicRouter = new DynamicRouter();

  public get sessionId(): string {
    return this._userInfo.sessionId;
  }

  public get userId(): string {
    return this._userInfo.userId;
  }

  private _userState: Record<string, any> = {};

  constructor(userInfo: UserInfo, onMessageSend: (message: ActionToClient) => Promise<void>) {
    this._userInfo = userInfo;
    this._onMessageSend = onMessageSend;
  }

  public sendMessage(message: ActionToClient): Promise<void> {
    return this._onMessageSend(message);
  }

  public getStateFor<TState = any>(scenarioName: string): TState {
    if (scenarioName in this._userState) return this._userState[scenarioName];

    throw new Error('Incorrect scenario name');
  }

  public hasStateFor(scenarioName: string): boolean {
    return scenarioName in this._userState;
  }

  public setStateFor(scenarioName: string, state: any): void {
    this._userState[scenarioName] = state;
  }
}
