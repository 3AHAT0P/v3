import { ActionToClient } from '@text-game/shared/APIGatewayShared';
import { ClientRecord } from '@/ClientRecord';

export type ScenarioHandlerParams = Record<string, any>;

export type ScenarioHandler = (userInfo: ClientRecord, params?: ScenarioHandlerParams) => Promise<ActionToClient>;
